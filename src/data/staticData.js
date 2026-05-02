// =====================================================
// STATIC DATA - Smart QR-Based Access & Payment System
// =====================================================

// ---- USERS ----
export const users = [
  {
    id: 'USR001',
    name: 'Yashwanth Myakala',
    email: 'yashwanth@example.com',
    phone: '+91 98765 43210',
    avatar: null,
    role: 'admin',
    joinDate: '2025-01-15',
    vehicles: ['VH001', 'VH002'],
  },
  {
    id: 'USR002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 87654 32109',
    avatar: null,
    role: 'user',
    joinDate: '2025-03-22',
    vehicles: ['VH003'],
  },
  {
    id: 'USR003',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 76543 21098',
    avatar: null,
    role: 'user',
    joinDate: '2025-05-10',
    vehicles: ['VH004', 'VH005'],
  },
  {
    id: 'USR004',
    name: 'Ananya Reddy',
    email: 'ananya.r@example.com',
    phone: '+91 65432 10987',
    avatar: null,
    role: 'operator',
    joinDate: '2025-02-28',
    vehicles: ['VH006'],
  },
  {
    id: 'USR005',
    name: 'Karthik Nair',
    email: 'karthik.n@example.com',
    phone: '+91 54321 09876',
    avatar: null,
    role: 'user',
    joinDate: '2025-07-01',
    vehicles: ['VH007'],
  },
];

// ---- VEHICLES ----
export const vehicles = [
  { id: 'VH001', userId: 'USR001', plateNumber: 'TS 09 AB 1234', type: 'Car', model: 'Hyundai Creta', color: 'White', year: 2024 },
  { id: 'VH002', userId: 'USR001', plateNumber: 'TS 09 CD 5678', type: 'SUV', model: 'Toyota Fortuner', color: 'Black', year: 2023 },
  { id: 'VH003', userId: 'USR002', plateNumber: 'AP 31 EF 9012', type: 'Car', model: 'Maruti Swift', color: 'Red', year: 2025 },
  { id: 'VH004', userId: 'USR003', plateNumber: 'KA 01 GH 3456', type: 'Truck', model: 'Tata Ace', color: 'Blue', year: 2022 },
  { id: 'VH005', userId: 'USR003', plateNumber: 'KA 01 IJ 7890', type: 'Car', model: 'Honda City', color: 'Silver', year: 2024 },
  { id: 'VH006', userId: 'USR004', plateNumber: 'TN 07 KL 2345', type: 'Bike', model: 'Royal Enfield Classic', color: 'Green', year: 2023 },
  { id: 'VH007', userId: 'USR005', plateNumber: 'MH 12 MN 6789', type: 'Car', model: 'Tata Nexon EV', color: 'Teal', year: 2025 },
];

// ---- TOLL PLAZAS ----
export const tollPlazas = [
  {
    id: 'TP001',
    name: 'Hyderabad - Vijayawada Expressway',
    location: 'Panthangi, Telangana',
    coordinates: { lat: 17.1234, lng: 79.4567 },
    lanes: 6,
    operatingHours: '24/7',
    status: 'active',
  },
  {
    id: 'TP002',
    name: 'Bangalore - Mysore Highway',
    location: 'Ramanagara, Karnataka',
    coordinates: { lat: 12.7234, lng: 77.2890 },
    lanes: 4,
    operatingHours: '24/7',
    status: 'active',
  },
  {
    id: 'TP003',
    name: 'Mumbai - Pune Expressway',
    location: 'Khalapur, Maharashtra',
    coordinates: { lat: 18.8567, lng: 73.2345 },
    lanes: 8,
    operatingHours: '24/7',
    status: 'active',
  },
  {
    id: 'TP004',
    name: 'Chennai - Trichy NH',
    location: 'Ulundurpettai, Tamil Nadu',
    coordinates: { lat: 11.7891, lng: 79.3456 },
    lanes: 4,
    operatingHours: '24/7',
    status: 'maintenance',
  },
  {
    id: 'TP005',
    name: 'Delhi - Jaipur Expressway',
    location: 'Manesar, Haryana',
    coordinates: { lat: 28.3567, lng: 76.9345 },
    lanes: 6,
    operatingHours: '24/7',
    status: 'active',
  },
];

