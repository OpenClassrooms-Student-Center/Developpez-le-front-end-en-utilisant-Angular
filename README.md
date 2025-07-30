# Olympic Games Dashboard

An interactive, responsive Angular application that visualizes past Olympic Games data with charts. Users can:

* View a **pie chart** of total medals per country.
* Click on any country slice to navigate to a **detail page**.
* On the detail page, see:

  * Total number of participations
  * Total number of medals
  * Total number of athletes
  * A **bar chart** of medals by edition
* Return to the dashboard at any time.

Fully responsive—no external CSS framework required.

---

##  Features

* **Home / Dashboard**

  * Pie chart of \[country → total medals]
  * Summary stats: number of editions (JOs), number of countries
  * Clickable slices that route to detail pages

* **Country Detail**

  * Displays:

    * Number of participations
    * Total medals
    * Total athletes
  * Bar chart showing medals per edition
  * “Back to Home” link

* **Data service**

  * Loads `assets/mock/olympic.json` once at app start
  * Provides an RxJS `Observable<Olympic[]>` to all components
  * Utility function to sum medals or athletes

---

## Technologies Used

* Node.js: 22.16.0
* Angular CLI: 20.0.3
* Package Manager: npm 11.4.2

## How to Use

1. Launch the app (`ng serve`).
2. On the **Home** page:

   * View the pie chart of total medals.
   * Hover or click on slices to see tooltip & navigate.
3. On a **Country Detail** page:

   * Read summary stats at the top.
   * Explore the bar chart showing medals per year.
   * Click “Back to Home” to return.

---

## Author

Abubaker ISMAIL NEMAIRY
