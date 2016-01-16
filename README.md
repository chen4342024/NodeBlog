# NodeBlog
使用nodejs的一个简单的blog
1.npm install gulp 安装gulp
2.npm install       安装依赖的组件
3.gulp dev		   执行gulp


目录结构：
src 
	-build 项目的一些配置文件
	-www  		   		项目主要的开发文件（开发在这个目录上开发，开发完，运行gulp dev，会将项目拷到项目根目录的www下，用于build 移动端）
		-app 			界面以及controller
		-common 		包含公用的东西
			-service    存放service
			-util       存放工具类的js
			-directives 存放指令
		-img            图片
		-js             这个在考虑要不要删掉
		-lib            第三方的库
		-styles         样式
		-index.html
-www 
-hook

可使用命令：
gulp dev  将开发文件同步到phonegap下www文件
gulp unit 跑单元测试
gulp browser-sync 同步刷新浏览器，无需F5
