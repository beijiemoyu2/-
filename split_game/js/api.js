/**
 * 后端API接口模块
 * 为split_game前端提供与后端服务器通信的功能
 */

class BackendAPI {
  // API基础URL
  static BASE_URL = 'http://localhost:3001/api';
  
  /**
   * 获取题目列表
   * @param {number} count - 题目数量
   * @returns {Promise<Array>} 题目列表
   */
  static async fetchQuestions(count = 10) {
    try {
      const response = await fetch(`${this.BASE_URL}/questions?count=${count}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`成功获取${data.questions.length}道题目`);
        return data.questions;
      } else {
        throw new Error(data.message || '获取题目失败');
      }
    } catch (error) {
      console.error('获取题目时出错:', error);
      throw error;
    }
  }
  
  /**
   * 根据ID获取特定题目
   * @param {number} id - 题目ID
   * @returns {Promise<Object>} 题目对象
   */
  static async fetchQuestionById(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/questions/${id}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`成功获取ID为${id}的题目`);
        return data.question;
      } else {
        throw new Error(data.message || '获取题目失败');
      }
    } catch (error) {
      console.error(`获取ID为${id}的题目时出错:`, error);
      throw error;
    }
  }
  
  /**
   * 提交测验结果
   * @param {Object} resultData - 测验结果数据
   * @returns {Promise<Object>} 提交结果
   */
  static async submitQuizResult(resultData) {
    try {
      const response = await fetch(`${this.BASE_URL}/quiz-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('测验结果提交成功:', data.message);
        return data;
      } else {
        throw new Error(data.message || '提交测验结果失败');
      }
    } catch (error) {
      console.error('提交测验结果时出错:', error);
      throw error;
    }
  }
  
  /**
   * 获取用户历史记录
   * @param {number} userId - 用户ID
   * @returns {Promise<Array>} 历史记录列表
   */
  static async getUserHistory(userId) {
    try {
      const response = await fetch(`${this.BASE_URL}/user-history?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`成功获取用户${userId}的历史记录`);
        return data.history;
      } else {
        throw new Error(data.message || '获取用户历史记录失败');
      }
    } catch (error) {
      console.error(`获取用户${userId}的历史记录时出错:`, error);
      throw error;
    }
  }
  
  /**
   * 保存用户历史记录
   * @param {Object} historyData - 历史记录数据
   * @returns {Promise<Object>} 保存结果
   */
  static async saveUserHistory(historyData) {
    try {
      const response = await fetch(`${this.BASE_URL}/user-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(historyData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('用户历史记录保存成功');
        return data;
      } else {
        throw new Error(data.message || '保存用户历史记录失败');
      }
    } catch (error) {
      console.error('保存用户历史记录时出错:', error);
      throw error;
    }
  }
  
  /**
   * 获取用户积分信息
   * @param {number} userId - 用户ID
   * @returns {Promise<Object>} 用户积分信息
   */
  static async getUserPoints(userId) {
    try {
      const response = await fetch(`${this.BASE_URL}/points/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`成功获取用户${userId}的积分信息`);
        return data.points;
      } else {
        throw new Error(data.message || '获取用户积分信息失败');
      }
    } catch (error) {
      console.error(`获取用户${userId}的积分信息时出错:`, error);
      throw error;
    }
  }
  
  /**
   * 为用户添加积分
   * @param {number} userId - 用户ID
   * @param {number} points - 积分数量
   * @param {string} source - 积分来源
   * @param {string} description - 积分描述
   * @returns {Promise<Object>} 添加结果
   */
  static async addPoints(userId, points, source, description) {
    try {
      const response = await fetch(`${this.BASE_URL}/points/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points, source, description })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log(`为用户${userId}添加积分成功:`, data.message);
        return data;
      } else {
        throw new Error(data.message || '添加积分失败');
      }
    } catch (error) {
      console.error(`为用户${userId}添加积分时出错:`, error);
      throw error;
    }
  }
  
  /**
   * 获取总积分排行榜
   * @param {number} limit - 返回用户数量
   * @returns {Promise<Array>} 排行榜数据
   */
  static async getLeaderboard(limit = 10) {
    try {
      const response = await fetch(`${this.BASE_URL}/points/leaderboard/total?limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('成功获取总积分排行榜');
        return data.leaderboard;
      } else {
        throw new Error(data.message || '获取排行榜失败');
      }
    } catch (error) {
      console.error('获取总积分排行榜时出错:', error);
      throw error;
    }
  }
  
  /**
   * 获取今日积分排行榜
   * @param {number} limit - 返回用户数量
   * @returns {Promise<Array>} 排行榜数据
   */
  static async getDailyLeaderboard(limit = 10) {
    try {
      const response = await fetch(`${this.BASE_URL}/points/leaderboard/daily?limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('成功获取今日积分排行榜');
        return data.leaderboard;
      } else {
        throw new Error(data.message || '获取排行榜失败');
      }
    } catch (error) {
      console.error('获取今日积分排行榜时出错:', error);
      throw error;
    }
  }
  
  /**
   * 测试与后端的连接
   * @returns {Promise<boolean>} 连接是否成功
   */
  static async testConnection() {
    try {
      const response = await fetch(`${this.BASE_URL}/test-connection`);
      const data = await response.json();
      
      if (data.success) {
        console.log('后端连接测试成功:', data.message);
        return true;
      } else {
        console.error('后端连接测试失败:', data.message);
        return false;
      }
    } catch (error) {
      console.error('后端连接测试出错:', error);
      return false;
    }
  }
}

// 导出API类
window.BackendAPI = BackendAPI;