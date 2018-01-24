var mysql = require("mysql");
var inquirer = require("inquirer");

var choiceArray = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Chazdog701",
  database: "bamazon"
});

connection.connect(function(err) {

  if (err) throw err;
  
  console.log("connected as id " + connection.threadId + "\n");
  allInventory();
});


//loops through pushes inventroy to an array
function allInventory(){
  connection.query("SELECT item_id, product_name, department_name, price FROM products", function(err, res){
    if(err) throw err;

    for (var i = 0; i < res.length; i++) {
      var item = res[i].item_id + ') ' + res[i].product_name + ' - ' + res[i].department_name + ' - $' + res[i].price;
      choiceArray.push(item);
    };

    customerInput(choiceArray);
  });
};

//asks which item the customer would like to pruchase from the array
function customerInput(array){
  inquirer.prompt(
  {
    type: "list",
    name: "itemSelection",
    message: "Which item would you like to buy?",
    choices: array
  }).then(function(answer){

    //pulls the item_id out of the selected product
    var selectedID = answer.itemSelection.split(')').shift();
    console.log(selectedID);

    purchase(selectedID);
  });
}

//prompts the custoemr to purchase
function purchase(id){
  inquirer.prompt(
  {
    type: "input",
    name: "howMany",
    message: "How many would you like?"
  }).then(function(answer){

    //takes the id the customer selected, and pulls the JSON from the database
    connection.query('SELECT * FROM products WHERE ?', { item_id : id }, function(err, res){
      if(err) throw err;

      //calculates new qty
      var newQty = res[0].stock_quantity - answer.howMany;

      //updated the DB with the new inventroy infomration
      if(newQty >= 0){

        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQty, id], function(err, res){
          if(err) throw err;
          console.log('Thank you for the purchase!');
        });

        //confirms with the customer
        if(answer.howMany > 1){
            console.log("Your order total for the " + answer.howMany + " new " + res[0].product_name + "s is:");
            console.log('$' + res[0].price * answer.howMany);
          } else {
            console.log("Your order total for the new " + res[0].product_name + " is:");
            console.log('$' + res[0].price * answer.howMany);
          };
      } else{
        console.log("Sorry, we don't have enough invetory!");
      };
      connection.end();
    });
  });
};
