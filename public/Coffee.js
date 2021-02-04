const txtOutput = document.getElementById("output");
const txtOutput2 = document.getElementById("output2");
const txtOutput3 = document.getElementById("cost");
const txtOutput4 = document.getElementById("cost2");
var size_coffee = document.getElementsByName('size');
var type_coffee = document.getElementsByName('type');
var milk_coffee = document.getElementsByName('milk');

document.querySelectorAll('.s').forEach(item => {item.addEventListener('click', size_function)});
document.querySelectorAll('.t').forEach(item => {item.addEventListener('click', type_function)});
document.querySelectorAll('.m').forEach(item => {item.addEventListener('click', milk_function)});
document.getElementById("e1").addEventListener('click', sugar_function);
document.getElementById("e2").addEventListener('click', cream_function);
document.getElementById("e3").addEventListener('click', syrup_function);
document.getElementById("add").addEventListener("click",add_to_order);
document.getElementById("place").addEventListener("click",place_order);
document.getElementById("new_order").addEventListener("click",new_order);
document.getElementById("order_favourite").addEventListener("click",order_favourite);
document.getElementById("add_favourite").addEventListener("click",add_favourite);

if (localStorage.getItem("Number of Drinks") == null){
    localStorage.setItem("Number of Drinks", 0);
}

var size = "";
var type = "";
var extras = ["","","",""];
var cost_of_drink = 0;
var current_order = "";
var price_of_syrup = 0;
var size_cost = 0;
var total_order = "";
var total_cost = 0;
var number_of_drinks = localStorage.getItem("Number of Drinks");

function new_order() {
    document.getElementById('size_drink').style.display = 'block';
}

function size_function() {
    cost_of_drink -= size_cost;
    for (i=0; i<3; i++){
        if (size_coffee[i].checked == true){
            size = size_coffee[i].value;
            if (size == "Small"){
                size_cost = 2.45;
            }
            else if (size == "Medium"){
                size_cost = 2.65;
            }
            else{
                size_cost = 2.85;
            }
        }
    }
    cost_of_drink += size_cost;
    document.getElementById('type_drink').style.display = 'block';
    print_current_order()
}

function type_function() {
    for (i=0; i<5; i++){
        if (type_coffee[i].checked == true){
            type = type_coffee[i].value;
            if (type == "Latte" || type == "Cappuccino" || type == "Flat White"){
                document.getElementById('milk_drink').style.display = 'block';
                document.getElementById('extras_drink').style.display = "none";
                document.getElementById("add_favourite").style.display = "none";
                document.getElementById("add").style.display = "none";
            }
            else{
                document.getElementById('milk_drink').style.display = 'none';
                document.getElementById('extras_drink').style.display = "block";
                document.getElementById("add_favourite").style.display = "block";
                document.getElementById("add").style.display = "block";
                extras[0] = "";
                for (i=0; i < milk_coffee.length; i++) {
                    milk_coffee[i].checked = false;
                }
            }
        }
    }
    print_current_order()
}

function milk_function() {
    for (i=0; i<5; i++){
        if (milk_coffee[i].checked == true){
            extras[0] = milk_coffee[i].value;
        }
    }
    document.getElementById('extras_drink').style.display = "block";
    document.getElementById("add_favourite").style.display = "block";
    document.getElementById("add").style.display = "block";
    print_current_order()
}

function sugar_function(){
    if (document.getElementById("e1").checked == true){
        extras[1] = "Sugar";
    }
    else{
        extras[1] = "";
    }
    print_current_order()
}

function cream_function(){
    if (document.getElementById("e2").checked == true){
        extras[2] = "Cream";
        cost_of_drink += 0.5;
    }
    else{
        extras[2] = "";
        cost_of_drink -= 0.5;
    }
    print_current_order()
}

function syrup_function(){
    cost_of_drink -= price_of_syrup;
    price_of_syrup = parseInt(document.getElementById("e3").value) * 0.25;
    cost_of_drink += price_of_syrup;
    extras[3] = document.getElementById("e3").value + "x Syrup Shots";
    print_current_order()
}

function print_current_order() {
    current_order = size + " " + type;
    for (i=0; i<4; i++){
        if (extras[i] != "" || extras[i] != 0) {
            current_order += "\n" + "- " + extras[i];
        }
    }
    txtOutput.innerText = `${current_order}`;
    txtOutput3.innerText = `£${cost_of_drink.toFixed(2)}`;   
}

function add_to_order(){
    localStorage.setItem("Number of Drinks", parseInt(number_of_drinks) + 1);
    number_of_drinks = localStorage.getItem("Number of Drinks")
    if (number_of_drinks == 10){
        cost_of_drink = 0;
        localStorage.setItem("Number of Drinks", 0);
        number_of_drinks=localStorage.getItem("Number of Drinks");
    }
    total_cost += cost_of_drink;
    total_order += current_order + "\n" + "\n";
    txtOutput2.innerText = `${total_order}`;
    txtOutput4.innerText = `£${total_cost.toFixed(2)}`;
    reset_page()
    print_current_order()
}

function place_order() {
    window.confirm("Thankyou for your order :)");
    total_order = "";
    total_cost = 0;
    reset_page()
}

function order_favourite() {
    if (localStorage.getItem('Favourite Drink') == null)
    {
        window.alert("You don't have a favourite drink stored");
    }
    else
    {
        total_order += localStorage.getItem('Favourite Drink') + "\n" + "\n";
        localStorage.setItem("Number of Drinks", parseInt(number_of_drinks) + 1);
        number_of_drinks=localStorage.getItem("Number of Drinks");
        if (number_of_drinks == 10){
            total_cost += 0;
            localStorage.setItem("Number of Drinks", 0);
            number_of_drinks=localStorage.getItem("Number of Drinks");
        }
        else{
            total_cost += parseFloat(localStorage.getItem("Favourite Drink Cost"));
        }
        txtOutput2.innerText = `${total_order}`;
        txtOutput4.innerText = `Total: £${total_cost.toFixed(2)}`;
    }
}

function add_favourite() {
    localStorage.removeItem('Favourite Drink');
    localStorage.removeItem("Favourite Drink Cost")
    localStorage.setItem('Favourite Drink', current_order);
    localStorage.setItem('Favourite Drink Cost', cost_of_drink);
    window.alert("Drink added to Favourites");
    reset_page()
}

function reset_page() {
    document.getElementById('size_drink').style.display = 'none';
    document.getElementById('type_drink').style.display = 'none';
    document.getElementById('milk_drink').style.display = 'none';
    document.getElementById('extras_drink').style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("add_favourite").style.display = "none";
    size = "";
    type = "";
    extras = ["","","",""];
    cost_of_drink = 0;
    price_of_syrup = 0;
    size_cost = 0;
    current_order = "";
    for (i=0; i < size_coffee.length; i++) {
        size_coffee[i].checked = false;
    }
    for (i=0; i < type_coffee.length; i++) {
        type_coffee[i].checked = false;
    }
    for (i=0; i < milk_coffee.length; i++) {
        milk_coffee[i].checked = false;
    }
    document.getElementById("e1").checked = false;
    document.getElementById("e2").checked = false;
    document.getElementById('e3').value=0;
    txtOutput.innerText = `${current_order}`;
    txtOutput3.innerText = `£${cost_of_drink.toFixed(2)}`;
    txtOutput2.innerText = `${total_order}`;
    txtOutput4.innerText = `Total: £${total_cost.toFixed(2)}`;
}