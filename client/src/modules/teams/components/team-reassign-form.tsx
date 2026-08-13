import Button from "@/shared/components/ui/button";
import type { Member } from "../type";
import Form from "@/shared/components/ui/form/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import useReassignTaskOnTeam from "@/modules/tasks/hooks/useReassignTaskOnTeam";
import type { reassignTaskOnTeamDTO } from "@/modules/tasks/task.dto";
import { notify } from "@/core/feedback/notify";
import LoaderButton from "@/shared/components/ui/loader-button";
import { removeReassignTaskTeamId, removeTaskViewStore, setTaskViewStore } from "@/app/store/features/taskSlice";

type TeamReassignFormProps = {
    members: Member[];
}

function TeamReassignForm ({ members }: TeamReassignFormProps) {
  const [teamId, setTeamId] = useState<any | null>(null);
  const { reassignTaskId, taskView } = useSelector((state: RootState) => state.tasks);
  const { projectDetailId: projectId } = useSelector((state: RootState) => state.projects);
  const { mutate: reassignTaskOnTeamQuery, isPending } = useReassignTaskOnTeam(projectId as string);
  const dispatch = useDispatch();

  const handleReassign = (e: any) => {
    e.preventDefault();
    const data: reassignTaskOnTeamDTO = {
        teamId,
        taskId: reassignTaskId as string
    }
    reassignTaskOnTeamQuery(data, {
        onSuccess: (response) => {
            notify.success('Réassignation avec success!');
            dispatch(removeReassignTaskTeamId());
            dispatch(removeTaskViewStore());
        },
        onError: (error) => {
          alert('error');
        }
    });
  }

  return (
    <div 
       className="
            h-[250px]
            overflow-y-auto
            [scrollbar-width:thin]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
        "
    >
        <Form>
            {members
            .filter((t: Member) => t.role !== "OWNER")
            .map((t: Member) => (
                <div key={t._id}>
                    <label className="flex justify-between bg-gray-200 rounded-md mb-2 p-1">
                        <span>
                            {t.userId?.name}
                        </span>

                        <input
                            onChange={e => setTeamId(e.target.value)}
                            type="radio"
                            name="reassign-member"
                            value={t.userId?._id}
                        />
                    </label>
                </div>
            ))}
            <div>
                <Button onClick={(e) => handleReassign(e)}>
                 {isPending ?
                   <LoaderButton />
                 :
                  'Réassigner'
                 }
                </Button>
            </div>
        </Form>
    </div>
  );
}

export default TeamReassignForm;