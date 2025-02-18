<!-- @format -->

# Functional(ly programmed) Calculator

A calculator written using a functional paradigm.

## Integrations

| Integration   | description                                   |
| ------------- | --------------------------------------------- |
| Devcontainers | use dev containers to make development easier |
| VSCode        | used for debugging and linting                |

## Setup

```sh
git clone https://github.com/arrtie/rxjs-calculator.git
cd rxjs-calculator
npm install
npm run dev
```

### Debugger setup

> You'll need VSCode, Devcontainers, and Docker already installed

within the project directory, open the container with Devcontainers

```sh
cd rxjs-calculator
devcontainer open .
```

Once successfully within the shell for the container run

```sh
npm install
```

within VSCode's side bar

- click `Run and Debug`
- from the dropdown select `Debug Session`
- click the play button (green triangle)

> tip: simply press F5 if `Debug Session` is selected
