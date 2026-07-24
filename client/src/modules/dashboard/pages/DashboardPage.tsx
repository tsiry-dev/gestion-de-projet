import HeaderSection from "@/shared/components/header-section";
import { useProjectCount } from "@/modules/dashboard/hooks/useProjectCount";
import SkeletonCardCount from "../components/SkeletonCardCount";
import { useDispatch } from "react-redux";
import { onOpeCreateProject } from "@/app/store/features/projectSlice";


export default function DashboardPage() {

  const { data: projectCount, isPending } = useProjectCount();
  const dispatch = useDispatch();

  const projects = [
    { id: 1, name: "Website Redesign", tasks: 24, progress: 75 },
    { id: 2, name: "Mobile App Development", tasks: 18, progress: 45 },
    { id: 3, name: "Marketing Campaign", tasks: 12, progress: 90 },
    { id: 4, name: "Product Launch", tasks: 31, progress: 30 },
  ];

  const recentTasks = [
    { title: "Design homepage mockup", project: "Website Redesign", priority: "High", status: "In Progress" },
    { title: "Fix login bug", project: "Mobile App Development", priority: "Critical", status: "To Do" },
    { title: "Create social media posts", project: "Marketing Campaign", priority: "Medium", status: "Completed" },
    { title: "Finalize product pricing", project: "Product Launch", priority: "High", status: "In Progress" },
    { title: "Update documentation", project: "Website Redesign", priority: "Low", status: "Completed" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-red-600 bg-red-50 border-red-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600 bg-green-50";
      case "In Progress": return "text-blue-600 bg-blue-50";
      case "To Do": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
       <section>
         <HeaderSection 
            title="Tableau de board" 
            content="Votre statistique en une seul coup d'oeil"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
             {isPending ?
              <SkeletonCardCount />
             :
              <div
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-medium text-gray-500">Projets</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-2xl font-semibold text-gray-900">{
                     projectCount?.data.count
                  }</p>
                  <span
                    className={`text-sm font-medium ${
                      true  ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {"positive"}
                  </span>
                </div>
              </div>
             }

              <div
                key={15}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-medium text-gray-500">Taches</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-2xl font-semibold text-gray-900">{
                     15
                  }</p>
                  <span
                    className={`text-sm font-medium ${
                      true  ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {"positive"}
                  </span>
                </div>
              </div>
          </div>

          {/* Projects Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects Overview</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Projects
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{project.name}</span>
                      <span className="text-gray-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  + New Task
                </button>
                <button 
                onClick={() => dispatch(onOpeCreateProject())}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  + New Project
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Invite Team Member
                </button>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Tasks
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 font-medium">Task</th>
                    <th className="pb-3 font-medium">Project</th>
                    <th className="pb-3 font-medium">Priority</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map((task, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 text-gray-900 font-medium">{task.title}</td>
                      <td className="py-3 text-gray-600">{task.project}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    
       </section>
  );
}