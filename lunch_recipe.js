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

// makes new object for "Hamburger" passing name, ingredients, directions, and photo
let Hamburger = new Recipe("Hamburger", "lun-hb-ingredients.html", "lun-hb-directions.html", "lun-hb-ratings.html", "https://www.bing.com/images/blob?bcid=s4vbvamOeY4FyS6seN2aj-zL.OVU.....6U");

// makes new object for "GrilledCheese" passing name, ingredients, directions, and photo
let GrilledCheese = new Recipe("Grilled Cheese Sandwich", "lun-gcs-ingredients.html", "lun-gcs-directions.html", "lun-gcs-ratings.html", "https://www.bing.com/images/blob?bcid=s6YkJhuw-Y4FyS6seN2aj-zL.OVU.....-w");

// makes new object for "CornDogs" passing name, ingredients, directions, and photo
let CornDogs = new Recipe("Corn Dogs", "lun-cd-ingredients.html", "lun-cd-directions.html", "lun-cd-ratings.html", "https://www.bing.com/images/blob?bcid=s-nie5G1ao4FyS6seN2aj-zL.OVU.....-Y");

// makes new object for "ReubenSandwich" passing name, ingredients, directions, and photo
let ReubenSandwich = new Recipe("Reuben Sandwich", "lun-rs-ingredients.html", "lun-rs-directions.html", "lun-rs-ratings.html", "https://www.bing.com/images/blob?bcid=T17vKUgY344FqxcxoNWLuD9SqbotqVTdP4I");

// makes new object for "CornDogs" passing name, ingredients, directions, and photo
let TomatoSoup = new Recipe("Tomato Soup", "lun-ts-ingredients.html", "lun-ts-directions.html", "lun-ts-ratings.html", "https://www.bing.com/images/blob?bcid=T5FZWXZZc44FqxcxoNWLuD9SqbotqVTdP8Y");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    Hamburger.addToNav();
    
    GrilledCheese.addToNav();
    
    CornDogs.addToNav();
    
    ReubenSandwich.addToNav();
    
    TomatoSoup.addToNav();
});