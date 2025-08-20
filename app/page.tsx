import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { banksData } from '@/lib/mockData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: 'Objectifs personnalisés',
      description: 'Définissez vos objectifs d\'épargne et suivez vos progrès en temps réel'
    },
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Vos données sont protégées par les plus hauts standards de sécurité'
    },
    {
      icon: TrendingUp,
      title: 'Croissance optimisée',
      description: 'Maximisez vos économies avec nos stratégies d\'épargne intelligentes'
    },
    {
      icon: Users,
      title: 'Banques partenaires',
      description: 'Connecté aux principales banques du Gabon pour votre tranquillité'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Épargnez
                <span className="text-emerald-600"> intelligemment</span>
                <br />
                Atteignez vos
                <span className="text-blue-600"> objectifs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                E-Epargne vous aide à gérer votre épargne de manière simple et efficace. 
                Définissez vos objectifs, suivez vos progrès et réalisez vos rêves financiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bank-selection">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                    Créer un compte
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    Se connecter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir E-Epargne ?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Une plateforme complète pour gérer votre épargne avec simplicité et sécurité
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Banks Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos banques partenaires
              </h2>
              <p className="text-xl text-gray-600">
                E-Epargne travaille en partenariat avec les principales banques du Gabon
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {banksData.map((bank) => (
                <Card key={bank.id} className="p-6 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src={bank.logo}
                          alt={`${bank.name} logo`}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900">{bank.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Commencez votre parcours d'épargne dès aujourd'hui
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur façon d'épargner
            </p>
            <Link href="/bank-selection">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                Créer mon compte gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}