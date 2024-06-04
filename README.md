# OlympicGamesStarter
Clone this project with `git clone https://github.com/NoBdr07/Developpez-le-front-end-en-utilisant-Angular.git`.  

You must have this configuration to make this app works :  
    - Angular et Angular CLI version 17.3.8 ;  
    - Typescript version 5.4.5 ;  
    - Swimlane/ngx-charts version 20.5.0 (for the charts);  
    - Node version 20.10.0 ;  
    - Fortawesome/fontawesome-free version 6.5.2.  

Install the dependencies with : `npm install`.  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.   
The application will automatically reload if you change any of the source files.  
This app was developped with VS Code and Mozilla Firefox.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture

The architecture includes (in addition to the default angular architecture) the following:
```
└───src  
    ├───app  
    │   ├───core  
    │   │   ├───models  
    │   │   └───services  
    │   └───pages  
    │       ├───detail  
    │       ├───home  
    │       └───not-found  
    ├───assets  
    │   └───mock  
    ├───component (contains every reusable component)  
    │   ├───info (for the info bubbles)  
    │   └───title (for the title of each page)  
    └───environments  
```
## Data

The data of this project is in assets/mock/olympic.json. If you add data there it will work anyway.  
You can also create an API but you'll have to implement the back-end.  

## Responsiveness

This app works on both computer and phone.   
The main difference is that the tooltips that appears when the cursor is over the pie chart can't appear on a phone/pad.  

## Routing

Routing is managed by app-routing.module and a guard was implemented to avoid problems when you enter a country in the URL that doesn't appear in the data. The guard is in core/services.
If you enter a country that isn't in the data or a wrong route, you will be redirected to the home page.

