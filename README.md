# nexus
The upcoming Studs website of 2023. Built using modern libraries.

## Info
This is a **React 18.2** project built with **Vite 4.0.1**. Vite is a faster alternative to Create-React-App built by the developers of Vue. 

The project is written in TypeScript. The main benefit of TypeScript is that it becomes easier for new members (of for example STUDS) to understand the project and begin contributing to it. I hope that this will be the case for this project.

The project uses **Bootstrap 5.2**, meaning no CSS files. To style the components, use bootstrap classnames or if necessary inline CSS, with the exception of hover effects and transitions or similar, in this case I have used CSS files. The purpose of this is once again for the project to be easy to delve into. Everything you see on the website will be contained withing each component's TypeScript file.

The project uses the **react-bootstrap** library which has several prebuilt components. Althought these don't have to be used.

The project uses the **react-icons** library for all usage of icons. 

The project follows [this](https://github.com/alan2207/bulletproof-react) React convention to a certain extent (mainly for folder structuring, with features etc).

For translations, **i18n** is used.

## How to run
Navigate to the project repository in a terminal.

If it is your first time running the project, or if new libraries have been added. Run
```
npm install
```

To start the application run 
```
npm start
```
