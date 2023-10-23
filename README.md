# rustDesk自建api-server

    该项目只是 rustDesk API服务，需配置 rustDesk 自建服务器使用。
    没有rustDesk API服务,只部署rustDesk 自建服务器也能正常使用，只是没有账号体系。
    部署 rustDesk API服务 后可以登录账号，自动加载历史添加设备。

    兼容：v1.1.9, v1.2.2 v1.2.3版本
    只完成最小闭环，部分小功能未实现
	
[自建服务器文档](https://rustdesk.com/docs/zh-cn/self-host/)


![rustDesk API服务填写](https://imgse.com/i/piF19IK)


### 克隆代码
    git clone https://github.com/kongbg/rust-api-server.git

### 进入项目目录
    cd  /rust-api-server

### 安装依赖
    npm install

### 本地启动
    npm run dev

### rustDesk API服务器填写下面地址
    http://ip:21114

### 部署
    克隆代码
        git clone https://github.com/kongbg/rust-api-server.git
    进入项目目录
        cd  /rust-api-server
    安装依赖
        npm install
    安装pm2
        npm install -g pm2
    启动服务
        npm run pm2

### 注意事项
    1.6200端口要放开服务器防火墙
    2.默认账号密码：admin/admin. 可在controllers/rust.js 的19-20行修改

### TODO
    1. jwt验证
    2. docker化部署
    3. 新增/删除用户
    4. 标签改背景颜色

