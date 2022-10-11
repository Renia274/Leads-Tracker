//Our searches
let mySearches = []
//grabs buttons by their id 
const userInput = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const deleteButton = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("mySearches") )
const tabButton = document.getElementById("tab-btn")
const homeButton = document.getElementById("home-btn")
//grabs history list
const ulEl = document.getElementById("ul-el")

//if it is something to localStorage,render it
if (leadsFromLocalStorage) {
    mySearches = leadsFromLocalStorage
    render(mySearches)
}

//Go to homepage(www.google.com)
window.addEventListener('load', function() {
    let theAnchors = document.getElementsByClassName('clickme');
    for(i=0, len=theAnchors.length; i<len; i++) {
       theAnchors[i].addEventListener('click', function(Home) {
          chrome.tabs.create({url: this.href});
       }, false);
    }
 }, false);

 //capture url from current tab
tabButton.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        mySearches.push(tabs[0].url)
        localStorage.setItem("mySearches", JSON.stringify(mySearches) )
        render(mySearches)
    })
})
//makes a history list of our searches 
function render(urls) {
    let listItems = ""
    for (let i = 0; i < urls.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${urls[i]}'>
                    ${urls[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
//delete localStorage history
deleteButton.addEventListener("dblclick", function() {
    localStorage.clear()
    mySearches = []
    render(mySearches)
})
//input urls to localStorage
inputButton.addEventListener("click", function() {
    mySearches.push(userInput.value)
    userInput.value = ""
    localStorage.setItem("mySearches", JSON.stringify(mySearches) )
    render(mySearches)
})

