//= require_tree .

$(function() {
  $(document).ready(function() {
    var pymChild = pym.Child();
    // Anytime you change the height of the graphic, do this:
    // pymChild.sendHeight();
    var data = {heading: AUTOTUNE.heading, response: AUTOTUNE.response, template: AUTOTUNE.template};

    for (var prop in AUTOTUNE.word_bags) {
      data[prop] = AUTOTUNE.word_bags[prop].words;
    }
    WTF.init(data, function() {
      $('#facebook').attr(
        'href',
        'https://www.facebook.com/dialog/feed?display=popup' +
          '&app_id=' + FB_APP_ID +
          '&link=' + encodeURIComponent(AUTOTUNE.story_url || window.location.toString()) +
          '&name=' + encodeURIComponent(AUTOTUNE.title) +
          '&description=' + encodeURIComponent($('#output h2').text()));
      $('#twitter').attr(
        'href',
        'https://twitter.com/share?' +
          'url=' + encodeURIComponent(AUTOTUNE.story_url || window.location.toString()) +
          '&via=' + TWITTER +
          '&text=' + encodeURIComponent($('#output h2').text()));
      pymChild.sendHeight();
    });

    var openShareWindow = function (e) {
      var $link = $(this),
          width = 500,
          height = 300,
          left = (window.innerWidth / 2) - (width / 2),
          top = (window.innerHeight / 2) - (height / 2);

      if (e.which === 1 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        window.open(
          $link.attr('href'), "",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
        );
      }
    };

    $('.share a').click(openShareWindow);
  });
});
