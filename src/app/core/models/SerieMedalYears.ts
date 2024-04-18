import { SeriesDataYear } from "./SerieDataYear";

/**
 * Interface: MedalData pour créer un objet serie pour notre grapjique en ligne des médails par année.
 */
export interface SerieMedalYears {
  /** name de type string pour acceuille le nom de la série */
  name: string;
  /** serie avec l'appélation de l'interface SerieDataYear qui est un tableau  */
  series: SeriesDataYear[];
}


