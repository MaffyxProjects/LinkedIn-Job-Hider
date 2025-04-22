//Adds listener to the popup button when it loads.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttonHide').addEventListener('click', hideJobs );
  // document.getElementById('buttonSave').addEventListener('click', saveCompanyTest );
  var clearCacheButton = document.getElementById('clearCache');
  clearCacheButton.addEventListener('click', function() {
    chrome.storage.local.remove(['savedCompanies', 'lastSavedCompany'], function() {
      console.log('Local cache cleared');
      alert('Saved companies have been cleared!');
    });
  });
})//End loaded listener

//sends message to run the hide jobs script.
function hideJobs() {
  chrome.runtime.sendMessage({directive: "hideJobs"}, function(response) {});
  window.close()
}

function saveCompanyTest() {
  chrome.runtime.sendMessage({directive: "insertButtonTest"}, function(response) {});
  console.log("Sending insert button command to background.")
  // window.close()
}