// ---- TOLL RATES ----
export const tollRates = [
  { plazaId: 'TP001', vehicleType: 'Car', singleJourney: 155, returnJourney: 235, monthlyPass: 3500 },
  { plazaId: 'TP001', vehicleType: 'SUV', singleJourney: 255, returnJourney: 385, monthlyPass: 5500 },
  { plazaId: 'TP001', vehicleType: 'Truck', singleJourney: 530, returnJourney: 795, monthlyPass: 12000 },
  { plazaId: 'TP001', vehicleType: 'Bike', singleJourney: 65, returnJourney: 95, monthlyPass: 1200 },
  { plazaId: 'TP002', vehicleType: 'Car', singleJourney: 120, returnJourney: 180, monthlyPass: 2800 },
  { plazaId: 'TP002', vehicleType: 'SUV', singleJourney: 200, returnJourney: 300, monthlyPass: 4500 },
  { plazaId: 'TP002', vehicleType: 'Truck', singleJourney: 420, returnJourney: 630, monthlyPass: 9500 },
  { plazaId: 'TP002', vehicleType: 'Bike', singleJourney: 50, returnJourney: 75, monthlyPass: 900 },
  { plazaId: 'TP003', vehicleType: 'Car', singleJourney: 295, returnJourney: 445, monthlyPass: 6500 },
  { plazaId: 'TP003', vehicleType: 'SUV', singleJourney: 445, returnJourney: 670, monthlyPass: 9800 },
  { plazaId: 'TP003', vehicleType: 'Truck', singleJourney: 870, returnJourney: 1305, monthlyPass: 18000 },
  { plazaId: 'TP003', vehicleType: 'Bike', singleJourney: 120, returnJourney: 180, monthlyPass: 2500 },
  { plazaId: 'TP004', vehicleType: 'Car', singleJourney: 95, returnJourney: 140, monthlyPass: 2200 },
  { plazaId: 'TP004', vehicleType: 'SUV', singleJourney: 165, returnJourney: 245, monthlyPass: 3800 },
  { plazaId: 'TP004', vehicleType: 'Truck', singleJourney: 340, returnJourney: 510, monthlyPass: 7800 },
  { plazaId: 'TP004', vehicleType: 'Bike', singleJourney: 40, returnJourney: 60, monthlyPass: 750 },
  { plazaId: 'TP005', vehicleType: 'Car', singleJourney: 185, returnJourney: 280, monthlyPass: 4200 },
  { plazaId: 'TP005', vehicleType: 'SUV', singleJourney: 310, returnJourney: 465, monthlyPass: 6800 },
  { plazaId: 'TP005', vehicleType: 'Truck', singleJourney: 640, returnJourney: 960, monthlyPass: 14000 },
  { plazaId: 'TP005', vehicleType: 'Bike', singleJourney: 80, returnJourney: 120, monthlyPass: 1600 },
];

// ---- PARKING LOTS ----
export const parkingLots = [
  {
    id: 'PL001',
    name: 'Inorbit Mall Parking',
    location: 'Hitech City, Hyderabad',
    totalSpots: 500,
    availableSpots: 127,
    type: 'Multi-level',
    ratePerHour: 40,
    maxDailyRate: 250,
    status: 'active',
  },
  {
    id: 'PL002',
    name: 'Phoenix MarketCity',
    location: 'Whitefield, Bangalore',
    totalSpots: 800,
    availableSpots: 342,
    type: 'Basement',
    ratePerHour: 50,
    maxDailyRate: 300,
    status: 'active',
  },
  {
    id: 'PL003',
    name: 'KIMS Hospital Parking',
    location: 'Secunderabad, Telangana',
    totalSpots: 200,
    availableSpots: 45,
    type: 'Open',
    ratePerHour: 20,
    maxDailyRate: 120,
    status: 'active',
  },
  {
    id: 'PL004',
    name: 'TechPark Tower Parking',
    location: 'HITEC City, Hyderabad',
    totalSpots: 1200,
    availableSpots: 89,
    type: 'Multi-level',
    ratePerHour: 30,
    maxDailyRate: 200,
    status: 'full',
  },
];

// ---- GATED COMMUNITIES ----
export const communities = [
  {
    id: 'GC001',
    name: 'Prestige Lakeside Habitat',
    location: 'Whitefield, Bangalore',
    totalUnits: 3500,
    registeredResidents: 2800,
    gates: 4,
    securityLevel: 'High',
    status: 'active',
  },
  {
    id: 'GC002',
    name: 'My Home Bhooja',
    location: 'Kokapet, Hyderabad',
    totalUnits: 800,
    registeredResidents: 650,
    gates: 2,
    securityLevel: 'Premium',
    status: 'active',
  },
  {
    id: 'GC003',
    name: 'DLF Cyber City Residences',
    location: 'Gurugram, Haryana',
    totalUnits: 1200,
    registeredResidents: 980,
    gates: 3,
    securityLevel: 'High',
    status: 'active',
  },
];

