# Télésport Olympic Games

## Description:

This project is a **Single Page Application** that displays usefull informations about the last participations of different countries to the Olympics.

It is a training project forked from [Openclassroom Student Center](https://github.com/OpenClassrooms-Student-Center/Developpez-le-front-end-en-utilisant-Angular) to learn how to build a Frontend with Angular.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6. (and developped using Node v18.15.0)

---

## Features:

The project has 2 features:

1. The ability to display on the Home page a dougnut shape chart with the name of the participating countries (from a static dataset) and their total number of medals.
2. The ability to display on the Details pages a line chart representing the total number of medals per particaption.

**N.B.:** Not really a feature, on the Home page there are informations about the number of Olympics and the number of countries. On the Details pages, there are informations about the number of participations (entries) and athletes per country.

---

## Navigating the pages:

On the Home page, the doughnut chart displays a slice for each participating countries with a different color. On mouse hover, you can see a tooltip showing their total number of medals. Clicking a slice will navigate you to the Details page related to this country. At the bottom of the details line chart, there are previous, next and go back buttons to navigate beatween pages. (previous and next is a bonus, not part of the specifications but quite usefull)

---

## Development Informations:

### Pre-requistes:

You must have Node.JS (and transitively you get npm) installed on your machine.

- en français: [Installer node](https://nodejs.dev/fr/learn/how-to-install-nodejs/)
- in english: [How to install node](https://nodejs.dev/en/learn/how-to-install-nodejs/)

I recommand to install using nvm so that you can manage your node versions.

### Cloning the project:

- Using SSH: `git clone git@github.com:Popysid/Olympic-Games-Telesport.git`
- Using Https: `git clone https://github.com/Popysid/Olympic-Games-Telesport.git`

I recommand to use SSH.

### Starting the Application locally:

Once the project is cloned on your project, navigate to the root folder in your prefered code editor terminal and run `npm install` to generate the **node-modules** folder and pull the dependencies.

It's up to you, but [VS Code](https://code.visualstudio.com/download) is a good open source free IDE for Frontend development.

You could also check your Angular CLI and node versions with `ng version` if your Angular CLI and Node versions are not compatible, a warning will show up.

### Starting the Development server:

Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The application should be up and running on the Home page. Once you have modified a file, don't forget to save (**Ctrl + S** or **Cmd + S**) to automatically see your changes applied on yourt Frontend.

### Testing the application:

Run `ng test` to start the components and services tests. It will open a browser on your machine and run the tests. (*.spec.ts files)
All **8 provided tests** should pass. If not, research on the internet with the error message displayed.

### Building the application: 

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

## How to contribute:

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `commons` folder: contains common components such as header and footer that are shared amongst pages.
- `pages` folder: contains components used for routing such as Home and Details pages.
- `core` folder: contains the business logic (`services` and `models` folders)
- `utils` folder: contains the utilities to centralize the wording and the constants used everywhere in the application.

I recommand to follow [KISS](https://fr.wikipedia.org/wiki/Principe_KISS) and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principles.

---

## Versions:

- **v1.4** since 11/05/2023, Revised version: fixed issue with style import in not found component.
- **v1.3** since 08/05/2023, Final version: Added missing comments annd access modifiers.
- **v1.2** since 08/05/2023, Exam version: Fixed some tests and added comments and readme.
- **v1.1** since 05/05/2023, Responsive version: Implemented responsive design and further enhancements.
- **v1.0** since 16/04/2023, first MVP: fonctional web application with the required features. (not responsive)


