export interface Widget {
  id: string;
  name: string;
  size: number;
  direction: "horizontally" | "vertically";
  count: number;
  placed: boolean
}

export interface Widgets {
  [key: string]: Widget | null;
}
