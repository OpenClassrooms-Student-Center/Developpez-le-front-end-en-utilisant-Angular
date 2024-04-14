// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { Participation } from "./Participation";

/**
 * Export de l'interface Olympics
 * import du model participation dedans
 */

export interface Olympic {
  /** id de type number  */
  id: number;
  /** country de type string */
  country: string;
  /** participation tableau de l'interface participation */
  participations: Participation[];
}
