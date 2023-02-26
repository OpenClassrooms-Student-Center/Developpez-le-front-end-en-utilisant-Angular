![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6, Node version 18.14.0, Package Manager version npm 9.3.1.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:


- `core` folder: contains the business logic (`services` and `models` folders)
  - `models` folder: contains every reusable interfaces for dataset
    - `DataLineChart` & `DataPiChart` : interfaces for data chart.
    - `Olympic` & `Participation` interfaces for data from the mock ([label](src/assets/mock/olympic.json))
  - `components` folder: contains every reusable components used to rendering the dashboard.

- `pages` folder: contains components used for routing
  - `home`
  - `country-data`
  - `not-found` 
