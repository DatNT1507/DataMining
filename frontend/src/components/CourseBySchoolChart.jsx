import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>{payload[0].payload.school}</strong></p>
        <p>Số khóa học: {payload[0].value}</p>
        <p>Ranking trung bình: {payload[0].payload.ranking}</p>
      </div>
    );
  }
  return null;
};

export default function CourseBySchoolChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/top-schools')
      .then(res => res.json())
      .then(res => setData(res.data || []));
  }, []);

  return (
    <div className="chart-box">
      <h3>Phân bố số khóa học theo trường</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="school" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="courseCount" fill="#61DDAA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}