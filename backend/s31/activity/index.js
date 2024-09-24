console.log("Hello World");

// Create an object using object literals
let trainer = {
    name: "Ash Ketchum",
    age: 18,
    pokemon: ['Pikachu', 'Charizard', 'Squirtle', 'Bulbasaur'],
    friends: {},
    talk: function () {
    
    }
}

// Initialize/add the object properties and methods


// Properties


// Methods
trainer.talk();

// Check if all properties and methods were properly added
console.log(trainer);

// Access object properties using dot notation
console.log("Result of dot notation: ");
console.log(trainer.name);

// Access object properties using square bracket notation

console.log('Result of square bracket notation: ');
console.log(trainer['pokemon']);
// Access the trainer "talk" method
trainer.talk = function() {
    console.log("Pikachu! I choose you!");
}
trainer.talk();


// Create a constructor function for creating a pokemon
function Pokemon(name, level) {
	// Properties
	this.name = name;
	this.level = level;
	this.health = level * 2;
	this.attack = level;
	this.skills = ['Tackle'];

	// Methods
	// Will accept an object as a target and the skill to be used
	this.useSkill = function(target, skill) {
		console.log(this.name + " used " + skill + "!");
		target.health -= this.attack;
		
		if(target.health <= 0)
		{
			this.faint(target);
		}else {
			console.log(target.name + "\'s health is now reduced to " + target.health);
			console.log(target);
		}
	}

	// Method is invoked in the tackle method
	this.faint = function(target) {
		console.log(target.name + ' fainted.')
	}
}
// Create/instantiate a new pokemon
let pikachu = new Pokemon("Pikachu", 12);
console.log(pikachu);

// Create/instantiate a new pokemon
let geodude = new Pokemon("Geodude", 8);
console.log(geodude);

// Create/instantiate a new pokemon
let mewtwo  = new Pokemon("Mewtwo", 50);
console.log(mewtwo);

// Create/instantiate a new pokemon
let pidgey = new Pokemon("Pidgey", 50);
console.log(pidgey);

// Invoke the useSkill method and target a different object
geodude.useSkill(pikachu, geodude.skills[0]);

// Invoke the useSkill method and target a different object
mewtwo.useSkill(geodude, mewtwo.skills[0]);


// create catch method to catch pokemon with <= 10 health
trainer.catchPokemon(pidgey);

Object.prototype.catchPokemon = function(pokemon) {
    if (pokemon.health <=10) {
        this.pokemon.push(pokemon);

        console.log(this.name + ' Success! you caught ' + pokemon.name);

    } else {
        console.log(pokemon.name + "ran away!")
    }
}

Object.prototype.catchPokemon = function(newSkill) {
    if (!this.skills) this.skills = [];
    if (!this.skills.includes(newSkill)) {
        this.skills.push(newSkill);
        console.log(this.name + " learned " + newSkill);
    } else {
        console.log(this.name + " already knows " + newSkill);
    }
}

// add a method inside the Pokemon that will allow the pokemon to add/replace skills array



//<<<<<<<<<<<<<<<<<<<<[MEMBER 4 - Evolve method]>>>>>>>>>>>>>>>>>>>>>>
// add method that will allow a pokemon to evolve. this will change the name of the pokemon as well as the attack value
Pokemon.prototype.evolve = function (newName, newAttack, newType, newSkill) {
	console.log(this.name + ' is about to evolve!'); 

	this.name = newName;
	this.attack = newAttack;
	
	if (!this.type.includes(newType)) {
		this.type.push(newType);
	}

	this.addSkill (newSkill);
	return this;
};

// test evolution
pikachu = new Pokemon("Pikachu", "Electric", 35, 15); 
pikachu.addSkill("Thunderbolt");

let evolvedPikachu = pikachu.evolve("Raichu", 20, "Electric", "Thunder Punch");
console.log(evolvedPikachu);

// create NPC object using object Literals 

const NPC = {
	name: "Brock", 
	pokemon: "Onix"
}; 

Object.freeze(NPC);

// test freeze object
NPC.name = "Misty";
console.log(NPC);
//<<<<<<<<<<<<<<<<<<<<[MEMBER 4 - END]>>>>>>>>>>>>>>>>>>>>>>




/* 

    Debug the following code to allow the functions to properly receive and return the correct values and mimic the output.

    - Check syntax of the following code.
    - Check if the correct value is returned.
    - Check the parameters and arguments.
    - Check the if else statements
    - Check the loop statements
    - Check if the array methods used are correct.
	- Check if the objects are being accessed properly.

*/




let books = [
	{
		id: 1,
		title: "The Lord of the Rings",
		author: "J.R.R. Tolkien",
	},
	{
		id: 2,
		title: "The Hobbit",
		author: "J.R.R. Tolkien",
	},
	{
		id: 3,
		title: "Dune",
		author: "Frank Herbert",
	},
	{
		id: 4,
		title: "Harry Potter and The Socerer's Stone",
		author: "J.K. Rowling",
	},
	{
		id: 5,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
	}
  ];
  
  function findBookByTitle(title) {

	if(books.length === 0) {
		return "Error: No books in database.";
	}

	if (typeof title !== 'string') {
		return "Error: Title must be a string.";
	}
  
	if (title === '') {
		return "Error: Title cannot be empty.";
	}
  
	let bookFound = books.filter(book => book.title === title);

	if (bookFound.length > 0) {
	  return bookFound[0];
	} else {
	  return "Book not found."
	}

  }
  
  let ifTitleNotString = findBookByTitle(5);
  console.log("Message if the title given is not a string:");
  console.log(ifTitleNotString);

  let ifTitleIsEmpty = findBookByTitle('');
  console.log("Message if the title given is empty:");
  console.log(ifTitleIsEmpty);

  let book = findBookByTitle("The Lord of the Rings");
  console.log("Book found:");
  console.log(book);

  function findBooksByAuthor(author){

	if(books.length === 0) {
		return "Error: No books in database.";
	}

	if (typeof author !== 'string') {
		return "Error: Author must be a string.";
	}
  
	if (author === '') {
		return "Error: Author cannot be empty.";
	}
  
	let booksFound = books.filter(book => book.author === author);

	if (booksFound.length > 0) {
	  return booksFound;
	} else {
	  return "Books not found."
	}

  }

  let ifAuthorNotString = findBooksByAuthor(5);
  console.log("Message if the author given is not a string:");
  console.log(ifAuthorNotString);

  let ifAuthorIsEmpty = findBooksByAuthor('');
  console.log("Message if the author given is empty:");
  console.log(ifAuthorIsEmpty);

  let booksByAuthor = findBooksByAuthor("J.R.R. Tolkien");
  console.log('Books Found:')
  console.log(booksByAuthor);


//Do not modify
//For exporting to test.js
try{
    module.exports = {

        trainer: typeof trainer !== 'undefined' ? trainer : null,
        Pokemon: typeof Pokemon !== 'undefined' ? Pokemon : null,
        NPC: typeof NPC !== 'undefined' ? NPC : null

    }
} catch(err){


}

