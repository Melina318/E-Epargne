export const banksData = [
  { id: 1, name: 'BICIG', logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: 2, name: 'UBA', logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: 3, name: 'ORABANK', logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: 4, name: 'BGFI BANK', logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
];

export const mockUser = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  phone: '+241 01 23 45 67',
  bank: 'BICIG',
  totalBalance: 850000,
  availableBalance: 320000
};

export const mockObjectives = [
  {
    id: 1,
    name: 'Voyage en Europe',
    targetAmount: 500000,
    currentAmount: 320000,
    deadline: '2024-12-31',
    category: 'Vacances'
  },
  {
    id: 2,
    name: 'Achat voiture',
    targetAmount: 2000000,
    currentAmount: 750000,
    deadline: '2025-06-30',
    category: 'Transport'
  },
  {
    id: 3,
    name: 'Fonds d\'urgence',
    targetAmount: 300000,
    currentAmount: 180000,
    deadline: '2024-08-31',
    category: 'Sécurité'
  }
];

export const budgetCategories = [
  { name: 'Nourriture', amount: 150000, color: '#10B981' },
  { name: 'Loyer', amount: 200000, color: '#3B82F6' },
  { name: 'Vacances', amount: 80000, color: '#8B5CF6' },
  { name: 'Taxi', amount: 50000, color: '#F59E0B' },
  { name: 'Abonnement', amount: 25000, color: '#EF4444' },
  { name: 'Électricité', amount: 30000, color: '#06B6D4' },
  { name: 'Eau', amount: 20000, color: '#84CC16' },
  { name: 'Vêtements', amount: 60000, color: '#F97316' }
];

export const mockTransactions = [
  { id: 1, date: '2024-01-15', description: 'Épargne automatique', amount: 50000, type: 'credit' },
  { id: 2, date: '2024-01-10', description: 'Retrait objectif voyage', amount: -25000, type: 'debit' },
  { id: 3, date: '2024-01-05', description: 'Versement initial', amount: 100000, type: 'credit' },
  { id: 4, date: '2023-12-28', description: 'Épargne mensuelle', amount: 75000, type: 'credit' },
  { id: 5, date: '2023-12-20', description: 'Ajustement portefeuille', amount: 30000, type: 'credit' }
];