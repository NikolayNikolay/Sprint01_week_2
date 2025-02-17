import { blogCollection, commentsCollection, db, postCollection, usersCollection } from "../../../db/mongo-db";


export const deleteAllDataBaseRepositoriry = async() =>{
  // const resultAllBlogsDel = await blogCollection.deleteMany({});
  // const resultAllPostsDel = await postCollection.deleteMany({});
  // const resultAllUsersDel = await usersCollection.deleteMany({});
  // const resultAllCommentsDel = await commentsCollection.deleteMany({});
  const collections = await db.listCollections().toArray()
  for(const colletion of collections){
    await db.collection(colletion.name).deleteMany({})
  }
  // return [resultAllBlogsDel.acknowledged , resultAllPostsDel.acknowledged,resultAllUsersDel.acknowledged]
}