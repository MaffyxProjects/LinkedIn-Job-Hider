//Adds listener to the popup button when it loads.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttonHide').addEventListener('click', hideJobs );
})//End loaded listener

//sends message to run the hide jobs script.
function hideJobs() {
  chrome.runtime.sendMessage({directive: "hideJobs"}, function(response) {});
  window.close()
}
