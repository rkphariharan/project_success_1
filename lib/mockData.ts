export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  ownerName: string;
  contact: string;
  email: string;
  kmRun: number;
  complaints: string;
  deliveryDate: string;
  status: 'In Service' | 'Completed' | 'Pending Delivery';
  serviceType: 'General Maintenance' | 'Major Repair' | 'Body Work' | 'Electrical' | 'AC Service';
  serviceCharge: number;
  intakeDate: string;
}

export interface DailyStats {
  date: string;
  intake: number;
  delivery: number;
}

export interface ServiceDistribution {
  name: string;
  value: number;
  fill: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'Honda City',
    model: 'VX',
    year: 2020,
    fuelType: 'Petrol',
    ownerName: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    kmRun: 45000,
    complaints: 'Engine noise and AC cooling issue',
    deliveryDate: '2026-10-12',
    status: 'In Service',
    serviceType: 'General Maintenance',
    serviceCharge: 8500,
    intakeDate: '2026-10-06',
  },
  {
    id: '2',
    name: 'Maruti Swift',
    model: 'ZXi',
    year: 2019,
    fuelType: 'Petrol',
    ownerName: 'Priya Sharma',
    contact: '+91 87654 32109',
    email: 'priya.sharma@example.com',
    kmRun: 62000,
    complaints: 'Brake pads replacement needed',
    deliveryDate: '2026-10-10',
    status: 'Completed',
    serviceType: 'Major Repair',
    serviceCharge: 12000,
    intakeDate: '2026-10-04',
  },
  {
    id: '3',
    name: 'Hyundai Creta',
    model: 'SX',
    year: 2021,
    fuelType: 'Diesel',
    ownerName: 'Amit Patel',
    contact: '+91 76543 21098',
    email: 'amit.patel@example.com',
    kmRun: 38000,
    complaints: 'Routine service and oil change',
    deliveryDate: '2026-10-09',
    status: 'Pending Delivery',
    serviceType: 'General Maintenance',
    serviceCharge: 5500,
    intakeDate: '2026-10-05',
  },
  {
    id: '4',
    name: 'Tata Nexon',
    model: 'XZ+',
    year: 2022,
    fuelType: 'Electric',
    ownerName: 'Sneha Reddy',
    contact: '+91 65432 10987',
    email: 'sneha.reddy@example.com',
    kmRun: 15000,
    complaints: 'Battery health check and software update',
    deliveryDate: '2026-10-11',
    status: 'In Service',
    serviceType: 'Electrical',
    serviceCharge: 7000,
    intakeDate: '2026-10-07',
  },
  {
    id: '5',
    name: 'Mahindra XUV700',
    model: 'AX7',
    year: 2023,
    fuelType: 'Diesel',
    ownerName: 'Vikram Singh',
    contact: '+91 54321 09876',
    email: 'vikram.singh@example.com',
    kmRun: 22000,
    complaints: 'Suspension issues and wheel alignment',
    deliveryDate: '2026-10-13',
    status: 'In Service',
    serviceType: 'Major Repair',
    serviceCharge: 15000,
    intakeDate: '2026-10-06',
  },
  {
    id: '6',
    name: 'Kia Seltos',
    model: 'GTX',
    year: 2021,
    fuelType: 'Petrol',
    ownerName: 'Neha Gupta',
    contact: '+91 43210 98765',
    email: 'neha.gupta@example.com',
    kmRun: 51000,
    complaints: 'AC compressor replacement',
    deliveryDate: '2026-10-08',
    status: 'Completed',
    serviceType: 'AC Service',
    serviceCharge: 18000,
    intakeDate: '2026-10-03',
  },
];

export const dailyStats: DailyStats[] = [
  { date: 'Oct 1', intake: 4, delivery: 3 },
  { date: 'Oct 2', intake: 3, delivery: 5 },
  { date: 'Oct 3', intake: 5, delivery: 2 },
  { date: 'Oct 4', intake: 6, delivery: 4 },
  { date: 'Oct 5', intake: 4, delivery: 6 },
  { date: 'Oct 6', intake: 7, delivery: 3 },
  { date: 'Oct 7', intake: 5, delivery: 5 },
];

export const serviceDistribution: ServiceDistribution[] = [
  { name: 'General Maintenance', value: 35, fill: '#a855f7' },
  { name: 'Major Repair', value: 30, fill: '#c084fc' },
  { name: 'Body Work', value: 15, fill: '#e9d5ff' },
  { name: 'Electrical', value: 12, fill: '#fbbf24' },
  { name: 'AC Service', value: 8, fill: '#fde68a' },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Apr', revenue: 145000 },
  { month: 'May', revenue: 168000 },
  { month: 'Jun', revenue: 152000 },
  { month: 'Jul', revenue: 178000 },
  { month: 'Aug', revenue: 195000 },
  { month: 'Sep', revenue: 182000 },
  { month: 'Oct', revenue: 210000 },
];
