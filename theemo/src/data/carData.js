// src/data/carData.js

export const carData = [
  {
    id: 'car001',
    make: "Maruti Suzuki",
    model: "Alto K10",
    type: "Micro",
    // --- THIS IS YOUR NEW, UPDATED IMAGE URL ---
    imageUrl: "https://www.marutisuzuki.com/adobe/dynamicmedia/deliver/dm-aid--e116082e-6253-4c71-9a42-f4a32031a768/Navigation_1920x1080_Alto.jpg?preferwebp=true&quality=80",
    baseRatePerDay: 1000,
    perKmCharge: 8,
  },
  {
    id: 'car002',
    make: "Honda",
    model: "City",
    type: "Sedan",
    // This is the working link from before
    imageUrl: "https://www.hondacarindia.com/_next/image?url=https%3A%2F%2Fwww.hondacarindia.com%2Fweb-data%2Fmodels%2FcarModelImage%2Fcity5thGeneration%2FCity-Desktop.png&w=1920&q=75",
    baseRatePerDay: 1800,
    perKmCharge: 11,
  },
  {
    id: 'car003',
    make: "Hyundai",
    model: "Creta",
    type: "SUV",
    // This is the working link from before
    imageUrl: "https://media.zigcdn.com/media/model/2024/Jan/hyundai-creta-2024_360x240.jpg",
    baseRatePerDay: 2500,
    perKmCharge: 13,
  },
];