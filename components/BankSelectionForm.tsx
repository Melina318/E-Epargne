'use client';

import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { banksData } from '@/lib/mockData';

export default function BankSelectionForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    // Validation simple du PIN
    const pin = String(payload.pin || '');
    const pinConfirm = String(payload.pinConfirm || '');
    if (pin.length < 4 || pin.length > 6 || pin !== pinConfirm) {
      alert('Le code PIN doit contenir 4 à 6 chiffres et correspondre à la confirmation.');
      return;
    }
    console.log('Compte épargne - demande d\'ouverture:', payload);
    alert('Votre demande d\'ouverture de compte Épargne a été envoyée.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ouvrir un compte Épargne</h1>
        <p className="mt-2 text-lg text-gray-600">
          Remplissez le formulaire pour finaliser l'ouverture de votre compte après avoir choisi votre banque partenaire.
        </p>
      </div>

      <form
        className="space-y-8"
        onSubmit={handleSubmit}
      >
        {/* 0. Choix de la banque */}
        <div className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
          <Label className="text-lg font-semibold">Banque partenaire</Label>
          <Select name="bank" required>
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Sélectionnez votre banque" />
            </SelectTrigger>
            <SelectContent>
              {banksData.map((bank) => (
                <SelectItem key={bank.id} value={bank.name} className="text-base">
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 1. Informations personnelles */}
        <div className="space-y-6 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">1. Informations personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom et prénom</Label>
              <Input id="fullName" name="fullName" type="text" placeholder="Votre nom complet" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Date de naissance</Label>
              <Input id="birthdate" name="birthdate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone (mobile money)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+241 01 23 45 67" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" name="email" type="email" placeholder="vous@email.com" required />
            </div>
          </div>
        </div>

        {/* 2. Informations d’identification */}
        <div className="space-y-6 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">2. Informations d’identification</h3>
          <div className="space-y-4">
            <Label className="text-base">Type de pièce d’identité</Label>
            <RadioGroup name="idType" defaultValue="cni" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="cni" id="id-cni" />
                <span>CNI</span>
              </label>
              <label className="flex items-center space-x-3 rounded-md border p-4 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="passport" id="id-passport" />
                <span>Passeport</span>
              </label>
              <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-gray-50">
                <RadioGroupItem value="other" id="id-other" />
                <Input name="idTypeOther" placeholder="Autre" className="h-8 border-0 focus:ring-0" />
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="idNumber">Numéro de la pièce</Label>
              <Input id="idNumber" name="idNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idExpiry">Date d’expiration</Label>
              <Input id="idExpiry" name="idExpiry" type="date" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="idFile">Téléversement de la pièce (PDF, JPG, PNG)</Label>
              <Input id="idFile" name="idFile" type="file" accept="image/*,application/pdf" required className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"/>
            </div>
          </div>
        </div>

        {/* 3. Paramètres du compte Épargne */}
        <div className="space-y-6 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">3. Paramètres du compte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initialDeposit">Dépôt initial (XAF)</Label>
              <Input id="initialDeposit" name="initialDeposit" type="number" min="0" placeholder="Ex: 50000" />
            </div>
            <div className="space-y-2">
              <Label>Fréquence d’alimentation</Label>
              <RadioGroup name="fundingFrequency" defaultValue="mensuelle" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2 rounded-md border p-3 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="hebdomadaire" id="freq-hebdo" />
                  <span className="text-sm">Hebdo</span>
                </label>
                <label className="flex items-center space-x-2 rounded-md border p-3 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="mensuelle" id="freq-mens" />
                  <span className="text-sm">Mensuelle</span>
                </label>
                <label className="flex items-center space-x-2 rounded-md border p-3 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="flexible" id="freq-flex" />
                  <span className="text-sm">Flexible</span>
                </label>
              </RadioGroup>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Source de dépôt</Label>
              <RadioGroup name="depositSource" defaultValue="airtel" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3 rounded-md border p-4 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="airtel" id="src-airtel" />
                  <span>Airtel Money</span>
                </label>
                <label className="flex items-center space-x-3 rounded-md border p-4 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="moov" id="src-moov" />
                  <span>Moov Money</span>
                </label>
                <label className="flex items-center space-x-3 rounded-md border p-4 justify-center hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="virement" id="src-bank" />
                  <span>Virement</span>
                </label>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* 4. Sécurité et validation */}
        <div className="space-y-6 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">4. Sécurité et validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pin">Code PIN (4-6 chiffres)</Label>
              <Input id="pin" name="pin" type="password" pattern="\\d{4,6}" inputMode="numeric" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinConfirm">Confirmation du PIN</Label>
              <Input id="pinConfirm" name="pinConfirm" type="password" pattern="\\d{4,6}" inputMode="numeric" required />
            </div>
          </div>
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox id="terms" name="terms" required />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              J’ai lu et j’accepte les <a href="#" className="font-medium text-emerald-600 hover:underline">conditions générales d’utilisation</a> et la <a href="#" className="font-medium text-emerald-600 hover:underline">politique de confidentialité</a>.
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit" size="lg" className="bg-emerald-600 hover:bg-emerald-700">Ouvrir mon compte Épargne</Button>
        </div>
      </form>
    </div>
  );
}
