---
layout: default
title: Articles-SANSUIZ
---

<article>
<blockquote><p> 
It just takes some time.
</p></blockquote>
</article>

<p style="margin-top:1.2em;margin-bottom:0;"><b>Articles</b> | Browse by <a href="/wenji/archive#tags">Tags</a></p>
<hr>
<table>
{% for post in site.categories.en %}
<tr id="blog-table">
<td>{{ post.date | date: "%Y-%m-%d" }}</td>
<td><a class="post-list-item" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></td>
</tr>
{% endfor %}
</table>
<hr>
<p>All posts <a href="/wenji/archive">archived</a></p>
