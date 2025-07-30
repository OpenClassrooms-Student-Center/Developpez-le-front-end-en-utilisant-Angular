
import { Injectable } from "@angular/core";
import { LineChartData } from "../Models/LineChartData";
import { Olympic } from "../Models/Olympic";

/**
 * Service to transform Olympic data into a format suitable for line chart visualization.
 *
 * @remarks
 * This service provides a method to convert an `Olympic` object into a `LineChartData` object,
 * which can be used by charting libraries to render line charts.
 *
 * @method toLineChartData
 * Converts an `Olympic` object into a `LineChartData` object.
 *
 * @param olympic - The Olympic data object containing country and participations.
 * @returns A `LineChartData` object with the country's name and a series of medal counts per year.
 */
@Injectable({
  providedIn: 'root'
})

export class ToLineChartService {

  toLineChartData(olympic: Olympic): LineChartData {
    return {
      name: olympic.country,
      series: olympic.participations.map(participation =>
      ({
        name: participation.year.toString(),
        value: participation.medalsCount
      })
      )
    };
  }

}