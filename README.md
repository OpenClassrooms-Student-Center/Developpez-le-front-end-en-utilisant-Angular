# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

We have in this project few components and a service that you can use to start your project. Here are some of them:

- `app.component` - The main component of the application, this is the entrypoint.
- `olympic.service.ts` - The service that will provide you with the data you need to display in your application. It has a method called `getOlympicGames()` that will return an array of `OlympicGame` objects and a method called `getOlympicGame(id: Id)` that will return a single `OlympicGame` object.

We have also some pages, they are located in the `pages` folder. You can use them to enjoy the project.
- `home` - The home page of the application, in this component we called the `OlympicService` to get all data. You can use this component to display the Pie chart of medals per country.
- `detail-country` - The detail page of a country, in this component we called the `OlympicService` to get just the country's data. You can use this component to display the medals of a country per years in a bar chart.
- `not-found` - The 404 page of the application, in this component we display a message to the user that the page he is looking for does not exist.

We have also a shared folder that contains some components, models and our `OlympicService` that you can use in your project.


An important point to know is all components are standalone, and we don't have any modules in our project.

  
