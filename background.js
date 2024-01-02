//Checks if the page was updated and finished loading to insert the Hide Jobs button on the page.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    runInsertButton()
  }
})

//Function to call the script to insert the hide jobs button on the jobs page.
function runInsertButton() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['insertButton.js']
    });
  }
  injectScript()
}

//Function to call the script that hides all the jobs.
function runHideLinkedInJobs() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['hideJobs.js']
    });
  }
  injectScript()
}

//Chrome messsage listener to listen for the command to hide the listed jobs.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {
        case "hideJobs":
          runHideLinkedInJobs()
          sendResponse({}); // sending back empty response to sender
        break;

      default:
    }
  }
);
