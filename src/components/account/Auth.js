
const Auth = {
    isAuthentication: false,
    Authentication(from) {
        // console.log("Authentication: " + from)
        this.isAuthentication = true
    },
    signout() {
        this.isAuthentication = false
    },
    getAuth(from) {
        // console.log("from: " + from + this.isAuthentication)
        return this.isAuthentication
    }
}
export default Auth