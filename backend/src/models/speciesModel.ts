export interface ConservationMeasure {
  code: string;
  title: string;
}
export interface Species {
  name: string;
  identifier: string;
  category: string;
  class: string;
  conservationMeasures: ConservationMeasure[];
}
