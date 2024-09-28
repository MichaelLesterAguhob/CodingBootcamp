// [Section] MongoDB Aggregation
/*
  - Used to generate manipulated data and perform operations to create filtered results that helps in analyzing data
  - Compared to doing CRUD operations on our data from previous sessions, aggregation gives us access to manipulate, filter and compute for results providing us with information to make necessary development decisions without having to create a frontend application.
*/

// aggregate() method follows the aggregation pipelines which are the steps/stages that we follow to get the computed results
db.fruits.aggregate([
  // $match - this is the stage used to match or get documents that satisfies the condition. this is similar to find(). you can use query operators to make your criteria more flexible
  /*
    $match -> fruits -> onSale: true

    1. Apple - onSale: true
    2. Banana - onSale: true
    3. Kiwi - onSale: true
    4. Mango - onSale: false

    $match -> apple, banana, kiwi
  */
  { $match: { onSale: true }},
  // $group - allows us to group together documents and create an analysis out of the grouped elements
  // _id, total - name of the field for the grouped elements
  // "$supplier_id" - field property
  /*
    Apple: supplier_id - 1
    Banana: supplier_id - 2
    Kiwi: supplier_id - 1

    _id: 1

    total: sum of the stocks of fruits with supplier_id of 1
    total: Apple stock + Kiwi Stock
    total: 20          + 25
    total: 45

    {
      _id: 1,
      total: 45
    }

    _id: 2

    total: sum of the sticks of fruits with supplier_id of 2
    total: Banana stock
    total: 15

    {
      _id: 2,
      total: 15
    }
  */
  // $sum - used to add or total the values in a given field
  { $group: { _id: "$supplier_id", total: { $sum: "$stock" }}}
]);

// aggregation with field projection
db.fruits.aggregate([
  { $match: { onSale: true }},
  { $group: { _id: "$supplier_id", total: { $sum: "$stock" }}},
  // $project - can be used to include/exclude fields from the returned data
  /*
      {
        _id: 1,
        total: 45
      }
      {
        _id: 2,
        total: 15
      }
      
      {
        total: 45
      }
      {
        total: 15
      }

  */
  { $project: { _id: 0}}
]);

// sorting aggregated results
db.fruits.aggregate([
  { $match: { onSale: true }},
  { $group: { _id: "$supplier_id", total: { $sum: "$stock" }}},
  // $sort - can be used to change the order of the aggregated result
  // providing a value of -1 will sort the results in a reversed order
  /*
    1 - ascending
    -1 - descending
  */
  { $sort: { total: -1 }}
]);

db.fruits.aggregate([
  // $unwind - deconstructs an array from a collection to output a result for each element
  /*
    1. Apple - origin: (2)["Philippines", "US"]
    2. Banana - origin: (2)["Philippines", "Ecuador"]
    3. Kiwi - origin: (2)["US", "China"]
    4. Mango - origin: (2)["Philippines", India]

    {
      _id: ObjectId("66f50436f454dfab85a25306"),
      name: 'Apple',
      color: 'Red',
      stock: 20,
      price: 40,
      supplier_id: 1,
      onSale: true,
      origin: 'Philippines'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25306"),
      name: 'Apple',
      color: 'Red',
      stock: 20,
      price: 40,
      supplier_id: 1,
      onSale: true,
      origin: 'US'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25307"),
      name: 'Banana',
      color: 'Yellow',
      stock: 15,
      price: 20,
      supplier_id: 2,
      onSale: true,
      origin: 'Philippines'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25307"),
      name: 'Banana',
      color: 'Yellow',
      stock: 15,
      price: 20,
      supplier_id: 2,
      onSale: true,
      origin: 'Ecuador'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25308"),
      name: 'Kiwi',
      color: 'Green',
      stock: 25,
      price: 50,
      supplier_id: 1,
      onSale: true,
      origin: 'US'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25308"),
      name: 'Kiwi',
      color: 'Green',
      stock: 25,
      price: 50,
      supplier_id: 1,
      onSale: true,
      origin: 'China'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25309"),
      name: 'Mango',
      color: 'Yellow',
      stock: 10,
      price: 120,
      supplier_id: 2,
      onSale: false,
      origin: 'Philippines'
    }
    {
      _id: ObjectId("66f50436f454dfab85a25309"),
      name: 'Mango',
      color: 'Yellow',
      stock: 10,
      price: 120,
      supplier_id: 2,
      onSale: false,
      origin: 'India'
    }
  */
  { $unwind: "$origin" }
]);

db.fruits.aggregate([
  { $unwind: "$origin" },
  /*
    $origin - Philippines, US, India, Ecuador, China

    _id: "Philippines"

    kinds: sum of fruits that originated from the country "Philippines"
    kinds: Mango + Banana + Apple
    kinds: 1     + 1      + 1
    kinds: 3

    {
      _id: "Philippines",
      kinds: 3
    }

    _id: "US"

    kinds: sum of fruits that originated from the country "US"
    kinds: Kiwi + Apple
    kinds: 1    + 1
    kinds: 2

    {
      _id: "US",
      kinds: 2
    }
    
    _id: "India"

    kinds: sum of fruits that originated from the country "India"
    kinds: Mango
    kinds: 1

    {
      _id: "India",
      kinds: 1
    }

    _id: "Ecuador"

    kinds: sum of fruits that originated from the country "Ecuador"
    kinds: Banana
    kinds: 1

    {
      _id: "Ecuador",
      kinds: 1
    }

    _id: "China"

    kinds: sum of fruits that originated from the country "China"
    kinds: Kiwi
    kinds: 1

    {
      _id: "China",
      kinds: 1
    }
  */
  { $group: { _id: "$origin", kinds: { $sum: 1 }}}
]);