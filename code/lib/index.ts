// app/lib/models/index.ts
import { Sequelize, DataTypes } from "sequelize";
import configJson from "../config/config.json";
import mysql2 from "mysql2";
import PerformanceModel from "./performance";

const env = process.env.NODE_ENV || "development";
const config = configJson[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: "mysql", dialectModule: mysql2 }
);

sequelize
  .authenticate()
  .then(() => console.log("DB connection established."))
  .catch((err) => console.error("Unable to connect to DB:", err));

const db: { [key: string]: any } = {};

// 모델 초기화
db.Performance = PerformanceModel.initModel(sequelize);

// 관계 설정 (associate가 있다면)
Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
