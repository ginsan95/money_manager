export default class UserManager {
    static instance = null;
    objectId = null;
    userToken = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserManager();
        }
        return this.instance;
    }

    resetData() {
        this.objectId = null;
        this.userToken = null;
    }
}