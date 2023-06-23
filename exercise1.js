// Exercise 1: Create an event emitter that emits a 'start' event. Write a callback function that logs a message when the 'start' event is emitted.

// import events module
const EventEmitter = require('events');

// create an event emitter object
const myEmitter = new EventEmitter();

// create a callback function
myEmitter.on('start', () =>{
    console.log('start event fired');
})

// emit the start event
myEmitter.emit('start')