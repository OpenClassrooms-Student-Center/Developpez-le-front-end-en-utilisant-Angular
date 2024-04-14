/**
 * Export de l'interface MedalData qui va nous permettre de sauvegarder
 *  en tableau les données utiliser pour créee le graphique en pie-chart
 * de du composant medal-country-chart pour l'injecter dans la page home
 */
export interface MedalData {
  /** Name en type string pour le nom du pays  */
  name: string;
  /** Value pour garder la valeur des totaux de médails pour chaques pays */
  value: number;
  /** Un extra pour sauver l'id afin de le récupérer pour l'utiliser ( exemple arriver sur la page détail en sortant l'id du pays) */
  extra: { id: number };
}



