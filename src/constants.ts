
export const GLOBAL_DATA = {
  user: {
    name: "คุณสมชาย รักพลังงาน",
    id: "1-1209-XXXXX",
    email: "somchai.energy@mail.com",
    phone: "081-234-5678",
    houseNo: "123 หมู่ 5",
    location: "ต.เมือง จ.ชลบุรี",
    zipCode: "20000",
    joinDate: "12 มกราคม 2026",
    role: "ผู้ใช้งานทั่วไป (General User)",
    fullAddress: "123 หมู่ 5 ต.เมือง จ.ชลบุรี 20000"
  },
  stats: {
    productionThisMonth: 115.00,
    recIssued: 555.00,
    recSold: 405.00,
    recBalance: 110.00,
    revenue: 810.00,
    co2Saved: 335.00,
    inverterCount: 2,
    assetCount: 2,
    unit: "kWh"
  },
  assets: [
    { 
      id: '1', 
      meterId: 'PEA-77421', 
      name: 'Household Solar', 
      type: 'Solar Cell', 
      technology: 'Solar Rooftop',
      capacity: '5.5 kWp', 
      location: 'Chonburi Site', 
      production: 115, 
      status: 'Active',
      techSpec: {
        modules: 'Jinko Solar Tiger Pro 540W (10 Panels)',
        inverter: 'Huawei SUN2000-5KTL-L1',
        serialNumber: 'HV2190044532',
        cod: '2025-05-15'
      },
      connection: {
        gps: '13.3611° N, 100.9847° E',
        interconnectionPoint: 'PEA Chonburi Area 1 (Low Voltage)',
        voltage: '22-33 KV',
        lastOnline: 'Online'
      },
      monthlyData: [
        { month: 'พ.ย.', year: '2568', production: 110, sold: 0.11, status: 'ขายสำเร็จ', date: '05/12/2568' },
        { month: 'ธ.ค.', year: '2568', production: 95, sold: 0.09, status: 'ขายสำเร็จ', date: '10/01/2569' },
        { month: 'ม.ค.', year: '2569', production: 145, sold: 0.14, status: 'ขายสำเร็จ', date: '08/02/2569' },
        { month: 'ก.พ.', year: '2569', production: 85, sold: 0.08, status: 'ขายสำเร็จ', date: '12/03/2569' },
        { month: 'มี.ค.', year: '2569', production: 120, sold: 0.10, status: 'ขายสำเร็จ', date: '09/04/2569' },
        { month: 'เม.ย.', year: '2569', production: 115, sold: 0, status: 'รอการขาย', date: '-' },
      ]
    },
    { 
      id: '2', 
      meterId: 'PEA-99231', 
      name: 'Business Solar', 
      type: 'Solar Cell', 
      technology: 'Solar Rooftop',
      capacity: '10.0 kWp', 
      location: 'Chonburi Site 2', 
      production: 1850, 
      status: 'Active',
      techSpec: {
        modules: 'Longi Hi-MO 5 545W (18 Panels)',
        inverter: 'Sungrow SG10RT',
        serialNumber: 'SG220300991',
        cod: '2025-08-20'
      },
      connection: {
        gps: '13.3855° N, 101.0123° E',
        interconnectionPoint: 'PEA Chonburi Area 2 (Medium Voltage)',
        voltage: '22-33 KV',
        lastOnline: 'Online'
      },
      monthlyData: [
        { month: 'พ.ย.', year: '2568', production: 1750, sold: 1.75, status: 'ขายสำเร็จ', date: '05/12/2568' },
        { month: 'ธ.ค.', year: '2568', production: 1600, sold: 1.60, status: 'ขายสำเร็จ', date: '10/01/2569' },
        { month: 'ม.ค.', year: '2569', production: 1950, sold: 1.95, status: 'ขายสำเร็จ', date: '08/02/2569' },
        { month: 'ก.พ.', year: '2569', production: 1550, sold: 1.55, status: 'ขายสำเร็จ', date: '12/03/2569' },
        { month: 'มี.ค.', year: '2569', production: 1800, sold: 1.80, status: 'ขายสำเร็จ', date: '09/04/2569' },
        { month: 'เม.ย.', year: '2569', production: 1850, sold: 0, status: 'รอการขาย', date: '-' },
      ]
    }
  ],
  chartData: [
    { name: 'พ.ย.', energy: 1860 },
    { name: 'ธ.ค.', energy: 1695 },
    { name: 'ม.ค.', energy: 2095 },
    { name: 'ก.พ.', energy: 1635 },
    { name: 'มี.ค.', energy: 1920 },
    { name: 'เม.ย.', energy: 1965 },
  ]
};
