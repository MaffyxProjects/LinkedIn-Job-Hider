# LinkedIn Job Hider - Chrome Extension

Tired of seeing the same irrelevant or already-viewed jobs cluttering your LinkedIn job search results or collections? This Chrome extension helps you quickly clean up these pages by automating the process of 'dismissing' jobs you're not interested in.

## Why Use This?

*   **Save Time:** Instead of manually clicking "Dismiss" on dozens of jobs across multiple pages, do it with a single click per page (or let the extension run through pages automatically).
*   **Cleaner Feed:** Focus on new and relevant job opportunities by hiding those you've already decided against.
*   **Simple Interface:** Works via a convenient button added directly to the LinkedIn page or through the extension's popup.

## Features

*   **In-Page Button:** Adds a "Hide Jobs" button directly onto LinkedIn Job Search and Job Collections pages, usually near the pagination controls.
*   **Popup Button:** Provides a browser action popup button as an alternative way to trigger the hiding process.
*   **Automated Dismissal:** Programmatically clicks the "Dismiss" (X) button for each job listing currently visible on the page.
*   **Automatic Page Navigation:** After dismissing jobs on the current page, the extension automatically clicks the "Next" page button and scrolls to the top, ready for the next manual click if desired (or to continue if you modify it for full automation).
*   **Intelligent Delays:** Incorporates small delays between dismiss actions to mimic human interaction and improve reliability.
*   **Page Detection:** Works on both LinkedIn Job Search (`/jobs/search/`) and Job Collections (`/jobs/collections/`) pages.
*   **Clear Cache:** Option in the popup to clear locally stored data (if used by future features).

## How It Works

1.  **Button Injection:** When you load a LinkedIn Job Search or Collections page, the extension injects a script (`insertButton.js`) that adds the "Hide Jobs" button near the page navigation controls at the bottom of the list.
2.  **Triggering:** You click either the **in-page "Hide Jobs" button** or the **button in the extension popup**.
3.  **Hiding Script:** Clicking either button sends a message to the extension's background script, which then injects the main hiding logic (`hideJobs.js`) into the active LinkedIn tab.
4.  **Execution:** `hideJobs.js` identifies all job listings, finds the corresponding "Dismiss" button for each, and clicks them sequentially with short delays.
5.  **Next Page:** After attempting to dismiss all jobs on the current page, the script finds and clicks the "Next" page button in the pagination controls, then scrolls the page to the top.
6.  **Completion:** An alert message notifies you when the process finishes on the current page, especially if no "Next" page is found.

## Screenshots

### Extension Popup

**(popup.js)** - The button here triggers the hiding process manually if the button doesn't show.

![Extension Popup Example](https://github.com/MaffyxProjects/LinkedIn-Job-Hider/blob/main/images/Screenshot%202025-04-22%20151031.png?raw=true)

---

### In-Page "Hide Jobs" Button

**(insertButton.js)** - This button is added dynamically to the LinkedIn page.

![Injected Button Example](https://github.com/MaffyxProjects/LinkedIn-Job-Hider/blob/main/images/Screenshot%202025-04-22%20151021.png?raw=true)

## Installation

1.  Clone this repository or download the source code as a ZIP file and extract it.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **"Developer mode"** using the toggle switch in the top right corner.
4.  Click the **"Load unpacked"** button that appears.
5.  Select the folder where you extracted the extension's files.
6.  The "LinkedIn Job Hider" extension should now appear in your list of extensions and be active.

## Usage

1.  Navigate to a LinkedIn Job Search results page (e.g., `https://www.linkedin.com/jobs/search/`) or a Job Collections page (e.g., `https://www.linkedin.com/jobs/collections/`).
2.  Wait for the page and job listings to load fully.
3.  **Option 1 (In-Page):** Scroll down to find the **"Hide Jobs"** button added near the pagination controls (page numbers) at the bottom of the job list. Click it.
4.  **Option 2 (Popup):** Click the extension's icon in your browser toolbar to open the popup, then click the **"Hide Jobs on this Page"** button.
5.  The extension will begin dismissing the jobs listed on the current page.
6.  Once finished, it will automatically navigate to the next page (if available) and scroll to the top.
7.  Repeat the process by clicking the button again on the new page if you wish to continue hiding jobs.

## Important Notes & Limitations

*   **LinkedIn UI Changes:** LinkedIn frequently updates its website structure. These updates **will likely break** the extension's functionality over time (e.g., it might not find the job listings, dismiss buttons, or pagination). If the extension stops working, it probably needs its selectors updated to match LinkedIn's new code.
*   **Selectors:** The extension relies on specific CSS class names and HTML structure. Changes to these by LinkedIn will require code adjustments.
*   **Rate Limiting:** While delays are included, aggressive use *might* potentially trigger rate limiting or captchas from LinkedIn, although this is unlikely with the current setup. Use responsibly.

## Installation

1.  Clone this repository or download the source code as a ZIP file and extract it.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **"Developer mode"** using the toggle switch in the top right corner.
4.  Click the **"Load unpacked"** button that appears.
5.  Select the folder where you extracted the extension's files.
6.  The "LinkedIn Job Hider" extension should now appear in your list of extensions and be active.

## Usage

1.  Navigate to a LinkedIn Job Search results page (e.g., `https://www.linkedin.com/jobs/search/`) or a Job Collections page (e.g., `https://www.linkedin.com/jobs/collections/`).
2.  Wait for the page and job listings to load fully.
3.  **Option 1 (In-Page):** Scroll down to find the **"Hide Jobs"** button added near the pagination controls (page numbers) at the bottom of the job list. Click it.
4.  **Option 2 (Popup):** Click the extension's icon in your browser toolbar to open the popup, then click the **"Hide Jobs on this Page"** button.
5.  The extension will begin dismissing the jobs listed on the current page.
6.  Once finished, it will automatically navigate to the next page (if available) and scroll to the top.
7.  Repeat the process by clicking the button again on the new page if you wish to continue hiding jobs.

## Important Notes & Limitations

*   **LinkedIn UI Changes:** LinkedIn frequently updates its website structure. These updates **will likely break** the extension's functionality over time (e.g., it might not find the job listings, dismiss buttons, or pagination). If the extension stops working, it probably needs its selectors updated to match LinkedIn's new code.
*   **Selectors:** The extension relies on specific CSS class names and HTML structure. Changes to these by LinkedIn will require code adjustments.
*   **Rate Limiting:** While delays are included, aggressive use *might* potentially trigger rate limiting or captchas from LinkedIn, although this is unlikely with the current setup. Use responsibly.
