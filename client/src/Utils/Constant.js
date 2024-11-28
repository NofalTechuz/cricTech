export const urls = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL || "http://localhost:8000",
    SERVER_ASSETS_URL: process.env.REACT_APP_SERVER_ASSETS_URL || "http://localhost:8000/src/uploads",
    ADMIN_SINGIN : '/admin/signin',
    ADMIN_FORGET_PASSWORD : '/admin/forgetpassword',
    ADMIN_DASHBOARD : '/admin/dashboard',

}

export const conf = {
    SITE_TITLE : 'Coding Helps',
    REACT_APP_API_KEY : process.env.REACT_APP_API_KEY
}