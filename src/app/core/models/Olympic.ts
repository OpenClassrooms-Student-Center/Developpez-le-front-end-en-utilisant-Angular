
import { Participation } from "./Participation";
// La classe Participation est importée dans la classe Olympic afin de l'utiliser danS une de ces propriétés
export class Olympic {

    // Définition de la classe Olympic avec les propriété suivantes : 
/*
exemple pour un pays olympique:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
    id!: number;
    country!: string;
    participations!: Participation[]; 

}