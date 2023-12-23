/**
 * Represents data for entries, medals, and athletes for a specific event.
 */
export interface EntriesMedalsAthletes {
    /**
     * The number of entries for the event.
     */
    entries: number;

    /**
     * The number of medals won during the event.
     */
    medals: number;

    /**
     * The number of athletes who participated in the event.
     */
    athletes: number;
}
