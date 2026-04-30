export interface RECData {
  id: string;
  seller: string;
  energyType: 'Solar' | 'Wind' | 'Hydro' | 'Biomass';
  price: number;
  amount: number;
  status: 'issued' | 'pending' | 'sold' | 'used';
}

export interface KPIStats {
  energyProduced: number;
  energyChange: number;
  recBalance: number;
  revenue: number;
  co2Reduced: number;
}

export interface Asset {
  id: string;
  meterId: string;
  type: string;
  capacity: string;
  location: string;
  monthlyProduction: number;
}
