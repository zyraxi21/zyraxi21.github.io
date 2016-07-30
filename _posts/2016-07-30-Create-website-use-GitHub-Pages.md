---
layout: post
title: 用GitHub Pages创建网站
category: Tutorials
tags: [GitHub, Pages, Website]
---

最简单方便的免费建站方法。

## 创建GitHub账户
[GitHub主页](https://github.com)不解释。    
P.S.:记住自己的用户名，有用。    

## 创建一个仓库
点击GitHub首页右上角加号，点击New repository。    
把仓库的名字改成"*用户名*.github.io"。    

## 添加网页文件
在你想要的位置打开Git Bash    
键入'git clone https://github.com/*用户名*/*用户名*.github.io.git'    
键入'cd 用户名.github.io'    
在*用户名*.github.io文件夹里面放上你的网页文件。    
键入'git add --all'    
键入'git commit -m "Initial commit"'    

## 将本地网页文件上传至GitHub
键入'git push -u origin master"'    

## 完成
至此建站过程全部完成，访问username.github.io看看效果吧:D    
详见[GitHub Pages](https://pages.github.com)
