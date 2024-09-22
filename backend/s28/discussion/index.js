 console.log("We're Connected");

//  list of student numbers from graduating class using variables
let studNumA = '2020-1923';
let studNumB = '2020-1924';
let studNumC = '2020-1925';
let studNumD = '2020-1926';
let studNumE = '2020-1927';

let studNumbers = ['2020-1923', '2020-1924', '2020-1925', '2020-1926', '2020-1927'];

let grades = [98.5, 94.3, 89.2, 90.1];
let computerBrands = ['Acer', 'Asus', 'Lenovo', 'Neo', 'Redfox', 'Gateway'];
console.log(grades);
console.log(computerBrands);

let mixedArray = [12, 'Asus'. null, undefined, {}];

console.log(mixedArray);


let myTasks = [
    'Drink HTML',
    'Eat JS',
    'Inhale CSS',
    'Bake Sass'
];
console.log(myTasks);

let city1 = 'Tokyo';
let city2 = 'Manila';
let city3 = 'Jakarta';

let cities = [city1, city2, city3];
console.log(cities);

console.log(myTasks.length);
console.log(cities.length);

let blankArray = [];
console.log(blankArray.length);

let fullName = "Monica Geller";
console.log(fullName.length);

console.log(grades[0])
console.log(computerBrands[3])
console.log(grades[10])

let lakersLegends = ['Kobe', 'Shaq', 'LeBron', 'Magic', 'Kareem'];
console.log(lakersLegends);

let currentLaker = lakersLegends[2];
console.log(currentLaker);

// 
/*
    - Multidimensional arrays are useful for storing complex data structures
    - A practical application of this is to help visualize/create real world objects
    - Though useful in a number of cases, creating complex array structures is not always recommended.
*/
let chessBoard = [
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
];

console.log(chessBoard);
console.log(chessBoard[0][6]);