'use strict';

function save_options() {
 var token = document.getElementById('token').value;
  chrome.storage.local.set({
    trackr_token: token
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function clear_options() {
  chrome.storage.local.remove('trackr_token', function(){
    var status = document.getElementById('status');
    status.textContent = 'Options cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

chrome.storage.local.get('trackr_token', function(d){
  if (d.trackr_token !== undefined) {
    document.getElementById('token').value = d.trackr_token;
  }
});

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
