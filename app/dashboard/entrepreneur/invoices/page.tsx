"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, ChevronRight, Calendar, ArrowUpRight, CreditCard, CheckCircle, Clock, XCircle, Plus, Euro, Printer, Eye } from "lucide-react";

interface Invoice {
  id: number;
  projectId: number;
  projectName: string;
  clientName: string;
  amount: number;
  status: "Payée" | "En attente" | "En retard";
  invoiceNumber: string;
  date: string;
  dueDate: string;
  type: "Acompte" | "Intermédiaire" | "Solde";
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const invoicesPerPage = 5;

  const [invoices] = useState<Invoice[]>([
    {
      id: 1,
      projectId: 1,
      projectName: "Villa Moderne",
      clientName: "Jean Dupont",
      amount: 45000,
      status: "Payée",
      invoiceNumber: "FACT-2024-001",
      date: "2024-03-15",
      dueDate: "2024-04-15",
      type: "Acompte"
    },
    {
      id: 2,
      projectId: 2,
      projectName: "Rénovation Appartement",
      clientName: "Marie Martin",
      amount: 54000,
      status: "En attente",
      invoiceNumber: "FACT-2024-002",
      date: "2024-03-20",
      dueDate: "2024-04-20",
      type: "Intermédiaire"
    },
    {
      id: 3,
      projectId: 3,
      projectName: "Extension Maison",
      clientName: "Pierre Dubois",
      amount: 36000,
      status: "En retard",
      invoiceNumber: "FACT-2024-003",
      date: "2024-02-10",
      dueDate: "2024-03-10",
      type: "Acompte"
    }
  ]);

  const stats = [
    {
      title: "Total des factures",
      value: "195 000 €",
      trend: "+15.3%",
      description: "vs. mois dernier",
      iconColor: "bg-[#dd7109]/10 text-[#dd7109]"
    },
    {
      title: "Factures payées",
      value: "75 000 €",
      trend: "+8.7%",
      description: "vs. mois dernier",
      iconColor: "bg-emerald-100/50 text-emerald-600"
    },
    {
      title: "En attente",
      value: "120 000 €",
      trend: "+3.2%",
      description: "vs. mois dernier",
      iconColor: "bg-amber-100/50 text-amber-600"
    }
  ];

  const handleExport = () => {
    const data = invoices.map(invoice => ({
      ...invoice,
      date: new Date(invoice.date).toLocaleDateString(),
      dueDate: new Date(invoice.dueDate).toLocaleDateString(),
      amount: `${invoice.amount.toLocaleString()} €`
    }));
    
    console.log("Exporting invoice data:", data);
    alert("Export des factures en cours...");
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "paid") return matchesSearch && invoice.status === "Payée";
    if (activeFilter === "pending") return matchesSearch && invoice.status === "En attente";
    if (activeFilter === "late") return matchesSearch && invoice.status === "En retard";
    return matchesSearch;
  });

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Payée":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "En attente":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "En retard":
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
          <h1 className="text-2xl font-bold text-white">Factures</h1>
          <p className="text-amber-100 mt-1">Gérez vos factures et suivez leur statut</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.iconColor}`}>
                  {index === 0 ? (
                    <FileText className="w-6 h-6" />
                  ) : index === 1 ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-emerald-500 text-sm font-medium flex items-center">
                  {stat.trend} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
                <span className="text-gray-400 text-sm ml-2">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                placeholder="Rechercher une facture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:ring-offset-2 transition-colors duration-200"
              >
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <span>Filtres</span>
              </button>

              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:ring-offset-2 transition-colors duration-200"
              >
                <Download className="w-5 h-5 text-gray-500 mr-2" />
                <span>Exporter</span>
              </button>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "all" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setActiveFilter("paid")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "paid" 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Payées
                </button>
                <button
                  onClick={() => setActiveFilter("pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "pending" 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  En attente
                </button>
                <button
                  onClick={() => setActiveFilter("late")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "late" 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  En retard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des factures */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 mb-16 overflow-x-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {currentInvoices.length > 0 ? (
            <>
              {/* En-tête du tableau */}
              <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-100">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">N° Facture</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Client</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Échéance</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</div>
              </div>

              {/* Corps du tableau */}
              <div className="divide-y divide-gray-100">
                {currentInvoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center">
                      <div className="md:hidden font-medium text-gray-500 mr-2">N° Facture:</div>
                      <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="md:hidden font-medium text-gray-500 mr-2">Projet:</div>
                      <div className="text-gray-900">{invoice.projectName}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="md:hidden font-medium text-gray-500 mr-2">Client:</div>
                      <div className="text-gray-900">{invoice.clientName}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="md:hidden font-medium text-gray-500 mr-2">Montant:</div>
                      <div className="text-gray-900 font-medium">{invoice.amount.toLocaleString()} €</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="md:hidden font-medium text-gray-500 mr-2">Échéance:</div>
                      <div className="text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="md:hidden font-medium text-gray-500 mr-2">Statut:</div>
                        <div className="flex items-center">
                          {getStatusIcon(invoice.status)}
                          <span className={`ml-2 ${
                            invoice.status === "Payée" ? 'text-emerald-600' : 
                            invoice.status === "En attente" ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 flex justify-center">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 rounded-md ${
                        currentPage === 1 
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      Précédent
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1.5 rounded-md ${
                          currentPage === number 
                            ? 'bg-[#dd7109] text-white' 
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune facture trouvée</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Aucune facture ne correspond à votre recherche" : "Vous n'avez pas encore de factures"}
              </p>
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span>Créer une facture</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de création de facture */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouvelle Facture</h2>
              <p className="text-amber-100 text-sm mt-1">Créer une nouvelle facture</p>
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
                    Type de facture <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Acompte">Acompte</option>
                    <option value="Intermédiaire">Paiement intermédiaire</option>
                    <option value="Solde">Solde final</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: 45000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'échéance <span className="text-red-500">*</span>
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
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
