import React from 'react';
import {
  FiArchive,
  FiBook,
  FiUsers,
  FiGlobe,
  FiDatabase,
  FiBarChart2,
  FiList
} from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import './css/Home.css';


export default function Home() {
  const members = [
    'Thành viên 1', 'Thành viên 2', 'Thành viên 3',
    'Thành viên 4', 'Thành viên 5', 'Thành viên 6',
    'Thành viên 7'
  ];

  const fields = [
    { key: 'course_id',       desc: 'Mã định danh của khóa học (string)' },
    { key: 'name',            desc: 'Tên của khóa học' },
    { key: 'about',           desc: 'Mô tả tổng quát về nội dung khóa học' },
    { key: 'comments',        desc: 'Danh sách các bình luận từ học viên' },
    { key: 'school_name',     desc: 'Tên trường cung cấp khóa học' },
    { key: 'problem_scores',  desc: 'Danh sách điểm trung bình các bài tập' },
    { key: 'teacher_history', desc: 'Lịch sử giảng dạy của giảng viên kèm avg_score' },
    { key: 'sl_ex',           desc: 'Số lượng bài tập (exercises)' },
    { key: 'sl_vid',          desc: 'Số lượng video giảng dạy' },
    { key: 'student',         desc: 'Danh sách học viên kèm history của mỗi người' }
  ];

  const cards = [
    {
      title: 'Giới thiệu đề tài',
      icon: <FiBook />,
      color: '#5B8FF9',
      content: (
        <p>
          Trong thời đại số hóa hiện nay, học trực tuyến đã trở thành xu hướng tất yếu trong giáo dục đại học và đào tạo từ xa. Tuy nhiên, cùng với sự bùng nổ về số lượng khóa học trên các nền tảng MOOCs (Massive Open Online Courses), câu hỏi đặt ra là: làm thế nào để đánh giá và đảm bảo chất lượng các khóa học một cách khách quan, hiệu quả và quy mô?
Đề tài này tập trung vào việc ứng dụng các phương pháp học máy và phân tích dữ liệu để xây dựng mô hình dự đoán chất lượng khóa học trên nền tảng học trực tuyến. Thay vì chỉ dựa vào đánh giá thủ công hay số liệu thô, mô hình sẽ tổng hợp nhiều tiêu chí đa chiều như: bình luận của người học, điểm trung bình bài tập, uy tín giảng viên, xếp hạng cơ sở đào tạo, và tài nguyên học tập (video, bài tập...). Dữ liệu được trích xuất và xử lý từ hệ thống MOOCs, bao gồm hành vi học tập, lịch sử giảng dạy và tương tác của sinh viên.
Với cách tiếp cận này, chúng tôi kỳ vọng cung cấp một khung đánh giá toàn diện và có khả năng mở rộng, góp phần nâng cao trải nghiệm học tập và hỗ trợ các nền tảng giáo dục trực tuyến cải tiến chất lượng giảng dạy một cách có hệ thống và dữ liệu hóa.
        </p>
      )
    },
    {
      title: 'Nhóm thực hiện',
      icon: <FiUsers />,
      color: '#61DDAA',
      content: (
        <ul>
          {members.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Bối cảnh bài toán',
      icon: <FiGlobe />,
      color: '#F6BD16',
      content: (
        <p>
          Sự phát triển nhanh chóng của các nền tảng học trực tuyến như MOOCs đã tạo điều kiện cho hàng triệu người trên toàn thế giới tiếp cận tri thức một cách linh hoạt và tiết kiệm. Tuy nhiên, sự đa dạng và quy mô lớn của các khóa học cũng đặt ra thách thức trong việc đảm bảo chất lượng nội dung và trải nghiệm học tập cho người dùng.
Trên thực tế, người học thường gặp khó khăn trong việc lựa chọn các khóa học phù hợp do thiếu thông tin rõ ràng và khách quan về chất lượng. Đồng thời, các nền tảng giáo dục cũng cần một hệ thống đánh giá tự động để hỗ trợ kiểm soát, cải thiện và đề xuất các khóa học hiệu quả hơn.
Do đó, bài toán đặt ra là: Làm thế nào để xây dựng một mô hình có khả năng dự đoán chất lượng của các khóa học trực tuyến, dựa trên dữ liệu hành vi người học, nội dung khóa học, giảng viên và cơ sở đào tạo?
Việc giải quyết bài toán này không chỉ giúp người học có cơ sở lựa chọn tốt hơn, mà còn hỗ trợ các nhà quản lý và giảng viên trong việc giám sát và cải tiến chất lượng đào tạo một cách chủ động, tự động và có cơ sở dữ liệu hỗ trợ.

        </p>
      )
    },
    {
      title: 'Đầu vào của bài toán',
      icon: <FiDatabase />,
      color: '#FF7F50',
      content: (
        <table className="input-table">
          <thead>
            <tr>
              <th>Trường</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.key}>
                <td><code>{f.key}</code></td>
                <td>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  ];

  return (
    <>
      {/* Main Content Area */}
      <main className="container">
        <header className="home-header">
          <div className="home-header-title">
            <FiArchive className="header-icon" />
            <h1>Hệ thống Dự đoán Chất lượng Khóa học</h1>
          </div>
          <p className="home-header-subtitle">
            Phân tích và đánh giá chất lượng khóa học thông qua dữ liệu học viên
          </p>
        </header>

        <div className="card-grid">
          {cards.map((c, i) => (
            <section key={i} className="card">
              <div className="card-header" style={{ borderLeftColor: c.color }}>
                <span className="card-icon" style={{ backgroundColor: c.color + '22' }}>
                  {React.cloneElement(c.icon, { color: c.color, size: '1.5em' })}
                </span>
                <h2 style={{ color: c.color }}>{c.title}</h2>
              </div>
              <div className="card-content">{c.content}</div>
            </section>
          ))}
        </div>

        <Outlet />
      </main>
    </>
  );
}
