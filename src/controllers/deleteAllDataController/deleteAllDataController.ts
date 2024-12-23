import { blogRepository } from "../../repository/blogsRepository"
import { Request, Response } from "express"
import { httpStatusCodes,SETTINGS } from "../../settings"
import { DB } from "../../db/db"
import { deleteAllDataBaseRepositoriry } from "../../repository/deleteAllDataRepository"





export const deletAllDataController = (req:Request , res:Response)=>{
   console.log(req.url === SETTINGS.PATH.dellAllData)
   if (req.url === SETTINGS.PATH.dellAllData) {
      deleteAllDataBaseRepositoriry()
      const isEmptyBlogs = blogRepository.getAll()
      if (isEmptyBlogs === DB.blogs) {
         res.status(httpStatusCodes.NO_CONTENT).send('All data is deleted')
      }
   }
}