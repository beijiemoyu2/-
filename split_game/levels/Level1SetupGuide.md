# Unity 2D 第一关场景设置指南

## 概述

本文档将指导您如何在Unity中创建一个第一关场景，包括基本的游戏控制、暂停功能、计分系统和计时器。

## 所需资源

1. `Level1Controller.cs` - 第一关控制器脚本
2. 背景图片
3. 玩家角色精灵
4. UI按钮图片（可选）
5. 音频文件（背景音乐和按钮音效）

## 设置步骤

### 1. 创建第一关场景

1. 在Unity中创建一个新场景：`File > New Scene`
2. 将场景保存为"Level1"：`File > Save Scene As...`

### 2. 设置Canvas

1. 在层级视图中右键：`Create > UI > Canvas`
2. 确保Canvas组件设置如下：
   - Render Mode: Screen Space - Overlay
3. 在Canvas下会自动创建一个EventSystem对象（如果没有，请手动创建：`Create > UI > Event System`）

### 3. 添加背景图

1. 将背景图片拖拽到层级视图的Canvas下
2. 重命名图像为"Background"
3. 调整背景图的RectTransform组件：
   - Anchor Preset: 拉伸（Stretch）
   - Left: 0, Right: 0, Top: 0, Bottom: 0
   - 或者设置Width和Height与Canvas匹配

### 4. 创建UI控件

#### 4.1 创建游戏信息显示

1. 在Canvas下创建一个Text用于显示分数：
   - 右键Canvas > `Create > UI > Text`
   - 重命名为"ScoreText"
   - 在Text组件中设置：
     - Text: "分数: 0"
     - Font Size: 24
     - Color: 白色或适合背景的颜色
     - Rect Transform:
       - Anchor: 左上角 (Alt+Click 左上角锚点)
       - Pos X: 20, Pos Y: -20

2. 在Canvas下创建一个Text用于显示时间：
   - 右键Canvas > `Create > UI > Text`
   - 重命名为"TimerText"
   - 在Text组件中设置：
     - Text: "02:00"
     - Font Size: 24
     - Color: 白色或适合背景的颜色
     - Rect Transform:
       - Anchor: 右上角 (Alt+Click 右上角锚点)
       - Pos X: -20, Pos Y: -20
       - Pivot X: 1, Pivot Y: 1

#### 4.2 创建暂停按钮

1. 在Canvas下创建暂停按钮：
   - 右键Canvas > `Create > UI > Button`
   - 重命名为"PauseButton"
   - 删除Button下默认的Text子对象
   - 添加一个Image作为按钮图标（可以是"||"图标或"暂停"文字）
   - 调整按钮位置：
     - Anchor: 右上角
     - Pos X: -20, Pos Y: -20

#### 4.3 创建暂停面板

1. 在Canvas下创建暂停面板：
   - 右键Canvas > `Create > UI > Panel`
   - 重命名为"PausePanel"
   - 调整RectTransform：
     - Anchor: 拉伸所有方向
     - Left: 0, Right: 0, Top: 0, Bottom: 0
   - 调整Image组件：
     - Color: 黑色，Alpha设置为100（半透明）

2. 在暂停面板中创建标题：
   - 右键PausePanel > `Create > UI > Text`
   - 重命名为"TitleText"
   - 在Text组件中设置：
     - Text: "游戏暂停"
     - Font Size: 48
     - Alignment: 居中对齐
     - Rect Transform:
       - Anchor: 顶部居中
       - Pos Y: -100

3. 在暂停面板中创建继续按钮：
   - 右键PausePanel > `Create > UI > Button`
   - 重命名为"ResumeButton"
   - 修改Button下Text子对象的文本为"继续游戏"
   - 调整按钮位置：
     - Anchor: 居中
     - Pos Y: 50

4. 在暂停面板中创建重新开始按钮：
   - 复制ResumeButton并重命名为"RestartButton"
   - 修改按钮文本为"重新开始"
   - 调整按钮位置：
     - Pos Y: 0

5. 在暂停面板中创建返回菜单按钮：
   - 复制ResumeButton并重命名为"MenuButton"
   - 修改按钮文本为"返回菜单"
   - 调整按钮位置：
     - Pos Y: -50

