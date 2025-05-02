"use client";

import { useState } from "react";
import { Search, Filter, Building2, Users, Calendar, ArrowUpRight, Plus, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  budget: number;
  paid: number;
  startDate: string;
  estimatedEndDate: string;
  status: "En cours" | "En attente" | "Terminé" | "Annulé";
  progress: number;
  type: string;
  location: string;
  description: string;
}

export default function ProjectsPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "Villa Moderne",
      client: {
        name: "Jean Dupont",
        email: "jean.dupont@email.com",
        phone: "+33 6 12 34 56 78"
      },
      description: "Construction d'une villa contemporaine de 200m²",
      budget: 450000,
      paid: 135000,
      startDate: "2024-03-01",
      estimatedEndDate: "2024-12-31",
      status: "En cours",
      progress: 30,
      type: "Construction",
      location: "Aix-en-Provence"
    },
    {
      id: 2,
      name: "Rénovation Appartement",
      client: {
        name: "Marie Martin",
        email: "marie.martin@email.com",
        phone: "+33 6 98 76 54 32"
      },
      description: "Rénovation complète d'un appartement haussmannien",
      budget: 180000,
      paid: 54000,
      startDate: "2024-02-15",
      estimatedEndDate: "2024-08-15",
      status: "En cours",
      progress: 45,
      type: "Rénovation",
      location: "Paris"
    },
    {
      id: 3,
      name: "Extension Maison",
      client: {
        name: "Pierre Dubois",
        email: "pierre.dubois@email.com",
        phone: "+33 6 11 22 33 44"
      },
      description: "Extension de 40m² avec création d'une suite parentale",
      budget: 120000,
      paid: 36000,
      startDate: "2024-04-01",
      estimatedEndDate: "2024-09-30",
      status: "En attente",
      progress: 0,
      type: "Extension",
      location: "Lyon"
    }
  ]);

  const stats = [
    {
      title: "Projets actifs",
      value: "12",
      trend: "+50%",
      description: "vs. mois dernier"
    },
    {
      title: "Projets en attente",
      value: "5",
      trend: "+25%",
      description: "vs. mois dernier"
    },
    {
      title: "Projets terminés",
      value: "45",
      trend: "+15%",
      description: "vs. mois dernier"
    }
  ];

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "in_progress") return matchesSearch && project.status === "En cours";
    if (activeFilter === "pending") return matchesSearch && project.status === "En attente";
    if (activeFilter === "completed") return matchesSearch && project.status === "Terminé";
    return matchesSearch;
  });

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
                onClick={handleNewProject}
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
                  onClick={() => setActiveFilter("pending")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "pending" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  En attente
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
                    <option>Construction</option>
                    <option>Rénovation</option>
                    <option>Extension</option>
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#dd7109] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">{project.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "En cours"
                    ? "bg-green-100 text-green-700"
                    : project.status === "En attente"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{project.client.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Fin estimée : {new Date(project.estimatedEndDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Budget total</span>
                  <span className="font-medium text-gray-900">{project.budget.toLocaleString()} €</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Acompte versé</span>
                  <span className="font-medium text-[#dd7109]">{project.paid.toLocaleString()} €</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
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

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 text-[#dd7109] hover:text-[#dd7109]/90 font-medium group">
                  <span>Voir les détails</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
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
            
            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Construction">Construction</option>
                    <option value="Rénovation">Rénovation</option>
                    <option value="Extension">Extension</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
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
                  Créer le projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}