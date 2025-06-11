$(document).ready(function() {
  // 生成目录
  var toc = '';
  $('article h2, article h3').each(function() {
    var id = $(this).text().toLowerCase().replace(/[^\w]+/g, '-');
    $(this).attr('id', id);
    toc += '<a href="#' + id + '">' + $(this).text() + '</a>';
  });
  $('#toc').html(toc);

  // 跟随滚动
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 200) {
      $('.content-index').addClass('moving');
    } else {
      $('.content-index').removeClass('moving');
    }
  });
});