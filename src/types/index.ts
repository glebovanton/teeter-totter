export enum Color {
  Green = "green",
  Red = "red",
  Yellow = "yellow",
  Grey = "grey",
}

export interface Figure {
  color: string;
  id: number;
  left: number;
  scale: number;
  top: number;
  type: FigureType;
  weight: number;
}

export enum FigureType {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
}

export interface ListItems {
  [key: string]: string;
}
