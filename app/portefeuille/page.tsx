'use client';

import { useState } from 'react';
import { Wallet, PieChart as PieChartIcon, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { budgetCategories as initialBudgetCategories, mockUser } from '@/lib/mockData';

export default function PortefeuillePage() {
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const remainingBalance = mockUser.availableBalance - totalAllocated;

  const handleEditAmount = (categoryName: string, currentAmount: number) => {
    setEditingCategory(categoryName);
    setEditAmount(currentAmount.toString());
    setIsDialogOpen(true);
  };

  const handleSaveAmount = () => {
    if (editingCategory && editAmount) {
      setBudgetCategories(prev => 
        prev.map(cat => 
          cat.name === editingCategory 
            ? { ...cat, amount: parseInt(editAmount) }
            : cat
        )
      );
      setEditingCategory(null);
      setEditAmount('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon portefeuille</h1>
            <p className="text-gray-600">
              Gérez la répartition de votre budget par catégorie
            </p>
          </div>

          {/* Balance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Solde disponible"
              value={`${new Intl.NumberFormat('fr-FR').format(mockUser.availableBalance)} FCFA`}
              subtitle="Total disponible"
              icon={Wallet}
              iconColor="text-emerald-600"
            />
            <StatCard
              title="Budget alloué"
              value={`${new Intl.NumberFormat('fr-FR').format(totalAllocated)} FCFA`}
              subtitle="Réparti dans les catégories"
              icon={PieChartIcon}
              iconColor="text-blue-600"
            />
            <StatCard
              title="Solde restant"
              value={`${new Intl.NumberFormat('fr-FR').format(remainingBalance)} FCFA`}
              subtitle={remainingBalance >= 0 ? "Disponible à répartir" : "Dépassement de budget"}
              icon={Wallet}
              iconColor={remainingBalance >= 0 ? "text-green-600" : "text-red-600"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition du budget</CardTitle>
                <CardDescription>
                  Visualisation de votre allocation budgétaire par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {budgetCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${new Intl.NumberFormat('fr-FR').format(Number(value))} FCFA`, 'Montant']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Categories List */}
            <Card>
              <CardHeader>
                <CardTitle>Catégories de budget</CardTitle>
                <CardDescription>
                  Modifiez les montants alloués à chaque catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">
                          {new Intl.NumberFormat('fr-FR').format(category.amount)} FCFA
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAmount(category.name, category.amount)}
                        >
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Amount Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier le budget - {editingCategory}</DialogTitle>
                <DialogDescription>
                  Ajustez le montant alloué à cette catégorie
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="Entrez le nouveau montant"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveAmount} className="bg-emerald-600 hover:bg-emerald-700">
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Budget Allocation Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Conseils pour une bonne répartition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Règle du 50/30/20</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 50% pour les besoins essentiels (Loyer, Nourriture, etc.)</li>
                    <li>• 30% pour les loisirs et plaisirs</li>
                    <li>• 20% pour l'épargne et les investissements</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Bonnes pratiques</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Priorisez vos objectifs d'épargne</li>
                    <li>• Constituez un fonds d'urgence</li>
                    <li>• Révisez votre budget mensuellement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}