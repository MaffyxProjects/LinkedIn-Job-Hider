 
// Helper functions
async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function injectScript(scriptFile) {
  const tab = await getActiveTab();
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [scriptFile]
  });
}

// Main functions
function runInsertButton() {
  injectScript('insertButton.js');
}



function runHideLinkedInJobs() {
  injectScript('hideJobs.js');
}

// Event listeners
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    runInsertButton();
   
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.directive) {
    case "hideJobs":
      runHideLinkedInJobs();
      break;
  }
});
