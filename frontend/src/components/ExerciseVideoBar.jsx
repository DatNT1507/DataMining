import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function ExerciseVideoBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/exercise-video-bar')
      .then(res => res.json())
      .then(res => setData(res.data || []));
  }, []);

  return (
    <div className="chart-box">
      <h3>Phân bố tổng số bài tập và video giảng dạy theo trường</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="school" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="exercises" fill="#5B8FF9" />
          <Bar dataKey="videos" fill="#F6BD16" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}