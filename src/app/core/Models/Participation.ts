/**
 * Represents a participation entry for a country in the Olympics.
 *
 * @property id - The unique identifier for the participation entry.
 * @property year - The year of the Olympic event.
 * @property city - The city hosting the Olympic event.
 */
export interface Participation {

  id: number,
  year: number,
  city: string,
  medalsCount: number,
  athleteCount: number

}