// ---- TOLL TRANSACTIONS ----
export const tollTransactions = [
  {
    id: 'TT001', date: '2026-04-20 09:15:00', userId: 'USR001', vehicleId: 'VH001',
    plazaId: 'TP001', journeyType: 'Single', amount: 155, status: 'completed',
    qrCode: 'TOLL-TT001-2026', paymentMethod: 'Wallet',
  },
  {
    id: 'TT002', date: '2026-04-20 08:30:00', userId: 'USR002', vehicleId: 'VH003',
    plazaId: 'TP002', journeyType: 'Return', amount: 180, status: 'completed',
    qrCode: 'TOLL-TT002-2026', paymentMethod: 'UPI',
  },
  {
    id: 'TT003', date: '2026-04-19 14:45:00', userId: 'USR003', vehicleId: 'VH004',
    plazaId: 'TP003', journeyType: 'Single', amount: 870, status: 'completed',
    qrCode: 'TOLL-TT003-2026', paymentMethod: 'Card',
  },
  {
    id: 'TT004', date: '2026-04-19 11:20:00', userId: 'USR005', vehicleId: 'VH007',
    plazaId: 'TP005', journeyType: 'Single', amount: 185, status: 'completed',
    qrCode: 'TOLL-TT004-2026', paymentMethod: 'Wallet',
  },
  {
    id: 'TT005', date: '2026-04-18 16:55:00', userId: 'USR001', vehicleId: 'VH002',
    plazaId: 'TP003', journeyType: 'Return', amount: 670, status: 'completed',
    qrCode: 'TOLL-TT005-2026', paymentMethod: 'UPI',
  },
  {
    id: 'TT006', date: '2026-04-18 07:10:00', userId: 'USR004', vehicleId: 'VH006',
    plazaId: 'TP001', journeyType: 'Single', amount: 65, status: 'completed',
    qrCode: 'TOLL-TT006-2026', paymentMethod: 'Wallet',
  },
  {
    id: 'TT007', date: '2026-04-17 20:30:00', userId: 'USR002', vehicleId: 'VH003',
    plazaId: 'TP005', journeyType: 'Single', amount: 185, status: 'failed',
    qrCode: 'TOLL-TT007-2026', paymentMethod: 'Card',
  },
  {
    id: 'TT008', date: '2026-04-17 13:00:00', userId: 'USR003', vehicleId: 'VH005',
    plazaId: 'TP001', journeyType: 'Return', amount: 235, status: 'completed',
    qrCode: 'TOLL-TT008-2026', paymentMethod: 'UPI',
  },
];

// ---- PARKING SESSIONS ----
export const parkingSessions = [
  {
    id: 'PS001', lotId: 'PL001', vehicleId: 'VH001', userId: 'USR001',
    entryTime: '2026-04-20 10:00:00', exitTime: '2026-04-20 13:30:00',
    duration: '3h 30m', amount: 140, status: 'completed',
    qrCode: 'PARK-PS001-2026', spotNumber: 'A-42',
  },
  {
    id: 'PS002', lotId: 'PL002', vehicleId: 'VH003', userId: 'USR002',
    entryTime: '2026-04-20 09:15:00', exitTime: null,
    duration: null, amount: null, status: 'active',
    qrCode: 'PARK-PS002-2026', spotNumber: 'B-17',
  },
  {
    id: 'PS003', lotId: 'PL003', vehicleId: 'VH007', userId: 'USR005',
    entryTime: '2026-04-20 08:00:00', exitTime: '2026-04-20 10:00:00',
    duration: '2h 0m', amount: 40, status: 'completed',
    qrCode: 'PARK-PS003-2026', spotNumber: 'C-05',
  },
  {
    id: 'PS004', lotId: 'PL001', vehicleId: 'VH005', userId: 'USR003',
    entryTime: '2026-04-19 14:00:00', exitTime: '2026-04-19 18:45:00',
    duration: '4h 45m', amount: 200, status: 'completed',
    qrCode: 'PARK-PS004-2026', spotNumber: 'A-89',
  },
  {
    id: 'PS005', lotId: 'PL004', vehicleId: 'VH002', userId: 'USR001',
    entryTime: '2026-04-20 07:30:00', exitTime: null,
    duration: null, amount: null, status: 'active',
    qrCode: 'PARK-PS005-2026', spotNumber: 'D-12',
  },
];

