---
layout: default
title: Archive (Chinese Posts Included)
permalink: /archive/
---

### Archive (Chinese Posts Included)

---

{% for tag in site.tags %}<block class="blog-tag"><a href="#{{ tag | first }}">{{ tag | first }} </a></block>{% endfor %}
{% for post in site.posts  %}{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture this_month %}{{ post.date | date: "%m" }}{% endcapture %}
{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
{% capture next_month %}{{ post.previous.date | date: "%m" }}{% endcapture %}
{% if forloop.first %}<legend id="{{this_year}}">{{this_year}}</legend><ul>{% endif %}
<div>
  <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  <a class="post-list-item" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
</div>
{% if forloop.last %}</ul>{% else %}{% if this_year != next_year %}</ul><legend id="{{next_year}}">{{next_year}}</legend><ul>{% endif %}{% endif %}
{% endfor %} 
<h3 id="tags">Tags</h3>
<p>{% for tag in site.tags %}<block class="blog-tag"><a href="#{{ tag | first }}">{{ tag | first }} <span class="tag-count">{{ tag[1] | size }}</span></a></block>{% endfor %}</p>
{% for tag in site.tags %}
<div>
<legend id="{{ tag | first }}">{{ tag | first }}</legend>
<ul>{% for posts in tag  %}{% for post in posts %}{% if post.url %}
<div>
  <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  <a class="post-list-item" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
</div>
{% endif %}{% endfor %}{% endfor %}</ul>
</div>
{% endfor %}
