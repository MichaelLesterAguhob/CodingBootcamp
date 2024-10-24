// Question #1: Create a program to check if a given string is a palindrome or not. 
// Add validation, if the argument is not a string, return undefined. 
// Palindrome words should be 3 characters and up.

function isPalindrome(string) {
    if(typeof string !== 'string') {
        return undefined;
    }
    if(string.length < 3) {
        return undefined;
    }
    let word = string.toLowerCase().replace(/\s+/g, '');
    let reversedWord = word.split('').reverse().join('');

    if(word == reversedWord) {
        // return `${string} is Palindrome`;
        return true;
    } else {
        // return `${string} is Not Palindrome`;
        return false;
    }
}

// Question #2: Create a program that checks an isogram. 
// An isogram is a word where there are no repeating letters.
// The function should disregard text casing before doing anything else.
// If the function finds a repeating letter, return false. Otherwise, return true.


function isIsogram(text) {
    const word = text.toLowerCase();
    
    for (let i = 0; i < word.length; i++) {
        if (word.indexOf(word[i]) !== i) {
            return false;
        }
    }
    return true; 
}

// Question #3: Create a program to determine if a given year is a leap year. 
// The program should check if the input is a positive integer representing a year. If the input is not a valid year (i.e., not a positive integer), the program should return undefined.

function isLeapYear(year) {
    if(typeof year !== 'number' || year < 1) {
        return undefined;
    } 

    if(year % 4 === 0 && year % 100 !== 0) {
            return true;
    } else if(year % 100 === 0 && year % 400 === 0) {
        return true
    } else {
        return undefined;
    }
}

// Question #4: Create a program that checks the age to give the proper price 
// Return undefined for people aged below 13.
// Return the discounted price (rounded off) for students aged 13 to 21 and senior citizens. (20% discount)
// Return the rounded off price for people aged 22 to 64.
// The returned value should be a string.

function purchase(age, price) {
    if(age < 13) {
        return undefined;
    }
    if(age >= 13 && age <= 21 || age >= 65) {
        return Math.floor(price - (price * .20))+'.00' 
    } else if(age >= 22 && age <= 64) {
        return Math.floor(price)+'.00'
    } 
}

// Question #5: Develop a program that calculates the frequency of a specific letter's appearance within a given sentence.
// Check first whether the letter is a single character.
// If letter is a single character, count how many times a letter has occurred in a given sentence then return count.
// If letter is invalid, return undefined.

function countLetter(letter, sentence) {

    let count = 0;
    if(typeof letter !== 'string' || letter.length > 1) {
        return 'Invalid letter input';
    }
    if(sentence.length <= 1) {
        return 'Invalid sentence input';
    }

    for(let i = 0; i < sentence.length; i++) {
        if(sentence[i].toLowerCase() == letter.toLowerCase()) {
            count ++
        }
    }
    return (count < 1) ? undefined : count;
}

//Do not modify
//For exporting to test.js
//Note: Do not change any variable and function names. All variables and functions to be checked are listed in the exports.
try{
	module.exports = {

		isPalindrome: typeof isPalindrome !== 'undefined' ? isPalindrome : null,
		isIsogram: typeof isIsogram !== 'undefined' ? isIsogram : null,
		isLeapYear: typeof isLeapYear !== 'undefined' ? isLeapYear : null,
		purchase: typeof purchase !== 'undefined' ? purchase : null,
		countLetter: typeof countLetter !== 'undefined' ? countLetter : null,
	}
} catch(err){

}