// Appwrite contains multiple services like database authentication, login, etc etc...

// we have to write the code in such a way that if we were to take it out of one service (say, appwrite) and deploy it in another service then our application runs continuously without hampering it's workflow. So, the concept of services is introduced here.

// Services : Services are basic OOP class from where we export methods. What happens inside the method is not the concern of the rest of the application, just insert the required data and use the methods.. that's it!


// authentication services 
// services: 

import conf from '../conf/conf'

import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account
    // creating a constructor to set client details as soon as the object is called so that we can set the account
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // calling appwrite services 

    // these functional syntaxes are mentioned in Appwrite documentation and varies from one backend service to another so no need to rememeber it just remember the way of writing the code and the steps. Learn how to search for these things from the documentation 
    async createAccount({ email, password, name }) {
        try {

            // ID.unique() is an appwrite function that generates unique IDs
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            // if userAccount exists, we login to the user account 
            if (userAccount) {
                // call another method to login if the account exists
                return this.login({ email, password })
            }
            else {
                return userAccount
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    // to check if the user is logged in or not
    async getCurrentUser() {
        try {
            await this.account.get()
        } catch (error) {
            throw error
        }

        return null // in case there is any error in the try catch it will return null
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }

    }

}

// we create an object and export it instead of exporting the entire class so that the rest of the application can simply import the object and do not have to create an object.  1
const authService = new AuthService();

export default authService;