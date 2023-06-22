// Exercise 2: Create a function that accepts a callback as a parameter. Inside the function, invoke the callback after a 1-second delay.

const myFunction = (callback) => {
    setInterval(callback, 1000)
}

myFunction(() => {
    console.log("Hello I'm callback")
})