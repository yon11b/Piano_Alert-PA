import json
import pymysql
import requests
import os
import sys
import xml.etree.ElementTree as ET
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from db import connect_DB
baseurl = 'http://www.kopis.or.kr/openApi/restful'
servicekey = 'c1952d9239ff4e6e8f2e365bb8ee7690'

def get_performance_new_list(servicekey):
    totalcnt = 0
    page = 0
    data_insert = 'GO'
    method = 'pblprfr'
    stdate = input("시작 날짜를 입력하세요. (ex: 20231121) > ")
    eddate = input("종료 날짜를 입력하세요. (ex: 20240101) > ")
    
    while data_insert != 'END':
        page += 1
        url = f"{baseurl}/{method}?service={servicekey}&stdate={stdate}&eddate={eddate}&cpage={page}&rows=10&signgucode=11"
        print(url)
        try:
            # API 요청 보내기
            response = requests.get(url, timeout=10)
            print(response.status_code)
            data=response.text
            data = ET.fromstring(data)  # XML 문자열을 파싱하여 XML 파서 객체를 가져옴
            print(data)
            data_insert, newcnt = push_performance_new_list(con, data)
            totalcnt += newcnt
        except pymysql.err.InternalError as e:
            code, msg = e.args
            print(f'code: >> {code}')
            print(f'msg: >> {msg}')
            return -1
        except Exception as e:
            print(e)
            return -1
    return totalcnt

def push_performance_new_list(con, xml):
    cnt = 0
    flag = 0
    cur = con.cursor()
    datas = list(xml)
    if len(datas) == 0:
        return 'END'    
    for ds in datas:            # dbs
        data = list(ds)
        for d in data:          # db
            if d.tag == "mt20id":
                id = d.text
                print(id)
                flag += 1
            elif d.tag == "prfnm":
                title = d.text
                print(title)
                flag += 1
            elif flag % 2 == 0:
                cur.execute("select count(*) from performances where id = %s and genrenm = %s",[id], "서양음악(클래식)")
                is_existed = cur.fetchall()[0][0]
                print(is_existed)
                if is_existed == 0:                    
                    cur.execute("insert into performances (id, title) values(%s,%s)",[id, title])
                    con.commit()
                    cnt += 1
                    print(f">>>>>>>>>>> '{title}' 의 공연이 DB에 insert 되었습니다.")
                print('========')
                break
    return 'GO', cnt

con = connect_DB()
totalcnt = get_performance_new_list(servicekey)
print(f'>>>>>>>>>>> {totalcnt} 개의 공연이 Database에 삽입되었습니다.')