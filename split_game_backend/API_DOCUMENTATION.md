# split_game 环保教育游戏后端API接口文档

## 概述

split_game 环保教育游戏后端API为前端游戏提供数据支持和用户进度保存功能。本API采用RESTful设计风格，支持跨域请求，提供题目获取、结果提交和用户历史记录查询等功能。

## 基础信息

- **API根路径**: `http://localhost:3001/api`
- **默认端口**: 3001
- **数据格式**: JSON
- **字符编码**: UTF-8

## API端点说明

### 1. 题目相关接口

#### 获取题目列表
```
GET /api/questions
```

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| count | Integer | 否 | 题目数量，默认为10 |

**响应示例**:
```json
{
  "success": true,
  "questions": [
    {
      "id": 1,
      "question": "以下哪种行为最有助于减少碳足迹？",
      "options": [
        "每天开车上班",
        "经常乘坐飞机旅行",
        "选择步行、骑行或公共交通出行",
        "使用一次性塑料制品"
      ],
      "correctAnswer": 2,
      "explanation": "步行、骑行或使用公共交通可以显著减少个人碳排放...",
      "category": "气候变化"
    }
  ],
  "total": 1
}
```

#### 根据ID获取特定题目
```
GET /api/questions/:id
```

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Integer | 是 | 题目ID |

**响应示例**:
```json
{
  "success": true,
  "question": {
    "id": 1,
    "question": "以下哪种行为最有助于减少碳足迹？",
    "options": [
      "每天开车上班",
      "经常乘坐飞机旅行",
      "选择步行、骑行或公共交通出行",
      "使用一次性塑料制品"
    ],
    "correctAnswer": 2,
    "explanation": "步行、骑行或使用公共交通可以显著减少个人碳排放...",
    "category": "气候变化"
  }
}
```

### 2. 答题结果接口

#### 提交答题结果
```
POST /api/quiz-results
```

**请求体**:
```json
{
  "type": "quiz_completion", // 或 "level_completion"
  "data": {
    // 根据type不同，data内容也不同
  }
}
```

**测验完成数据示例**:
```json
{
  "type": "quiz_completion",
  "data": {
    "totalQuestions": 10,
    "correctAnswers": 8,
    "score": 80,
    "timestamp": "2023-06-01T10:00:00.000Z"
  }
}
```

**关卡完成数据示例**:
```json
{
  "type": "level_completion",
  "data": {
    "levelId": "smog",
    "levelName": "雾霾之战",
    "score": 100,
    "timestamp": "2023-06-01T10:00:00.000Z"
  }
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "答题完成！正确率: 80%",
  "resultId": 1
}
```

#### 获取所有答题结果
```
GET /api/quiz-results
```

**响应示例**:
```json
{
  "success": true,
  "results": [
    {
      "id": 1,
      "type": "quiz_completion",
      "data": {
        "totalQuestions": 10,
        "correctAnswers": 8,
        "score": 80,
        "timestamp": "2023-06-01T10:00:00.000Z"
      }
    }
  ],
  "total": 1
}
```

#### 根据ID获取特定答题结果
```
GET /api/quiz-results/:id
```

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Integer | 是 | 结果ID |

**响应示例**:
```json
{
  "success": true,
  "result": {
    "id": 1,
    "type": "quiz_completion",
    "data": {
      "totalQuestions": 10,
      "correctAnswers": 8,
      "score": 80,
      "timestamp": "2023-06-01T10:00:00.000Z"
    }
  }
}
```

### 3. 用户历史记录接口

#### 获取用户历史记录
```
GET /api/user-history
```

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Integer | 否 | 用户ID，不提供时返回所有用户记录 |

**响应示例**:
```json
{
  "success": true,
  "history": [
    {
      "id": 1,
      "userId": 1,
      "type": "quiz_completion",
      "data": {
        "totalQuestions": 10,
        "correctAnswers": 8,
        "score": 80,
        "timestamp": "2023-06-01T10:00:00.000Z"
      }
    }
  ],
  "total": 1
}
```

#### 保存用户历史记录
```
POST /api/user-history
```

**请求体**:
```json
{
  "userId": 1,
  "type": "quiz_completion",
  "data": {
    "totalQuestions": 10,
    "correctAnswers": 8,
    "score": 80,
    "timestamp": "2023-06-01T10:00:00.000Z"
  }
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "历史记录保存成功",
  "historyId": 1
}
```

### 4. 用户积分接口

#### 获取用户积分信息
```
GET /api/points/:userId
```

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Integer | 是 | 用户ID |

**响应示例**:
```json
{
  "success": true,
  "points": {
    "userId": 1,
    "totalPoints": 250,
    "level": 3,
    "badges": ["beginner", "scholar"],
    "history": [
      {
        "points": 50,
        "source": "quiz_completion",
        "description": "完成环保知识问答",
        "timestamp": "2023-06-01T10:00:00.000Z"
      }
    ],
    "todayPoints": 50,
    "remainingPoints": 950
  }
}
```

#### 为用户添加积分
```
POST /api/points/:userId/add
```

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Integer | 是 | 用户ID |

**请求体**:
```json
{
  "points": 50,
  "source": "quiz_completion",
  "description": "完成环保知识问答"
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "积分添加成功",
  "data": {
    "actualPoints": 50,
    "remainingPoints": 950,
    "currentLevel": 3
  }
}
```

#### 获取总积分排行榜
```
GET /api/points/leaderboard/total
```

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | Integer | 否 | 返回用户数量，默认为10 |

**响应示例**:
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": 1,
      "totalPoints": 250,
      "level": 3,
      "badges": ["beginner", "scholar"]
    }
  ],
  "total": 1
}
```

#### 获取今日积分排行榜
```
GET /api/points/leaderboard/daily
```

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | Integer | 否 | 返回用户数量，默认为10 |

**响应示例**:
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": 1,
      "todayPoints": 50
    }
  ],
  "total": 1
}
```