const express = require('express');
const router = express.Router();
const { saveUserHistory, getUserHistory, getAllUserHistory } = require('../models/UserHistory');

// 获取用户历史记录
router.get('/', (req, res) => {
  try {
    const userId = req.query.userId;
    
    let histories;
    if (userId) {
      // 获取特定用户的历史记录
      histories = getUserHistory(userId);
    } else {
      // 获取所有用户的历史记录
      histories = getAllUserHistory();
    }
    
    res.json({
      success: true,
      history: histories,
      total: histories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取用户历史记录失败',
      error: error.message
    });
  }
});

// 保存用户历史记录
router.post('/', (req, res) => {
  try {
    const { userId, type, data } = req.body;
    
    // 验证参数
    if (!userId || !type || !data) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数: userId, type 和 data'
      });
    }
    
    // 保存历史记录
    const history = saveUserHistory(userId, type, data);
    
    res.json({
      success: true,
      message: '历史记录保存成功',
      historyId: history.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '保存历史记录失败',
      error: error.message
    });
  }
});

module.exports = router;