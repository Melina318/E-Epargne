'use client';

import { Wallet, Target, TrendingUp, PiggyBank } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/stat-card';
import { ObjectiveCard } from '@/components/ui/objective-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUser, mockObjectives, budgetCategories } from '@/lib/mockData';

const monthlyData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Fév', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Avr', amount: 61000 },
  { month: 'Mai', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

export default function DashboardPage() {
  const totalObjectives = mockObjectives.length;
  const completedObjectives = mockObjectives.filter(obj => (obj.currentAmount / obj.targetAmount) >= 1).length;
  const avgProgress = Math.round(mockObjectives.reduce((sum, obj) => sum + (obj.currentAmount / obj.targetAmount), 0) / totalObjectives * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bonjour, {mockUser.name.split(' ')[0]} !
            </h1>
            <p className="text-gray-600">
              Voici un aperçu de vos finances et objectifs d'épargne
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Solde total"
              value={`${new Intl.NumberFormat('fr-FR').format(mockUser.totalBalance)} FCFA`}
              subtitle="Toutes banques confondues"
              icon={Wallet}
              iconColor="text-emerald-600"
            />
            <StatCard
              title="Disponible"
              value={`${new Intl.NumberFormat('fr-FR').format(mockUser.availableBalance)} FCFA`}
              subtitle="Prêt à épargner"
              icon={PiggyBank}
              iconColor="text-blue-600"
            />
            <StatCard
              title="Objectifs"
              value={`${completedObjectives}/${totalObjectives}`}
              subtitle="Objectifs atteints"
              icon={Target}
              iconColor="text-purple-600"
            />
            <StatCard
              title="Progression"
              value={`${avgProgress}%`}
              subtitle="Moyenne des objectifs"
              icon={TrendingUp}
              iconColor="text-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Portfolio Chart */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Répartition du budget</CardTitle>
                <CardDescription>Visualisation de votre portefeuille</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={budgetCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="amount"
                      label={({ name, value }) => `${name}`}
                    >
                      {budgetCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${new Intl.NumberFormat('fr-FR').format(Number(value))} FCFA`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Savings Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Épargne mensuelle</CardTitle>
                <CardDescription>Vos contributions des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${new Intl.NumberFormat('fr-FR').format(Number(value))} FCFA`} />
                    <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Mes objectifs en cours</CardTitle>
              <CardDescription>Suivez la progression de vos objectifs d'épargne</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockObjectives.map((objective) => (
                  <ObjectiveCard
                    key={objective.id}
                    name={objective.name}
                    targetAmount={objective.targetAmount}
                    currentAmount={objective.currentAmount}
                    deadline={objective.deadline}
                    category={objective.category}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}