export const filterStatusBadge = (status: string) => {
    switch(status) {
        case "TODO":
           return "gray";
        case "IN_PROGRESS":
           return "primary";
        case "IN_REVIEW":
           return "warning";
        case "DONE":
           return "success";
        case "CANCELLED":
           return "danger";
        default: 
            "UNKNOWN"
    }
}

export const filterStatus = (status: string) => {
    switch(status) {
        case "TODO":
           return "A faire";
        case "IN_PROGRESS":
           return "En cours";
        case "IN_REVIEW":
           return "A revoir";
        case "DONE":
           return "Terminé";
        case "CANCELLED":
           return "Annulé";
        default: 
            "UNKNOWN"
    }
}

export const bgStatus = (status: string) => {
   
        switch(status) {
        case "TODO":
           return "bg-gray-300 rounded-md";
        case "IN_PROGRESS":
           return "bg-blue-300 rounded-md";
        case "IN_REVIEW":
           return "bg-yellow-300 rounded-md";
        case "DONE":
           return "bg-green-300 rounded-md";
        case "CANCELLED":
           return "bg-red-300 rounded-md";
        default: 
            "bg-white"
    }
}
