console.log('JS');

$(onReady);

function onReady (){
    console.log('JQ');
    $('#equals').on('click', calculate);
    $('#clear').on('click', clearInputs);
    $('.math').on('click', catchOperator);
}

let operator = '';

function catchOperator() {
    // assigns operate to the symbal that was clicked
    operator = $(this).text();
    console.log('clicked!', operator);
}

function getAnswer(){
    $.ajax({
        method: 'GET',
        url: '/calculate',
    })
        then(function(response){
            console.log('response from server:', response)
            render(response);
        })
        .catch(function (error){
            console.log('error from server:', error);
            alert('sorry, could not get answer. Try again L8R!');
        })
}

function render() {
    $('#answer').empty().append(`SUM OF CALCULATION: ${sum}`);
}

function calculate(){

    let calculateInputs = {
        numberOne: Number($('#num1').val()),
        numberTwo: Number($('#num2').val()),
        operator: operator,
    }

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
    
    render();
}

// clears number inputs
function clearInputs() {
    console.log('Clicked! Clearing Inputs..')
    $('#num1').val('');
    $('#num2').val('');
}