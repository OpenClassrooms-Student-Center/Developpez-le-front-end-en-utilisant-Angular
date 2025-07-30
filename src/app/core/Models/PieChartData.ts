
/**
 * Represents the data structure for a pie chart.
 *
 * @property name - The name of the pie slice (e.g., country name).
 * @property value - The numeric value associated with the pie slice (e.g., number of medals).
 * @property id - A unique identifier for the pie slice.
 */
export interface PieChartData {
    name: string,
    value: number,
    id: number
}