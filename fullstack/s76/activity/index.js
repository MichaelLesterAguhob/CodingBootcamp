// Question #1: Create a program that calculate the total order amount. 
// Input should be an array, if not an array, return undefined. 

function calculateTotalAmount(orderAmounts) {
    if(!Array.isArray(orderAmounts) || !orderAmounts.every(num => typeof num === 'number')) {
        return undefined;
    }
    let totalOrderAmount = orderAmounts.reduce((total, amount) => total + amount, 0);
    return parseFloat(totalOrderAmount.toFixed(1));
}

// Question #2: Create a program that takes an array of blog post titles and a keyword. 
// The search should be case-insensitive.
// Return undefined if the inputs are not of the expected data types

function filterTitlesByKeyword(titles, keyword) {
    if(!Array.isArray(titles) || !titles.every(title => typeof title === 'string')) {
        return undefined;
    }
    let found = titles.filter(title => title.toLowerCase().includes(keyword.toLowerCase()))
    if(!found) {
        return "No matching titles found.";
    }
    return found;
}

// Question #3: Create a program that takes an array of usernames and returns a new array.
// Return undefined if the input is not an array.
// All array elements should be a string.
// Each username's first letter should be capitalized and prefixed by "User:".

function formatUsernames(usernames) {
    if(!Array.isArray(usernames) || !usernames.every(uname => typeof uname === 'string')) {
        return undefined;
    }
    let modifiedUserNames = usernames.map((uname) => {
        return 'User: '+uname[0].toUpperCase()+uname.slice(1, uname.length);
    })
    return modifiedUserNames;
}

// Question #4: Create a program that returns a sorted merged list of unique delivery dates
// Validate both inputs are arrays and contain only integers, if not return undefined

function optimizeDeliverySchedule(datesWarehouse1, datesWarehouse2) {
    if(!Array.isArray(datesWarehouse1) || !Array.isArray(datesWarehouse2) || !datesWarehouse1.every(Number.isInteger) || !datesWarehouse2.every(Number.isInteger)) {
        return undefined;
    }
    let dates = datesWarehouse1.concat(datesWarehouse2);
    return dates.sort();
}

// Question #5: Develop a program that removes all scores that are below a certain threshold. 
// Calculate the average of the remaining scores.
// Validate that the array is comprised of integers.
// Return the average score rounded to two decimal places. 
// If after filtering there are no scores left or the input is invalid, return undefined

function removeLowScoresAndCalculateAverage(scores, threshold) {
    if(!Array.isArray(scores) || !scores.every(Number.isInteger)) {
            console.log("not int")
        return undefined;
    }
    let filteredScores = scores.filter(score => score >= threshold);
    if(filteredScores.length === 0) {
        return undefined;
    }

    let totalScores = filteredScores.reduce((total, score) => total + score, 0);
    return parseFloat((totalScores/filteredScores.length).toFixed(2));
}

//Do not modify
//For exporting to test.js
//Note: Do not change any variable and function names. All variables and functions to be checked are listed in the exports.
try{
	module.exports = {

		calculateTotalAmount: typeof calculateTotalAmount !== 'undefined' ? calculateTotalAmount : null,
		filterTitlesByKeyword: typeof filterTitlesByKeyword !== 'undefined' ? filterTitlesByKeyword : null,
		formatUsernames: typeof formatUsernames !== 'undefined' ? formatUsernames : null,
		optimizeDeliverySchedule: typeof optimizeDeliverySchedule !== 'undefined' ? optimizeDeliverySchedule : null,
		removeLowScoresAndCalculateAverage: typeof removeLowScoresAndCalculateAverage !== 'undefined' ? removeLowScoresAndCalculateAverage : null,
	}
} catch(err){

}


