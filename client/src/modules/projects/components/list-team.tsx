import SubTitle from "@/shared/components/ui/SubTitle";

export default function ListTeam() {
    return (

        <div className="flex-1 border-l border-gray-300 px-2">
            <SubTitle>
                Equipes
            </SubTitle>

            <div className="mt-3 space-y-2">
            {[
                {
                id: 1,
                name: "Équipe Frontend",
                members: 5,
                },
                {
                id: 2,
                name: "Équipe Backend",
                members: 4,
                },
                {
                id: 3,
                name: "Équipe DevOps",
                members: 3,
                },
                {
                id: 4,
                name: "Équipe Mobile",
                members: 6,
                },
                {
                id: 5,
                name: "Équipe Design",
                members: 2,
                },
            ].map((team) => (
                <div
                key={team.id}
                className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    hover:bg-gray-50
                    transition
                    cursor-pointer
                "
                >
                <div className="flex items-center gap-3">
                    <div
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-100
                        text-sm
                        font-semibold
                        text-blue-600
                    "
                    >
                    {team.name.charAt(0)}
                    </div>

                    <div>
                    <p className="text-sm font-medium text-gray-800">
                        {team.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {team.members} membres
                    </p>
                    </div>
                </div>

                <button
                    className="
                    rounded-md
                    px-2
                    py-1
                    text-xs
                    text-gray-500
                    hover:bg-gray-100
                    "
                >
                    Voir
                </button>
                </div>
            ))}
            </div>
        </div>
    );
}