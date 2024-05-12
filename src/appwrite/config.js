import conf from '../conf/conf'
import { Client, ID, Database, Storage, Query } from 'appwrite'

export class Service {

    client = new Client()
    account;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Database(this.client)
        this.bucket = new Storage(this.client)
    }

    // this method is used to post things from the database, the arguments provided in the createDocument function are taken from the appwrite documentation.
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage, status, userId
            })

        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {

        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            throw error;
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true; // to be handled in the frontend
        } catch (error) {
            throw error
            return false; // to be handled in the frontend
        }
    }

    async getPost(slug) {
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            throw error
            return false // handle in frontend 
        }
    }

    // to get all posts, we only need to get those posts who's status is active so we will use builtin appwrite queries 

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {

            return await this.databases.listDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,

            )

        } catch (error) {
            throw error;
            return false;
        }
    }


    // file upload services 
    async uploadFile(file) {
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            throw error
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true

        } catch (error) {
            throw error
            return false
        }
    }

    // getting file preview 
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }




}


const service = new Service();

export default service