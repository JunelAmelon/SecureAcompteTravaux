"use client";

import { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import { Plus, Filter, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: "Rendez-vous" | "Visite" | "Réunion" | "Autre";
  location?: string;
  description?: string;
  participants?: string[];
  project?: string;
  color: string;
}

export default function CalendarPage() {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState("month");

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Visite chantier Villa Moderne",
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 12, 0),
      type: "Visite",
      location: "123 Avenue des Champs-Élysées, Paris",
      description: "Visite de suivi du chantier avec le client",
      participants: ["Jean Dupont", "Marie Martin"],
      project: "Villa Moderne",
      color: "#10B981"
    },
    {
      id: 2,
      title: "Réunion équipe Rénovation Appartement",
      start: new Date(2024, 2, 20, 14, 0),
      end: new Date(2024, 2, 20, 16, 0),
      type: "Réunion",
      location: "Bureau principal",
      description: "Point d'avancement sur le projet de rénovation",
      participants: ["Pierre Dubois", "Sophie Laurent"],
      project: "Rénovation Appartement",
      color: "#6366F1"
    },
    {
      id: 3,
      title: "Rendez-vous client Extension Maison",
      start: new Date(2024, 2, 25, 9, 0),
      end: new Date(2024, 2, 25, 10, 30),
      type: "Rendez-vous",
      location: "45 Rue de la République, Lyon",
      description: "Présentation des plans finaux",
      participants: ["Lucas Bernard"],
      project: "Extension Maison",
      color: "#F59E0B"
    }
  ]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const getEventStyle = (event: Event) => {
    return {
      backgroundColor: event.color,
      borderRadius: '0.5rem',
      border: 'none',
      color: 'white'
    };
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header avec bandeau coloré */}
      <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 px-6 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Calendrier</h1>
              <p className="text-amber-100 mt-1">Gérez vos rendez-vous et événements</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-xl transition-all"
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
              <button 
                onClick={() => setShowNewEventModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#dd7109] rounded-xl hover:shadow-lg transition-all hover:bg-gray-50 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvel événement</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Mars 2024</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setView("month")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === "month" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mois
              </button>
              <button 
                onClick={() => setView("week")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === "week" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Semaine
              </button>
              <button 
                onClick={() => setView("day")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  view === "day" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Jour
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="h-[700px]">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              views={['month', 'week', 'day']}
              view={view as any}
              onView={(view) => setView(view)}
              eventPropGetter={getEventStyle}
              onSelectEvent={handleEventClick}
              messages={{
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                today: "Aujourd'hui",
                next: 'Suivant',
                previous: 'Précédent',
                showMore: (total) => `+${total} autres`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal Détails Événement */}
      {showEventDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Détails de l'événement</h2>
              <p className="text-amber-100 text-sm mt-1">{selectedEvent.type}</p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedEvent.title}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Date et heure</p>
                    <p className="text-sm">
                      {format(selectedEvent.start, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Durée</p>
                    <p className="text-sm">
                      {format(selectedEvent.start, "HH:mm")} - {format(selectedEvent.end, "HH:mm")}
                    </p>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Lieu</p>
                      <p className="text-sm">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}

                {selectedEvent.participants && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p className="text-sm">{selectedEvent.participants.join(", ")}</p>
                    </div>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowEventDetailsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Fermer
                </button>
                <button
                  className="px-4 py-2 bg-[#dd7109] text-white rounded-lg hover:bg-[#dd7109]/90 transition-colors"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvel Événement */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl transform transition-all duration-300 ease-out animate-slideUp">
            <div className="bg-gradient-to-r from-[#dd7109] to-amber-600 p-5">
              <h2 className="text-xl font-bold text-white">Nouvel événement</h2>
              <p className="text-amber-100 text-sm mt-1">Créez un nouvel événement</p>
            </div>
            
            <form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Visite chantier"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Rendez-vous">Rendez-vous</option>
                    <option value="Visite">Visite</option>
                    <option value="Réunion">Réunion</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="90">1 heure 30</option>
                    <option value="120">2 heures</option>
                    <option value="180">3 heures</option>
                    <option value="240">4 heures</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lieu
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    placeholder="Ex: Bureau ou adresse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#dd7109] focus:border-transparent"
                    rows={3}
                    placeholder="Description de l'événement..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dd7109] to-amber-600 text-white hover:opacity-90 transition-opacity duration-200 font-medium shadow-sm"
                >
                  Créer l'événement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}