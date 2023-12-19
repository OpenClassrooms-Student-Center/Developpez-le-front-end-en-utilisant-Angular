import {id} from "@swimlane/ngx-charts";

/**
 * Classe de définition du modèle de données pour l'affichage dans le DashBoard
 */
export class ChartData {

  public extra : ExtraDatas;
  public name !: string;
  public value !: number;

  constructor(id : number, name : string, value : number) {
    this.name = name;
    this.value = value;
    this.extra = new ExtraDatas(id);
  }
}

export class ExtraDatas {
  constructor(public id: number) {}
}
