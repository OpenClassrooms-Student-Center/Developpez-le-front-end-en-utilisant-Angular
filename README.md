# OlympicGamesStarter

This application shows informations about Olympic games. (number of medals, number of athletes, ...)

Graphic charts are available on page to be more interactive.

## How to install

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How to run application

After run `http://localhost:4200/`, the main page shows dashboard by default.

This page can be accessed by `http://localhost:4200/dashboard`.

By clicking on country in chart pie, the detail page displays. (in this form : `http://localhost:4200/detail:ID`)

## Components / Services

Each component has ts (typescript), scss and html file.
- Dashboard component handles graphic chart pie from library ngx-charts.
- Detail component handles graphic chart bar from library ngx-charts.
- Header component handles title and others informations according to page selected.
- Home component only displays the number of country.
- Not-found component displays a simple page if url is wrong.

Services are used for some components : 
- olympic-service to get informations about all countries or only one with HttpClient.

## Modules and app-routing-module

Module contains all necessary components and modules.

app-routing-module contains routes with all components displayed.

## Models 
Models (olympic and Participation) to create interface used in components or services.
