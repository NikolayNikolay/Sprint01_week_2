import { blogCollection, postCollection, usersCollection } from "../../../db/mongo-db";


export const deleteAllDataBaseRepositoriry = async() =>{
  const resultAllBlogsDel = await blogCollection.deleteMany({});
  const resultAllPostsDel = await postCollection.deleteMany({});
  const resultAllUsersDel = await usersCollection.deleteMany({});
  return [resultAllBlogsDel.acknowledged , resultAllPostsDel.acknowledged,resultAllUsersDel.acknowledged]
}