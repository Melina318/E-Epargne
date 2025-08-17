import Link from 'next/link';
import { Banknote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Banknote className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">E-Epargne</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre plateforme d'épargne digitale pour atteindre vos objectifs financiers 
              en partenariat avec les principales banques du Gabon.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-300 hover:text-emerald-400 transition-colors">Tableau de bord</Link></li>
              <li><Link href="/objectifs" className="text-gray-300 hover:text-emerald-400 transition-colors">Mes objectifs</Link></li>
              <li><Link href="/portefeuille" className="text-gray-300 hover:text-emerald-400 transition-colors">Portefeuille</Link></li>
              <li><Link href="/profil" className="text-gray-300 hover:text-emerald-400 transition-colors">Mon profil</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">À propos</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">CGU</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 E-Epargne. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}