const express = require('express');
const router = express.Router();
const { getRandomQuestions, getQuestionById, getAllQuestions } = require('../models/Question');

// 获取随机题目列表
router.get('/', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const questions = getRandomQuestions(count);
    
    res.json({
      success: true,
      questions: questions,
      total: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取题目列表失败',
      error: error.message
    });
  }
});

// 根据ID获取特定题目
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const question = getQuestionById(id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: '题目未找到'
      });
    }
    
    res.json({
      success: true,
      question: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取题目失败',
      error: error.message
    });
  }
});

module.exports = router;