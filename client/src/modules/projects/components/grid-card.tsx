import Card from "@/shared/components/ui/card";
import CardTitle from "@/shared/components/ui/card-title";
import Status from "@/shared/components/ui/status";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import type { Project } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { edit, remove, resetEdit, onCloseUpdateProject, onOpeUpdateProject, onOpenProjectDetail, onCloseProjectDetail } from '@/app/store/features/projectSlice';
import type { RootState } from "@/app/store/store";
import LoaderDelete from "@/shared/components/loader-delete";
import { truncate } from "@/shared/utils/string.utils";
import { Dialog } from "@/shared/components/dialog";
import EditProject from "./edit-project";
import ProjectDetail from "./project-detail";


type Props = {
  project: Project;
  handleDelete: (id: string) => void;
  isDeletePending: boolean;
  deletingId?: string;
};


export default function GridCard({ project, handleDelete , isDeletePending, deletingId}: Props) {

  const isDeleting = isDeletePending && deletingId === project._id;
  const dispatch = useDispatch();
  const { 
    deletedIds, 
    editProject, 
    isUpdateProject ,
    projectDetailId
  } = useSelector((state: RootState) => state.projects);

  const handleEdit = (e: any) => {
    e.stopPropagation();
    dispatch(edit(project));
    dispatch(onOpeUpdateProject());
  }

  return (
    <Card 
      className={`cursor-pointer ${deletedIds.includes(project._id) && 'bg-red-100!'}`}
      onClick={() => dispatch(remove(project._id))}
    >
      <div className="flex justify-between">
        <CardTitle>
          {project.title}
        </CardTitle>

        <Status type={project.status} />
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {truncate(project.description, 120)}
      </p>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-2xl font-bold">
          {project.taskCount}
        </span>

        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 relative">

          <button
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
            title="Voir"
            onClick={() => dispatch(onOpenProjectDetail(project._id))}
          >
            <FaEye />
          </button>

          <button
              className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
              title="Modifier"
              onClick={handleEdit}
            ><FaEdit /> </button>



          <button
            disabled={isDeleting}
            onClick={() => handleDelete(project._id)}
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Supprimer"
          >
            {isDeleting ? (
              <LoaderDelete />
            ) : (
              <FaTrash />
            )}
          </button>

        </div>
      </div>
    </Card>
  );
}