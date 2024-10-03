export interface Product {
    id: number;
    name: string;
    color: string;
    sales: number;
  }
  
  export const topProducts: Product[] = [
    { id: 1, name: 'Mechanic', color: 'info.main', sales: 45 },
    { id: 2, name: 'Workshop', color: 'success.main', sales: 29 },
    { id: 3, name: 'Advocate', color: 'secondary.dark', sales: 18 },
    { id: 4, name: 'Crane Services', color: 'warning.dark', sales: 25 },
  ];
  