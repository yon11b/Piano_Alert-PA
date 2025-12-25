const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const performance =  sequelize.define('performance',{
        id:{
            type: DataTypes.STRING,
            comment: '기본키',
            primaryKey: true
        },
        locaid:{
            type: DataTypes.STRING,
            comment: '장소 코드'
        },
        title:{
            type: DataTypes.STRING,
            comment: '공연 제목'
        },
        date_start_unix:{
            type: DataTypes.INTEGER,
            comment: '공연 시작 날짜 (unix 형태)'
        },
        date_finish_unix:{
            type: DataTypes.INTEGER,
            comment: '공연 종료 날짜 (unix 형태)'
        },
        location:{
            type: DataTypes.STRING,
            comment: '장소 (한글)'
        },
        cast:{
            type: DataTypes.STRING,
            comment: '공연출연진'
        },
        reserve_start:{
            type: DataTypes.INTEGER,
            comment: '예매 시작 날짜 (unix 형태)'
        },
        reserve_finish:{
            type: DataTypes.INTEGER,
            comment: '예매 종료 날짜 (unix 형태)'
        },
        runtime:{
            type: DataTypes.STRING,
            comment: '공연 런타임'
        },
        age:{
            type: DataTypes.STRING,
            comment: '공연 관람 연령'
        },
        make:{
            type: DataTypes.STRING,
            comment: '제작진'
        },
        price:{
            type: DataTypes.STRING,
            comment: '가격'
        },
        poster:{
            type: DataTypes.STRING,
            comment: '포스터 이미지 저장 경로'
        },
        story:{
            type: DataTypes.STRING,
            comment: '줄거리'
        },
        genre:{
            type: DataTypes.STRING,
            comment: '장르'
        },
        state:{
            type: DataTypes.STRING,
            comment: '공연 예매 상태'
        },
        openrun:{
            type: DataTypes.STRING,
            comment: '오픈런 여부'
        },
        created_time:{
            type: DataTypes.DATE,
            comment: 'DB에 처음 삽입된 시간',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_time:{
            type: DataTypes.DATE,
            comment: '수정된 시간',
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        time:{
            type: DataTypes.STRING,
            comment: '공연 요일별 시간'
        },
        date_start:{
            type: DataTypes.STRING,
            comment: '공연 시작 날짜'
        },
        date_finish:{
            type: DataTypes.STRING,
            comment: '공연 종료 날짜'
        },
        save:{
            type: DataTypes.STRING,
            comment: '완전 저장 여부',
            defaultValue: Sequelize.literal('0')
        }
    }, {
      tableName: 'performance',
      comment: '공연 정보 리스트',
      timestamps: false
    });
    return performance;
};