import { Collection, Db , MongoClient } from "mongodb";
import { mongoURI, SETTINGS } from "../settings";
import { BlogInputModelType } from "../types/BlogInputModel";
import { BlogViewModelType } from "../types/BlogViewModel";
import { PostInputModelType } from "../types/PostInputModel";
import { PostViewModelType } from "../types/PostViewModel";
import {config} from 'dotenv'
   config()

// const { MongoClient} = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client: any = null;


export let db: Db;
export let blogCollection: Collection<BlogViewModelType>;
export let postCollection: Collection<PostViewModelType>;

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