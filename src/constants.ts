
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
    productionThisMonth: 4280.00,
    recIssued: 3500.00,
    recSold: 2800.00,
    recBalance: 700.00,
    revenue: 4200.00,
    co2Saved: 842.00,
    inverterCount: 2,
    assetCount: 3,
    unit: "kWh"
  },
  assets: [
    { 
      id: '1', 
      meterId: 'PEA-77421', 
      name: 'Household Solar A', 
      type: 'Solar Cell', 
      technology: 'Solar Rooftop',
      capacity: '5.5 kWp', 
      location: 'Chonburi Site A', 
      production: 4280, 
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
        voltage: '232V',
        lastOnline: 'Online'
      }
    },
    { 
      id: '2', 
      meterId: 'PEA-99231', 
      name: 'Business Solar B', 
      type: 'Solar Cell', 
      technology: 'Solar Farm',
      capacity: '12.0 kWp', 
      location: 'Chonburi Site B', 
      production: 0, 
      status: 'Inactive',
      techSpec: {
        modules: 'Longi Hi-MO 5 545W (22 Panels)',
        inverter: 'Sungrow SG12RT',
        serialNumber: 'SG220300991',
        cod: '2025-11-20'
      },
      connection: {
        gps: '13.3855° N, 101.0123° E',
        interconnectionPoint: 'PEA Chonburi Area 2 (Medium Voltage)',
        voltage: '0V',
        lastOnline: 'Offline'
      }
    },
    { 
      id: '3', 
      meterId: 'PEA-44312', 
      name: 'Home Wind C', 
      type: 'Wind Turbine', 
      technology: 'Vertical Axis Wind Turbine (VAWT)',
      capacity: '1.2 kW', 
      location: 'Chonburi Hill', 
      production: 450, 
      status: 'Active',
      techSpec: {
        modules: 'Aeolos-V 1.2kW Turbine',
        inverter: 'Aeolos Grid-on Controller',
        serialNumber: 'WV3310022',
        cod: '2026-01-10'
      },
      connection: {
        gps: '13.4012° N, 101.1245° E',
        interconnectionPoint: 'PEA Chonburi Area 1 (Low Voltage)',
        voltage: '228V',
        lastOnline: 'Online'
      }
    },
  ],
  chartData: [
    { name: 'พ.ย.', energy: 4000 },
    { name: 'ธ.ค.', energy: 3000 },
    { name: 'ม.ค.', energy: 4280 },
    { name: 'ก.พ.', energy: 2780 },
    { name: 'มี.ค.', energy: 1890 },
    { name: 'เม.ย.', energy: 2390 },
  ]
};
