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