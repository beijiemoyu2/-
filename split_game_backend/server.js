const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 导入路由
const questionRoutes = require('./routes/questions');
const quizResultRoutes = require('./routes/quizResults');
const userHistoryRoutes = require('./routes/userHistory');
const pointsRoutes = require('./routes/points');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API路由
app.use('/api/questions', questionRoutes);
app.use('/api/quiz-results', quizResultRoutes);
app.use('/api/user-history', userHistoryRoutes);
app.use('/api/points', pointsRoutes);

// 连接测试端点
app.get('/api/test-connection', (req, res) => {
  res.json({
    success: true,
    message: 'split_game后端服务连接成功',
    timestamp: new Date().toISOString(),
    serverInfo: {
      name: 'split_game环保教育游戏后端API',
      version: '1.0.0'
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`split_game后端服务器正在运行，端口: ${PORT}`);
  console.log(`API文档: http://localhost:${PORT}/api/docs`);
});