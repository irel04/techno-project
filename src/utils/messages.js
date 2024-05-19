export const loading_message = (success_message) => {
    return {
        pending: 'Just a few seconds',
        success: success_message,
        error: 'Something Went Wrong. Please Try Again Later'
    }
}