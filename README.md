![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mathieu-Hallez/Developpez-le-front-end-en-utilisant-Angular)

# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3 and forked from *[Developpez-le-front-end-en-utilisant-Angular](https://github.com/OpenClassrooms-Student-Center/Developpez-le-front-end-en-utilisant-Angular)*

Don't forget to install [NodeJS](https://nodejs.org/fr) and your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

### Software Architecture

- **src**
    - **app**
        - **core** (functionnalities, services and models shared in the app)
            - **models**
            - **services**
                - ***service_name***
        - **pages**
            - ***page_name***
        - *app files* (routing, app component and app module)
    - **assets** (External ressource can be access by the app)
        - **mock** (Fake datas)
    - **environments**
    - *favicon.ico*
    - *index.html*
    - *main.ts*

## Contribute

We decided to choose a *Feature Branch WorkFlow*.
> Foreach new functionnalities, you need to create a new branch.

Don't forget to commit your change frequently with short description and to create pull request on the main branch to integrete your new functionnality.


## Authors

- Mathieu Hallez

___
Good luck!
