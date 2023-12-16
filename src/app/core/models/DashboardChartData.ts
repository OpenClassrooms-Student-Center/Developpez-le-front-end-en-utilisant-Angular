/**
 * Classe de définition du modèle de données pour l'affichage dans le DashBoard
 */
export class DashboardChartData {

  constructor(private name : string, private value : number) {
  }

  public getName() : string {
    return this.name;
  }

  public getValue():number {
    return this.value
  }


}
