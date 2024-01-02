//function to insert the Hide Jobs button on the LinkedIn Jobs page at the bottom near the page numbers.
if (document.readyState === 'complete') {
    if (window.location.href.indexOf("https://www.linkedin.com/jobs/search/") != -1) {
 
    //Creates the HTML to add the button to the page.
    var bigBox = document.getElementsByClassName("global-footer-compact")
    var newChild= document.createElement('div')
    newChild.setAttribute("id", "hideButtonDiv");
    newChild.setAttribute("style", "text-align: center");
    newChild.innerHTML='<button class="jobs-save-button artdeco-button artdeco-button--3 artdeco-button--secondary" id="hideButton">Hide Jobs</button>'

    //Inserts the hide jobs button on the page
    if (document.getElementById('hideButtonDiv') == null && bigBox !=null){
        bigBox[0].prepend(newChild)
        document.getElementById('hideButton').addEventListener('click', hideJobs );
    }
    //Sends message to call the function to hide the jobs.
    function hideJobs() {
      chrome.runtime.sendMessage({directive: "hideJobs"}, function(response) {});
    }

    }
}