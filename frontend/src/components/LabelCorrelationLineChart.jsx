import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function LabelCorrelationLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/label-correlation')
      .then(res => res.json())
      .then(res => setData(res.data || []));
  }, []);

  return (
    <div className="chart-box">
      <h3>Mối tương quan giữa nhãn (số sao) và các đặc trưng</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="star" label={{ value: 'Số sao', position: 'insideBottom', offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="comment" stroke="#F6BD16" name="Số lượng bình luận trung bình" />
          <Line type="monotone" dataKey="ex" stroke="#E86452" name="Số bài tập trung bình" />
          <Line type="monotone" dataKey="vid" stroke="#9B72AA" name="Số video trung bình" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}