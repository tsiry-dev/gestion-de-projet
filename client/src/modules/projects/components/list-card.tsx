import Card from "@/shared/components/ui/card";
import Status from "@/shared/components/ui/status";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import type { StatusType } from "../type";
import CardTitle from "@/shared/components/ui/card-title";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { onOpenProjectDetail, remove } from "@/app/store/features/projectSlice";


type Props = {
  project: {
    _id: string;
    title: string;
    description: string;
    status: StatusType;
    taskCount: number;
  };
  handleDelete: (id: string) => void;
  isDeletePending: boolean;
  deletingId: string | null;
};


export default function ListCard({
  project,
  handleDelete,
  isDeletePending,
  deletingId
}: Props) {


  const isDeleting = isDeletePending && deletingId === project._id;
  const { deletedIds } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();



  return (
    <Card 
          className={`cursor-pointer ${deletedIds.includes(project._id) && 'bg-red-200!'}`}
          onClick={() => dispatch(remove(project._id))}
    >
      <div className="flex items-center justify-between">

        <div>
          <CardTitle>
            {project.title}
          </CardTitle>

          <p className="text-sm text-gray-500 mt-1">
            {project.description}
          </p>
        </div>


        <div className="flex items-center gap-6">

          <Status type={project.status} />

          <span className="text-sm text-gray-600">
            {project.taskCount} tâches
          </span>


          <div className="flex items-center gap-2">

            <button
              onClick={(e: any) => {
                e.stopPropagation();
                dispatch(onOpenProjectDetail(project._id))
              }}
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
              title="Voir"
            >
              <FaEye />
            </button>


            <button
              className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
              title="Modifier"
            >
              <FaEdit />
            </button>


            <button
              disabled={isDeleting}
              onClick={() => handleDelete(project._id)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Supprimer"
            >
              {isDeleting ? (
                <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin block" />
              ) : (
                <FaTrash />
              )}
            </button>

          </div>

        </div>

      </div>
    </Card>
  );
}