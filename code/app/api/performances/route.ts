// app/api/performance/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib"; // models 폴더 위치에 맞게 경로 조정
import { Op } from "sequelize";

export async function GET(req: NextRequest) {
  const pageNum = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
  const limit = 100;
  const offset = limit * (pageNum - 1);

  try {
    // save=1인 공연 총 개수
    const totalPerforms = await db.Performance.count({
      where: { save: 1 },
    });

    // save=1 공연 전체 조회 (필요시 state 필터 추가 가능)
    const perform = await db.Performance.findAll({
      where: { save: 1 },
      order: [["date_finish_unix", "ASC"]],
    });

    // 페이지네이션 적용
    const perform_pagination = perform.slice(offset, offset + limit);

    return NextResponse.json({
      Message: "Success",
      ResultCode: "ERR_OK",
      Size: perform.length,
      Response: {
        page: {
          total: Math.ceil(totalPerforms / limit),
          current: pageNum,
        },
        performance_list: perform_pagination,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        Message: "Internal server error",
        ResultCode: "ERR_INTERNAL_SERVER",
      },
      { status: 500 }
    );
  }
}
