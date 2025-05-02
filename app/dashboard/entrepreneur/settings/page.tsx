"use client";

import { useState } from "react";
import { User, Building, Mail, Phone, Lock, Bell, CreditCard, Shield, ChevronRight, Globe, Users, FileText, Wallet } from "lucide-react";

export default function Settings() {
  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+33 6 12 34 56 78",
    company: "Entreprise Doe",
    siret: "123 456 789 00012",
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    role: "Entrepreneur"
  });

  const sections = [
    {
      title: "Profil",
      icon: User,
      items: [
        {
          title: "Informations personnelles",
          description: "Mettez à jour vos informations personnelles",
          link: "#"
        },
        {
          title: "Entreprise",
          description: "Gérez les informations de votre entreprise",
          link: "#"
        },
        {
          title: "Adresse",
          description: "Modifiez votre adresse professionnelle",
          link: "#"
        }
      ]
    },
    {
      title: "Sécurité",
      icon: Shield,
      items: [
        {
          title: "Mot de passe",
          description: "Changez votre mot de passe",
          link: "#"
        },
        {
          title: "Authentification à deux facteurs",
          description: "Renforcez la sécurité de votre compte",
          link: "#"
        },
        {
          title: "Historique des connexions",
          description: "Consultez l'activité de votre compte",
          link: "#"
        }
      ]
    },
    {
      title: "Paiements",
      icon: Wallet,
      items: [
        {
          title: "Coordonnées bancaires",
          description: "Gérez vos informations bancaires",
          link: "#"
        },
        {
          title: "Factures automatiques",
          description: "Configurez la génération automatique",
          link: "#"
        },
        {
          title: "Historique des transactions",
          description: "Consultez vos transactions",
          link: "#"
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          title: "Préférences de notification",
          description: "Personnalisez vos notifications",
          link: "#"
        },
        {
          title: "Emails",
          description: "Gérez vos préférences d'emails",
          link: "#"
        },
        {
          title: "Alertes SMS",
          description: "Configurez les alertes par SMS",
          link: "#"
        }
      ]
    },
    {
      title: "Documents",
      icon: FileText,
      items: [
        {
          title: "Documents légaux",
          description: "Gérez vos documents administratifs",
          link: "#"
        },
        {
          title: "Modèles",
          description: "Personnalisez vos modèles de documents",
          link: "#"
        }
      ]
    },
    {
      title: "Équipe",
      icon: Users,
      items: [
        {
          title: "Membres",
          description: "Gérez les accès de votre équipe",
          link: "#"
        },
        {
          title: "Rôles et permissions",
          description: "Définissez les droits d'accès",
          link: "#"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">Paramètres</h2>
        <p className="text-gray-500 mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#dd7109] to-[#ff9f4d] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-semibold text-white">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <button className="px-4 py-2 bg-[#dd7109] text-white rounded-lg hover:bg-[#dd7109]/90 transition-colors">
                Modifier le profil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-[#dd7109]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entreprise</p>
                  <p className="font-medium text-gray-900">{user.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#dd7109]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">SIRET</p>
                  <p className="font-medium text-gray-900">{user.siret}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#dd7109]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#dd7109]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dd7109]/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-[#dd7109]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.link}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-100">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Zone de danger</h3>
        <p className="text-red-600 mb-4">Ces actions sont irréversibles, procédez avec précaution</p>
        <div className="space-y-3">
          <button className="w-full sm:w-auto px-4 py-2 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-sm">
            Désactiver le compte
          </button>
          <button className="w-full sm:w-auto px-4 py-2 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-sm">
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}