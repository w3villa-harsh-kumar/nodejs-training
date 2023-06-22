// Exercise 3 (optional): Create a function that takes two numbers and a callback. The function should invoke the callback with the result of adding the two numbers.

function myFunction(number1, number2, callback) {
  callback(number1 + number2);
}

myFunction(3, 5, (result) => {
    console.log(result)
});
