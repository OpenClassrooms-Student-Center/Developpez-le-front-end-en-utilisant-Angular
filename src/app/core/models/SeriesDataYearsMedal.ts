
/**
 * Interface: MedalData pour créer un objet serie pour notre grapjique en ligne des médails par année.
 */
export interface SeriesDataYearsMedal {
  /** name de type string  */
  name: string;
  /** series de type liste avec value et number afin de la remplir avec les autres resultat de l'interface par le service olympicService.ts */
  series: {  value: number ; name: string }[];
}

