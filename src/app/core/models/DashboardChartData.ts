/**
 * Classe de définition du modèle de données pour l'affichage dans le DashBoard
 */
export class DashboardChartData {

  private extra : ExtraDatas;

  constructor(public id : number, public name : string, public value : number) {
    this.extra = new ExtraDatas(id);
  }

  public getName() : string {
    return this.name;
  }
  public getValue():number {
    return this.value
  }
  getId(): number {
    return this.extra.id;
  }
}

class ExtraDatas {

  constructor(public id: number) {
  }

  public getId() : number {
    return this.id;
  }

}
