import { DB } from "../db/db"


export const deleteAllDataBaseRepositoriry = () =>{
   DB.blogs = []
   DB.posts = []
   console.log(DB.blogs,DB.posts)
}