---
layout: post
title: 用GitHub Pages创建网站
category: Category
tags: [tag1, tag2]
---

用GitHub Pages大概是建站最简单的方法了。

## 创建GitHub账户
https://github.com 不解释。    
*记住自己的username，有用。    

## 创建一个仓库
点击GitHub首页右上角加号，点击New repository。    
把仓库的名字改成"你的username.github.io"。    

## 添加网页文件
在你想要的位置打开Git Bash    
键入"git clone https://github.com/你的username/你的username.github.io.git"，Enter。    
键入"cd 你的username.github.io"，Enter。    
在username.github.io文件夹里面放上你的网页文件。    
键入"git add --all"，Enter。    
键入"git commit -m "Initial commit""，Enter。    

## 将本地网页文件上传至GitHub
键入"git push -u origin master"，Enter。    

## 至此建站全部完成，访问username.github.io看看效果吧:D    
