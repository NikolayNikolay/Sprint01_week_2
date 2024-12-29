import { blogRepository } from "../../repository/blogsRepository"
import { Request, Response } from "express"
import { httpStatusCodes,SETTINGS } from "../../settings"
import { DB } from "../../db/db"
// import { deleteAllDataBaseRepositoriry } from "../../repository/deleteAllDataRepository"
import { deleteAllDataBaseRepositoriry } from "../../repository/mongo-db-repository/deleteAllDataRepository"





export const deletAllDataController = async(req:Request , res:Response)=>{
   console.log(req.url === SETTINGS.PATH.dellAllData)
   if (req.url === SETTINGS.PATH.dellAllData) {
      const isEmptyBlogs = await deleteAllDataBaseRepositoriry()
      if (isEmptyBlogs.length === 2) {
         res.status(httpStatusCodes.NO_CONTENT).send('All data is deleted')
         return
      }
   }
   else{
      res.send('Can not dellete all data , somthing went wrong!!!')
   }
}