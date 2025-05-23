import config from '../config/config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
            try {
                const userAccount = await this.account.create(ID.unique(),email,password,name)
                console.log("useraccount detail is ",userAccount)
                if (userAccount) {
                    // call aother method
                    return  this.login({email,password})
                } else {
                    console.log("present in else");
                    return userAccount;
                }
            }
            catch(error){
                throw error;
            }
    }

    async login({email,password}){
        try {
            const user = await this.account.createEmailPasswordSession(email,password);
            console.log("user detail is ",user)
            return user;
        } catch (error) {
            console.log("login error is",error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            console.log("current user is",user)
            return user;
        } 
        catch (error) {
            console.log("Appwrite getCurrentUser error: ",error);
        }
        return null;
    }

    

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite logout error: ",error);
        }
        return null;
    }

}

const authService = new AuthService() 

export default authService;