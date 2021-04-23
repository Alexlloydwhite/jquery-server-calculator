const express = require('express');
const bodyParser = require('body-parser');

// create instanc of express web server 
const app = express ();

// set up public folders to send files to client
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static( 'server/public' ) );

// tell server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log(`listening on port ${PORT}...`);
});

// global array to hold history of every claculation send to server
let calculationHistory = [];

function calculate(input){
    // log input to comfirm we are in the function
    console.log('in the calculator:', input);
    
    // switch statement performs math based on operator.
    switch ( input.operator ){
        case '+':
            input.result = Number(input.numberOne) + Number(input.numberTwo);
            break;
        case '-':
            input.result = Number(input.numberOne) - Number(input.numberTwo);
            break;
        case '*':
            input.result = Number(input.numberOne) * Number(input.numberTwo);
            break;
        case '/':
            input.result = Number(input.numberOne) / Number(input.numberTwo);
    }

}

// sends calculationHistory array to client
app.get('/calculate', (req, res) =>{
    console.log('request for answer', calculationHistory)
    res.send(calculationHistory);
})

// recieves object from the DOM, sends to calculator!
app.post('/calculate', (req, res) =>{
    let newCalculation = req.body;
    console.log('recieving new calculation', newCalculation);
    
    // save the new calculation to later display in history
    calculationHistory.push(newCalculation);
    
    // use new calculation object to perform math!
    calculate(newCalculation)
    // sending status 201 aka all good!
    res.sendStatus(201);
})