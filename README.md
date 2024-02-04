# Digital album

Digital album is a website where users can upload pictures and organize them into albums. The goal of this project was to develop both back-end code and front-end code. This allows for the creation of a user interactive website where users can easily input data and upload images for display.

## Table of Contents

- [Link and Screenshot](#link-and-screenshot)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Features](#features)
- [Design](#design)

## Link and Screenshot

- Link to the project :
- Screenshot :![](digital_album.gif)

## Technologies

**1. Front-end :**

- React.js
- Vite
- Axios
- [Material-UI](https://mui.com/)

**2. Back-end :**

- Node.js
- Express
- Multer (for storing images in memory as buffers)
- UUID (for creating unique IDs for images)
- Postgres.js

**3. Database :**

- Noen.tech (serverless Postgres)
- Google Cloud Storage (for storing images)

_For improving this project,
[sharp](https://sharp.pixelplumbing.com/)(for optimizing image)_

## Getting started

To run the client side, follow these steps:

Open a new terminal from the root of the project, and move to the "client" directory:

```bash
cd client
```

Start Vite/React by running the following command:

```bash
npm run dev
```

To run the server side, follow these steps:

Open a new terminal from the root of the project, and move to the "server" directoy:

```bash
cd server
```

Start Node.js by running the following command:

```bash
npm run dev
```

## Features

**1. Login**

- Users can log in with their username and password.
- Option to recover usernames and reset passwords using verification codes sent via email.

**2. Signup**

- Users can create new accounts.

**3. File management**

- Users can create, delete, and update files for saving images.
- Files can be sorted based on various criteria.

**4. Image management**

- Users can upload and delete images within files.
- Images can be sorted based on various criteria.
- Display images with relevant information using an image slider.
- Option to download images to the local computer.

**5. Social sharing**
-Share images from the website on social media platforms using URLs.

**6. Dynamic and responsive design**

- Responsive SVG animations enhance the user experience.

## Design

**1. Main colors :**

`#f6a453`$\color{#f6a453}{\textsf{⬤}}$,
`#f0a04b`$\color{#f0a04b}{\textsf{⬤}}$,
`#183a1d`$\color{#183a1d}{\textsf{⬤}}$,
`#e1eedd`$\color{#e1eedd}{\textsf{⬤}}$,
`#fefbe9`$\color{#fefbe9}{\textsf{⬤}}$

**2. Fonts :**
Google Fonts - Space Grotesk Regular 400

#e7e7e7(cancel) rgba(50, 50, 50, 0.4)(popupbackground)
title : font-size 1.5 rem
subTitle: font-szie 1.2 rem

## Memo

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
