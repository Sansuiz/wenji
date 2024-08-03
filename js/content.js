$(function(){
    var $tableOfContents = $('#TableOfContents');
    if ($tableOfContents.length > 0) {
      var $rootElement = $(document.documentElement);
      var $asideBar = $('#aside-toc');
      var $collapsedTOC = $('#collapsed-toc');
      var $asideTOC = $asideBar.children('.content');
      $asideTOC.append($tableOfContents.children('ul').clone());
   
      var anchorPositions;
      var loadAnchorPositions = function () {
        anchorPositions = new Array();
        $('h1,h2,h3,h4,h5,h6').each(function () {
          if (!this.id) return;
          anchorPositions.unshift({id: this.id, top: this.offsetTop});
        });
      };
      loadAnchorPositions();
   
      $(window).scroll(function () {
        $(anchorPositions).each(function () {
          if (window.pageYOffset + 1 >= this.top) {
            $asideTOC.find('a').removeClass('active');
            $asideTOC.find('a[href="#' + this.id + '"]').addClass('active');
            return false;
          }
        });
      });
        
      $(window).resize(function () {
        loadAnchorPositions();
      });
   
      $asideBar.on('click', 'a', function () {
        $asideBar.removeClass('active');
        $rootElement.removeClass('is-clipped');
      });
   
      $collapsedTOC.children('a').click(function () {
        $rootElement.addClass('is-clipped');
        $asideBar.addClass('active');
        return false;
      });
      // end of toc processing
    }
  });