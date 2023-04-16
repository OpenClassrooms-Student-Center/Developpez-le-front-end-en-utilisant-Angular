import { Olympic } from "../core/models/Olympic";

export function getTotalMedals(olympic: Olympic): number {
  let total:number = 0;
  olympic.participations.forEach(participation => total += participation.medalsCount);
  return total;
}

export function getTotalAthletes(data: Olympic): number {
    let total:number = 0;
    data.participations.forEach(participation => total += participation.athleteCount);
    return total;
}

export const colors = [
    '#1B8A44',
    '#711313',
    '#A0811C',
    '#1a0f0f',
    '#324F8C'
  ];


  export const backgrounds = [
    '#52D683',
    '#D66363',
    '#FAD45A',
    '#665D5D',
    '#6E96EB'
  ];