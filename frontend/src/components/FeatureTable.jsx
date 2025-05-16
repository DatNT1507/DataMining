import React, { useEffect, useState } from 'react';
import './DashboardSection.css';

const featureDescriptions = {
  course_id: 'Mã định danh của khóa học (string)',
  course_name: 'Tên của khóa học',
  about: 'Mô tả tổng quát về nội dung khóa học',
  comments: 'Danh sách bình luận từ học viên',
  school_name: 'Tên trường cung cấp khóa học',
  problem_scores: 'Danh sách điểm trung bình các bài tập',
  teacher_history: 'Lịch sử giảng dạy + avg_score',
  sl_ex: 'Số lượng bài tập',
  sl_vid: 'Số lượng video giảng dạy',
  // Nếu có trường student, bạn có thể thêm mô tả ở đây
};

export default function FeatureTable() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.missingDataPercentages) {
          setFeatures(
            data.missingDataPercentages.map(f => ({
              key: f.column,
              desc: featureDescriptions[f.column] || f.column,
              missingRate: `${f.percent}%`
            }))
          );
        }
      });
  }, []);

  return (
    <section className="feature-table-section">
      <h2>Chi tiết các trường dữ liệu</h2>
      <table className="feature-table">
        <thead>
          <tr>
            <th>Tên trường</th>
            <th>Mô tả</th>
            <th>Tỉ lệ thiếu (%)</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td><code>{f.key}</code></td>
              <td>{f.desc}</td>
              <td>{f.missingRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}