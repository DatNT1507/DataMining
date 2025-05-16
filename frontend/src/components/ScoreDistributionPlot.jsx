import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ScoreDistributionPlot() {
  const [distributionData, setDistributionData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/score-distribution')
      .then(res => res.json())
      .then(data => {
        setDistributionData(data.distribution || []);
      });
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { range, countProblems } = payload[0].payload;
    return (
      <div
        style={{
          background: '#fff',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
        }}
      >
        <p><strong>Khoảng: {range}</strong></p>
        <p>Số bài tập: {countProblems}</p>
      </div>
    );
  };

  // Tính min/max động cho trục X dựa trên dữ liệu thực tế (bao gồm cả âm)
  const xDomain = distributionData.length > 0
    ? [
        Math.min(...distributionData.map(d => {
          const [min] = d.range.split('–');
          return Number(min);
        })),
        Math.max(...distributionData.map(d => {
          const [, max] = d.range.split('–');
          return Number(max);
        }))
      ]
    : [0, 10];

  return (
    <div className="chart-box">
      <h3>Phân bố điểm problem theo nhóm 0.5</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={distributionData}
          margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            label={{ value: 'Khoảng điểm', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
            // domain={xDomain} // Không cần nếu dùng range dạng text, chỉ cần nếu dùng dạng số
          />
          <YAxis
            label={{
              value: 'Số lượng bài tập',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="countProblems" fill="#5B8FF9" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}