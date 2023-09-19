##

-Frontend : react, vite, axios
-API : node.js(express)
-database : Noen.tech(serverless postgres), Google cloudstorage(store images)

-> multer :
-> uuid(Universally unique identifier) : create unique id for images

##

1. relative url vs absolute url when <Link> is used in React

- relative link : without "/"
- absolute link : with "/"

2. URL parameters vs Query strings

- url parameters : be part of url, given by client, ":" -> ex) /example/:id
- query strings : used for filtering, "?" -> ex) /example?id={userId}

3. export default vs export

- export default : export a single value with given name from a module

```react
// helloWorld.js
const hello ="Hello, world";
export default hello;
```

```react
// app.js
import hello from "./helloWorld"
console.log(hello); // output "Hello, world";
```

-export : export multiple values from a module and give new name of the values when imported

```react
// helloWorld.js
export const hello ="Hello, world";
```

```react
// app.js
import {newHello} from "./helloWorld"
console.log(newHello); // output "Hello, world";
```

or

```react
// app.js
import {hello as newHello} from "./helloWorld"
console.log(newHello); // output "Hello, world";
```

4. how to check error under coding
   throw new Error()

5. component vs function
   -> component : return HTML?
   -> function : no return HTML?
