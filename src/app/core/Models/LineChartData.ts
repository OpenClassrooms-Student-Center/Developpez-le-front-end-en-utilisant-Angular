/**
 * Represents the data structure for a line chart.
 *
 * @property name - The name of the line or data series.
 * @property series - An array of data points, each containing a name and a numeric value.
 */
export interface LineChartData {
    name: string,
    series: {
        name: string,
        value: number
    }[]
}