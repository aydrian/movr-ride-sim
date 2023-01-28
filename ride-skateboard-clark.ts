import type { Identity } from "./types";
import { simulateRide } from "./utils";
import directions from "./directions/crl-dbbq.json";

// Clark Koala
const user: Identity = {
  id: "684e800f-8a71-41f7-b39d-972797a9b81c",
  city: "new york"
};

// Green Skateboard
const vehicle: Identity = {
  id: "e23d19a4-2497-4173-a889-1e9ebf7d6bc8",
  city: "new york"
};

simulateRide(user, vehicle, directions);
