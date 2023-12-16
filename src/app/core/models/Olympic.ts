/**
 * Interface de représentation du modèle de données Olympic
 */
import {Participation} from "./Participation";

export interface Olympic {
  "id": number,
  "country": string,
  "participations": Participation[]
}
