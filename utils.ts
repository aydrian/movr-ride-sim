import type { Identity, Directions } from "./types";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateRide(
  user: Identity,
  vehicle: Identity,
  directions: Directions
) {
  console.log(
    `Simulating ride from ${directions.start_address} to ${directions.end_address}.`
  );
  // Reserve vehicle and start ride
  const [rider, currentVehicle, ride] = await db.$transaction([
    db.users.findUnique({
      select: { id: true, city: true, name: true },
      where: { city_id: { id: user.id, city: user.city } }
    }),
    db.vehicles.update({
      data: { status: "in_use" },
      where: { city_id: { id: vehicle.id, city: vehicle.city } },
      select: { id: true, type: true, city: true }
    }),
    db.rides.create({
      data: {
        city: directions.city,
        vehicle_city: vehicle.city,
        rider_id: user.id,
        start_address: directions.start_address,
        start_time: new Date()
      }
    })
  ]);

  console.log(`${rider?.name} reserved a ${currentVehicle.type}`);
  console.log(`Starting ride from ${directions.start_address}`);
  for (const coords of directions.path) {
    await delay(5000);
    console.log(`Moving to: (${coords})`);
    await db.vehicle_location_histories.create({
      data: {
        city: "new york",
        ride_id: ride.id,
        timestamp: new Date(),
        long: coords[0],
        lat: coords[1]
      }
    });
  }

  console.log(`Arrived at ${directions.end_address}.`);
  console.log("Ending ride and releasing vehicle.");
  await db.$transaction([
    db.rides.update({
      where: { city_id: { id: ride.id, city: ride.city } },
      data: {
        end_time: new Date(),
        end_address: "700 W 125th St, New York, NY 10027",
        revenue: 2.75
      }
    }),
    db.vehicles.update({
      where: { city_id: { id: currentVehicle.id, city: currentVehicle.city } },
      data: { status: "available", current_location: directions.end_address }
    })
  ]);

  console.log(`Simulation ended.`);
}
