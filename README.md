# dex-bot
### 安装nvm 
 直接看[这里](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

### nvm安装nodejs 
```
nvm install 22 
nvm use 22 
```
nodejs版本 >= 20

### 安装pm2 
```
npm install pm2 -g 
```

### 数据库配置
根目录下新建.env文件 以下是文件内容
```
DATABASE_URL="file:./dev.db"
```
首次启动前需要初始化数据库
```
npx prisma migrate dev --name init # 初始化数据库
npx prisma generate # 生成prisma文件
npx prisma db push # 首次启动前需要初始化数据库
```

### 启动命令
```
pm2 start npm --name bot1 -- run start -- -wx wx-account1
```
参数 --name 后面跟要启动的项目名字 bot1 bot2... 

参数 --wx 或 --weixin 后面跟微信账号标识 每个进程对应一个微信账号 不要重复

### 更新/重启/停止/查看日志
```
git pull # 更新代码 
pm2 restart 1 # 重启进程
pm2 stop 1 # 停止进程
pm2 delete 1 # 删除进程
pm2 logs 1 # 查看日志
```
pm2 指令后面的数字为对应pm2 list上的序号id

### 控制台启动
```
npm run start -wx wx-account-name
```

### nohup启动
```
nohup npm run start -- -wx wx-account-name > output.log 2>&1 &
cat output.log # 查看日志
```

### 查看日志文件登录微信
以上查看日志的方式, 会看到二维码, 扫码登录.