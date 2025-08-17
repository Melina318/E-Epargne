'use client';

import { useState } from 'react';
import { User, Settings, History, Shield, Edit, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockUser, mockTransactions } from '@/lib/mockData';

export default function ProfilPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [editData, setEditData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate profile update
    console.log('Profile updated:', editData);
    setIsEditDialogOpen(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password change (disabled for demo)
    console.log('Password change requested');
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
            <p className="text-gray-600">
              Gérez vos informations personnelles et vos paramètres de sécurité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-emerald-600" />
                      Informations personnelles
                    </CardTitle>
                    <CardDescription>
                      Vos informations de base et coordonnées
                    </CardDescription>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Modifier mes informations</DialogTitle>
                        <DialogDescription>
                          Mettez à jour vos informations personnelles
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Nom complet</Label>
                          <Input
                            id="edit-name"
                            value={editData.name}
                            onChange={(e) => handleEditInputChange('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={editData.email}
                            onChange={(e) => handleEditInputChange('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-phone">Téléphone</Label>
                          <Input
                            id="edit-phone"
                            value={editData.phone}
                            onChange={(e) => handleEditInputChange('phone', e.target.value)}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Enregistrer les modifications
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nom complet</Label>
                      <p className="text-gray-900 font-medium">{mockUser.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-gray-900 font-medium">{mockUser.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Téléphone</Label>
                      <p className="text-gray-900 font-medium">{mockUser.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Banque associée</Label>
                      <p className="text-gray-900 font-medium">{mockUser.bank}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2 text-blue-600" />
                    Historique des transactions
                  </CardTitle>
                  <CardDescription>
                    Vos dernières opérations d'épargne et retraits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === 'credit' ? 'default' : 'destructive'}>
                              {transaction.type === 'credit' ? 'Crédit' : 'Débit'}
                            </Badge>
                          </TableCell>
                          <TableCell className={`text-right font-medium ${
                            transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{new Intl.NumberFormat('fr-FR').format(transaction.amount)} FCFA
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-purple-600" />
                    Paramètres de sécurité
                  </CardTitle>
                  <CardDescription>
                    Gérez la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mot de passe</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Dernière modification il y a 2 mois
                    </p>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                            disabled
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                            disabled
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                          disabled
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled
                        variant="outline"
                      >
                        Modifier le mot de passe
                        <span className="text-xs text-gray-500 ml-2">(Inactif)</span>
                      </Button>
                    </form>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Sécurité du compte</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Authentification à deux facteurs</span>
                        <Badge variant="outline">Désactivée</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Notifications de sécurité</span>
                        <Badge>Activées</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sessions actives</span>
                        <span className="text-sm font-medium">1 appareil</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}