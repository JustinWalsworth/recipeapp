// function to load text from another file into an ID
function loadFileInto(fromFile, whereTo) {
    
    //initiate the fetch promise
    let remoteData = fetch(fromFile)
        .then( function(response) {
            // if OK, convert response into text, otherwise trigger the Promis error
            if (response.ok) return response.text();
            else return Promise.reject(response); // trigger error
        } )
        .then( function(responseResult) {
            // update the page
            document.querySelector(whereTo).innerHTML = responseResult;
        } )
        .catch( function(error){
            // report any errors
            console.log("Error:", error);
        } );
}


// define a Recipe object constructor
function Recipe(a, b, c, d, e) {
    
    // set some object properties
    this.name = a;
    this.ingredientsFile = b; // file name to the HTML snippet containing this recipe's ingredients list
    this.directionsFile = c; // file name to the HTML snippet containing this recipe's directions list
    this.ratingsFile = d; // file name to the HTML snippet containg this recipe's ratings list
    this.imageSource = e; // URL or file name to the recipe photo

    // update the display with the content for this recipe
    this.display = function() {
        document.querySelector("#img_text h1").innerHTML = this.name;
        loadFileInto(this.ingredientsFile, '#ingredients');
        loadFileInto(this.directionsFile, '#directions');
        loadFileInto(this.ratingsFile, '#ratings');
        document.querySelector("#img_text").style.backgroundImage = "url(" + this.imageSource + ")";
        document.title = "Recipe: " + this.name;
    } // end of .display() method
    
    // add this recipe to the #navbar ul as a new li that is clickable
    this.addToNav = function() {
        
        // create a new element for the navbar
        let newNavLI = document.createElement("li");
        newNavLI.innerHTML = this.name;
        document.querySelector("#navbar ul").appendChild(newNavLI);
        
        // preserve recipe self "this" in a different variable to use within the event listener
        let recipeSelf = this;
        newNavLI.addEventListener("click", function() {
            recipeSelf.display();
        })
    } // end of .addToNav() method
    
} // end Recipe() object constructor

// makes new object for "WholeWheatPancakes" passing name, ingredients, directions, and photo

/*
let WholeWheatPancakes = new Recipe("Whole Wheat Pancakes", "wwp-ingredients.html", "wwp-directions.html", "wwp-ratings.html", "https://th.bing.com/th/id/OIP.l37g2LLszZiDA7ogLiSLHwHaEK?pid=ImgDet&rs=1"); 

// makes new object for "ChocolateCerealBars" passing name, ingredients, directions, and photo
let ChocolateCerealBars = new Recipe("Chocolate Cereal Bars", "ccb-ingredients.html", "ccb-directions.html", "ccb-ratings.html", "https://th.bing.com/th/id/OIP.mroULhuLklE-MCZEIOByaQAAAA?pid=ImgDet&rs=1");

// makes new object for "CrispyHashBrowns" passing name, ingredients, directions, and photo
let CrispyHashBrowns = new Recipe("Crispy Hash Browns", "hchb-ingredients.html", "hchb-directions.html", "hchb-ratings.html", "https://1.bp.blogspot.com/-T_2oOxbUNpw/UhGhBztqWEI/AAAAAAAAAkk/FcgpRVDnCO8/s1600/hashbrown.jpg");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {

    WholeWheatPancakes.addToNav();
    
    ChocolateCerealBars.addToNav();
    
    CrispyHashBrowns.addToNav();
    
});

*/