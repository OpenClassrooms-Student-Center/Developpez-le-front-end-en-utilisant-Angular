# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.
The charts were made with ngx-charts.
Node was used v20.10.0 (don't forget to `npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture

The architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components : 
    - infoComponent for the info bubbles
    - titleComponent for the title of each page
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

## Data

The data of this project is in assets/mock/olympic.json. If you add data there it will work anyway.
You can also crearte an API but you'll have to implement the back-end.

## Responsiveness

This app works on both computer and phone. 
The main difference is that the tooltips that appears when the cursor is over the pie chart can't appear on a phone. 

## Routing

Routing is managed by app-routing.module and a guard was implemented to avoid problems when you enter a country in the URL that doesn't appear in the data. The guard is in core/services.
If you enter a country that isn't in the data, you will be redirected to the home page.