// ---- ACCESS LOGS (Gated Communities) ----
export const accessLogs = [
  {
    id: 'AL001', communityId: 'GC001', visitorName: 'Amazon Delivery',
    type: 'delivery', entryTime: '2026-04-20 10:30:00', exitTime: '2026-04-20 10:45:00',
    gate: 'Gate 1', status: 'completed', qrCode: 'ACC-AL001-2026',
    unitNumber: 'T5-1204', approvedBy: 'Resident App',
  },
  {
    id: 'AL002', communityId: 'GC002', visitorName: 'Ravi Kumar',
    type: 'visitor', entryTime: '2026-04-20 11:00:00', exitTime: null,
    gate: 'Gate 1', status: 'inside', qrCode: 'ACC-AL002-2026',
    unitNumber: 'B3-502', approvedBy: 'Security',
  },
  {
    id: 'AL003', communityId: 'GC001', visitorName: 'Swiggy Delivery',
    type: 'delivery', entryTime: '2026-04-20 12:15:00', exitTime: '2026-04-20 12:30:00',
    gate: 'Gate 3', status: 'completed', qrCode: 'ACC-AL003-2026',
    unitNumber: 'T2-804', approvedBy: 'Resident App',
  },
  {
    id: 'AL004', communityId: 'GC003', visitorName: 'Meera Patel',
    type: 'visitor', entryTime: '2026-04-19 15:00:00', exitTime: '2026-04-19 19:30:00',
    gate: 'Gate 2', status: 'completed', qrCode: 'ACC-AL004-2026',
    unitNumber: 'A7-301', approvedBy: 'Resident App',
  },
  {
    id: 'AL005', communityId: 'GC002', visitorName: 'Plumber Service',
    type: 'service', entryTime: '2026-04-20 09:00:00', exitTime: '2026-04-20 11:30:00',
    gate: 'Gate 2', status: 'completed', qrCode: 'ACC-AL005-2026',
    unitNumber: 'A1-102', approvedBy: 'Security',
  },
  {
    id: 'AL006', communityId: 'GC001', visitorName: 'Daily Maid',
    type: 'recurring', entryTime: '2026-04-20 07:00:00', exitTime: '2026-04-20 10:00:00',
    gate: 'Gate 4', status: 'completed', qrCode: 'ACC-AL006-2026',
    unitNumber: 'T8-1501', approvedBy: 'Pre-approved Pass',
  },
];

// ---- DASHBOARD STATISTICS ----
export const dashboardStats = {
  totalTransactions: 15847,
  totalRevenue: 2345680,
  activeUsers: 12450,
  qrScansToday: 3456,
  avgProcessingTime: '1.2s',
  systemUptime: '99.97%',
  tollPassesToday: 1245,
  parkingSessionsToday: 892,
  accessScansToday: 1319,
  revenueGrowth: 12.5,
  userGrowth: 8.3,
  transactionGrowth: 15.2,
};

// ---- REVENUE DATA (Last 7 days) ----
export const revenueData = [
  { day: 'Mon', toll: 45000, parking: 28000, access: 5000 },
  { day: 'Tue', toll: 52000, parking: 31000, access: 6200 },
  { day: 'Wed', toll: 48000, parking: 25000, access: 5800 },
  { day: 'Thu', toll: 61000, parking: 34000, access: 7100 },
  { day: 'Fri', toll: 58000, parking: 38000, access: 8500 },
  { day: 'Sat', toll: 72000, parking: 42000, access: 9200 },
  { day: 'Sun', toll: 65000, parking: 39000, access: 7800 },
];

// ---- NOTIFICATIONS ----
export const notifications = [
  { id: 1, type: 'success', message: 'Toll payment of ₹155 processed successfully', time: '2 min ago' },
  { id: 2, type: 'info', message: 'New parking session started at Inorbit Mall', time: '15 min ago' },
  { id: 3, type: 'warning', message: 'TechPark Tower Parking is now full', time: '1 hr ago' },
  { id: 4, type: 'success', message: 'Access pass generated for visitor Ravi Kumar', time: '2 hr ago' },
  { id: 5, type: 'error', message: 'Payment failed for transaction TT007', time: '3 hr ago' },
];

// ---- HELPER FUNCTIONS ----
export const getUserById = (id) => users.find(u => u.id === id);
export const getVehicleById = (id) => vehicles.find(v => v.id === id);
export const getPlazaById = (id) => tollPlazas.find(p => p.id === id);
export const getLotById = (id) => parkingLots.find(l => l.id === id);
export const getCommunityById = (id) => communities.find(c => c.id === id);
export const getVehiclesByUser = (userId) => vehicles.filter(v => v.userId === userId);
export const getTollRate = (plazaId, vehicleType) => tollRates.find(r => r.plazaId === plazaId && r.vehicleType === vehicleType);

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

export const formatDateTime = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};
