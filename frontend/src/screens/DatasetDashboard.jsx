import React, { useState } from 'react';
import './css/DatasetDashboard.css';

import StatCards from '../components/StatCards'; // phần tổng quan
import FeatureTable from '../components/FeatureTable';
import NullValueBar from '../components/NullValueBar';
import CommentPieChart from '../components/CommentPieChart';
import ScoreDistributionPlot from '../components/ScoreDistributionPlot';
import CourseBySchoolChart from '../components/CourseBySchoolChart';
import ExerciseVideoBar from '../components/ExerciseVideoBar';
import StudentLineChart from '../components/StudentLineChart';
import LabelCorrelationLineChart from '../components/LabelCorrelationLineChart';
import CommentCorrelationCharts from '../components/CommentCorrelationCharts';

import { fakeCourses } from '../data/fakeCourses'
import { commentByLabel } from '../data/commentByLabel'; // Dữ liệu cho biểu đồ tương quan

const tabs = ['Tổng quan', 'Phân tích đầu vào', 'Tương quan'];

export default function DatasetDashboard() {
  const [activeTab, setActiveTab] = useState('Tổng quan');

  const renderContent = () => {
    switch (activeTab) {
      case 'Tổng quan':
        return (
          <>
            <StatCards />
            <FeatureTable />
          </>
        );
      case 'Phân tích đầu vào':
        return (
          <>
            <NullValueBar />
            {/* <CommentPieChart /> */}
            <ScoreDistributionPlot courses={fakeCourses} />
            <CourseBySchoolChart />
            <ExerciseVideoBar />
            <StudentLineChart />
          </>
        );
      case 'Tương quan':
        return(
        <>    
          <LabelCorrelationLineChart />
          <CommentCorrelationCharts commentByLabel={commentByLabel} />
        </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Phân tích Dataset</h1>
      <div className="tab-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
