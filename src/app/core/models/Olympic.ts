// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import { Participations } from "./Participation";

export class Olympic {
  id!: number;
  country!: string;
  participations!: Participations[]

  // public data: any;

    // /**
    //  * constructor
    //  * @param id
    //  * @param country
    //  * @param participations
    //  */
    // constructor(
    //     public id: number,
    //     public country :string,
    //     public participations: Array<Participations>
    // ){
    //     alert('it works'); // just a check
    // }
}
// }
