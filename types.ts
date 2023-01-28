export type Identity = {
  id: string;
  city: string;
};

type Coords = number[];

export type Directions = {
  start_address: string;
  end_address: string;
  city: string;
  path: Coords[];
};
