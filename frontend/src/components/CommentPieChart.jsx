// src/components/CommentPieChart.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

// const commentData = [
//   { name: 'Tích cực', value: 62 },
//   { name: 'Trung lập', value: 24 },
//   { name: 'Tiêu cực', value: 14 }
// ];

const COLORS = ['#61DDAA', '#F6BD16', '#E86452'];

export default function CommentPieChart({ data, title }) {
  // data = [{ name: 'Tích cực', value: 62 }, …]
  // title = 'Label 1 sao', …
  return (
    <div className="PieChartBox">
      
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
