import { autoClose } from "./constant"

export const loading_message = (success_message) => {
    return {
        pending: 'Just a few seconds',
        success: success_message,
        error: 'Something Went Wrong. Please Try Again Later'
    }
}


export const customToastParameter = (message, type) => {
    return { render: message, type: type, isLoading: false, autoClose: autoClose }
}


export const formatDateYYMMDD = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}