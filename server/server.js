const express = require('express');
const bodyParser = require('body-parser');

// create instanc of express web server 
const app = express ();
// set up public folders to send files to client
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static( 'server/public' ) );

// tell server to listen on port 5000
const PORT = 5000;
app.listen( PORT, () => {
    console.log(`listening on port ${PORT}...`);
})

let calculationHistory = [];
let sum = 0;

function calculate(input){
    let num1 = input.numberOne;
    let num2 = input.numberTwo;
    let operator = input.operator;

    if (operator = '+') {
        sum = Number(num1) + Number(num2);
    } 
    console.log(sum);
}


// TODO - set up get / post 
app.get('/calculate', (req, res) =>{
    console.log('request for answer', sum)
    res.send(sum);
})

// recieves object from the DOM, sends to calculator!
app.post('/calculate', (req, res) =>{
    let newCalculation = req.body;
    console.log('reciecing new calculation', newCalculation);
    // save the new calculation to later display in history
    calculationHistory.push(newCalculation);
    // use new calculation object to perform math!
    calculate(newCalculation)
    res.sendStatus(201);
})



