import express from 'express'
import cors from 'cors'
import {blogsRouter} from './routers/blogs-router'
import { SETTINGS } from "./settings";
import { deletAllBlogsController } from './controllers/blogsController/blogsController';

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.use(SETTINGS.PATH.blogs, blogsRouter)
app.delete(SETTINGS.PATH.dellAllData, deletAllBlogsController)
app.get('/', (req, res) => {
      // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
      res.status(200).json({version: '1.0'})
})

// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)