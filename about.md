---
layout: page
title: 关于我
menu: about

css: ['about.css', 'sidebar-popular-repo.css']
---

<div class="about row">

    <div class="col-md-8">

        <h2>关于我</h2>

        <p>我可不能让你知道的太多[笑]</p>

        <h2>联系我</h2>

        <ul>
            <li>Email：<a href="mailto:{{ site.email }}" target="_top">{{ site.email }}</a></li>
            <li>Website：<a href="{{ site.github_url }}">{{ site.github_url }}</a></li>
        </ul>

    </div>

    <div class="col-md-4">
        {% include sidebar-popular-repo.html %}
    </div>

</div>