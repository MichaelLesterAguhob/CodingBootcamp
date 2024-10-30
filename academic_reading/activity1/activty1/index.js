/* Activity A
Write a JavaScript program to find and print the first 5 happy numbers.
A number is called happy if it leads to 1 after a sequence of steps wherein each step number is replaced by the sum of squares of its digit that is if we start with Happy Number and keep replacing it with digits square sum, we reach 1.
Take a screenshot of your codepen terminal when you're done, attach an image in the "activity1" folder.

Update your local individual repository and push to git with an appropriate commit message. */

function isHappyNumber(number) {
    if(typeof number !== 'number') {
        return 'Invalid input'
    }
    let newNumber = Array.from(String(number), Number)
    let result = 0;
    while(result !== 1) {
        result = 0;
         for(i=0; i < newNumber.length; i++) {
            let current = newNumber[i]**2;
            result = result + parseInt(current);
        }
        if(result === 1) {
            return 'Happy Number!';
        } 
        newNumber = Array.from(String(result), Number)
    }

    // return result;
}