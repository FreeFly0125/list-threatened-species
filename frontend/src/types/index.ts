export interface Species {
  taxonid: number;
  scientific_name: string;
  category: string;
  class_name: string;
}

export interface Region {
  name: string;
  identifier: string;
}

export interface Measure {
  name: string;
  identifier: string;
  category: string;
  conservationMeasures:string;
}