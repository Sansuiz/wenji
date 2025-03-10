---
layout: cndefault
title: 归档 (含英文博客)
permalink: /cnarchive/
---

### 归档 (含英文博客)

---

标签: {% for tag in site.tags %}<block class="blog-tag"><a href="#{{ tag | first }}">{{ tag | first }} </a></block>{% endfor %}
{% for post in site.posts  %}{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture this_month %}{{ post.date | date: "%m" }}{% endcapture %}
{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
{% capture next_month %}{{ post.previous.date | date: "%m" }}{% endcapture %}
{% if forloop.first %}<legend id="{{this_year}}">{{this_year}}</legend><ul>{% endif %}
<p><span>{{ post.date | date: "%Y-%m-%d" }}</span> <a class="pjaxlink" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></p>
{% if forloop.last %}</ul>{% else %}{% if this_year != next_year %}</ul><legend id="{{next_year}}">{{next_year}}</legend><ul>{% endif %}{% endif %}
{% endfor %} 
<h3 id="tags">标签</h3>
<p>{% for tag in site.tags %}<block class="blog-tag"><a href="#{{ tag | first }}">{{ tag | first }} </a></block>{% endfor %}</p>
{% for tag in site.tags %}
  <div>
	<legend id="{{ tag | first }}">{{ tag | first }}</legend>
	<ul>{% for posts in tag  %}{% for post in posts %}{% if post.url %}
  <p><span>{{ post.date | date: "%Y-%m-%d" }}</span> <a class="pjaxlink" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></p>
  {% endif %}{% endfor %}{% endfor %}</ul>
  </div>
{% endfor %}

<!-- 添加年份分组结构 -->
<div class="year-filter">
{% assign years = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
{% for year in years %}
  <details class="year-group">
    <summary>{{ year.name }}</summary>
    
    <!-- 添加月份筛选 -->
    <div class="month-filter">
    {% assign months = year.items | group_by_exp: 'post', 'post.date | date: "%m"' %}
    {% for month in months %}
      <button data-month="{{ month.name }}">{{ month.name }}月</button>
    {% endfor %}
    </div>

    <!-- 文章列表 -->
    <ul class="post-list">
    {% for post in year.items %}
      <li data-month="{{ post.date | date: '%m' }}">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <a class="pjaxlink" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
    </ul>
  </details>
{% endfor %}
</div>

<!-- 添加交互脚本 -->
<script>
document.querySelectorAll('.month-filter button').forEach(btn => {
  btn.addEventListener('click', () => {
    const month = btn.dataset.month;
    document.querySelectorAll(`.post-list li`).forEach(li => {
      li.style.display = li.dataset.month === month ? '' : 'none';
    });
  });
});
</script>
