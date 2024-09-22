console.log("JS LOOP");

let count = 5;

while(count !== 0) {
    console.log("While: " + count );
    count --;
}

// let number = Number(prompt("Give me a number: "));

// do {
//     console.log("Do While: " + number);
//     number += 1;
// }while(number < 10)

for(cntr = 0; cntr <= 20; cntr++){
    console.log(cntr);
}
let myString = "Michael";
for(x = 0; x < myString.length; x++){
    console.log(myString[x]);
}

let myName = "MichAel";
for(i = 0; i < myName.length; i++){
    
    if(myName[i].toLowerCase() == "a" || myName[i].toLowerCase() == "e" || myName[i].toLowerCase() == "i" || myName[i].toLowerCase() == "o" || myName[i].toLowerCase() == "u") {
        console.log(3);
    }else {
        console.log(myName[i])
    }
}