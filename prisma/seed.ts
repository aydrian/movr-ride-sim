import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  // 2 users
  const user = await db.users.create({
    data: {
      city: "new york",
      name: "Atticus Howard",
      address: "550 W 45th St, New York, NY  10036",
      credit_card: "4485183881229611"
    },
    select: { id: true }
  });
  await db.users.createMany({
    data: [
      {
        city: "new york",
        name: "Craig Cockroach",
        address: "125 W 25th St, New York, NY  10001",
        credit_card: "4024007151343711"
      },
      {
        city: "new york",
        name: "Clark Koala",
        address: "100 5th Ave, New York, NY  10011",
        credit_card: "4024007160964069"
      }
    ]
  });
  // 2 vehicles, scooter and skateborad
  await db.vehicles.createMany({
    data: [
      {
        city: "new york",
        type: "scooter",
        owner_id: user.id,
        creation_time: new Date(),
        status: "available",
        current_location: "125 W 25th St, New York, NY  10001",
        ext: { color: "red" }
      },
      {
        city: "new york",
        type: "skateboard",
        owner_id: user.id,
        creation_time: new Date(),
        status: "available",
        current_location: "100 5th Ave, New York, NY  10011",
        ext: { color: "green" }
      }
    ]
  });
}

seed();
