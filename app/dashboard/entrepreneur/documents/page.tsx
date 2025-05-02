"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, ChevronRight, Calendar, ArrowUpRight, Plus, File, FileImage, FileCheck, Folder, Upload, Eye } from "lucide-react";

interface Document {
  id: number;
  name: string;
  projectName: string;
  type: "Devis" | "Facture" | "Contrat" | "Plan" | "Photo" | "Autre";
  size: string;
  date: string;
  status: "Validé" | "En attente" | "Rejeté";
  category: string;
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folders = [
    { name: "Devis", icon: FileText, count: 15 },
    { name: "Factures", icon: FileText, count: 28 },
    { name: "Contrats", icon: FileCheck, count: 12 },
    { name: "Plans", icon: File, count: 8 },
    { name: "Photos", icon: FileImage, count: 45 }
  ];

  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: "Devis-Villa-Moderne-V2.pdf",
      projectName: "Villa Moderne",
      type: "Devis",
      size: "2.4 MB",
      date: "2024-03-15",
      status: "Validé",
      category: "Devis"
    },
    {
      id: 2,
      name: "Contrat-Renovation-Appartement.pdf",
      projectName: "Rénovation Appartement",
      type: "Contrat",
      size: "1.8 MB",
      date: "2024-03-10",
      status: "En attente",
      category: "Contrats"
    },
    {
      id: 3,
      name: "Plan-Extension-Maison.pdf",
      projectName: "Extension Maison",
      type: "Plan",
      size: "5.2 MB",
      date: "2024-03-05",
      status: "Validé",
      category: "Plans"
    },
    {
      id: 4,
      name: "Photos-Chantier-Semaine-12.zip",
      projectName: "Villa Moderne",
      type: "Photo",
      size: "15.7 MB",
      date: "2024-03-20",
      status: "En attente",
      category: "Photos"
    }
  ]);

  const stats = [
    {
      title: "Documents totaux",
      value: "108",
      trend: "+12.5%",
      description: "vs. mois dernier"
    },
    {
      title: "Documents validés",
      value: "85",
      trend: "+8.2%",
      description: "vs. mois dernier"
    },
    {
      title: "En attente",
      value: "23",
      trend: "-15.3%",
      description: "vs. mois dernier"
    }
  ];

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = selectedFolder ? doc.category === selectedFolder : true;
    
    if (activeFilter === "all") return matchesSearch && matchesFolder;
    if (activeFilter === "validated") return matchesSearch && matchesFolder && doc.status === "Validé";
    if (activeFilter === "pending") return matchesSearch && matchesFolder && doc.status === "En attente";
    return matchesSearch && matchesFolder;
  });

  const getDocumentIcon = (type: string) => {
    switch(type) {
      case "Devis":
        return <FileText className="w-10 h-10 text-blue-500" />;
      case "Facture":
        return <FileText className="w-10 h-10 text-red-500" />;
      case "Contrat":
        return <FileCheck className="w-10 h-10 text-green-500" />;
      case "Plan":
        return <File className="w-10 h-10 text-purple-500" />;
      case "Photo":
        return <FileImage className="w-10 h-10 text-amber-500" />;
      default:
        return <File className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Documents</h1>
              <p className="text-amber-100 mt-1">Gérez tous vos documents et fichiers</p>
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
                onClick={handleUpload}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Upload className="w-4 h-4" />
                <span>Importer</span>
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

        {/* Folders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-8">
          {folders.map((folder, index) => (
            <button
              key={index}
              onClick={() => setSelectedFolder(selectedFolder === folder.name ? null : folder.name)}
              className={`relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border transition-all group ${
                selectedFolder === folder.name 
                  ? 'border-[#dd7109] shadow-md' 
                  : 'border-gray-100/50 hover:border-[#dd7109]/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <folder.icon className={`w-8 h-8 ${
                  selectedFolder === folder.name ? 'text-[#dd7109]' : 'text-gray-400 group-hover:text-[#dd7109]'
                } transition-colors`} />
                <h3 className="mt-2 font-medium text-gray-900">{folder.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{folder.count} fichiers</p>
              </div>
            </button>
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
                  placeholder="Rechercher un document..."
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
                  onClick={() => setActiveFilter("validated")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "validated" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Validés
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projet</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>Villa Moderne</option>
                    <option>Rénovation Appartement</option>
                    <option>Extension Maison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>Devis</option>
                    <option>Facture</option>
                    <option>Contrat</option>
                    <option>Plan</option>
                    <option>Photo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Toutes</option>
                    <option>7 derniers jours</option>
                    <option>30 derniers jours</option>
                    <option>3 derniers mois</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  {getDocumentIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate group-hover:text-[#dd7109] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{doc.projectName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">{doc.size}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-400">
                        {new Date(doc.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.status === "Validé"
                      ? "bg-green-100 text-green-700"
                      : doc.status === "En attente"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {doc.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100/50">
            <div className="mx-auto max-w-md">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-[#dd7109]">Aucun document trouvé</h3>
              <p className="mt-1 text-gray-500">
                Essayez de modifier vos critères de recherche ou importez de nouveaux documents.
              </p>
              <div className="mt-6">
                <button 
                  onClick={handleUpload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#dd7109] hover:bg-[#dd7109]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7109]"
                >
                  Importer des documents
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Importer des documents</h2>
              <p className="text-amber-100 text-sm mt-1">Sélectionnez les fichiers à importer</p>
            </div>
            
            <form className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Projet <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un projet</option>
                    {["Villa Moderne", "Rénovation Appartement", "Extension Maison"].map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de document <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Devis">Devis</option>
                    <option value="Facture">Facture</option>
                    <option value="Contrat">Contrat</option>
                    <option value="Plan">Plan</option>
                    <option value="Photo">Photo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fichiers <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#dd7109] transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-[#dd7109] hover:text-[#dd7109]/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#dd7109]"
                        >
                          <span>Sélectionner des fichiers</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Importer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}