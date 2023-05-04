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

// makes new object for "PeanutButterMMCookie" passing name, ingredients, directions, ratings, and photo
let PeanutButterMMCookie = new Recipe("Peanut Butter M&M Cookie", "dst-pbmmc-ingredients.html", "dst-pbmmc-directions.html", "dst-pbmmc-ratings.html", "/recipeapp/images/peanutbuttercookies.jpg"); 

// makes new object for "MudPie" passing name, ingredients, directions, ratings, and photo
let MudPie = new Recipe("Mud Pie", "dst-mp-ingredients.html", "dst-mp-directions.html", "dst-mp-ratings.html", "/recipeapp/images/mudpie.jpg");

// makes new object for "ChocolateTrifle" passing name, ingredients, directions, ratings, and photo
let ChocolateTrifle = new Recipe("Chocolate Trifle", "dst-ct-ingredients.html", "dst-ct-directions.html", "dst-ct-ratings.html", "/recipeapp/images/choctrifle.jpg");

// makes new object for "StrawberryIceCream" passing name, ingredients, directions, ratings, and photo
let StrawberryIceCream = new Recipe("Strawberry Ice Cream", "dst-sic-ingredients.html", "dst-sic-directions.html", "dst-sic-ratings.html", "/recipeapp/images/strawberryicecream.jpg");

// makes new object for "ChocolateCoveredStrawberries" passing name, ingredients, directions, ratings, and photo
let ChocolateCoveredStrawberries = new Recipe("Chocolate-Covered Strawberries", "dst-ccs-ingredients.html", "dst-ccs-directions.html", "dst-ccs-ratings.html", "/recipeapp/images/chocstrawberrys.jpg");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {

    PeanutButterMMCookie.addToNav();
    
    MudPie.addToNav();
    
    ChocolateTrifle.addToNav();
    
    StrawberryIceCream.addToNav();
    
    ChocolateCoveredStrawberries.addToNav();
    
});