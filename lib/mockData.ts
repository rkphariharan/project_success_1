export interface Car {
  vin: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  mileage: number;
  price: number;
  color: string;
  status: 'available' | 'pending' | 'sold' | 'service';
  daysInInventory: number;
  condition: 'new' | 'used' | 'certified';
}

export const cars: Car[] = [
  {
    vin: "5UXCR6C0XL9C74429",
    make: "BMW",
    model: "X5",
    trim: "M50i",
    year: 2023,
    mileage: 8500,
    price: 82500,
    color: "Alpine White",
    status: "available",
    daysInInventory: 12,
    condition: "used"
  },
  {
    vin: "1G1YZ23J9P5800001",
    make: "Mercedes-Benz",
    model: "S-Class",
    trim: "S 500 4MATIC",
    year: 2022,
    mileage: 15200,
    price: 89500,
    color: "Obsidian Black",
    status: "available",
    daysInInventory: 23,
    condition: "certified"
  },
  {
    vin: "WBAPL7C55CB000123",
    make: "Porsche",
    model: "911",
    trim: "Carrera S",
    year: 2023,
    mileage: 3200,
    price: 135000,
    color: "Guards Red",
    status: "pending",
    daysInInventory: 8,
    condition: "used"
  },
  {
    vin: "5YJSA1E26HF200456",
    make: "Audi",
    model: "RS7",
    trim: "Performance",
    year: 2022,
    mileage: 12800,
    price: 118000,
    color: "Nardo Grey",
    status: "available",
    daysInInventory: 31,
    condition: "certified"
  },
  {
    vin: "WAUZZZ4G7DN123789",
    make: "Lexus",
    model: "LS",
    trim: "500 F Sport",
    year: 2023,
    mileage: 5400,
    price: 92000,
    color: "Sonic Silver",
    status: "sold",
    daysInInventory: 15,
    condition: "used"
  },
  {
    vin: "JN1AZ4EH8FM456321",
    make: "Range Rover",
    model: "Sport",
    trim: "Autobiography",
    year: 2022,
    mileage: 18500,
    price: 98500,
    color: "Santorini Black",
    status: "available",
    daysInInventory: 27,
    condition: "used"
  }
];

export const revenueData = {
  totalSold: 2450000,
  monthlyAverage: 408333,
  yearToDate: 14700000
};

export const inventoryByStatus = [
  { name: "Available", value: 4 },
  { name: "Pending", value: 1 },
  { name: "Sold", value: 1 }
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 380000 },
  { month: "Feb", revenue: 420000 },
  { month: "Mar", revenue: 485000 },
  { month: "Apr", revenue: 445000 },
  { month: "May", revenue: 520000 },
  { month: "Jun", revenue: 495000 },
  { month: "Jul", revenue: 540000 },
  { month: "Aug", revenue: 580000 },
  { month: "Sep", revenue: 615000 },
  { month: "Oct", revenue: 650000 },
  { month: "Nov", revenue: 620000 },
  { month: "Dec", revenue: 695000 }
];
