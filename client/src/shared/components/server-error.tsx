type Props = {
    message: string,
    refetch: () => void
}

export default function ServerError({ message , refetch}: Props) {
     return   <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
            !
          </div>

          <div>
            <h3 className="text-sm font-semibold text-red-800">
              Une erreur est survenue
            </h3>

            <p className="mt-1 text-sm text-red-700">
              {message}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-900 underline"
            >
              Réessayer
            </button>
          </div>
    </div>
}