// Exercise 2: Create a function that accepts a callback as a parameter. Inside the function, invoke the callback after a 1-second delay.

// create a function that accepts a callback as a parameter
const myFunction = (callback) => {
    setInterval(callback, 1000)
}

// invoke the callback after a 1-second delay
myFunction(() => {
    console.log("Hello I'm callback")
})