// [SECTION] CRUD Operations
/*
    - CRUD operations are the heart of any backend application.
    - Mastering the CRUD operations is essential for any developer.
    - This helps in building character and increasing exposure to logical statements that will help us manipulate our data.
    - Mastering the CRUD operations of any language makes us a valuable developer and makes the work easier for us to deal with huge amounts of information.
*/

// [SECTION] Inserting Documents (Create)

// Insert one document
/*
    - Syntax
        - db.collectionName.insertOne({object});
    - JavaScript syntax comparison
        - object.object.method({object});
*/
db.users.insertOne({
    firstName: "Jane",
    lastName: "Doe",
    age: 21,
    contact: {
        phone: "09123456789",
        email: "janedoe@gmail.com"
    },
    courses: [ "CSS", "Javascript", "Python" ],
    department: "none"
});

// Insert many documents
/*
    - Syntax
        - db.collectionName.insertMany([ {objectA}, {objectB} ]);
*/
db.users.insertMany([
    {
        firstName: "Stephen",
        lastName: "Hawking",
        age: 76,
        contact: {
            phone: "09123456789",
            email: "stephenhawking@gmail.com"
        },
        courses: [ "Python", "React", "PHP" ],
        department: "none"
    },
    {
        firstName: "Neil",
        lastName: "Armstrong",
        age: 82,
        contact: {
            phone: "09123456789",
            email: "neilarmstrong@gmail.com"
        },
        courses: [ "React", "Laravel", "Sass" ],
        department: "none"
    }
]);

// [SECTION] Finding Documents (Read)
// Find
/*
    - If multiple documents match the criteria for finding a document only the FIRST document that matches the search term will be returned
    - This is based from the order that documents are stored in a collection
    - If a document is not found, the terminal will respond with a blank line
    - Syntax
        - db.collectionName.find();
        - db.collectionName.find({ field: value });
*/

// Finding a single document
// Leaving the search criteria empty will retrieve the first document
db.users.findOne({});

db.users.findOne({ firstName: "Stephen" });

// Finding multiple documents
// Leaving the search criteria empty will retrieve ALL the documents
db.users.find({});

db.users.find({ department: "none" });

// Finding documents with multiple parameters
/*
    - Syntax
        - db.collectionName.find({ fieldA: valueA, fieldB: valueB });
*/
db.users.find({ department: "none", age: 82 });

// [SECTION] Updating Documents (Update)

// Updating a single document
/*
    - Just like the "find" method, methods that only manipulate a single document will only update the FIRST document that matches the search criteria.
    - Syntax
        - db.collectionName.updateOne( {criteria}, {$set: {field: value}});
*/
db.users.updateOne(
    { firstName: "Test" },
    {
        $set : {
            firstName: "Bill",
            lastName: "Gates",
            age: 65,
            contact: {
                phone: "09987654321",
                email: "billgates@gmail.com"
            },
            courses: ["PHP", "Laravel", "HTML"],
            department: "Operations",
            status: "active"
        }
    }
);

// Updating multiple documents
/*
    - Syntax
        - db.collectionName.updateMany( {criteria}, {$set: {field: value}});
*/
db.users.updateMany(
    { department: "none" },
    {
        $set: { department: "HR" }
    }
);

//[SECTION] Comparison Query Operators

// $gt/$gte operator
/*
    - Allows us to find documents that have field number values greater than or equal to a specified value.
    - Syntax
        db.collectionName.find({ field : { $gt : value } });
        db.collectionName.find({ field : { $gte : value } });
*/

// $gt - greater than
db.users.find({ age : { $gt : 76 }});

// $gte - greater than or equal to
db.users.find({ age : { $gte : 76 }});

// $lt/$lte operator
/*
    - Allows us to find documents that have field number values less than or equal to a specified value.
    - Syntax
        db.collectionName.find({ field : { $lt : value } });
        db.collectionName.find({ field : { $lte : value } });
*/

// $lt - less than
db.users.find({ age : { $lt : 65 }});

// $lte - less than or equal to
db.users.find({ age : { $lte : 65 }});

// $ne operator
/*
    - Allows us to find documents that have field number values not equal to a specified value.
    - Syntax
        db.collectionName.find({ field : { $ne : value } });
*/

// $ne - not equal to
db.users.find({ age : { $ne: 76 } });

// $in operator
/*
    - Allows us to find documents with specific match critieria one field using different values.
    - Syntax
        db.collectionName.find({ field : { $in : value } });
*/
db.users.find({ lastName: { $in: [ "Hawking", "Doe" ] }});
db.users.find({ courses: { $in: [ "HTML", "React" ] } });

// [Section] Logical Query Operators

// $or operator
/*
    - Allows us to find documents that match a single criteria from multiple provided search criteria.
    - Syntax
        db.collectionName.find({ $or: [ { fieldA: valueB }, { fieldB: valueB } ] });
*/

// multiple field value pairs
db.users.find( { $or: [ 
    { firstName: "Neil" }, 
    { age: 21 } 
] } );

db.users.find( { $or: [ 
    { firstName: "Neil" }, 
    { age: { $gt: 21 } } 
] } );

// [Section] Field Projection
/*
    - Retrieving documents are common operations that we do and by default MongoDB queries return the whole document as a response.
    - When dealing with complex data structures, there might be instances when fields are not useful for the query that we are trying to accomplish.
    - To help with readability of the values returned, we can include/exclude fields from the response.
*/

// Inclusion
/*
    - Allows us to include/add specific fields only when retrieving documents.
    - The value provided is 1 to denote that the field is being included.
    - Syntax
        db.users.find({criteria},{field: 1})
*/
db.users.find( 
    { firstName: "Jane" }, 
    { firstName: 1, lastName: 1,contact: 1 }
);

// Exclusion
/*
    - Allows us to exclude/remove specific fields only when retrieving documents.
    - The value provided is 0 to denote that the field is being included.
    - Syntax
        db.users.find({criteria},{field: 0})
*/
db.users.find( 
    { firstName: "Jane" }, 
    { contact: 0, department: 0 } 
);

// Suppressing the ID field
/*
    - Allows us to exclude the "_id" field when retrieving documents.
    - When using field projection, field inclusion and exclusion may not be used at the same time.
    - Excluding the "_id" field is the only exception to this rule.
    - Syntax
        db.users.find({criteria},{_id: 0})
*/
db.users.find( 
    { firstName: "Jane" }, 
    { firstName: 1, lastName: 1, contact: 1, _id: 0 }
);

// [Section] Evaluation Query Operators

// $regex operator
/*
    - Allows us to find documents that match a specific string pattern using regular expressions.
    - Syntax
        db.users.find({ field: $regex: 'pattern', $options: '$optionValue' });
*/

// Case sensitive query
db.users.find({ firstName: { $regex: "N" } });

// Case insensitive query
db.users.find({ firstName: { $regex: "N", $options: 'i' } });