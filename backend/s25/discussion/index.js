// console.log("Hello World!");


// Mini activity
// let userNum = prompt("Enter Number: ");
// isDivisibleBy4(userNum);
function isDivisibleBy4(num) {
    let isDivBy4 = num % 4 === 0;
    console.log("Is number " + num + " divisible by 4: " + isDivBy4);
}

function helloWorld() {
    return "Hello World!";
}

function invokeFunction(funcParam) {
    return funcParam();
}

let greet = invokeFunction(helloWorld)
console.log(greet);
console.log(helloWorld);

function displayFullName(fname, mName, lName) {
    console.log(fname + " " + mName + " " + lName);
}

displayFullName("Juan", "Dela", "Cruz");
displayFullName("John", "Smith");
displayFullName("Jane", "Doe", "Dela", "Cruz");
displayFullName("Dela", "Cruz", "Juan");