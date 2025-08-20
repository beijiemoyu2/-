const express = require('express');
const router = express.Router();
const { saveQuizResult, getAllQuizResults, getQuizResultById } = require('../models/QuizResult');

// 提交答题结果
router.post('/', (req, res) => {
  try {
    const { type, data } = req.body;
    
    // 验证参数
    if (!type || !data) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数: type 和 data'
      });
    }
    
    // 保存结果
    const result = saveQuizResult(type, data);
    
    // 根据类型返回不同消息
    let message = '结果提交成功';
    if (type === 'quiz_completion') {
      message = `答题完成！正确率: ${data.score}%`;
    } else if (type === 'level_completion') {
      message = `${data.levelName}关卡完成！得分: ${data.score}`;
    }
    
    res.json({
      success: true,
      message: message,
      resultId: result.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '提交结果失败',
      error: error.message
    });
  }
});

// 获取所有答题结果
router.get('/', (req, res) => {
  try {
    const results = getAllQuizResults();
    
    res.json({
      success: true,
      results: results,
      total: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取结果列表失败',
      error: error.message
    });
  }
});

// 根据ID获取特定答题结果
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = getQuizResultById(id);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: '结果未找到'
      });
    }
    
    res.json({
      success: true,
      result: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取结果失败',
      error: error.message
    });
  }
});

module.exports = router;