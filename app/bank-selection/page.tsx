'use client';

import BankSelectionForm from '@/components/BankSelectionForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function BankSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <BankSelectionForm />
      </main>
      <Footer />
    </div>
  );
}
