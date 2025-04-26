import config from '../config/config'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //slug is an document id or a unique id
    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                "unique()",
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service ,createPost error is", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service ,updatePost error is", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service ,deletePost error is", error);
            return false;
        }
    }
    //to get single post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service ,getPost error is", error);
            return false;
        }
    }

    // to get all the post or document which are active
    async getPostsByUser(userId) {
        try {
            if (!userId) {
                throw new Error("User ID is required to fetch posts.");
            }
    
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            console.log("Error getting user posts:", error);
            return null;
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service ,UploadFile error is", error);
            return false
        }
    }

    //deletFile service
    async deleteFile(fileId){
        try {
                await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service ,deleteFile error is", error);
            return false;
        }
    }

    getFileView(fileId){
        console.log("getFilePreview so fileId is",fileId);
        const previewUrl = this.bucket.getFileView(config.appwriteBucketId,fileId);
        console.log("getFilePreview so preview url is",previewUrl);
        return previewUrl;
    }

}

const service = new Service();
export default service;