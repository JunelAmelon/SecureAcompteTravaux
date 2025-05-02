"use client";

import { useState } from "react";
import { Search, Filter, Plus, ChevronRight, Mail, Phone, MapPin, Building2, Calendar, ArrowUpRight, FileText, CheckCircle, Clock, XCircle } from "lucide-react";

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  projectsCount: number;
  totalBudget: number;
  status: "Actif" | "En attente" | "Inactif";
  lastContact: string;
  image?: string;
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const [clients] = useState<Client[]>([
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      company: "Dupont & Fils",
      address: "123 Avenue des Champs-Élysées, 75008 Paris",
      projectsCount: 3,
      totalBudget: 450000,
      status: "Actif",
      lastContact: "2024-03-15",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Martin",
      email: "marie.martin@email.com",
      phone: "+33 6 98 76 54 32",
      company: "Martin Immobilier",
      address: "45 Rue de la République, 69002 Lyon",
      projectsCount: 1,
      totalBudget: 180000,
      status: "En attente",
      lastContact: "2024-03-10",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      firstName: "Pierre",
      lastName: "Dubois",
      email: "pierre.dubois@email.com",
      phone: "+33 6 11 22 33 44",
      company: "Dubois Construction",
      address: "78 Boulevard Longchamp, 13001 Marseille",
      projectsCount: 2,
      totalBudget: 320000,
      status: "Actif",
      lastContact: "2024-03-05",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    }
  ]);

  const stats = [
    {
      title: "Total clients",
      value: "45",
      trend: "+12.5%",
      description: "vs. mois dernier"
    },
    {
      title: "Clients actifs",
      value: "28",
      trend: "+8.2%",
      description: "vs. mois dernier"
    },
    {
      title: "Nouveaux clients",
      value: "12",
      trend: "+15.3%",
      description: "vs. mois dernier"
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active") return matchesSearch && client.status === "Actif";
    if (activeFilter === "pending") return matchesSearch && client.status === "En attente";
    if (activeFilter === "inactive") return matchesSearch && client.status === "Inactif";
    return matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Actif":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "En attente":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Inactif":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Clients</h1>
              <p className="text-amber-100 mt-1">Gérez vos relations clients</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  showFilters 
                    ? 'bg-white text-[#dd7109] shadow-md' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
              <button 
                onClick={() => setShowNewClientModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau client</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.trend}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
              </div>
              <div className="mt-3 h-1 w-full bg-gradient-to-r from-[#dd7109]/30 to-amber-300 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un client..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "all" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Tous
                </button>
                <button 
                  onClick={() => setActiveFilter("active")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "active" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Actifs
                </button>
                <button 
                  onClick={() => setActiveFilter("pending")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "pending" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  En attente
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100/50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projets</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>Avec projets</option>
                    <option>Sans projet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget total</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>{"< 100 000 €"}</option>
                    <option>100 000 € - 500 000 €</option>
                    <option>{"> 500 000 €"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dernier contact</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>7 derniers jours</option>
                    <option>30 derniers jours</option>
                    <option>3 derniers mois</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div 
              key={client.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={`${client.firstName} ${client.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#dd7109] to-amber-500 flex items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {client.firstName[0]}{client.lastName[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">
                        {client.firstName} {client.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{client.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.status === "Actif"
                        ? "bg-green-100 text-green-700"
                        : client.status === "En attente"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{client.projectsCount} projets</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Dernier contact : {new Date(client.lastContact).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Budget total</span>
                        <span className="font-medium text-gray-900">
                          {client.totalBudget.toLocaleString()} €
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#dd7109] to-amber-500 rounded-full"
                          style={{ width: `${(client.totalBudget / 500000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 text-[#dd7109] hover:text-[#dd7109]/90 font-medium group">
                  <span>Voir le profil</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Nouveau Client */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouveau Client</h2>
              <p className="text-amber-100 text-sm mt-1">Ajoutez un nouveau client</p>
            </div>
            
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Jean"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: jean.dupont@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: +33 6 12 34 56 78"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Dupont & Fils"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: 123 Avenue des Champs-Élysées, 75008 Paris"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewClientModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Créer le client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}