// Question #1: Add a new book with the following properties:
// Automatic unique ID assignment
// Title and author should be a string
// Year should be a positive number
// Status defaults to true
let library =[{}];

function addBook(library, newBook) {

    if(typeof newBook.title !== 'string' || typeof newBook.author !== 'string' || !newBook.year > 0) {
        return false;
    }
    let uniqueID = library.reduce((max, curr) => {
        return (curr.id > max) ? curr.id : max;
    }, 0)

    let newBk = {
        id: uniqueID + 1,
        title: newBook.title,   
        author: newBook.author,
        year: newBook.year,
        status: true
    }
    library.push(newBk);
    return true;
}

// Question #2: Retrieve either details of a specific book by its ID or an array of details for all books, optionally filtered by availability. 

function getBooks(library, id = null, filterAvailable = null) {
    let getBooksResult;
    
    if(id !== null && filterAvailable !== null) {
        getBooksResult = library.filter(book => book.id == id && book.status === filterAvailable);
    }
    else if(id !== null) {
        getBooksResult = library.filter(book => book.id === id);
    }
    else if(filterAvailable !== null) {
        getBooksResult = library.filter(book => book.status === filterAvailable);
    }
    else {
        getBooksResult = library;
    }

    return getBooksResult;
}


// Question #3: Update a book's availability status after validating the book exists and ensuring the new status differs from the current.

function updateBookAvailability(library, id, isAvailable) {
    let index = library.findIndex(book => book.id === id);
        if(index !== -1) {
            book[index].status = isAvailable;
            return true;
        } else {
            return false;
        }
}

// Question #4: Remove a book by its ID only if it is marked as unavailable.
function removeBook(library, id) {
    let index = library.findIndex(book => book.id === id && book.status === false);
    if(index !== -1) {
        library.splice(index, 1);
        return true
    } else {
        return false;
    }
}

// Question #5: List all books, with an option to filter by their availability status.

function listBooks(library, filterAvailable = null) {
    let list;
    if(filterAvailable !== null) {
        list = library.filter(book => book.status === filterAvailable);
    } else {
        list = library;
    }
    return list;
}

// Question #6 Given the following code, create the appropriate Flowchart.
// You can use draw.io and save the png into the activity folder.

function determineGrade(score) {
    // Input score as parameter
    if (typeof score !== 'number') {
        // Return "invalid input" if score is not a number
        return "invalid input";
    }

    // Check if score is within valid range
    if (score < 0 || score > 100) {
        // Return "invalid score" if score is outside the range 0-100
        return "invalid score";
    }

    // Determine grade based on score
    let grade;
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else if (score >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // Return the grade
    return grade;
}

try{
    module.exports = {

        addBook: typeof addBook !== 'undefined' ? addBook : null,
        getBooks: typeof getBooks !== 'undefined' ? getBooks : null,
        updateBookAvailability: typeof updateBookAvailability !== 'undefined' ? updateBookAvailability : null,
        removeBook: typeof removeBook !== 'undefined' ? removeBook : null,
        listBooks: typeof listBooks !== 'undefined' ? listBooks : null,

    }

} catch(err){

}