"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText, ChevronRight, Calendar, ArrowUpRight, CreditCard, CheckCircle, Clock, XCircle, Plus } from "lucide-react";

interface Payment {
  id: number;
  projectId: number;
  projectName: string;
  clientName: string;
  amount: number;
  status: "Reçu" | "En attente" | "Rejeté";
  type: "Acompte" | "Paiement intermédiaire" | "Solde final";
  date: string;
  dueDate?: string;
  paymentMethod?: string;
  reference: string;
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const paymentsPerPage = 5;

  const [payments] = useState<Payment[]>([
    {
      id: 1,
      projectId: 1,
      projectName: "Villa Moderne",
      clientName: "Jean Dupont",
      amount: 45000,
      status: "Reçu",
      type: "Acompte",
      date: "2024-03-15",
      paymentMethod: "Virement bancaire",
      reference: "PAY-2024-001"
    },
    {
      id: 2,
      projectId: 2,
      projectName: "Rénovation Appartement",
      clientName: "Marie Martin",
      amount: 54000,
      status: "En attente",
      type: "Paiement intermédiaire",
      date: "2024-03-20",
      dueDate: "2024-04-05",
      reference: "PAY-2024-002"
    },
    {
      id: 3,
      projectId: 3,
      projectName: "Extension Maison",
      clientName: "Pierre Dubois",
      amount: 36000,
      status: "Rejeté",
      type: "Acompte",
      date: "2024-03-10",
      paymentMethod: "Carte bancaire",
      reference: "PAY-2024-003"
    }
  ]);

  const stats = [
    {
      title: "Total des paiements",
      value: "135 000 €",
      trend: "+18.5%",
      description: "vs. mois dernier",
      iconColor: "bg-[#dd7109]/10 text-[#dd7109]"
    },
    {
      title: "Paiements reçus",
      value: "45 000 €",
      trend: "+12.2%",
      description: "vs. mois dernier",
      iconColor: "bg-emerald-100/50 text-emerald-600"
    },
    {
      title: "En attente",
      value: "90 000 €",
      trend: "+5.3%",
      description: "vs. mois dernier",
      iconColor: "bg-amber-100/50 text-amber-600"
    }
  ];

  const handleExport = () => {
    const data = payments.map(payment => ({
      ...payment,
      date: new Date(payment.date).toLocaleDateString(),
      amount: `${payment.amount.toLocaleString()} €`
    }));
    
    console.log("Exporting payment data:", data);
    alert("Export des paiements en cours...");
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "received") return matchesSearch && payment.status === "Reçu";
    if (activeFilter === "pending") return matchesSearch && payment.status === "En attente";
    if (activeFilter === "rejected") return matchesSearch && payment.status === "Rejeté";
    return matchesSearch;
  });

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Reçu":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "En attente":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Rejeté":
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
              <h1 className="text-2xl font-bold">Paiements</h1>
              <p className="text-amber-100 mt-1">Gérez vos paiements et acomptes</p>
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
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau paiement</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Cartes de statistiques */}
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

        {/* Recherche et filtres */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par projet, client ou référence..."
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
                  onClick={() => setActiveFilter("received")}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    activeFilter === "received" 
                      ? 'bg-[#dd7109] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Reçus
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de paiement</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>Acompte</option>
                    <option>Paiement intermédiaire</option>
                    <option>Solde final</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant</label>
                  <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3">
                    <option>Tous</option>
                    <option>{"< 10 000 €"}</option>
                    <option>10 000 € - 50 000 €</option>
                    <option>{"> 50 000 €"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
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

        {/* Liste des paiements */}
        {filteredPayments.length > 0 ? (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden mb-4">
              <div className="grid grid-cols-12 bg-gray-50/50 p-4 border-b border-gray-100/50">
                <div className="col-span-3 font-medium text-sm text-gray-500">Projet</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Client</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Montant</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Type</div>
                <div className="col-span-2 font-medium text-sm text-gray-500">Statut</div>
                <div className="col-span-1"></div>
              </div>
              
              {currentPayments.map((payment) => (
                <div 
                  key={payment.id} 
                  className="grid grid-cols-12 p-4 border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors items-center"
                >
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900">{payment.projectName}</div>
                    <div className="text-xs text-[#dd7109] mt-1">{payment.reference}</div>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {payment.clientName}
                  </div>
                  <div className="col-span-2 font-medium text-gray-900">
                    {payment.amount.toLocaleString()} €
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {payment.type}
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span className={`text-sm font-medium ${
                        payment.status === "Reçu" ? "text-emerald-600" :
                        payment.status === "En attente" ? "text-amber-600" :
                        "text-red-600"
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-[#dd7109] hover:text-[#dd7109]/80 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100/50">
              <div className="text-sm text-gray-500">
                Affichage de {indexOfFirstPayment + 1} à {Math.min(indexOfLastPayment, filteredPayments.length)} sur {filteredPayments.length} paiements
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number 
                        ? 'bg-[#dd7109] text-white border-[#dd7109]' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100/50">
            <div className="mx-auto max-w-md">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-[#dd7109]">Aucun paiement trouvé</h3>
              <p className="mt-1 text-gray-500">
                Essayez de modifier vos critères de recherche ou enregistrez un nouveau paiement.
              </p>
              <div className="mt-6">
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#dd7109] hover:bg-[#dd7109]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7109]"
                >
                  Enregistrer un paiement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Nouveau Paiement */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouveau Paiement</h2>
              <p className="text-amber-100 text-sm mt-1">Enregistrer un nouveau paiement</p>
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
                    Type de paiement <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Acompte">Acompte</option>
                    <option value="Paiement intermédiaire">Paiement intermédiaire</option>
                    <option value="Solde final">Solde final</option>
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
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}