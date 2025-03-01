export type BlogViewModelType = {
   id?: string,
   name:	string,
   description	: string,
   websiteUrl: string,
   createdAt: string,
   isMembership: boolean
}

export class BlogViewModel{
   constructor(
      public name:string,
      public description: string,
      public websiteUrl: string,
      public createdAt: string,
      public isMembership: boolean,
      public id?: string
   ){
   }
}