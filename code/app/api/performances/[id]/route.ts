// app/api/performance/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib"; // models 폴더 위치에 맞게 경로 조정

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params; // await로 풀기
  const performanceId = params.id;

  if (!performanceId) {
    return NextResponse.json(
      {
        Message: "Performance ID is required",
        ResultCode: "ERR_INVALID_REQUEST",
      },
      { status: 400 }
    );
  }

  try {
    const performance = await db.Performance.findOne({
      where: { id: performanceId, save: 1 }, // save=1인 공연만 조회
    });

    if (!performance) {
      return NextResponse.json(
        {
          Message: "Performance not found",
          ResultCode: "ERR_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      Message: "Success",
      ResultCode: "ERR_OK",
      Response: performance,
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
