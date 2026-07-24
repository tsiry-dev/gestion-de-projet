import Swal from "sweetalert2";

type ConfirmOptions = {
  title?: string;
  text?: string;
};


export function useConfirmAction() {
  
  const confirm = async (
    action: () => Promise<void>,
    {
        title = "Êtes-vous sûr ?",
        text = "Cette action est irréversible",
    }: ConfirmOptions
  ) => {

    const { isConfirmed } = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    });
    if (!isConfirmed) return;
    await action();
  }

  return { confirm }

}