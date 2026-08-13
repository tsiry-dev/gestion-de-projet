import Badge from "@/shared/components/ui/badge";
import Input from "@/shared/components/ui/form/input";
import SubTitle from "@/shared/components/ui/SubTitle";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import useSearchTeam from "../hooks/useSearchTeam";
import TeamSearchSkeleton from "./team-search-skeleton";
import { truncate } from "@/shared/utils/string.utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import useAddTeam from "../hooks/useAddTeam";
import { notify } from "@/core/feedback/notify";
import LoaderBadge from "@/shared/components/ui/loader-badge";
import { printTeamRole } from "../utils";
import { RoleTeam, type RoleTeamType } from "../type";
import Form from "@/shared/components/ui/form/form";
import Select from "@/shared/components/ui/form/form-select";
import TeamItem from "./team-item";

type Props = {
  team: any;
  project: any
};

export default function ListTeam({ team , project}: Props) {
  const [addingUserId, setAddingUserId] = useState<string | null>(null);
  const { members = [] } = team;
  const [isNewMember, setIsNewMember] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [editRoleTeam, setEditRoleTeam] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.session);


  const {
    data,
    isPending: isPendingSearchTeam,
  } = useSearchTeam(query);

  const { projectDetailId } = useSelector((state: RootState) => state.projects);

  const {
    mutate: addTeamQuery,
    isPending: isPendingAddTeam
  } = useAddTeam(projectDetailId as string);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("query", value);
    } else {
      params.delete("query");
    }


    setSearchParams(params);

  };

  const isSearching = query.trim().length > 0;

  const existingMemberIds = members.map(
    (member: any) => member.userId?._id
  );

  const availableUsers = data?.teams?.filter(
    (user: any) => !existingMemberIds.includes(user._id)
  ) ?? [];


  const handleAddTeam = (userId: string) => {
      const data = {
        projectId: projectDetailId as string,
        userId
      };

      setAddingUserId(userId);
      addTeamQuery(data, {
        onSuccess: () => {
          notify.success("Equipe ajouté avec succès !!");
          setAddingUserId(null);
        },

        onError: () => {
          setAddingUserId(null);
        }
      });
  };



  return (
    <div className="border-l border-gray-300">
      <div className="flex items-center justify-between">
        <SubTitle>
          Equipes ({members.filter((m: any) => m.role !== RoleTeam.OWNER).length})
        </SubTitle>

        {project?.ownerId == user?._id && (
          <Badge
            $variant={isNewMember ? "danger" : "primary"}
            title={isNewMember ? "Annuler" : "Ajouter un membre"}
            onClick={() => {
              setIsNewMember(!isNewMember);

              if (isNewMember) {
                setSearchParams({});
              }
            }}
          >

            {isNewMember ? <IoMdClose size={15} /> : <IoIosSearch size={15} />}
          </Badge>
        )}

      </div>
      
      {/* New member  */}
      {isNewMember && (

        <div className="mt-3">

          <Input
            type="search"
            placeholder="Rechercher un membre..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </div>

      )}
       
      {/* Member searching */}
      {isNewMember && isSearching && (
        <div className="mt-3">
          {isPendingSearchTeam ? (
            <TeamSearchSkeleton />
          ) : (
            <div 
            
              className="space-y-2 ">
              {availableUsers.length ? (
                availableUsers.map((user: any) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {truncate(user.email, 10)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className="cursor-pointer"
                      onClick={() => handleAddTeam(user._id)}
                      $variant="success"
                    >
                      {isPendingAddTeam && addingUserId === user._id ? (
                        <LoaderBadge variant="dark" title="Ajout..."/>
                      ) : (
                        "Ajouter"
                      )}
                    </Badge>
                  </div>
                ))


              ) : (

                <p className="py-4 text-center text-sm text-gray-500">

                  Aucun utilisateur disponible.

                </p>

              )}
            </div>
          )}

        </div>

      )}

      {/* Members */}
      {(!isNewMember || !isSearching) && (

        <div className="mt-3 space-y-2 h-[450px] 
                      overflow-y-auto
                      [scrollbar-width:thin]
                      [&::-webkit-scrollbar]:w-1.5
                      [&::-webkit-scrollbar-track]:bg-transparent
                      [&::-webkit-scrollbar-thumb]:bg-gray-300
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
         bg-gray-200 p-2">

          {members.map((member: any) => (
            <div>
                {member.userId._id !== project.ownerId && (
                  <div>
                    <TeamItem key={member.userId?._id} member={member} project={project} />
                  </div>
                )}
            </div>
          ))}

        </div>

      )}

    </div>
  );
}