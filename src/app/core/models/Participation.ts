// TODO: create here a typescript interface for a participation
/*
example of participation:
{
    id: 1,
    year: 2012,
    city: "Londres",
    medalsCount: 28,
    athleteCount: 372
}
*/
/**
 * Export de l'interface Participation à appeler dans olympics.ts
 * import du model participation dedans
 */

export interface Participation {
  /** id de type number */
  id: number;
  /** years de type number  */
  year: number;
  /** cuity de type string */
  city: string;
  /** medalcount de type number */
  medalsCount: number;
  /** athlete de type number */
  athleteCount: number;
}
