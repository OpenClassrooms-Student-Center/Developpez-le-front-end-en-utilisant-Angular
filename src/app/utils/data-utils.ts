// Utility class to centralize usfull constants and functions.
import { Breakpoints } from "@angular/cdk/layout";
import { Olympic } from "../core/models/Olympic";

/**
 * utils function to get the total number of medals from an Olympic model.
 * @param olympic the wanted Olympic model.
 * @returns the total number of medals.
 */
export function getTotalMedals(olympic: Olympic): number {
  let total:number = 0;
  olympic.participations.forEach(participation => total += participation.medalsCount);
  return total;
}

/**
 * utils function to get the total numbr of athletes from an Olympic model.
 * @param olympic the wanted Olympic model.
 * @returns the total number of athletes.
 */
export function getTotalAthletes(olympic: Olympic): number {
    let total:number = 0;
    olympic.participations.forEach(participation => total += participation.athleteCount);
    return total;
}

/**
 * Constant to list in an Array the theme main colors.
 */
export const colors = [
    '#1B8A44',
    '#711313',
    '#A0811C',
    '#1a0f0f',
    '#324F8C'
  ];

/**
 * Constant to list in an Array the theme background colors.
 */
export const backgrounds = [
  '#52D683',
  '#D66363',
  '#FAD45A',
  '#665D5D',
  '#6E96EB'
];

  /**
   * Constant mapping the different screen sizes breakpoint states into its string value.
   */
  export const screenSizes = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);