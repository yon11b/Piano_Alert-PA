import json
import pymysql
import requests
import os
import sys
import xml.etree.ElementTree as ET
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from db import connect_DB
from datetime import datetime

baseurl = 'http://www.kopis.or.kr/openApi/restful'
servicekey = 'd00dd0db331c4b9babbfce6c7094bd88'

def get_performance_new_list(servicekey, performance_id_list):
    page = 0
    method = 'pblprfr'
    
    for performance_id in performance_id_list:        
        page += 1
        url = f"{baseurl}/{method}/{performance_id}?service={servicekey}"
        print(url)
        try:
            # API 요청 보내기
            response = requests.get(url, timeout=10)
            print(response.status_code)
            data=response.text
            data = ET.fromstring(data)  # XML 문자열을 파싱하여 XML 파서 객체를 가져옴
            print(data)
            update = push_performance_new_list(con, data, performance_id)
            if update == 'ERROR':
                print(f'{performance_id}을 불러오는 도중 에러가 발생했습니다.')
                break
        except pymysql.err.InternalError as e:
            code, msg = e.args
            print(f'code: >> {code}')
            print(f'msg: >> {msg}')
            return -1
        except Exception as e:
            print(e)
            return -1

def push_performance_new_list(con, xml, performance_id):
    cur = con.cursor()
    datas = xml.getchildren()
    if len(datas) == 0:
        return 'ERROR'    
    for ds in datas:            # dbs
        data = ds.getchildren()
        for d in data:          # db
            if d.tag == "mt20id":
                id = d.text
                print(id)
            elif d.tag == "prfpdfrom":
                date_start = d.text
                date_obj = datetime.strptime(date_start, '%Y.%m.%d')
                date_start_unix = int(date_obj.timestamp())
                print(date_start)
                print(date_start_unix)
            elif d.tag == "prfpdto":
                date_finish = d.text
                date_obj = datetime.strptime(date_finish, '%Y.%m.%d')
                date_finish_unix = int(date_obj.timestamp())
                print(date_finish)
                print(date_finish_unix)
            elif d.tag == "fcltynm":
                location = d.text
                print(location)
            elif d.tag == "prfcast":
                cast = d.text
                print(cast)
            elif d.tag == "prfruntime":
                runtime = d.text
                print(runtime)
            elif d.tag == "prfage":
                age = d.text
                print(age)
            elif d.tag == "entrpsnm":
                make = d.text
                print(make)
            elif d.tag == "pcseguidance":
                price = d.text
                print(price)
            elif d.tag == "poster":
                poster = d.text
                print(poster)
            elif d.tag == "sty":
                story = d.text
                print(story)
            elif d.tag == "genrenm":
                genre = d.text
                print(genre)
            elif d.tag == "openrun":
                openrun = d.text
                print(openrun)
            elif d.tag == "prfstate":
                state = d.text
                print(state)
            elif d.tag == "mt10id":
                locaid = d.text
                print(locaid)
            elif d.tag == "dtguidance":
                time = d.text
                print(time)
        cur.execute("update performance set \
                    locaid = %s, date_start_unix = %s, date_finish_unix = %s, location = %s, cast = %s, runtime = %s, age = %s, make = %s, price = %s, poster = %s, story = %s, genre = %s, state = %s, openrun = %s, date_start = %s, date_finish = %s, time = %s, `save` = %s \
                        where id = %s",[locaid, date_start_unix, date_finish_unix, location, cast, runtime, age, make, price, poster, story, genre, state, openrun, date_start, date_finish, time, '1', performance_id])
        print('========')
        con.commit()
        break
    return 'GO'

# performance_id 리스트를 구하는 함수
def get_performance_id_list(con):
    cur = con.cursor()
    cur.execute('select id from performance where save = "1"')
    results = cur.fetchall()        
    id_list=[]    
    for result in results:
        id_list.append(result[0])   
    return id_list

con = connect_DB()
performance_id_list = get_performance_id_list(con)
print(performance_id_list)
get_performance_new_list(servicekey, performance_id_list)