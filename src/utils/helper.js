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


export const checkUpcomings = (date) => {
    try {
        const inputDate = new Date(date.date)
        const today = new Date()

        const timeDiff = inputDate.getTime() - today.getTime()

        const dayDiff = timeDiff / (1000 * 3600 * 24)



        return dayDiff >= 0 && dayDiff <= 5;
    } catch (error) {
        console.error(error);
    }


}

export const createPriceRange = (price) => {
    const interval = price * 0.5
    const from = price - interval
    const to = price + interval

    return {
        from: from,
        to: to
    }
}