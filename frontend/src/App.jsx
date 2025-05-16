// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx';
import Layout   from './screens/Layout';
//import DatasetAnalysis from './screens/DatasetAnalysis.jsx';
import ExperimentResults from './screens/ExperimentResults.jsx';
import CourseDetail from './screens/CourseDetail.jsx';
import DatasetDashboard from './screens/DatasetDashboard.jsx';

export default function App() {
  return (

      <Routes>
        {/* Route cha dùng Layout */}
        <Route path="/" element={<Layout />}>
          {/* Trang index (/) */}
          <Route index      element={<Home />} />
          <Route path="dataset"  element={<DatasetDashboard />} />
          <Route path="results"  element={<ExperimentResults />} />
          <Route path="detail"   element={<CourseDetail />} />
          
          {/* nếu cần thêm route con khác cũng chỉ cần thêm ở đây */}
        </Route>
      </Routes>

  );
}
