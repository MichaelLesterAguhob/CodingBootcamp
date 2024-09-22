console.log("Conditional Statements");

// let s = "asdsd";
// console.log(isNaN(23));

// Conditional Ternary Operator
let ternaryResult = 1 < 18 ? "1 is less than 18" : "1 is greater than 18";
console.log(ternaryResult);

let name;
function isLegalAge() {
  name = "Michael";
  return "You are of legal age limit";
}

function isUnderAge() {
  name = "Mikoy";
  return "You are under age limit";
}

let age = parseInt(prompt("What is your age?"));
console.log(age);

let legalAge = age > 18 ? isLegalAge() : isUnderAge();
console.log(legalAge + ", " + name);

function showIntensityAlert(windSpeed) {
  try {
    alert(determineTyphoonIntensity(windSpeed));
  } catch (error) {
    console.log(typeof error);
    console.warn(error.message);
  } finally {
    alert("Intensity updates will show new alert");
  }
}

showIntensityAlert(56);
