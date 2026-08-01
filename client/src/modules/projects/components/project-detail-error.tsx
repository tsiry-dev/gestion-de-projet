type ProjectDetailErrorProps = {
  refetch: () => void;
  error: Error | null;
};

export default function ProjectDetailError({ refetch, error }: ProjectDetailErrorProps) {
    return (
        <div className="
        flex
        min-h-[300px]
        items-center
        justify-center
        p-4
        ">
        <div className="
            w-full
            max-w-md
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-6
            text-center
            shadow-sm
        ">
            <div className="
            mx-auto
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-red-100
            text-red-600
            text-xl
            font-bold
            ">
            !
            </div>

            <h2 className="
            mb-2
            text-lg
            font-semibold
            text-red-700
            ">
            Impossible de charger les données
            </h2>

            <p>{error?.message}</p>

            <p className="
            text-sm
            text-gray-600
            ">
            Une erreur est survenue lors de la récupération des informations.
            </p>

            <button
            onClick={() => refetch()}
            className="
                mt-5
                rounded-lg
                bg-red-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-700
            "
            >
            Réessayer
            </button>
        </div>
        </div>
    );
}