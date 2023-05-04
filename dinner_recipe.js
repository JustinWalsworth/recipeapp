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

// makes new object for "PrimeRib" passing name, ingredients, directions, and photo
let PrimeRib = new Recipe("Prime Rib", "din-pr-ingredients.html", "din-pr-directions.html", "din-pr-ratings.html", "https://www.bing.com/images/blob?bcid=s.BGtOoKXI4FyS6seN2aj-zL.OVU.....94");

// makes new object for "PanSearedSteak" passing name, ingredients, directions, and photo
let PanSearedSteak = new Recipe("Pan-Seared Steak", "din-pss-ingredients.html", "din-pss-directions.html", "din-pss-ratings.html", "https://www.bing.com/images/blob?bcid=szGbvjylZY4FyS6seN2aj-zL.OVU.....6M");

// makes new object for "PestoPasta" passing name, ingredients, directions, and photo
let PestoPasta = new Recipe("Pesto Pasta", "din-pp-ingredients.html", "din-pp-directions.html", "din-pp-ratings.html", "https://www.bing.com/images/blob?bcid=T8t3WJ11NY4FqxcxoNWLuD9SqbotqVTdPxM");

// makes new object for "RosemaryChickenFries" passing name, ingredients, directions, and photo
let RosemaryChickenFries = new Recipe("Crispy Rosemary Chicken and Fries", "din-crcf-ingredients.html", "din-crcf-directions.html", "din-crcf-ratings.html", "https://www.bing.com/images/blob?bcid=TySR-hayI44FqxcxoNWLuD9SqbotqVTdP1s");

// makes new object for "RoastedSausageVeggie" passing name, ingredients, directions, and photo
let RoastedSausageVeggie = new Recipe("Roasted Sausage and Vegetable Sheet", "din-rsvs-ingredients.html", "din-rsvs-directions.html", "din-rsvs-ratings.html", "https://www.bing.com/images/blob?bcid=TxLAYvNG6Y4FqxcxoNWLuD9SqbotqVTdP6k");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {

    PrimeRib.addToNav();
    
    PanSearedSteak.addToNav();
    
    PestoPasta.addToNav();
    
    RosemaryChickenFries.addToNav();
    
    RoastedSausageVeggie.addToNav();
});