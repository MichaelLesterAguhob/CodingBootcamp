// Problem #1: Given an array of product objects, count how many products belong to a specific category. Return the count. If the input is not an array or is empty, return 0.

function countProductsByCategory(products, category) {
    if(!Array.isArray(products) || products.length === 0) {
        return 0;
    }
    const filteredProducts = products.filter(product =>  product.category === category);

    return filteredProducts.length;
}

const products = [
    { name: 'Laptop', category: 'Electronics', price: 1000, quantity: 5 },
    { name: 'Keyboard', category: 'Electronics', price: 100, quantity: 15 },
    { name: 'Shirt', category: 'Clothing', price: 20, quantity: 10 }
];