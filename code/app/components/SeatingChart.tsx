"use client";

import React, { useState } from "react";
import { Stage, Layer, Group, Rect, Text, Circle, Line } from "react-konva";

const generateAllSeats = () => {
  const allSeats = [];

  // --- 1. 합창석 (Chorus Seat / Stage Rear) ---
  // 3개 블록으로 나뉨 (좌, 중, 우)
  for (let row = 0; row < 4; row++) {
    const rowY = 50 + row * 14;
    // 중앙 합창석
    for (let col = 0; col < 24; col++) {
      allSeats.push({
        id: `Chorus-M-${row}-${col}`,
        x: 285 + col * 10,
        y: rowY,
        color: [2, 7, 15].includes(col) && row === 0 ? "#EF4444" : "#D1D5DB",
        section: "Chorus",
      });
    }
    // 좌측/우측 합창석 (기울어짐)
    for (let col = 0; col < 8; col++) {
      allSeats.push({
        id: `Chorus-L-${row}-${col}`,
        x: 200 + col * 10 - row * 5,
        y: 60 + row * 15,
        rotation: -20,
        color: "#D1D5DB",
      });
      allSeats.push({
        id: `Chorus-R-${row}-${col}`,
        x: 530 + col * 10 + row * 5,
        y: 60 + row * 15,
        rotation: 20,
        color: "#D1D5DB",
      });
    }
  }

  // --- 2. 사이드 박스석 (F, H) ---
// 

  // --- 3. 1층 메인 좌석 (A, B, C, D, E) ---
  // 부채꼴 배치를 위한 설정
  const centerX = 400;
  const centerY = -50; // 곡률의 중심점 (무대 위쪽 가상의 점)

  const sections = [
    { name: "A", startAngle: 125, endAngle: 145, rows: 20 },
    { name: "B", startAngle: 105, endAngle: 125, rows: 20 },
    { name: "C", startAngle: 80, endAngle: 100, rows: 22 },
    { name: "D", startAngle: 55, endAngle: 75, rows: 20 },
    { name: "E", startAngle: 35, endAngle: 55, rows: 20 },
  ];

  sections.forEach((sec) => {
    for (let row = 0; row < sec.rows; row++) {
      const radius = 380 + row * 18;
      const seatsInRow = sec.name === "C" ? 12 : 8;

      for (let col = 0; col < seatsInRow; col++) {
        const angleStep = (sec.endAngle - sec.startAngle) / (seatsInRow - 1);
        const angle = sec.startAngle + col * angleStep;
        const radian = angle * (Math.PI / 180);

        allSeats.push({
          id: `${sec.name}-${row}-${col}`,
          x: centerX + radius * Math.cos(radian),
          y: centerY + radius * Math.sin(radian),
          rotation: angle + 90,
          color: (row + col) % 12 === 0 ? "#EF4444" : "#FFFFFF",
          label: col + 1,
        });
      }
    }
  });

  return allSeats;
};

export default function SeatingChart() {
  const [seats] = useState(generateAllSeats());
  const [stageScale, setStageScale] = useState(0.8); // 초기 배율 조정

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setStageScale(newScale);
  };

  return (
    <div
      style={{
        background: "#F3F4F6",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stage
        width={800}
        height={900}
        draggable
        onWheel={handleWheel}
        scaleX={stageScale}
        scaleY={stageScale}
        x={50} // 중앙 정렬을 위한 오프셋
      >
        <Layer>
          {/* --- 무대 가이드 라인 --- */}
          <Line
            points={[200, 120, 600, 120, 650, 300, 150, 300]}
            closed
            stroke="#CBD5E1"
            strokeWidth={1}
          />

          {/* STAGE 영역 */}
          <Rect
            x={280}
            y={150}
            width={240}
            height={70}
            fill="#E2E8F0"
            stroke="#94A3B8"
            cornerRadius={4}
          />
          <Text
            text="STAGE"
            x={280}
            y={175}
            width={240}
            align="center"
            fontStyle="bold"
            fontSize={16}
          />

          {/* 1F 표시 */}
          <Circle x={400} y={380} radius={22} fill="#64748B" />
          <Text
            text="1F"
            x={380}
            y={373}
            width={40}
            align="center"
            fill="white"
            fontStyle="bold"
            fontSize={14}
          />

          {/* 모든 좌석 렌더링 */}
          {seats.map((seat) => (
            <Group key={seat.id} x={seat.x} y={seat.y} rotation={seat.rotation}>
              <Rect
                width={9}
                height={9}
                fill={seat.color}
                stroke="#64748B"
                strokeWidth={0.5}
                cornerRadius={1}
              />
              {/* 작은 번호 표시 (확대 시 유용) */}
              {stageScale > 1.5 && seat.label && (
                <Text text={String(seat.label)} fontSize={4} x={1} y={2} />
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
