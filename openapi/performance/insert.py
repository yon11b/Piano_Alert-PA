import pymysql
import requests
import os
import sys
import xml.etree.ElementTree as ET
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from db import connect_DB

baseurl = 'http://www.kopis.or.kr/openApi/restful'
servicekey = 'c1952d9239ff4e6e8f2e365bb8ee7690'

con = connect_DB()

# -------------------------------
# 1️⃣ 공연 목록 가져와서 DB insert (장르 필터: 서양음악(클래식)만)
# -------------------------------
def insert_new_performances(servicekey):
    page = 0
    totalcnt = 0
    method = 'pblprfr'
    stdate = input("시작 날짜를 입력하세요. (ex: 20231121) > ")
    eddate = input("종료 날짜를 입력하세요. (ex: 20240101) > ")

    while True:
        page += 1
        url = f"{baseurl}/{method}?service={servicekey}&stdate={stdate}&eddate={eddate}&cpage={page}&rows=10&signgucode=11&shcate=CCCA" # CCCA=서양음악(클래식 장르)
        print(url)
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                print("API 호출 실패", response.status_code)
                break

            xml = ET.fromstring(response.text)
            newcnt = push_performance_list(con, xml)
            if newcnt == 0:
                break
            totalcnt += newcnt
        except Exception as e:
            print(e)
            break

    print(f'총 {totalcnt}개의 공연이 새로 DB에 insert 되었습니다.')
    return

def push_performance_list(con, xml):
    cnt = 0
    cur = con.cursor()
    for db in list(xml):
        item = {d.tag: d.text for d in list(db)}
        print(item)

        # DB 존재 여부 확인
        cur.execute("SELECT COUNT(*) FROM performances WHERE id=%s", [item.get("mt20id")])
        if cur.fetchone()[0] == 0:
            cur.execute(
                "INSERT INTO performances (id, title, genre) VALUES (%s, %s, %s)",
                [item.get("mt20id"), item.get("prfnm"), item.get("genrenm")]
            )
            con.commit()
            cnt += 1
            print(f"'{item.get('prfnm')}' 공연이 DB에 insert 되었습니다.")
    return cnt

# -------------------------------
# 2️⃣ DB에 있는 공연 ID 기준으로 상세정보 update
# -------------------------------
def update_performance_details(servicekey):
    cur = con.cursor()
    cur.execute("SELECT id FROM performances")
    id_list = [row[0] for row in cur.fetchall()]

    method = 'pblprfr'
    for performance_id in id_list:
        url = f"{baseurl}/{method}/{performance_id}?service={servicekey}"
        print(url)
        try:
            response = requests.get(url, timeout=10)
            xml = ET.fromstring(response.text)
            push_performance_detail(con, xml, performance_id)
        except Exception as e:
            print(e)
            continue

def push_performance_detail(con, xml, performance_id):
    cur = con.cursor()
    dbs = list(xml)
    if len(dbs) == 0:
        return
    item = {d.tag: d.text for d in list(dbs[0])}

    # 날짜를 Unix timestamp로 변환
    date_start_unix = int(datetime.strptime(item.get("prfpdfrom"), "%Y.%m.%d").timestamp()) if item.get("prfpdfrom") else None
    date_finish_unix = int(datetime.strptime(item.get("prfpdto"), "%Y.%m.%d").timestamp()) if item.get("prfpdto") else None
    required_fields = [
        "mt10id",      # locaid
        "prfpdfrom",   # 시작일
        "prfpdto",     # 종료일
        "fcltynm",     # location
        "genrenm",     # genre
        "prfstate",    # state
        "prfnm"        # title
    ]
    missing_fields = [f for f in required_fields if item.get(f) is None or str(item.get(f)).strip() == " " or str(item.get(f)).strip() == ""]
    save_value = 0 if missing_fields else 1

    cur.execute("""
        UPDATE performances SET
            locaid=%s, date_start_unix=%s, date_finish_unix=%s, location=%s,
            cast=%s, runtime=%s, age=%s, make=%s, price=%s, poster=%s,
            story=%s, genre=%s, state=%s, openrun=%s, date_start=%s, date_finish=%s, time=%s,
            `save`=%s
        WHERE id=%s
    """, [
        item.get("mt10id") or None,
        date_start_unix,
        date_finish_unix,
        item.get("fcltynm") or None,
        item.get("prfcast") or None,
        item.get("prfruntime") or None,
        item.get("prfage") or None,
        item.get("entrpsnm") or None,
        item.get("pcseguidance") or None,
        item.get("poster") or None,
        item.get("sty") or None,
        item.get("genrenm") or None,
        item.get("prfstate") or None,
        item.get("openrun") or None,
        item.get("prfpdfrom") or None,
        item.get("prfpdto") or None,
        item.get("dtguidance") or None,
        save_value,
        performance_id
    ])

    con.commit()
    print(f"'{item.get('prfnm')}' 공연 정보가 DB에 update 되었습니다.")
    return

# -------------------------------
# 실행 순서
# -------------------------------
insert_new_performances(servicekey)
update_performance_details(servicekey)
