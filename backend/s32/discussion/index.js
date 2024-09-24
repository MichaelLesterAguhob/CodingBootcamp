console.log('Happy Tuesday!');

// [SECTION] Exponent Operator

// old operator using ** to denote power of
const firstNum = 8 ** 2;
console.log(firstNum);

// pow() method means power
const secondNum = Math.pow(8, 2);
console.log(secondNum);

// Note: you can find more math methods through this link(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

// [SECTION] Template Literals
/*
	- allows us to write strings without using the concatenation(+) operator
	- helps with code readability
*/
let name = "Hillary";

// Pre-Template Literals
// uses single quotes('') or double quotes("")
let message = "Hello " + name + "! Welcome to programming!";
console.log("Message without template literals: " + message);

// String Template Literals
// uses backticks(``)
// ${} are used to include javascript expression
message = `Hello ${name}! Welcome to programming!`;
console.log(`Message with template literals: ${message}`);

// Multi-line string using template literals
const anotherMessage = `
${name} attended a math competition.
She won it by solving the problem 8 x 2 with the solution of ${firstNum}
`;
console.log(anotherMessage);

const interestRate = .15;
const principal = 1000;

/*
	- template literals allows us to write string with embedded javascript expressions
	- expressions are any valid unit of code that resoves to a value
*/
console.log(`The interest on your savings account is: ${principal * interestRate}`);

// [SECTION] Array Destructuring
/*
	- allows us to unpack elements in arrays into distinct variables
	- allows us to name array elements with variables instead of using index numbers
	- helps with code readibility
*/

// Pre-Array Destructuring
const fullName = ["Juan", "Dela", "Cruz"];

console.log(fullName[0]);
console.log(fullName[1]);
console.log(fullName[2]);

console.log(`Hello ${fullName[0]} ${fullName[1]} ${fullName[2]}! It's nice to meet you.`);

// Array Destructuring
/*
	const firstName = fullName[0] = "Juan"
	const middleName = fullName[1] = "Dela"
	const lastName = fullName[2] = "Cruz"
*/
// with the variable names, the order matters
// if you do not ant to add a specific variable name for an element, you can leave it blank
const [firstName, middleName, lastName] = fullName;

console.log(firstName);
console.log(middleName);
console.log(lastName);

console.log(`Hello ${firstName} ${middleName} ${lastName}! It's nice to meet you.`);

// [SECTION] Arrow Functions
/*
	- compact aletrnative syntax to traditional function
	- useful for creating code snippets where functions will not be resused in any other portion of the code
	- adhere to the D.R.Y. principle hwre there's no longer need to create a function and think of a name for functions that will be used in certain code snippets
*/

// Traditional Function and Pre-Template Literals
function printFullName(fName, mName, lName) {
	console.log(fName + " " + mName + " " + lName);
}

printFullName("John", "D", "Smith");

// Arrow Function and Template Literals
// => - arrow function
const displayFullName = (givenName, middleInitial, familyName) => {
	console.log(`${givenName} ${middleInitial} ${familyName}`);
}

displayFullName("Jane", "D", "Smith");

// [SECTION] Implicit Return Statement
/*
	- there are instances when you can omit the "return" statement
	- This works because even without the "return" statement JavaScript implicitly adds it for the result of the function
*/

// arrow function without implicit return statement
const add = (x, y) => {
	return x + y;
}

let total1 = add(2,5);
console.log(total1);

// arrow function with implicit return statement
// it only works if you have one expression to return
const sum = (x, y) => /*return*/ x + y;

let total2 = sum(3,9);
console.log(total2);

// [SECTION] Class-Based Object Blueprints
/*
	- allows creation/instatntiation of objects using classes as blueprints
*/

// creating a class
class Car {
	/*
		- the constructor is a special method of a class for creating/initializing an object for that class
		- The "this" keyword refers to the properties of an object created/initialized from the class
		- By using the "this" keyword and accessing an object's property, this allows us to reassign it's values
		- Syntax
			class className {
				constructor(objectPropertyA, objectPropertyB) {
					this.objectPropertyA = objectPropertyA;
					this.objectPropertyB = objectPropertyB;
				}
			}
	*/
	constructor(brand, name, year) {
		this.brand = brand;
		this.name = name;
		this.year = year;
	}
}

// instantianing an object
/*
	- The "new" operator creates/instantiates a new object with the given arguments as the values of it's properties
	- No arguments provided will create an object without any values assigned to it's properties
	- let/const variableName = new ClassName();
	- Creating a constant with the "const" keyword and assigning it a value of an object makes it so we can't re-assign it with another data type
	- It does not mean that it's properties cannot be changed/immutable
*/
let myCar = new Car();

console.log(myCar);

myCar.brand = "Ford";
myCar.name = "Ranger Raptor";
myCar.year = 2021;

console.log(myCar);

// creating/instantiating a new object from the class Car with initialized values
const myNewCar = new Car("Toyota", "Vios", 2022);

console.log(myNewCar);

// [SECTION] ES14 Updates

// toSorted() method
/*
	- it allows you to sort an array by returning a new array instead of updating the original array
*/
let array = [1,2,4,3,5];

// this allows us to sort an array with modifying the original array
let sortedArray = array.toSorted();

console.log("Original Array:");
console.log(array);
console.log("Sorted Array:");
console.log(sortedArray);

// this modifies the original array
array.sort();
console.log("Original Array");
console.log(array);

// findLast() method
/*
	- allows us to find the last occurence of an element in an array
*/
let arrayNumbers = [15,2,8,6,24,23];

let lastEvenNumber = arrayNumbers.findLast(number => {
	// console.log(number);

	return number % 2 === 0;
});

console.log(lastEvenNumber);

// toSpliced() method
/*
	- it allows us to create an updated new array by removing and adding elements
	- Syntax:
		array.toSpliced(startIndex, deleteCount, …items)
			- startIndex is the index of the first element to be removed.
			- deleteCount is the number of elements to be removed.
*/
let songsList = ["Uhaw", "Raining in Manila", "Ere", "Jopay"];

// this allows us to create a new array without modifying the original array
let updatedSongsList = songsList.toSpliced(2,1,"Buloy");

console.log("Original Array:");
console.log(songsList);

console.log("Updated Array:");
console.log(updatedSongsList);

// this modifies the original array
songsList.splice(2, 1,"Binhi");
console.log("Original Array:");
console.log(songsList);