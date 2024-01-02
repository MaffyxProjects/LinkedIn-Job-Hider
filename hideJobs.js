//Function to click all of the hide job buttons on the page, and skips any hidden job so it doesn't unhide it.
if (document.readyState === 'complete') {
    if (window.location.href.indexOf("linkedin") != -1) {
        var jobBox = document.getElementsByClassName('jobs-search-results-list')
        jobBox[0].scroll({ top: jobBox[0].scrollHeight, behavior: "smooth"})
        var jobListings = jobBox[0].getElementsByClassName('scaffold-layout__list-container')
        var listing = jobListings[0].getElementsByClassName('ember-view   jobs-search-results__list-item occludable-update p0 relative scaffold-layout__list-item')
        var listingLength = listing.length        
        switch (document.readyState) {
            case "complete":
              setTimeout(() => {
                hideListings()
              }, 1500);  
              break;
          }
        //Hides current jobs on the page.
        function hideListings(){
            for(i=0;i<listingLength;i++){
                var job=listing[i]
                var buttonType = job.getElementsByTagName('svg')[0].getAttribute('class')
                if (buttonType=='artdeco-button__icon '){
                    var hideButton = job.getElementsByClassName('job-card-container__action artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view')[0]
                    if(hideButton!=undefined){
                        hideButton.click()
                    }
                }
                
            }
        }
    }
}