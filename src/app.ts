import express from 'express'
import cors from 'cors'
import {blogsRouter} from './routers/blogs-router'
import { SETTINGS } from "./settings";
import { deletAllBlogsController } from './controllers/blogsController/blogsController';
import { Request, Response } from "express"

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.use(SETTINGS.PATH.blogs, blogsRouter)
app.delete(SETTINGS.PATH.dellAllData, deletAllBlogsController)
app.get('/', (req:Request, res:Response) => {
      console.log('1212121212121212121212121')
      // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
      res.status(200).json({version: '1.0'})
})