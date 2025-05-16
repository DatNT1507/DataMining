import React from 'react';
import CommentPieChart from './CommentPieChart';

const COLORS = ['#61DDAA', '#F6BD16', '#E86452'];

// Tạo dữ liệu ngẫu nhiên cho 5 label (1-5 sao), mỗi label có 3 cảm xúc
const EMOTION_NAMES = ['Tích cực', 'Trung lập', 'Tiêu cực'];
const randomData = {};
for (let label = 1; label <= 5; label++) {
  randomData[label] = EMOTION_NAMES.map((name, idx) => ({
    name,
    value: Math.floor(Math.random() * 100) + 10 // Giá trị ngẫu nhiên từ 10 đến 109
  }));
}

export default function CommentCorrelationCharts() {
  // Lấy tên của 3 nhóm cảm xúc từ label 1 (giả định tất cả đều giống nhau)
  const baseNames = randomData[1].map((e) => e.name);

  return (
    <div className="chart-box">
      <h3>Phân bố cảm xúc bình luận theo label</h3>
      <p>Biểu đồ này cho thấy sự phân bố cảm xúc của các bình luận theo từng label.</p>
      <div className="correlation-row">
        {Object.entries(randomData).map(([label, data]) => (
          <CommentPieChart
            key={label}
            data={data}
            title={`Label ${label} sao`}
          />
        ))}
      </div>

      {/* Legend chung */}
      <div className="common-legend">
        {baseNames.map((name, idx) => (
          <div key={name} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: COLORS[idx] }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}