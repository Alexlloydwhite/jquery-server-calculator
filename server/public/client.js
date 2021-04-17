console.log('JS');

$(onReady);

function onReady (){
    console.log('JQ');
    $('#equals').on('click', calculate);
    $('#clear').on('click', clearInputs);
    $('.operator').on('click', catchOperator);
    $('.button').on('click', catchNumbers);
    getAnswer();
}

let num1= '';
let num2= '';
let operator = '';

function catchNumbers(){
    let numberClicked = $(this).text();
    console.log(numberClicked);
    
    if ( numberClicked && operator === '' ) {
        num1 = num1 + numberClicked;
        console.log(num1);
        $('.answer').empty();
    } 
    else if ( num1 != '' && operator != '') {
        num2 = num2 + numberClicked
        console.log(num2);
    }   

    $('.answer').empty().append(`${num1} ${operator} ${num2}`);
}

function catchOperator() {
    // assigns operate to the symbal that was clicked
    operator = $(this).text();
    console.log('clicked!', operator);
}

// gets calculationHistory array from server to use on the DOM
function getAnswer(){
    // Ajax sends a get request to server for information on /calculate
    $.ajax({
        method: 'GET',
        url: '/calculate',
    })
        // after getting request, show information on the DOM
        .then(function(response){
            console.log('response from server:', response)
            render(response);
        })
        // if request fails, display alert on DOM
        .catch(function (error){
            console.log('error from server:', error);
            alert('sorry, could not get answer. Try again L8R!');
        })
}

function render(response) {
    // empty history to display only current array
    $('#history').empty();
    // loop thru the calculationHistory array and append each equation to the DOM
    for(let index of response){
        $('#history').append(`
        <li>${index.numberOne} ${index.operator} ${index.numberTwo} = ${index.result}</li>
        `)
        // render answer to DOM!
        $('.answer').empty().append(`${response[response.length -1].result}`);
    }
    
}

function calculate(){
    // create object that captures the inputs
    let calculateInputs = {
        numberOne: num1, 
        numberTwo: num2,
        operator: operator,
    }

    // Ajax sends object to the server, posts to /calculate
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: calculateInputs,
    })
        // After posting information to server, console log on client side to confirm
        .then(function(response){
            console.log('Calculating..', calculateInputs);
        })
        // if post fails, alert user.
        .catch(function( error ) {
            console.log('error from server:', error);
            alert('Sorry, could not complete task. Try again L8R!');
        })
    
    // sends a get request to server for calculation results
    getAnswer();
    clearInputs();
}

// clears number inputs
function clearInputs() {
    console.log('Clicked! Clearing Inputs..')
    num1 = '';
    num2 = '';
    operator = '';
    $('.answer').empty();
}

