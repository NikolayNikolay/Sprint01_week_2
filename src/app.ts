import express from 'express'
import cors from 'cors'
import { SETTINGS } from "./settings";
import { Request, Response } from "express"
import { blogPostRouter } from './endPoints/blogPosts/router/blog-post-router';
import { usersRouter } from './endPoints/users/router/users-router';
import { postsRouter } from './endPoints/posts/router/posts-router';
import { deletAllDataController } from './endPoints/deleteAllData/controller/deleteAllDataController';
import { blogsRouter } from './endPoints/blogs/router/blogs-router';
import { authLoginRouter } from './endPoints/usersAuthorisation/router/authLogin-router';
import { commentsRouter } from './endPoints/commentsAndPostsComments/rourer/comments-router';
import { postsCommentsRouter } from './endPoints/commentsAndPostsComments/rourer/postsCommentsRouter';

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.use(SETTINGS.PATH.blogs, blogsRouter)

app.use(SETTINGS.PATH.blogs,blogPostRouter)

app.use(SETTINGS.PATH.posts, postsRouter)

app.use(SETTINGS.PATH.users, usersRouter)

app.use(SETTINGS.PATH.authLogin, authLoginRouter)

app.use(SETTINGS.PATH.comments, commentsRouter)

app.use(SETTINGS.PATH.posts, postsCommentsRouter)






app.delete(SETTINGS.PATH.dellAllData, deletAllDataController )





app.get('/', (req:Request, res:Response) => {
      // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
      res.status(200).json({version: '1.0'})
})