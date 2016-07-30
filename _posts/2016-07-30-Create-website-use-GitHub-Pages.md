---
layout: post
title: 用GitHub Pages创建网站
category: Tutorials
tags: [GitHub, Pages, Website]
---

最简单方便的免费建站方法。

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

## 完成
至此建站过程全部完成，访问username.github.io看看效果吧:D    
<div id="disqus_thread"></div>
<script>

var disqus_config = function () {
    this.page.url = "https://epilepsy-ydf.github.io/tutorials/2016/07/30/Create-website-use-GitHub-Pages.html";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = "create_website"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//epilepsy-ydf.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
