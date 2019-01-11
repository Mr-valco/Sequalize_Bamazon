//Import Database Models
const db = require('../models');

//Syncing our sequelize models
db.sequelize.sync().then(function () {
    db.Product.bulkCreate([{

    product_name: "Dell XPS",
    department_name: "Laptop",
    price: 2500.50,
    stock_quantity: 45
},
{
    product_name: "Macbook pro 15",
    department_name: "Laptop",
    price: 3200.50,
    stock_quantity: 75
},
{
    product_name: "Mouse wired",
    department_name: "Accessories",
    price: 69.99,
    stock_quantity: 300
},
{
    product_name: "Keyboard wired",
    department_name: "Accesories",
    price: 120.95,
    stock_quantity: 300
},
{
    product_name: "dongle",
    department_name: "Accesories",
    price: 76.95,
    stock_quantity: 800
},
{
    product_name: "Headset",
    department_name: "Accesories",
    price: 150.99,
    stock_quantity: 100
},
{
    product_name: "Company logo Shirt",
    department_name: "Apparel",
    price: 49.99,
    stock_quantity: 90
},
{
    product_name: "Never Ending game",
    department_name: "Entertainment",
    price: 59.50,
    stock_quantity: 250
},
{
    product_name: "server",
    department_name: "Technology",
    price: 2809.50,
    stock_quantity: 275
},
{
    product_name: "network gear",
    department_name: "Technology",
    price: 120.50,
    stock_quantity: 400
}
]).then(function (data) {
    console.log('Data successfully added!');
}).catch(function (error) {
    console.log('Error', error)
});
});