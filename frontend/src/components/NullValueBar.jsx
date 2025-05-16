import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';

export default function NullValueBar() {
  const [nullData, setNullData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.missingDataPercentages) {
          setNullData(
            data.missingDataPercentages.map(item => ({
              field: item.column,
              missing: item.percent
            }))
          );
        }
      });
  }, []);

  return (
    <div className="chart-box">
      <h3>Tỉ lệ thiếu dữ liệu (%) theo trường dữ liệu</h3>
      <ResponsiveContainer width="100%" height={40 + nullData.length * 40}>
        <BarChart
          data={nullData}
          layout="vertical"
          margin={{ left: 40, top: 10, bottom: 10, right: 20 }}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" unit="%" />
          <YAxis type="category" dataKey="field" width={150} />
          <Tooltip />
          <Bar dataKey="missing" fill="#ff6b6b">
            <LabelList dataKey="missing" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}