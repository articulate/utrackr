/* exported attrs, Pivotal */
'use strict';

var Pivotal = ( function ($) {

  var base_url = 'https://www.pivotaltracker.com/services/v5';

  function postStory(story, success, error) {
    post('/projects/' + story.project_id + '/stories', story, success, error);
  }

  function getProjects(success) {
    get('/projects', success);
  }

  function request(url, type, data, success, error) {
    getToken().then(function(resp){
      $.ajax({
        url: base_url + url,
        headers: { 'X-TrackerToken' : resp.api_token },
        data: data,
        type: type
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
    return $.ajax({
      url: base_url + '/me'
    });
  }

  return {
    projects: getProjects,
    postStory: postStory
  };

})(jQuery);