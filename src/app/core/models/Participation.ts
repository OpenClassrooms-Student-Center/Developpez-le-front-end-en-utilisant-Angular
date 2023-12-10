/**
 * Represents a participation instance, detailing a country's involvement in an event.
 */
export interface Participation {
    /**
     * The unique identifier of the participation.
     */
    id: number;

    /**
     * The year of the event.
     */
    year: number;

    /**
     * The city where the event took place.
     */
    city: string;

    /**
     * The number of medals won during this participation.
     */
    medalsCount: number;

    /**
     * The number of athletes who participated in this event.
     */
    athleteCount: number;
}


