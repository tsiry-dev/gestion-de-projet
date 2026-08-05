import { useMutation, useQueryClient } from "@tanstack/react-query";
import addTeamService from "../services/addTeam.service";

const useAddTeam = (projectDetailId: string) => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: addTeamService,

        onSuccess: (response) => {

            console.log(response);

            queryClient.setQueryData(
                [
                    "project-with-tasks",
                    projectDetailId
                ],
                (oldData: any) => {
                    console.log(oldData);

                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        team: response.data.team
                    };
                }
            );

        }
    });

};

export default useAddTeam;