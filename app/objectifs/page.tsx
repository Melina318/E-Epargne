'use client';

import { useState } from 'react';
import { Plus, Calendar, Target } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ObjectiveCard } from '@/components/ui/objective-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockObjectives as initialObjectives } from '@/lib/mockData';

const categories = [
  'Vacances', 'Transport', 'Sécurité', 'Immobilier', 'Éducation', 
  'Santé', 'Technologie', 'Loisirs', 'Famille', 'Autre'
];

export default function ObjectifsPage() {
  const [objectives, setObjectives] = useState(initialObjectives);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newObjective, setNewObjective] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const objective = {
      id: Date.now(),
      name: newObjective.name,
      targetAmount: parseInt(newObjective.targetAmount),
      currentAmount: 0,
      deadline: newObjective.deadline,
      category: newObjective.category
    };
    
    setObjectives([...objectives, objective]);
    setNewObjective({ name: '', targetAmount: '', deadline: '', category: '' });
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewObjective(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes objectifs</h1>
              <p className="text-gray-600">
                Gérez vos objectifs d'épargne et suivez vos progrès
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel objectif
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel objectif</DialogTitle>
                  <DialogDescription>
                    Définissez un nouvel objectif d'épargne pour atteindre vos rêves
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'objectif</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Voyage en Europe"
                      value={newObjective.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target">Montant cible (FCFA)</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="500000"
                      value={newObjective.targetAmount}
                      onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Date d'échéance</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newObjective.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Créer l'objectif
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total objectifs</p>
                    <p className="text-2xl font-bold text-gray-900">{objectives.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Montant total visé</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('fr-FR').format(
                        objectives.reduce((sum, obj) => sum + obj.targetAmount, 0)
                      )} FCFA
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progression moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(objectives.reduce((sum, obj) => sum + (obj.currentAmount / obj.targetAmount), 0) / objectives.length * 100)}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objectives Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Tous mes objectifs</CardTitle>
              <CardDescription>
                Suivez la progression de tous vos objectifs d'épargne
              </CardDescription>
            </CardHeader>
            <CardContent>
              {objectives.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {objectives.map((objective) => (
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
              ) : (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun objectif pour le moment
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Commencez par créer votre premier objectif d'épargne
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer mon premier objectif
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}