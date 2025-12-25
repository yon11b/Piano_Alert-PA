import pymysql

# DB 연결 함수
def connect_DB():
    con = pymysql.connect(
        host='127.0.0.1',
        user='pa',
        password='1234',
        #charset='',
        db='pa'
    )
    return con