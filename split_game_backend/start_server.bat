@echo off
title split_game 后端服务器
echo 正在启动 split_game 后端服务器...
echo 请确保已安装 Node.js
echo.

cd /d "%~dp0"

:: 检查 node 是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 检查 node_modules 是否存在
if not exist "node_modules" (
    echo 检测到首次运行，正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo 错误: 依赖安装失败
        echo.
        pause
        exit /b 1
    )
    echo 依赖安装完成!
    echo.
)

echo 启动服务器...
echo 访问地址: http://localhost:3001
echo API文档: http://localhost:3001/api/docs
echo 按 Ctrl+C 停止服务器
echo.

node server.js

pause