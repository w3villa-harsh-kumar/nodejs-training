# Node Training

### 1. What is Node.js?
    Node.js is a server-side platform built on Google Chrome's JavaScript Engine (V8 Engine). Node.js was developed by Ryan Dahl in 2009. or Node.js is an open-source server side runtime environment built on Chrome's V8 JavaScript engine. It provides an event driven, non-blocking (asynchronous) I/O and cross-platform runtime environment for building highly scalable server-side applications using JavaScript.

    => V8 Engine: V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. V8 can run standalone, or can be embedded into any C++ application.
    Link to know more: https://v8.dev/

    => How V8 works?
    -> V8 compiles JavaScript code directly into machine code when it is first executed. There are no intermediate byte codes, no interpreter. Property access in JavaScript can be very expensive. V8 uses inline caching to avoid looking up the properties of objects over and over again. V8 uses hidden classes to represent JavaScript objects and to track changes to them. V8 uses a stop-the-world, generational, accurate, garbage collector. V8 compiles JavaScript source code directly into machine code when it is first executed. There are no intermediate byte codes, no interpreter. Property access in JavaScript can be very expensive. V8 uses inline caching to avoid looking up the properties of objects over and over again. V8 uses hidden classes to represent JavaScript objects and to track changes to them. V8 uses a stop-the-world, generational, accurate, garbage collector.

    => Event Driven: Node.js uses events heavily and it is also one of the reasons why Node.js is pretty fast compared to other similar technologies. As soon as Node starts its server, it simply initiates its variables, declares functions and then simply waits for the event to occur. In an event-driven application, there is generally a main loop that listens for events, and then triggers a callback function when one of those events is detected.

    => Non-Blocking: Node.js is non-blocking which means that all functions ( callbacks ) are delegated to the event loop and they are ( or can be ) executed by different threads. That is made possible by the V8 engine under the hood of Node.js. It uses a single threaded model with event looping.

    => Asynchronous: Asynchronous is a programming pattern which provides the feature of non-blocking code i.e do not stop or do not depend on another function. Node.js uses the asynchronous model. It means that the Node.js server doesn't wait for the API to return data. The server moves to the next API after calling it and a notification mechanism of Events of Node.js helps the server to get a response from the previous API call.

    => Cross Platform: Node.js is a cross-platform environment which means that Node.js is available for various platforms like Windows, Linux, Unix, Mac OS X, etc. Node.js is built on Google Chrome's V8 JavaScript Engine, so it provides a library for JavaScript functions and modules which are responsible for various core functionalities of Node.js.

    => Scalable: Node.js is highly scalable because of its event mechanism. Because of this event mechanism, a single thread is used to handle all the requests. Node.js uses a single threaded program and the same program can provide service to a much larger number of requests than traditional servers like Apache HTTP Server.

    => Single Threaded: Node.js follows a single threaded model and uses a single threaded event loop. All callbacks will be handled by a single thread, and all operations are asynchronous except file system operations.

    => No Buffering: Node.js applications never buffer any data. These applications simply output the data in chunks.

    => License: Node.js is released under the MIT license.

### 2. what is npm and yarn?

    A. Npm is a package manager for Node.js packages, or modules if you like. It is the default package manager for the JavaScript runtime environment Node.js.
    Yarn is a package manager that doubles down as project manager. Whether you work on one-shot projects or large monorepos, as a hobbyist or an enterprise user, we've got you covered.

### 3. Installing Node.js => https://nodejs.org/en/download/

### 4. Installing npm => https://www.npmjs.com/get-npm

### 5. Underanding the Role and Usage of Node

    -> Works as a server
    -> Works as a command line tool
    -> Works as a build tool
    -> Works as a microservice

### 6. REPL
    REPL stands for Read Eval Print Loop. It is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates (executes) them, and returns the result to the user; a program written in a REPL environment is executed piecewise.

### 7. Benifits of Node.js

- Fast in Code Execution

- Scalable and Efficient

- No Buffering => Node.js applications never buffer any data. These applications simply output the data in chunks.

- Open Source => Node.js is an open-source platform which means anyone can use it, modify it and enhance it.

- Single Threaded => Node.js follows a single threaded model and uses a single threaded event loop. All callbacks will be handled by a single thread, and all operations are asynchronous except file system operations.

- Asynchronous => Asynchronous is a programming pattern which provides the feature of non-blocking code i.e do not stop or do not depend on another function. Node.js uses the asynchronous model. It means that the Node.js server doesn't wait for the API to return data. The server moves to the next API after calling it and a notification mechanism of Events of Node.js helps the server to get a response from the previous API call.

- Cross Platform => Node.js is a cross-platform environment which means that Node.js is available for various platforms like Windows, Linux, Unix, Mac OS X, etc. Node.js is built on Google Chrome's V8 JavaScript Engine, so it provides a library for JavaScript functions and modules which are responsible for various core functionalities of Node.js.

- Non-Blocking => Node.js is non-blocking which means that all functions ( callbacks ) are delegated to the event loop and they are ( or can be ) executed by different threads. That is made possible by the V8 engine under the hood of Node.js. It uses a single threaded model with event looping.

- Event Driven => Node.js uses events heavily and it is also one of the reasons why Node.js is pretty fast compared to other similar technologies. As soon as Node starts its server, it simply initiates its variables, declares functions and then simply waits for the event to occur. In an event-driven application, there is generally a main loop that listens for events, and then triggers a callback function when one of those events is detected.

