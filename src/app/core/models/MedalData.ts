/**
 * Represents a country's medal data for a specific year.
 */
export interface MedalData {
    /**
     * The name of the country.
     */
    name: string;

    /**
     * An array of medal data for different years.
     */
    series: MedalYearData[];
}

/**
 * Represents medal data for a specific year.
 */
export interface MedalYearData {
    /**
     * The year of the event.
     */
    name: string;

    /**
     * The number of medals won in this year.
     */
    value: number;
}
