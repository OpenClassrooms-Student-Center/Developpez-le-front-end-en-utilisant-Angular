

import { Participation } from "./Participation";

/**
 * Represents an Olympic entity with its unique identifier, country name,
 * and a list of participations in Olympic events.
 *
 * @property id - The unique identifier for the Olympic entity.
 * @property country - The name of the country participating in the Olympics.
 * @property participations - An array of Participation objects representing the country's participations.
 */
export interface Olympic {
     id: number,
     country: string,
     participations: Participation[]

}

