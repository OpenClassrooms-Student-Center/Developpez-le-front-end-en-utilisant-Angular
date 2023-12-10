import { Participation } from "./Participation";

/**
 * Represents a country with its basic information and participations.
 */
export interface Country {
    /**
     * The unique identifier of the country.
     */
    id: number;

    /**
     * The name of the country.
     */
    country: string;

    /**
     * An array of Participation objects representing the country's participations.
     */
    participations: Participation[];
}
