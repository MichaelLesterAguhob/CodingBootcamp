console.log("Hello World");

// Comments:
// Comments are parts of the code that gets ignored by the language
// Comments are meant to describe the written code

/*
    There are two types of comments:
        1. The single-line comment denoted by two slashes - //
        2. The multi-line comment denoted by a slash and asterisk 
*/
// Statements in programming are instructions that we tell the computer to perform
// JS statements usually end with semicolon (;)
// Semicolons are not required in JS, but we will use it to help us train to locate where a statement ends

console.log("I am a statement");

// A syntax in programming, it is the set of rules that describes how statements must be constructed
// All lines/blocks of code should be written in a specific manner to work. This is due to how these codes were initially programmed to function and perform in a certain manner

console.log('I am another statement');

console.log('and another statement ' );

console.
log
(
    'and the last statement'
);

// Whitespace (basically, spaces and line breaks) can impact functionality in many computer languages—but not in JavaScript.  In JavaScript, whitespace is used only for readability and has no functional impact.  One effect of this is that a single statement can span multiple lines.

let myVariable;
console.log(myVariable);

let hello;
console.log(hello);

/* 
	Guides in writing variables:
	    1. Use the 'let/const' keyword followed by the variable name of your choosing and use the assignment operator (=) to assign a value.
	    2. Variable names should start with a lowercase character, use camelCase for multiple words.
	    3. For constant variables, use the 'const' keyword.
	    4. Variable names should be indicative (or descriptive) of the value being stored to avoid confusion.
*/

let firstName = "Michael";
let pokemon = 25000;

let lastName = "Smith";
let LastName = "Smith";

// let frist name = "Mike";
let emailAddress = "mike@mail.com";
let email_address = "mike@mail.com";

// const let = "hello";

let productName = "Desktop Computer";
console.log(productName);

let productPrice = 18999;
console.log(productPrice);

let interest = 3.68;
console.log(interest);

/* 
	When to use JavaScript const? 
		As a general rule, always declare a variable with const unless you know that the value will change.

    Use const when you declare:
        - A new Array
        - A new Object
        - A new Function
*/

// 1. Boolean
// used to store values relating to the state of a certain data
let isMarried = false;
let inGoodConduct = true;
console.log(isMarried);
console.log(inGoodConduct);

// 2. Null - use for absence of a value
let spouse = null;
console.log(spouse);

// 3. Undefined
let label;
console.log(label);

// 4. Number
let myNumber = 7;
console.log(myNumber);

let myNegaNumber = -7;
console.log(myNegaNumber);

let grade = 97.8;
console.log(grade);

let planeDistance = 2e10;
console.log(planeDistance);

// 5. BigInt
const bigInteger = 9007199254740992n;
console.log(bigInteger);

// Strings
let myString = "";
let country = "Philippines";
let province = "Bulacan";
console.log(myString);
console.log(country);
console.log(province);

// 7. Arrays
let grades = [98, 92, 87, 89];
console.log(grades);

let random = [98, "Hi", false];
console.log(random);

// 8. Objects
let myGrades = {
    firstGrading: 98,
    secondGrading: 92,
    thirdGrading: 87,
    fourthGrading: 89
};
console.log(myGrades);