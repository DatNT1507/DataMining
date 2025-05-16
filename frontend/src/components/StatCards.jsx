import React, { useEffect, useState } from 'react';
import './DashboardSection.css';

export default function StatCards() {
  const [stats, setStats] = useState([
    { label: 'Số lượng khóa học', value: '-' },
    { label: 'Số lượng trường dữ liệu (features)', value: '-' },
    { label: 'Tổng số trường có thiếu dữ liệu', value: '-' },
    { label: 'Bình luận trung bình / khóa học', value: '-' }
  ]);

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats([
          { label: 'Số lượng khóa học', value: data.courseCount },
          { label: 'Số lượng trường dữ liệu (features)', value: data.columnCount },
          { label: 'Tổng số trường có thiếu dữ liệu', value: data.missingDataCount },
          { label: 'Bình luận trung bình / khóa học', value: data.avgComments }
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="stats-grid">
      {stats.map((s, i) => (
        <div className="stat-card" key={i}>
          <h3>{s.label}</h3>
          <p>{s.value}</p>
        </div>
      ))}
    </section>
  );
}