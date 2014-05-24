'use strict';

$(function() {

  $('.fsi-details-wrapper').prepend('<a title="Send to Tracker" class="utracker" href="#"><img style="width:20px;height:20px;float:left;padding-top:3px;padding-right:5px;" src="http://andycroll.com/images/2013/pivotal-tracker-fluid-icon-2013.png"/></a>');

  $('.utracker').on( 'click', function() {

    var story = {
      name: $('.issue-summary').text(),
      description: document.location.href + '\n\n' + md($('.description .text')[0]),
      project_id: '958574',
      story_type: 'bug'
    };

    Pivotal.postStory(story, function(data) {
      $('.commentArea').val('Added to Tracker: ' + data.url);
      $('.addComment .submit-btn')[0].click();
    });

  });

});
