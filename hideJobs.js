
// --- Helper function for creating delays ---
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Helper Function to find the scrollable container ---
// Used primarily for scrolling to the top after page load.
function getScrollableContainer(isCollectionPage) {
  if (isCollectionPage) {
    const specificContainer = document.querySelector('.jobs-unified-list');
    if (specificContainer && specificContainer.scrollHeight > specificContainer.clientHeight) {
      // console.log("Using specific scroll container for collections");
      return specificContainer;
    }
  }
  // Default to window for scrolling to top
  // console.log("Using window for scrolling to top");
  return window;
}

// --- Function to navigate to the next page and scroll top ---
// MODIFIED: Does NOT re-trigger the hiding process automatically.
function clickNextPageAndScrollTop(isCollectionPage) {
  console.log("Attempting to navigate to the next page...");
  // Selector finds the <li> *after* the one marked active/selected, then finds the button inside it
  const nextButton = document.querySelector('li.artdeco-pagination__indicator.active.selected + li.artdeco-pagination__indicator button');

  if (nextButton) {
    console.log("Next page button found. Clicking...");
    nextButton.click();

    // Wait for the next page's content to likely load
    setTimeout(() => {
      console.log("Scrolling to top after page change...");
      const scrollableContainer = getScrollableContainer(isCollectionPage);
      if (scrollableContainer) {
         // Use window.scrollTo for the window object, otherwise use the element's scrollTo
         if (scrollableContainer === window) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
         } else if (typeof scrollableContainer.scrollTo === 'function') {
            scrollableContainer.scrollTo({ top: 0, behavior: 'smooth' });
         } else {
             console.error("Scrollable container found, but cannot scroll", scrollableContainer);
         }
      } else {
        console.warn("Scrollable container not found after page change. Cannot scroll to top.");
      }
      console.log("Next page loaded and scrolled to top. Ready for user action.");
      // --- LOOP PREVENTION: Removed the call to restart the hiding process ---

    }, 3000); // Wait 3 seconds - adjust if pages load slower/faster

  } else {
    console.log("No next page button found. Likely the last page.");
    // Optional: Notify the user
    alert("Finished hiding jobs on the current page. No next page found!");
  }
}


// --- Function to hide job listings on the search page ---
// MODIFIED: Added async/await and delay between clicks. Increased final delay.
async function hideSearchListings(isCollectionPage) { // Added async
  console.log("hideSearchListings called (manual trigger)");
  const jobListings = document.querySelectorAll('.scaffold-layout__list-item');
  let hiddenCount = 0;
  const clickDelay = 200; // Delay in milliseconds (e.g., 200ms = 0.2 seconds)

  if (jobListings.length === 0) {
    console.log("No job listings found on search page to hide.");
    // Still attempt to go to the next page if the user clicked hide on an empty page
    setTimeout(() => clickNextPageAndScrollTop(isCollectionPage), 500);
    return;
  }

  // Use for...of loop with await for delays
  for (const job of jobListings) {
    const buttonLocation = job.querySelector('.job-card-list__actions-container');
    if (buttonLocation) {
      const useElement = buttonLocation.querySelector('use');
      if (useElement) {
        const buttonType = useElement.getAttribute('href');
        if (buttonType === '#close-small' || buttonType === '#close-medium') {
          const hideButton = buttonLocation.querySelector('button[aria-label^="Dismiss"], .job-card-container__action');
          if (hideButton) {
            // console.log("Hiding a job from search");
            hideButton.click();
            hiddenCount++;
            await delay(clickDelay); // Wait before processing the next job
          }
        }
      }
    }
  } // End for...of loop

  console.log(`Finished hiding ${hiddenCount} jobs on current search page. Scheduling next page action.`);
  // Wait a longer moment after the *last* hide button click, then go to next page
  setTimeout(() => clickNextPageAndScrollTop(isCollectionPage), 1500); // *** INCREASED DELAY HERE ***
}

// --- Function to hide job listings on the collections page ---
// MODIFIED: Added async/await and delay between clicks. Increased final delay.
async function hideCollectionListings(isCollectionPage) { // Added async
  console.log("hideCollectionListings called (manual trigger)");
  const jobListings = document.querySelectorAll('.scaffold-layout__list-item');
  let hiddenCount = 0;
  const clickDelay = 200; // Delay in milliseconds (e.g., 200ms = 0.2 seconds)

  if (jobListings.length === 0) {
    console.log("No job listings found on collections page to hide.");
     // Still attempt to go to the next page if the user clicked hide on an empty page
    setTimeout(() => clickNextPageAndScrollTop(isCollectionPage), 500);
    return;
  }

  // Use for...of loop with await for delays
  for (const job of jobListings) {
    let hideButtonClicked = false;
    const hideButton = job.querySelector('button.job-card-container__action[aria-label^="Dismiss"]');
    if (hideButton) {
      // console.log("Hiding a job from collection");
      hideButton.click();
      hiddenCount++;
      hideButtonClicked = true;
    } else {
        const fallbackButtonLocation = job.querySelector('.job-card-list__actions-container');
         if (fallbackButtonLocation) {
             const fallbackHideButton = fallbackButtonLocation.querySelector('button[aria-label^="Dismiss"], .job-card-container__action');
             if(fallbackHideButton){
                // console.log("Hiding a job from collection (fallback)");
                fallbackHideButton.click();
                hiddenCount++;
                hideButtonClicked = true;
             }
         }
    }
    // If a button was clicked for this job, wait
    if (hideButtonClicked) {
        await delay(clickDelay); // Wait before processing the next job
    }
  } // End for...of loop

   console.log(`Finished hiding ${hiddenCount} jobs on current collection page. Scheduling next page action.`);
  // Wait a longer moment after the *last* hide button click, then go to next page
  setTimeout(() => clickNextPageAndScrollTop(isCollectionPage), 1500); // *** INCREASED DELAY HERE ***
}

// --- Initial Execution Logic ---
// MODIFIED: This function is now the entry point when the script is injected via background.js
// It determines the page type and calls the appropriate hiding function *once*.
function startHidingProcess() {
    console.log("LinkedIn Job Hider: Hiding process initiated by user.");
    let isCollectionPage = false; // Default to search page

    if (window.location.href.includes("linkedin.com/jobs/search/")) {
        console.log("Detected Job Search page.");
        isCollectionPage = false;
        // No need to await here, as the function itself handles delays internally
        hideSearchListings(isCollectionPage);
    } else if (window.location.href.includes("linkedin.com/jobs/collections/")) {
        console.log("Detected Job Collections page.");
        isCollectionPage = true;
        // No need to await here
        hideCollectionListings(isCollectionPage);
    } else {
        console.log("Not on a recognized LinkedIn Job Search or Collections page. Cannot hide.");
        alert("LinkedIn Job Hider: Not on a job search or collections page.");
    }
}

// --- Execute the hiding process ---
// This runs immediately when the script is injected.
startHidingProcess();