### 5. 创建游戏对象

#### 5.1 创建玩家

1. 创建玩家精灵：
   - 右键层级视图 > `Create > 2D Object > Sprite Renderer` 或直接拖入玩家精灵
   - 重命名为"Player"
   - 添加玩家控制脚本（需要另外创建或使用Unity标准Asset中的角色控制器）

2. 创建重生点：
   - 右键层级视图 > `Create > Create Empty`
   - 重命名为"SpawnPoint"
   - 放置在场景中玩家初始位置

#### 5.2 创建关卡元素

1. 根据游戏需要创建平台、敌人、收集品等关卡元素
2. 为收集品添加碰撞检测和分数增加逻辑

### 6. 添加脚本组件

1. 创建一个空的游戏对象：右键层级视图 > `Create Empty`，命名为"Level1Controller"
2. 选中Level1Controller对象
3. 在Inspector面板中点击`Add Component`
4. 选择`Level1Controller.cs`脚本
5. 在脚本组件中分配以下引用：
   - Pause Button: 将PauseButton拖拽到此字段
   - Resume Button: 将ResumeButton拖拽到此字段
   - Restart Button: 将RestartButton拖拽到此字段
   - Menu Button: 将MenuButton拖拽到此字段
   - Pause Panel: 将PausePanel拖拽到此字段
   - Score Text: 将ScoreText拖拽到此字段
   - Timer Text: 将TimerText拖拽到此字段
   - Player: 将Player对象拖拽到此字段
   - Spawn Point: 将SpawnPoint拖拽到此字段

### 7. 配置音频（可选）

1. 将背景音乐和按钮音效文件导入项目
2. 在Level1Controller组件中：
   - 将背景音乐文件拖拽到Background Music字段
   - 将按钮音效文件拖拽到Button Click Sound字段

### 8. 添加场景到构建设置

1. 打开Build Settings：`File > Build Settings...`
2. 确保三个场景（MainMenu、Level1和Game）都在Scenes In Build列表中
3. 如果没有，请将它们从Project窗口拖拽到Build Settings窗口中
4. 确保场景顺序正确（MainMenu通常是第一个）

## 脚本功能说明

### 主要功能

1. **计时器系统** - 倒计时显示，时间结束时游戏结束
2. **暂停系统** - 可暂停和恢复游戏
3. **分数系统** - 可通过AddScore方法增加分数
4. **场景管理** - 可重新开始或返回主菜单
5. **音频支持** - 支持背景音乐和按钮音效

### 公共方法

- `TogglePause()` - 切换暂停状态
- `RestartLevel()` - 重新开始关卡
- `ReturnToMenu()` - 返回主菜单
- `AddScore(int points)` - 增加指定分数
- `PlayerDied()` - 玩家死亡处理

## 自定义选项

### 调整关卡设置

可以在Inspector面板中调整以下参数：

- **Level Time** - 关卡时长（秒）
- **Hover Scale Factor** - 按钮悬停时的缩放因子
- **Animation Duration** - 动画持续时间

### 扩展功能

1. 添加敌人AI和碰撞检测
2. 实现收集品系统
3. 添加关卡目标（如收集一定数量的物品）
4. 实现生命系统
5. 添加特效和动画

## 测试场景

1. 点击Unity编辑器中的播放按钮
2. 确认UI元素正确显示
3. 点击暂停按钮测试暂停功能
4. 测试重新开始和返回菜单按钮
5. 检查计时器和分数系统是否正常工作

## 故障排除

### UI元素显示异常

- 检查Canvas设置是否正确
- 确认UI元素的Rect Transform设置
- 检查Anchor设置是否合适

### 按钮无响应

- 确保场景中有EventSystem对象
- 检查按钮是否在Canvas下
- 确认按钮的Raycast Target选项已启用

### 音频无法播放

- 确认已分配音频剪辑
- 检查AudioSource组件设置
- 确认音频文件导入设置正确

### 暂停功能异常

- 检查TogglePause方法是否正确绑定到按钮
- 确认Time.timeScale设置正确
- 查看暂停面板的激活状态设置
