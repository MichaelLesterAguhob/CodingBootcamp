function sumOfEvenNumbers(numbers) {
    if(!Array.isArray(numbers) || !numbers.every(Number.isInteger)) {
        console.log('Invalid input: PLease provide an array of integers');
        return undefined;
    }

    let sum = 0;
    numbers.forEach(number => {
        if(number % 2 === 0) sum += number;
    })
    return sum;
}