# rustDeak自建api-server

### 克隆代码
    git clone https://github.com/kongbg/rust-api-server.git

### 进入项目目录
    cd  /rust-api-server

### 安装依赖
    npm install

### 本地启动
    npm run dev

### rustDesk API服务器填写下面地址
    http://ip:6200

### 部署
    安装pm2
        npm install -g pm2
    启动服务
        npm run pm2

### 注意事项
    1.6200端口要放开服务器防火墙
    2.默认账号密码：admin/admin 可在controllers/rust.js 的19-20行修改

### TODO
    1. jwt验证
    2. docker化部署

