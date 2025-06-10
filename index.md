---
layout: default
title: Articles-SANSUIZ
---

<article>
<blockquote><p> 
It just takes some time.
</p></blockquote>
</article>

<p style="margin-top:1.2em;margin-bottom:0;"><b>Chinese</b> | Switch to <a href="/cn">中文</a></p>
<p style="margin-top:1.2em;margin-bottom:0;"><b>Articles</b> | Browse by <a href="/archive#tags">Tags</a></p>
<hr>
<table>
{% for post in site.categories.en %}
<tr id="blog-table">
<a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
<div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
</tr>
{% endfor %}
</table>
<hr>
<p>All posts <a href="/archive">archived</a></p>
<p>Learn more in <a href="/about">about</a></p>