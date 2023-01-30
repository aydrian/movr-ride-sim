import type { Identity } from "./types";
import { simulateRide } from "./utils";
import directions from "./directions/dbbq-met.json";

// Craig Cockroach
const user: Identity = {
  id: "2ba0edc2-3d2b-419e-9a07-db9cfc2aed42",
  city: "new york"
};

// Red Scooter
const vehicle: Identity = {
  id: "26ae3ad5-2c72-4e4a-b17b-44863561d211",
  city: "new york"
};

simulateRide(user, vehicle, directions);
