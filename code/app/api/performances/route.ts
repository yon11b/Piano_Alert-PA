import { NextRequest, NextResponse } from "next/server";
import db from "@/lib";
import { Op } from "sequelize";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pageNum = parseInt(searchParams.get("page") || "1", 10);
  const searchRaw = searchParams.get("search") || "";

  const limit = 1000;
  const offset = limit * (pageNum - 1);

  try {
    const whereCondition: any = {
      save: 1,
    };

    // 검색어가 있을 경우 처리
    if (searchRaw) {
      // 1. 쉼표를 기준으로 검색어 분리 및 공백 제거
      const searchTerms = searchRaw.split(",").map((term) => term.trim());

      // 2. 각 검색어별로 title 또는 story에 포함되는지 확인하는 조건 생성
      // [ {title: LIKE %피아노%}, {story: LIKE %피아노%}, {title: LIKE %piano%}, ... ]
      const orConditions = searchTerms.flatMap((term) => [
        { title: { [Op.like]: `%${term}%` } },
        { story: { [Op.like]: `%${term}%` } },
      ]);

      // 3. 생성된 모든 조건을 Op.or로 묶음
      whereCondition[Op.or] = orConditions;
    }

    const { count, rows } = await db.Performance.findAndCountAll({
      where: whereCondition,
      order: [["date_finish_unix", "ASC"]],
      limit: limit,
      offset: offset,
    });

    return NextResponse.json({
      Message: "Success",
      ResultCode: "ERR_OK",
      Size: count,
      Response: {
        page: {
          total: Math.ceil(count / limit),
          current: pageNum,
        },
        performance_list: rows,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { Message: "Internal server error", ResultCode: "ERR_INTERNAL_SERVER" },
      { status: 500 }
    );
  }
}
