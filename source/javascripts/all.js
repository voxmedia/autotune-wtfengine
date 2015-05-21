//= require_tree .

$(function() {
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

  $(document).ready(function() {
    var pymChild = pym.Child();
    // Anytime you change the height of the graphic, do this:
    // pymChild.sendHeight();

    var set_heading = '';
    if (AUTOTUNE.heading){
      set_heading = AUTOTUNE.heading.split("\n");
    }

    var twitterHandle = AUTOTUNE.theme;
    switch (AUTOTUNE.theme){
      case 'vox':
        twitterHandle = 'voxdotcom'
        break;
      case 'theverge':
        twitterHandle = 'verge'
        break;
      default:
        break;
    }


    var data = {
      heading: set_heading,
      response: AUTOTUNE.response.split("\n"),
      template: AUTOTUNE.template.split("\n")
    };

    for (var prop in AUTOTUNE.word_bags) {
      data[prop] = AUTOTUNE.word_bags[prop].words;
    }

    FB_APP_ID = '249141081161';

    WTF.init(data, function() {
      $('#facebook').attr(
        'href',
        'https://www.facebook.com/sharer/sharer.php?' +
          'u=' + document.referrer +
          '&name=' + encodeURIComponent(AUTOTUNE.title)
          );
        /*
        'https://www.facebook.com/dialog/share?' +
          'display=popup' +
          '&app_id=' + FB_APP_ID +
          '&link=' + encodeURIComponent(AUTOTUNE.story_url || window.location.toString()) +
          '&name=' + encodeURIComponent(AUTOTUNE.title) +
          '&description=' + encodeURIComponent($('#output h2').text()) + 
          '&redirect_uri=' + encodeURIComponent(AUTOTUNE.story_url || window.location.toString())
          );
        */
      $('#twitter').attr(
        'href',
        'https://twitter.com/share?' +
          '&text=' + encodeURIComponent($('#output h2').text()) + 
          '&url=' + document.referrer +
          '&via=' + twitterHandle
          );
      pymChild.sendHeight();
    });

    $('.share a').click(openShareWindow);
  });
});
