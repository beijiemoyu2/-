const express = require('express');
const router = express.Router();
const { userPoints, pointSources, badges, getLeaderboard, getDailyLeaderboard } = require('../models/Points');
const { Points } = require('../models/Points');

// 获取用户积分信息
router.get('/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userPoint = userPoints.find(p => p.userId === userId);
    
    if (!userPoint) {
      // 如果用户不存在，创建新用户积分记录
      const newPoint = new Points(userId, 0, 1, []);
      userPoints.push(newPoint);
      
      return res.json({
        success: true,
        points: {
          userId: newPoint.userId,
          totalPoints: newPoint.totalPoints,
          level: newPoint.level,
          badges: newPoint.badges,
          history: newPoint.history.slice(-10), // 只返回最近10条记录
          todayPoints: newPoint.getTodayPoints(),
          remainingPoints: newPoint.getRemainingPointsToday()
        }
      });
    }
    
    res.json({
      success: true,
      points: {
        userId: userPoint.userId,
        totalPoints: userPoint.totalPoints,
        level: userPoint.level,
        badges: userPoint.badges,
        history: userPoint.history.slice(-10), // 只返回最近10条记录
        todayPoints: userPoint.getTodayPoints(),
        remainingPoints: userPoint.getRemainingPointsToday()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取用户积分信息失败',
      error: error.message
    });
  }
});

// 添加积分
router.post('/:userId/add', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { points, source, description } = req.body;
    
    // 验证参数
    if (points === undefined || !source) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数: points 和 source'
      });
    }
    
    // 查找或创建用户积分记录
    let userPoint = userPoints.find(p => p.userId === userId);
    if (!userPoint) {
      userPoint = new Points(userId, 0, 1, []);
      userPoints.push(userPoint);
    }
    
    // 添加积分
    const result = userPoint.addPoints(points, source, description);
    
    if (!result.success) {
      return res.json({
        success: false,
        message: result.message
      });
    }
    
    // 检查是否获得新徽章
    let newBadge = null;
    if (userPoint.totalPoints >= 1000 && !userPoint.badges.includes('expert')) {
      userPoint.addBadge('expert');
      newBadge = badges.EXPERT;
    } else if (userPoint.totalPoints >= 500 && !userPoint.badges.includes('scholar')) {
      userPoint.addBadge('scholar');
      newBadge = badges.SCHOLAR;
    } else if (userPoint.totalPoints >= 100 && !userPoint.badges.includes('beginner')) {
      userPoint.addBadge('beginner');
      newBadge = badges.BEGINNER;
    }
    
    res.json({
      success: true,
      message: '积分添加成功',
      data: {
        actualPoints: result.actualPoints,
        remainingPoints: result.remainingPoints,
        currentLevel: userPoint.level,
        newBadge: newBadge
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '添加积分失败',
      error: error.message
    });
  }
});

// 获取总积分排行榜
router.get('/leaderboard/total', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = getLeaderboard(limit);
    
    res.json({
      success: true,
      leaderboard: leaderboard,
      total: leaderboard.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取排行榜失败',
      error: error.message
    });
  }
});

// 获取今日积分排行榜
router.get('/leaderboard/daily', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = getDailyLeaderboard(limit);
    
    res.json({
      success: true,
      leaderboard: leaderboard,
      total: leaderboard.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取排行榜失败',
      error: error.message
    });
  }
});

module.exports = router;