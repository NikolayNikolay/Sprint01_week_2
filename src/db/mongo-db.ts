import { Collection, Db , MongoClient } from "mongodb";
import { SETTINGS } from "../settings";
import { PostViewModelType } from "../endPoints/posts/models/PostViewModel";
import {config} from 'dotenv'
import { UserViewModel } from "../endPoints/users/models/UserViewModel";
import { BlogViewModelType } from "../endPoints/blogs/models/BlogViewModel";
import { LoginInputModelType } from "../endPoints/usersAuthorisation/models/LoginInputModel";
import { CommentViewModel } from "../endPoints/commentsAndPostsComments/model/CommentViewModel";
import { UserDbModel } from "../endPoints/users/models/UserDbModel";
import {  RequestApiModel } from "../types/AllRequestsAPI";

   config()

// const { MongoClient} = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client: any = null;


export let db: Db;
export let blogCollection: Collection<BlogViewModelType>;
export let postCollection: Collection<PostViewModelType>;
export let usersCollection:Collection<UserDbModel>
export let commentsCollection:Collection<CommentViewModel>
export let allRequestsApiCollection:Collection<RequestApiModel> // all request to api is saved in db



// export const db: Db = client.db(SETTINGS.PATH.DATA_BASE_NAME)

// export const blogCollection:Collection<BlogViewModelType> = db.collection(SETTINGS.PATH.BLOG_COLLECTION_NAME);
// export const postCollection:Collection<PostViewModelType> = db.collection(SETTINGS.PATH.POST_COLLECTION_NAME);


export const runDB = async (urlDb:any) =>{
   try {
      console.log(urlDb);
      
      client = new MongoClient(urlDb);
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      db = client.db(SETTINGS.PATH.DATA_BASE_NAME)

      blogCollection = db.collection(SETTINGS.PATH.BLOG_COLLECTION_NAME);
      postCollection= db.collection(SETTINGS.PATH.POST_COLLECTION_NAME);
      usersCollection = db.collection(SETTINGS.PATH.USERS_COLLECTION_NAME);
      commentsCollection = db.collection(SETTINGS.PATH.COMMENTS_COLLECTION_NAME);
      allRequestsApiCollection = db.collection(SETTINGS.PATH.ALL_REQUESTS_API_COLLECTION_NAME)
      
      await client.db("admin").command({ ping: 1 });
      console.log("You successfully connected to MongoDB!");
      return true
   }
   catch(e){
      console.log(e)
      await client.close()
      return false
   }
}