import Badge from "@/shared/components/ui/badge";
import Form from "@/shared/components/ui/form/form";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RoleTeam } from "../type";
import { printTeamRole } from "../utils";
import { truncate } from "@/shared/utils/string.utils";
import useRemoveTeam from "../hooks/useRemoveTeam";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import { notify } from "@/core/feedback/notify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { setRemoveTeamIdStore } from "@/app/store/features/teamSlice";

type TeamItemProps = {
    member: any;
    project: any;
}

export default function TeamItem({ member, project }: TeamItemProps) {
    const [editRoleTeam, setEditRoleTeam] = useState<string | null>(null);
    const { projectDetailId: projectId } = useSelector((state: RootState) => state.projects);
    const { removeTeamId } = useSelector((state: RootState) => state.teams);
    const { user } = useSelector((state: RootState) => state.session);
    const { mutate: removeTeamQuery } = useRemoveTeam(projectId as string, removeTeamId as string);
    const { confirm } = useConfirmAction();
    const dispatch = useDispatch();


    const isOwner = project?.ownerId === user?._id;



    const handleRemoveTeam = (id: string) => {
        dispatch(setRemoveTeamIdStore(id));
        
        confirm(async() => {
            removeTeamQuery(id, {
                onSuccess: () => {
                    notify.success('Suppression avec success!');
                }
            });
        }, {title: 'Ete vous sur de supprimer ce membre?'});
        
    }


    return (
        <div
            key={member.userId?._id}
            className={`flex items-center justify-between 
            rounded-lg border border-gray-200 bg-white 
            px-3 py-2 transition hover:bg-gray-50 relative group`}
        >

            {!editRoleTeam && isOwner && (
                <Badge
                    onClick={() => handleRemoveTeam(member._id)}
                    $variant="danger"
                    className="absolute right-2 top-2
                    opacity-0 invisible
                    transition-all duration-200
                    group-hover:opacity-100
                    group-hover:visible
                    cursor-pointer
                    "
                >
                    <IoMdClose size={15} />
                </Badge>
            )}

            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center
                        rounded-full bg-blue-100 text-sm font-semibold 
                        text-blue-600"
                >
                    {member.userId?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                
                <div>
                   {isOwner && (
                        <div className="cursor-pointer" onClick={() => setEditRoleTeam(member._id)}>
                            {editRoleTeam && editRoleTeam == member._id ? (
                                <div className="flex gap-1 items-center">
                                    {member.role !== RoleTeam.OWNER && (
                                        <>
                                            <Form className="mb-1">
                                                <select name="" id="" className="text-sm bg-gray-200">
                                                    { Object.values(RoleTeam)
                                                        .filter((role) => role !== RoleTeam.OWNER)
                                                        .map((role) => (
                                                            <option key={role} value={role}>
                                                            {printTeamRole(role)}
                                                            </option>
                                                        ))}
                                                </select>
                                            </Form>
                                        </>
                                    )}
                                    <div>
                                        <Badge
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditRoleTeam(null);
                                            }} 
                                            $variant="danger"
                                        >
                                            <IoMdClose size={10}/>
                                        </Badge>
                                    </div>
                                </div>
                            )
                            : (
                                <Badge $variant={
                                    member.role === "OWNER" ? "danger" : member.role === "MANAGER" ? "warning" : "gray"
                                    } className="mb-1"
                                >
                                    {printTeamRole(member.role)}
                                </Badge>
                            )
                            }
                        </div>
                   )}

                    <p className="text-sm font-medium text-gray-800">
                        {member.userId?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {truncate(member.userId?.email ?? "", 10)}
                    </p>
                </div>
                
            </div>
        </div>
    );
}