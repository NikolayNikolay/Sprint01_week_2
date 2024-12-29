import { postCollection } from "../../db/mongo-db"
import { blogCollection } from "../../db/mongo-db"

export const deleteAllDataBaseRepositoriry = async() =>{
  const resultAllBlogsDel = await blogCollection.deleteMany({});
  const resultAllPostsDel = await postCollection.deleteMany({});
  return [resultAllBlogsDel.acknowledged , resultAllPostsDel.acknowledged]
}