// src/data/fakeCourses.js

// Sinh ngẫu nhiên số thực trong [0, 5)
function randScore() {
  return parseFloat((Math.random() * 10).toFixed(2));
}

// Tạo mảng fakeCourses
export const fakeCourses = Array.from({ length: 50 }, (_, i) => ({
  course_id: `C_${1000 + i}`,
  problem_scores: Array.from(
    { length: Math.floor(Math.random() * 41) + 10 }, // 10–100 phần tử
    () => randScore()
  )
}));

// Ví dụ import và sử dụng trong component
// import { fakeCourses } from './data/fakeCourses';
// <ProblemScoreDistributionPlot courses={fakeCourses} />
