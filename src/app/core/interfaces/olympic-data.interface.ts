/**
 * Represents a participation record.
 * @interface
 */
export interface Participation {
  /**
   * @type {number} The unique identifier for the participation.
   */
  id: number;
  /**
   * @type {number} The year of the participation.
   */
  year: number;
  /**
   * @type {string} The city where the participation took place.
   */
  city: string;
  /**
   * @type {number} The number of medals earned during the participation.
   */
  medalsCount: number;
  /**
   * @type {number} The count of athletes who participated.
   */
  athleteCount: number;
}

/**
 * Represents a country's information.
 * @interface
 */
export interface Country {
  /**
   * @type {number} The unique identifier for the country.
   */
  id: number;
  /**
   * @type {country} The name of the country.
   */
  country: string;
  /**
   * @type {Participation[]} An array of participation records for the country.
   */
  participationAmount: Participation[];
}

/**
 * Represents an array of countries' data.
 * @interface
 */
export interface OlympicData extends Array<Country> {}
