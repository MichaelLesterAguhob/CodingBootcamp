console.log("Hello World!");

// Manipulating Arrays with Array Methods
/*
	Javascript has built-in functions and methods for arrays. This allows us to manipulate and access array items.

	There are three kinds of JS array methods - Non-mutators - Iterators - Mutators

	Non-Mutator Methods

	Non-Mutator Methods allows us to manage and perform tasks on an array without updating the contents of the original array

	Iterator Methods

	Iterator Methods allows us to loop over elements/items in an array and perform tasks with them

	Mutator Methods

	Mutator Methods are built in JS array methods that mutate or change an array after they're created

	These methods manipulate the original array performing various tasks such as adding and removing elements

*/

let fruits = ['Apple', 'Orange', 'Kiwi', 'Dragon Fruit'];
console.log(fruits);
console.log(fruits.length);

// push()
// Adds an element in the end of an array AND returns the array's length
console.log('Current Array:');
console.log(fruits);
let fruitsLength = fruits.push('Mango');
console.log(fruitsLength);
console.log("Mutated array from push method:");
console.log(fruits);

// Add multiple elements to an array
fruits.push('Avocado', 'Guava');
console.log("Mutated array from push method:");
console.log(fruits);

// Mini-activity
function addFruit(fruit){
	fruits.push(fruit);
}

addFruit("Pineapple");
console.log(fruits);

// pop()
// Removes the last element in an array AND returns the removed element
let removedFruit = fruits.pop();
console.log(removedFruit);
console.log("Mutated array from pop method:");
console.log(fruits);

function removeFruit(){
	// remove the last item in the array
	fruits.pop();
}

removeFruit();
console.log(fruits);


// unshift()
// adds one or more elements at the beginning of an array and returns the length
fruits.unshift('Lime', 'Banana');
console.log("Mutated array from unshift method:");
console.log(fruits);

function unshiftFruit(fruit){
	fruits.unshift(fruit);
}

unshiftFruit("Calamansi");
console.log(fruits);

// shift()
// removes an element at the beginning of an array AND returns the removed element

let anotherFruit = fruits.shift();
console.log(anotherFruit);
console.log("Mutated array from shift method:");
console.log(fruits);

function shiftFruit(){
	// Remove an item at the front of the array
	fruits.shift();
}

shiftFruit();
console.log(fruits);

// splice()
// simultaenously removes elements from a specified index number and adds elements
fruits.splice(1, 2, 'Lime', 'Cherry');
console.log("Mutated array from splice method:");
console.log(fruits);
// You can also use splice to just remove an element at a specific index
// fruits.splice(1, 2);
// console.log(fruits);

function spliceFruit(index, deleteCount, fruit){
	fruits.splice(index,deleteCount,fruit);
}

spliceFruit(1, 1, "Avocado");
console.log(fruits);
spliceFruit(2, 1, "Durian");
console.log(fruits);


// sort()
// Rearranges the array in an alphanumeric order
fruits.sort();
console.log('Mutated array from sort method: ');
console.log(fruits);

// Mini-Activity
/*
	
Activity: Manage a Grocery List
Objective: Use array methods to manipulate a grocery list.

Instructions:

Create Your Grocery List:
Start with an empty array to represent your grocery list. Think about how you'll initialize it.

Add Items to Your List:
Choose a few items you'd like to add to your grocery list. Use a method to insert these items at the end of your array.

Remove the First Item:
Consider what it means to remove the first item from your list. Use a method to achieve this, and think about how you might store the removed item for later reference.

Add a Last-Minute Item:
Imagine a scenario where you remember something else you need. Use a method to add this new item to the end of your list.

Remove the Last Item:
Now, think about needing to adjust your list again. Use a method to remove the last item. Store this removed item as well.
Review Your Final List:

Print out the remaining items in your grocery list. Reflect on how the list changed with each operation.

*/

let groceryList = [];

groceryList.push("Food","Soap","Oil","Vegetables");
console.log(groceryList);

let removedBegItem = groceryList.shift();
console.log(groceryList);

groceryList.push("Snacks");
console.log(groceryList);

let removedEndItem = groceryList.pop();
console.log(groceryList);


