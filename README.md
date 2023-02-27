<p align="center">
  <img src="src\assets\img\telesport_logo.png" title="Telesport">
</p>

# OlympicGamesStarter 
![Angular](https://img.shields.io/static/v1?label=&message=ANGULAR&color=red)![TypeScript](https://img.shields.io/static/v1?label=&message=TypeScript&color=blue)![JavaScript](https://img.shields.io/static/v1?label=&message=JavaScript&color=yellow)![HTML](https://img.shields.io/static/v1?label=&message=HTML&color=green)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6, Node version 18.14.0, Package Manager version npm 9.3.1.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Preview
<p align="center">
  <img src="src\assets\img\preview.png" title="Preview">
</p>

## Project architecture

The architecure based on the predefined architecture includes (in addition to the default angular architecture) the following:

- `core` folder: contains the business logic :`
  - `components` folder contains all reusable components for `pages`: 
     A page contains a `statistic-card-list` component defined by a `title-card` a list of `statistic-card`.
  - `models` folder contains every reusable interfaces for dataset.
    - `DataLineChart` & `DataPiChart` : interfaces for data chart.
    - `Olympic` & `Participation` interfaces for olympic data.
  - `services` folder contains the `OlympicService`, data access service for `asset\mock\olympic.json` via RxJS Observable.

- `pages` folder: contains components used for routing
  - `home` is the default page of the application, shows the general informations from Olympics.
  - `country-data` is the detailed page for a specified country (countryId parameter passed by URL).
  - `not-found` is called 

## Required
- [@swimlane/ngx-charts](https://www.npmjs.com/package/@swimlane/ngx-charts) : used for chart representation of data.
