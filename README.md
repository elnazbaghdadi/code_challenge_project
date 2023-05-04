# why Vue?

Size: Vue.js is a lightweight framework, with a smaller file size than Angular. This can lead to faster load times for web applications built with Vue.js.

Performance: Vue.js is known for its excellent performance, especially when compared to Angular. This is due to Vue.js' virtual DOM implementation, which makes it faster and more efficient.

## Before starting

- used technologies:
  - Axios
  - vee-validate
  - Vuetify
  - json-server
  - Vue-router
- "Composition API" and "Option API" are both used just because it is a challenge to show knowledge.
- Json-server used for the purpose of mock data implementation.

## Structure

```
.
├── data
├── public
├── packages
├── README.md
├── src
│   ├── _helpers
│   ├── assets
│   ├── components
│   ├── router
│   ├── services
│   ├── stores
│   ├── views
│   ├── main.js
│   └── App.vue
├── package-lock.json
├── package.json
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc.json
└── vite.config.json
└── index.html
```

## How to start

- Clone the project to your local computer:

```
git clone https://github.com/elnazbaghdadi/code_challenge_project.git
cd code_challenge_project
```

## Running the projects

## Use Correct Node Version

if you got any error like:
Error: Cannot find module 'node:url'

plese just :
Just upgrade your node to the latest, remove node_modules, and run npm install again

### Setup projects

Install dependencies and run the project.

```
npm install
npm install -g json-server
json-server --watch data/db.json
npm run dev
```

## check your json-server local host address

after running json server it will give back localhost Url which your json server is running on, if it was not 'http://localhost:3000' please go to the :
src => services => axios.js
in line 37:
just change base Url to your own local host Url which json server is running on.

## used endpoint

- get => 'http://localhost:3000/products'
- get => 'http://localhost:3000/productColorList'
- get => 'http://localhost:3000/products/${id}'
- put => 'http://localhost:3000/products/${id}' , productModel

## product model

{
id: number,
carId: string,
inStock: boolean,
color: string,
hoursePower: number,
price: number
}
