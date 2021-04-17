console.log('JS');

$(onReady);

function onReady (){
    console.log('JQ');
    $('#equals').on('click', calculate);
    $('#clear').on('click', clearInputs);
    $('.math').on('click', catchOperator);
    getAnswer();
}

let operator = '';

function catchOperator() {
    // assigns operate to the symbal that was clicked
    operator = $(this).text();
    console.log('clicked!', operator);
}

// gets calculationHistory array from server to use on the DOM
function getAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculate',
    })
        .then(function(response){
            console.log('response from server:', response)
            render(response);
        })
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
        $('#history').append(`<li>${index.numberOne} ${index.operator} ${index.numberTwo} = ${index.result}</li>`)
        // render answer to DOM!
        $('#answer').empty().append(`${response[response.length -1].result}`);
    }
    
}

function calculate(){
    // create object that captures the inputs
    let calculateInputs = {
        numberOne: Number($('#num1').val()),
        numberTwo: Number($('#num2').val()),
        operator: operator,
    }

    // send object to the server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: calculateInputs,
    })
        .then(function(response){
            console.log('Calculating..', calculateInputs);
        })
        .catch(function( error ) {
            console.log('error from server:', error);
            alert('Sorry, could not complete task. Try again L8R!');
        })
    
    // display
    getAnswer();
}

// clears number inputs
function clearInputs() {
    console.log('Clicked! Clearing Inputs..')
    $('#num1').val('');
    $('#num2').val('');
}