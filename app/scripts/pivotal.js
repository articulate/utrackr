/* exported attrs, Pivotal */
'use strict';

var Pivotal = ( function ($) {

  var base_url = 'https://www.pivotaltracker.com/services/v5';

  function postStory(story, success, error) {
    post('/projects/' + story.project_id + '/stories', story, success, error);
  }

   function displayTrackerApiResponse(stories) {
    console.log(stories);
   }

  function getProjects(success) {
    get('/projects', success);
  }

  function request(url, type, data, success, error) {

    getToken().then(function(token){
      $.ajax({
        url: base_url + url,
        data: data,
        type: type,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-TrackerToken', token);
        }
      }).done(function(resp){
        success(resp);
      }).fail(function(err){
        error(err);
      });
    });
  }

  function get(url, success, error) {
    request(url, 'GET', {}, success, error);
  }

  function post(url, data, success, error) {
    request(url, 'POST', data, success, error);
  }

  function getToken() {

    var deferred = $.Deferred();

    chrome.storage.local.get("trackr_token", function(d){

      if (d.trackr_token === undefined) {
        alert("Pivotal Tracker API Token must be set in the extension's options page.")
        return false;
      }

      deferred.resolve(d.trackr_token);
    });

    return deferred.promise();
  }

  return {
    projects: getProjects,
    postStory: postStory
  };

})(jQuery);