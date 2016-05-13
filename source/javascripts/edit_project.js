//= require pym
//= require _wtf

var proj_data;

$(function() {
  var pymChild = pym.Child(),
      FB_APP_ID = '249141081161';
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

  function loadGraphic(form_data){
    // load css file first
    var themeTag = document.getElementById('themecss');
    var themeFile = themeTag.getAttribute('href');
    themeTag.setAttribute('href',
      themeFile.replace(themeFile.match('[a-zA-Z0-9\-_]*.css$'), form_data.theme +'.css')
    );

    // handle custom color
    if(form_data.theme === 'custom'){
      $('#generate').css('background-color',form_data.customColor)
        .hover(function(){
          $(this).css('background-color',form_data.customColor);
        });
    } else {
      $('#generate').removeProp('style');
    }

    var set_heading = '';
    if (form_data.heading){
      set_heading = form_data.heading.split("\n");
    }

    var twitterHandle = AUTOTUNE.theme_data[form_data.theme].social.twitter_handle;

    var data = {
      heading: set_heading,
      response: form_data.response.split("\n"),
      template: form_data.template.split("\n")
    };

    for (var prop in form_data.word_bags) {
      data[prop] = form_data.word_bags[prop].words.replace(/\s*,\s*/g,',').split(',');
    }

    WTF.init(data, function() {
      $('#facebook').attr(
        'href',
        'https://www.facebook.com/sharer/sharer.php?' +
          'u=' + document.referrer +
          '&name=' + encodeURIComponent(AUTOTUNE.title)
          );
      $('#twitter').attr(
        'href',
        'https://twitter.com/share?' +
          '&text=' + encodeURIComponent($('#output h2').text()) +
          '&url=' + document.referrer +
          '&via=' + twitterHandle
          );
      pymChild.sendHeight();
    });
  }

  $('.share a').click(openShareWindow);

  $(window).on('load resize', function(){
    pymChild.sendHeight();
  });

  pymChild.onMessage('updateData', function(data) {
    console.log('----------- received message', data);
    data = JSON.parse(data);
    if(JSON.stringify(proj_data) !== JSON.stringify(data)){
      proj_data = data;
      loadGraphic(proj_data);
    }
  });

  $(document).ready(function() {
    // Anytime you change the height of the graphic, do this:
    // pymChild.sendHeight();
    if(window.location.hash === '#new'){
      loadGraphic(AUTOTUNE);
    }

    pymChild.sendMessage('childLoaded', 'ready');

  });
});
