import HeaderSection from "@/shared/components/header-section";
import { useState, useEffect } from "react";

// Task interface
interface Task {
  id: string | number;
  title: string;
  status: "En cours" | "Terminée" | "En attente" | "Annulée";
  startedDate: Date | string;
  endDate: Date | string | null;
  projet: string;
}

// Sample task data
const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Conception UI/UX",
    status: "En cours",
    startedDate: "2026-07-10",
    endDate: "2026-07-25",
    projet: "Projet Alpha"
  },
  {
    id: 2,
    title: "Développement Backend",
    status: "Terminée",
    startedDate: "2026-06-01",
    endDate: "2026-07-15",
    projet: "Projet Alpha"
  },
  {
    id: 3,
    title: "Réunion de planning",
    status: "En attente",
    startedDate: "2026-07-20",
    endDate: null,
    projet: "Projet Beta"
  },
  {
    id: 4,
    title: "Tests de performance",
    status: "Annulée",
    startedDate: "2026-07-05",
    endDate: "2026-07-12",
    projet: "Projet Gamma"
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: Task["status"] }) => {
  const statusStyles = {
    "En cours": "bg-blue-100 text-blue-800",
    "Terminée": "bg-green-100 text-green-800",
    "En attente": "bg-yellow-100 text-yellow-800",
    "Annulée": "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Format date function
const formatDate = (date: Date | string | null) => {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "Tous">("Tous");

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.projet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Tous" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get unique projects for filter
  const projects = Array.from(new Set(tasks.map(task => task.projet)));

  return (
    <section className="p-6">
      <HeaderSection
        title="Taches" 
        content="Gérer vos taches"
      />

      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par titre ou projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Task["status"] | "Tous")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
            <option value="En attente">En attente</option>
            <option value="Annulée">Annulée</option>
          </select>
        </div>

        {/* Add task button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle tâche
        </button>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date début</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date fin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(task.startedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(task.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">
                        {task.projet}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Aucune tâche trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer with stats */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
          <span>Total: {filteredTasks.length} tâche{filteredTasks.length > 1 ? "s" : ""}</span>
          <div className="flex gap-2">
            <span className="text-xs">
              En cours: {tasks.filter(t => t.status === "En cours").length}
            </span>
            <span className="text-xs">
              Terminées: {tasks.filter(t => t.status === "Terminée").length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}