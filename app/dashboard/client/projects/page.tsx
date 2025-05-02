"use client";

import { useState } from "react";
import { Building2, Plus, Search, Filter, ArrowUpRight, ChevronRight, Calendar, Users, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

interface Broker {
  id: number;
  name: string;
  company: string;
  rating: number;
  projectsCount: number;
  specialties: string[];
  image: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  paidAmount: number;
  startDate: string;
  estimatedEndDate: string;
  status: "En cours" | "En attente" | "Terminé" | "Annulé";
  broker: Broker;
  progress: number;
  type: string;
  location: string;
}

export default function ProjectsPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showBrokerSelectionModal, setShowBrokerSelectionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    budget: "",
    type: "",
    location: "",
    startDate: "",
    estimatedEndDate: "",
  });

  // Sample brokers data
  const brokers: Broker[] = [
    {
      id: 1,
      name: "Jean Dupont",
      company: "Dupont & Associés",
      rating: 4.8,
      projectsCount: 156,
      specialties: ["Résidentiel", "Commercial", "Rénovation"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Marie Lambert",
      company: "Lambert Courtage",
      rating: 4.9,
      projectsCount: 203,
      specialties: ["Luxe", "Résidentiel", "Éco-construction"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Pierre Martin",
      company: "Martin Immobilier",
      rating: 4.7,
      projectsCount: 128,
      specialties: ["Commercial", "Industriel"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    }
  ];

  // Sample projects data
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "Villa Moderne",
      description: "Construction d'une villa contemporaine de 200m²",
      budget: 450000,
      paidAmount: 135000,
      startDate: "2024-03-01",
      estimatedEndDate: "2024-12-31",
      status: "En cours",
      broker: brokers[0],
      progress: 30,
      type: "Résidentiel",
      location: "Aix-en-Provence"
    },
    {
      id: 2,
      name: "Rénovation Appartement",
      description: "Rénovation complète d'un appartement haussmannien",
      budget: 180000,
      paidAmount: 54000,
      startDate: "2024-02-15",
      estimatedEndDate: "2024-08-15",
      status: "En cours",
      broker: brokers[1],
      progress: 45,
      type: "Rénovation",
      location: "Paris"
    }
  ]);

  const stats = [
    {
      title: "Projets actifs",
      value: "2",
      trend: "+50%",
      description: "vs. mois dernier"
    },
    {
      title: "Budget total",
      value: "630 000 €",
      trend: "+25%",
      description: "vs. mois dernier"
    },
    {
      title: "Montant versé",
      value: "189 000 €",
      trend: "+15%",
      description: "vs. mois dernier"
    }
  ];

  const handleNewProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBroker) {
      setShowBrokerSelectionModal(true);
      return;
    }
    // Handle project creation
    setShowNewProjectModal(false);
    setShowPaymentModal(true);
  };

  const handleBrokerSelect = (broker: Broker) => {
    setSelectedBroker(broker);
    setShowBrokerSelectionModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentModal(false);
    setShowPaymentMethodModal(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    // Ici vous intégreriez le SDK de paiement correspondant
    console.log(`Paiement via ${method}`);
    setShowPaymentMethodModal(false);
    // Reset form and refresh projects
    setNewProject({
      name: "",
      description: "",
      budget: "",
      type: "",
      location: "",
      startDate: "",
      estimatedEndDate: ""
    });
    setSelectedBroker(null);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Projets</h1>
              <p className="text-amber-100 mt-1">Gérez vos projets de construction et rénovation</p>
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
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau projet</span>
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
                  placeholder="Rechercher un projet..."
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
                  onClick={() => setActiveFilter("in_progress")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "in_progress" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  En cours
                </button>
                <button 
                  onClick={() => setActiveFilter("completed")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "completed" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Terminés
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100/50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>Résidentiel</option>
                    <option>Commercial</option>
                    <option>Rénovation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>{"< 100 000 €"}</option>
                    <option>100 000 € - 500 000 €</option>
                    <option>{"> 500 000 €"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Toutes</option>
                    <option>Paris</option>
                    <option>Lyon</option>
                    <option>Marseille</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-500 mt-1">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === "En cours" 
                        ? "bg-green-100 text-green-700"
                        : project.status === "En attente"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Budget total</p>
                      <p className="text-lg font-semibold text-gray-900">{project.budget.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Montant versé</p>
                      <p className="text-lg font-semibold text-[#dd7109]">{project.paidAmount.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date de début</p>
                      <p className="text-lg font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date de fin estimée</p>
                      <p className="text-lg font-semibold text-gray-900">{new Date(project.estimatedEndDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progression</span>
                      <span className="font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#dd7109] to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Broker Info */}
                <div className="lg:w-72 flex flex-col justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3">
                      <img 
                        src={project.broker.image} 
                        alt={project.broker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900">{project.broker.name}</h4>
                    <p className="text-sm text-gray-500">{project.broker.company}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">{project.broker.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{project.broker.projectsCount} projets</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full px-4 py-2 bg-[#dd7109] text-white rounded-lg hover:bg-[#dd7109]/90 transition-colors">
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Nouveau Projet */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouveau Projet</h2>
              <p className="text-amber-100 text-sm mt-1">Créez votre nouveau projet de construction</p>
            </div>
            
            <form onSubmit={handleNewProjectSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Villa Moderne"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de projet <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={newProject.type}
                    onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Résidentiel">Résidentiel</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Rénovation">Rénovation</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    rows={3}
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget estimé (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: 450000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin estimée <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newProject.estimatedEndDate}
                    onChange={(e) => setNewProject({...newProject, estimatedEndDate: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Sélection du Courtier */}
      {showBrokerSelectionModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Choisir un Courtier</h2>
              <p className="text-amber-100 text-sm mt-1">Sélectionnez un courtier pour votre projet</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brokers.map((broker) => (
                  <button
                    key={broker.id}
                    onClick={() => handleBrokerSelect(broker)}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#dd7109] hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={broker.image}
                        alt={broker.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">
                          {broker.name}
                        </h3>
                        <p className="text-sm text-gray-500">{broker.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500">★</span>
                        <span className="font-medium">{broker.rating}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{broker.projectsCount} projets</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {broker.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowBrokerSelectionModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Paiement Initial */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Paiement Initial</h2>
              <p className="text-amber-100 text-sm mt-1">Versez l'acompte pour démarrer votre projet</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="text-center">
                  <p className="text-gray-600">
                    Acompte de <span className="font-bold text-[#dd7109]">
                      {newProject.budget ? (parseInt(newProject.budget) * 0.3).toLocaleString() : 0} €
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    (30% du budget total de {parseInt(newProject.budget).toLocaleString()} €)
                  </p>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                  <h4 className="font-medium text-amber-800 mb-2">Informations importantes</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• L'acompte est nécessaire pour démarrer le projet</li>
                    <li>• Le montant est sécurisé et remboursable selon les conditions</li>
                    <li>• Une facture vous sera envoyée par email</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Retour
                </button>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setShowPaymentMethodModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Procéder au paiement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Méthode de Paiement */}
      {showPaymentMethodModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Méthode de Paiement</h2>
              <p className="text-amber-100 text-sm mt-1">Choisissez votre mode de règlement</p>
            </div>

            <div className="p-6">
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Acompte de <span className="font-bold text-[#dd7109]">
                    {newProject.budget ? (parseInt(newProject.budget) * 0.3).toLocaleString() : 0} €
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Projet : {newProject.name}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentMethodSelect("Stripe")}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#dd7109] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#635bff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#635bff]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#635bff]" viewBox="0 0 28 28" fill="currentColor">
                          <path d="M13.714 12.375c0-1.313.656-1.969 1.969-1.969h4.594c.656 0 1.313.656 1.313 1.313v1.313c0 .656-.657 1.312-1.313 1.312h-3.281v1.969h3.281c.656 0 1.313.656 1.313 1.312v1.313c0 .656-.657 1.312-1.313 1.312h-4.594c-1.313 0-1.969-.656-1.969-1.969v-5.156zm-2.625 0v5.156c0 1.313-.656 1.969-1.969 1.969H4.53c-.657 0-1.313-.656-1.313-1.312v-1.313c0-.656.656-1.312 1.313-1.312h3.281v-1.969H4.53c-.657 0-1.313-.656-1.313-1.312V11.72c0-.656.656-1.312 1.313-1.312h4.594c1.313 0 1.969.656 1.969 1.969v1.969z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">Stripe</h3>
                        <p className="text-sm text-gray-500">Carte de crédit, Apple Pay, etc.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect("PayPal")}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#dd7109] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#003087]/10 rounded-lg flex items-center justify-center group-hover:bg-[#003087]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#003087]" viewBox="0 0 28 28" fill="currentColor">
                          <path d="M10.13 7.72c0 1.566-.984 2.423-2.367 2.423H5.67v-4.86h2.092c1.383 0 2.367.857 2.367 2.437zm.492 6.328c0 1.566-.984 2.424-2.367 2.424H5.67v-4.86h2.092c1.383 0 2.367.858 2.367 2.437zm10.703-4.328c-1.383 0-2.367.857-2.367 2.437 0 1.566.984 2.423 2.367 2.423 1.382 0 2.366-.857 2.366-2.423 0-1.58-.984-2.437-2.366-2.437zm-5.86 1.828h1.312v-1.312h-1.312v1.312zm0 5.156h1.312v-4.594h-1.312v4.594zm-5.86-6.563H5.67v8.75h2.092c1.848 0 3.047-1.047 3.047-2.79v-.492c0-1.312-.738-1.988-1.793-2.196 1.055-.164 1.793-.82 1.793-2.132v-.492c0-1.727-1.2-2.758-3.047-2.758zm10.703-.984c-1.848 0-3.047 1.031-3.047 2.758v.492c0 1.313.738 1.969 1.793 2.133-1.055.207-1.793.883-1.793 2.195v.492c0 1.743 1.2 2.79 3.047 2.79h2.092v-8.75h-2.092z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 group-hover:text-[#dd7109] transition-colors">PayPal</h3>
                        <p className="text-sm text-gray-500">Paiement sécurisé en ligne</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#dd7109] transition-colors" />
                  </div>
                </button>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <button
                  onClick={() => setShowPaymentMethodModal(false)}
                  className="w-full px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}