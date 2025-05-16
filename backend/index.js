const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS (important for local development)
app.use(express.json()); // Enable parsing JSON request bodies

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost", // Get from environment or default
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "datamining",
};

const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
    connection.release();
  }
});

// Stats API endpoint
app.get("/api/stats", (req, res) => {
  const courseCountQuery = "SELECT COUNT(*) AS courseCount FROM courses";
  const columnCountQuery = `
    SELECT COUNT(*) AS columnCount 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE table_name = 'courses' AND table_schema = DATABASE()
  `;
  const columns = [
    "course_id",
    "course_name",
    "about",
    "school_name",
    "teacher_history",
    "comments",
    "problem_scores",
    "sl_ex",
    "sl_vid",
    "rating",
  ];
  const avgCommentsQuery = `
    SELECT AVG(comment_count) AS avgComments FROM (
      SELECT 
        CASE 
          WHEN comments IS NULL OR comments = '' THEN 0
          ELSE LENGTH(comments) - LENGTH(REPLACE(comments, '\\n', '')) + 1
        END AS comment_count
      FROM courses
    ) AS sub
  `;

  pool.query(courseCountQuery, (err, courseRows) => {
    if (err) return res.status(500).json({ error: err.message });
    const totalRows = courseRows[0].courseCount;

    pool.query(columnCountQuery, (err, columnRows) => {
      if (err) return res.status(500).json({ error: err.message });

      // Calculate missing data percentage for each column
      let missingData = [];
      let checked = 0;

      columns.forEach((col, idx) => {
        pool.query(
          `SELECT COUNT(*) AS nullCount FROM courses WHERE \`${col}\` IS NULL OR \`${col}\` = ''`,
          (err, nullRows) => {
            if (err) return res.status(500).json({ error: err.message });
            const percent = totalRows === 0 ? 0 : (nullRows[0].nullCount / totalRows) * 100;
            missingData[idx] = {
              column: col,
              percent: Number(percent.toFixed(2))
            };
            checked++;
            if (checked === columns.length) {
              // After all columns checked, get avg comments
              pool.query(avgCommentsQuery, (err, avgRows) => {
                if (err) return res.status(500).json({ error: err.message });
                let avgComments = avgRows[0].avgComments;
                if (
                  avgComments === null ||
                  avgComments === undefined ||
                  isNaN(Number(avgComments))
                ) {
                  avgComments = 0;
                } else {
                  avgComments = Number(avgComments);
                }
                // Count how many columns have missing data
                const missingDataCount = missingData.filter(md => md.percent > 0).length;
                res.json({
                  courseCount: totalRows,
                  columnCount: columnRows[0].columnCount,
                  missingDataCount,
                  avgComments: avgComments.toFixed(2),
                  missingDataPercentages: missingData
                });
              });
            }
          }
        );
      });
    });
  });
});

app.get('/api/score-distribution', (req, res) => {
  pool.query('SELECT problem_scores FROM courses', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Parse and flatten all scores, including negatives and >10
    let allScores = [];
    rows.forEach(row => {
      try {
        // Parse JSON string to array
        const scores = row.problem_scores;
        if (Array.isArray(scores)) {
          allScores.push(
            ...scores
              .map(Number)
              .filter(s => !isNaN(s)) // Accept all valid numbers, including negatives
          );
        }
      } catch {
        // skip invalid JSON
      }
    });

    // Find min and max for dynamic binning (step 0.5)
    const minScore = allScores.length ? Math.floor(Math.min(...allScores) * 2) / 2 : 0;
    const maxScore = allScores.length ? Math.ceil(Math.max(...allScores) * 2) / 2 : 10;
    const binSize = 0.5;
    const binCount = Math.round((maxScore - minScore) / binSize);

    // Generate bins dynamically
    const bins = Array.from({ length: binCount }, (_, i) => ({
      min: minScore + i * binSize,
      max: minScore + (i + 1) * binSize
    }));

    // Count problems in each bin
    const distribution = bins.map((bin, i) => {
      const isLast = i === bins.length - 1;
      const countProblems = allScores.filter(score =>
        isLast
          ? score >= bin.min && score <= bin.max
          : score >= bin.min && score < bin.max
      ).length;
      return {
        range: `${bin.min.toFixed(1)}–${bin.max.toFixed(1)}`,
        countProblems
      };
    });

    res.json({ distribution });
  });
});

app.get('/api/top-schools', (req, res) => {
  // Adjust the column name for ranking if needed (here: rating)
  const sql = `
    SELECT school_name AS school, COUNT(*) AS courseCount, AVG(rating) AS ranking
    FROM courses
    GROUP BY school_name
    ORDER BY courseCount DESC
    LIMIT 20
  `;
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Format ranking to 2 decimals
    const data = rows.map(r => ({
      ...r,
      ranking: r.ranking !== null ? Number(r.ranking).toFixed(2) : 'N/A'
    }));
    res.json({ data });
  });
});

app.get('/api/exercise-video-bar', (req, res) => {
  const sql = `
    SELECT school_name AS school, 
           SUM(sl_ex) AS exercises, 
           SUM(sl_vid) AS videos
    FROM courses
    GROUP BY school_name
    ORDER BY exercises DESC
    LIMIT 20
  `;
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Đảm bảo dữ liệu là số
    const data = rows.map(r => ({
      school: r.school,
      exercises: Number(r.exercises) || 0,
      videos: Number(r.videos) || 0
    }));
    res.json({ data });
  });
});

app.get('/api/label-correlation', (req, res) => {
  // Lấy trung bình tổng số bình luận, bài tập, video cho từng mức rating (1-5)
  const sql = `
    SELECT 
      rating AS star,
      AVG(comment_count) AS comment,
      AVG(sl_ex) AS ex,
      AVG(sl_vid) AS vid
    FROM (
      SELECT 
        rating,
        -- Đếm số bình luận bằng số dòng xuống + 1 (nếu không rỗng), nếu rỗng thì 0
        CASE 
          WHEN comments IS NULL OR comments = '' THEN 0
          ELSE LENGTH(comments) - LENGTH(REPLACE(comments, '\\n', '')) + 1
        END AS comment_count,
        sl_ex,
        sl_vid
      FROM courses
      WHERE rating IS NOT NULL
    ) AS sub
    GROUP BY rating
    ORDER BY star
  `;
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Nếu có trường student, bạn có thể thêm AVG(student) AS student vào SELECT và xử lý tương tự
    const data = rows.map(r => ({
      star: Number(r.star),
      comment: Math.round(Number(r.comment)),
      ex: Math.round(Number(r.ex)),
      vid: Math.round(Number(r.vid)),
      // student: Math.round(Number(r.student)) // nếu có trường này
    }));
    res.json({ data });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
