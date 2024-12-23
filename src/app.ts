import express from 'express'
import cors from 'cors'
import {blogsRouter} from './routers/blogs-router'
import { postsRouter } from './routers/posts-router';
import { SETTINGS } from "./settings";
import { Request, Response } from "express"
import { deletAllDataController } from './controllers/deleteAllDataController/deleteAllDataController';

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.use(SETTINGS.PATH.blogs, blogsRouter)
app.use(SETTINGS.PATH.posts, postsRouter)
app.delete(SETTINGS.PATH.dellAllData, deletAllDataController )
app.get('/', (req:Request, res:Response) => {
      // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
      res.status(200).json({version: '1.0'})
})