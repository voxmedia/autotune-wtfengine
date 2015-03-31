//= require_tree .

$(function() {
  $(document).ready(function() {
    var pymChild = pym.Child();
    // Anytime you change the height of the graphic, do this:
    // pymChild.sendHeight();
    var data = {heading: AUTOTUNE.heading, response: AUTOTUNE.response, template: AUTOTUNE.template};

    for (var prop in AUTOTUNE.words) {
      data[prop] = AUTOTUNE[prop];
    }
    WTF.init(AUTOTUNE);
  });
});
