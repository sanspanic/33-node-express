### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Promises, Async/Await


- What is a Promise?

Promises represent operations that haven't completed yet. They are asynchronous and will eventually either resolve or reject.

- What are the differences between an async function and a regular function?

An async function can run concurrently to other functions, whereas a synchronous function can only be executed once no other funtion is running. 


- What is the difference between Node.js and Express.js?

Node.js is a JS runtime environment that execuses JS outside a browser environment. 

Express is a back-end framework for Node.js.

- What is the error-first callback pattern?

With this pattern, a callback function is passed to the method as an argument. When the operation either completes or an error is raised, the callback function is called with the Error object (if any) passed as the first argument.

- What is middleware?

Middleware functions are in the middle of the client's request and the server's response; they are executed in the middle of the request-response cycle. 

- What does the `next` function do?

next(), is a function that tells Express.js to continue on to the following middleware you have configured for your application.

- What does `RETURNING` do in SQL? When would you use it?

The RETURNING clause allows you to retrieve values that were modified by an insert, delete or update. Without RETURNING, you would have to run a SELECT statement after the DML statement is completed, in order to obtain the values of the changed columns. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

1. Repetition: calls could be handled with a loop
2. Performance: would be improved by using Promise.all()

Refactor: 

```
let usernames = ["elie", "joelburton", "mmmaaatttttt"];
let promiseArr = [];

function getPromises(usernames) {
  for (let username of usernames) {
    promiseArr.push(axios.get(`https://api.github.com/users/${username}`));
  }
}

function resolveAll(promiseArr) {
  Promise.all(promiseArr).then((dataArr) =>
    dataArr.forEach((res) => console.log(res.data))
  );
}

getPromises(usernames);
resolveAll(promiseArr);
```
