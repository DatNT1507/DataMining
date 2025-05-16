// src/components/StudentLineChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { course: 'C001', students: 120 },
  { course: 'C002', students: 150 },
  { course: 'C003', students: 80 },
  { course: 'C004', students: 60 },
  { course: 'C005', students: 200 },
  { course: 'C006', students: 170 }
];

export default function StudentLineChart() {
  return (
    <div className="chart-box">
      <h3>Phân bố số lượng học viên theo khóa học</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="students" stroke="#E86452" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
