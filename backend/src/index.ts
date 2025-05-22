import express from "express";
import "reflect-metadata";
import {Ad} from "./entities/Ad";
import {dataSource} from "./config/db";
import { ILike } from "typeorm";
import { Tag } from "./entities/Tag";
import { Category } from "./entities/Category";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";






const port = 3000;




// //Ads
// app.get('/ads', async(_req, res)=>{ 
//   const ads = await Ad.find({
//     relations: {
//       tags: true
//     }
//   });
//   res.send(ads);
    
// })

// app.get('/ad/:id', async(req, res)=> {
//   const ad = await Ad.findOneByOrFail({
//     id: Number.parseInt(req.params.id)
//   })
//   res.send(ad)
// })



// app.post('/ad', async (req, res)=>{
//   const ad = Ad.create(req.body);
//   await ad.save();
//   res.send(ad);

// })

// app.put('/ad/:id', async(req, res) => {
//   try {
//     const adToUpdate = await Ad.findOneByOrFail({id : Number.parseInt(req.params.id)})
//     console.log(adToUpdate)

//     //Version initiale:

//     // adToUpdate.title = req.body.title ? req.body.title : adToUpdate.title 
//     // adToUpdate.description = req.body.description ? req.body.description : adToUpdate.description 
//     // adToUpdate.owner = req.body.owner ? req.body.owner : adToUpdate.owner 
//     // adToUpdate.location = req.body.location ? req.body.location : adToUpdate.location 
//     // adToUpdate.price = req.body.price ? req.body.price : adToUpdate.price 
//     // adToUpdate.image = req.body.image ? req.body.image : adToUpdate.image
//     // adToUpdate.category = req.body.category ? req.body.category : adToUpdate.category
//     // adToUpdate.tags = req.body.tags ? req.body.tags.map((tag:string)=>({id: Number.parseInt(tag)})) : adToUpdate.tags

//     // await adToUpdate.save()
//     // res.send("Ad has been updated")
    

//     //Version par chatGPT

//     // const adToUpdate = await Ad.findOneByOrFail({ id: Number.parseInt(req.params.id) });
//     // console.log(adToUpdate);

//     // const { title, description, owner, location, price, image, category, tags } = req.body;

//     // Object.assign(adToUpdate, {
//     // title: title ?? adToUpdate.title,
//     // description: description ?? adToUpdate.description,
//     // owner: owner ?? adToUpdate.owner,
//     // location: location ?? adToUpdate.location,
//     // price: price ?? adToUpdate.price,
//     // image: image ?? adToUpdate.image,
//     // category: category ?? adToUpdate.category,
//     // tags: tags ? tags.map((tag: string) => ({ id: Number.parseInt(tag) })) : adToUpdate.tags
//     // });

//     // await adToUpdate.save();
//     // res.send("Ad has been updated");


//   //Version optimisée en utilisant la merge
//     Ad.merge(adToUpdate, req.body);
//      adToUpdate.tags = req.body.tags
//        ? req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }))
//        : adToUpdate.tags;
//     await adToUpdate.save();
//     res.send("Ad has been updated");

//   } catch (error) {
//     res.status(500).send(error)
    
//   }

// })

// app.delete('/ad/:id', async (req, res) => {
//   Ad.delete({id : Number.parseInt(req.params.id)})
//   res.send(`Ad ${req.params.id} has been removed`)
  
// })

// // Ads by category

// app.get('/ads/category/:name', async(req, res)=> {
//   try {
//     const ads = await Ad.findBy({
//       category: {
//         name: req.params.name
//       }
      
//     });
    
//     res.send(ads);

//   } catch(error) {
//     res.status(500).send(error)

//   }
  
// })

// //Ads by search

// app.get('/ads/search/:keyword', async(req , res) => {
//   try {
//     const ads = await Ad.find({
//       where: { title: ILike(`%${req.params.keyword}%`) }
      

//     })
//     res.send(ads)
//     console.log(req.params.keyword)

//   } catch(err) {
//     console.log(err)

//   }
// })




// //Categories

// app.get('/categories', async(req, res) => {
//   const categories = await Category.find();
//   res.send(categories);
// })

// app.post('/category', async(req, res) => {
//   let category = Category.create(req.body)
//   try {
//     await category.save()
//     res.status(201).send(category)

//   } catch(err) {
//     res.status(500).send(err)
//     console.log(err)

//   }
  
  

// })

// app.put('/category/:id', async (req, res) => {
//   try {
//     await Category.update({id : Number.parseInt(req.params.id)}, req.body)
//   res.send("the category has been updated")
//   } catch(error){
//     console.log(error)
//     res.status(500).send(error)
//   }
// })

// app.delete('/category/:id', async (req, res) =>{
//   Category.delete({id : Number.parseInt(req.params.id)})
//   res.send("category deleted")
// })





// //Tag

// app.get('/tags', async (_req , res)=> {
//  const tags = await Tag.find();
//  res.send(tags)
// })

// app.post('/tag', async (req , res) => {
//   let tag = Tag.create(req.body);
//   await tag.save()
//   res.send(tag)
// })

// app.put('/tag/:id', async (req , res)=> {
//   await Tag.update({id: Number.parseInt(req.params.id)}, req.body);
//   res.send("Tag updated")

// })

// app.delete('/tag/:id', async (req , res) => {
//   try {
//     Tag.delete({id: Number.parseInt(req.params.id)})
//   res.send("Tag deleted")

//   } catch(error) {
//     res.status(500).send('this add does not exist')
//     console.log(error)

//   }
  
// })




async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({resolvers: [AdResolver, CategoryResolver, TagResolver]});
  const apolloServer = new ApolloServer({schema: schema});
  const {url} = await startStandaloneServer(apolloServer, {listen : {port}})
  console.log("Server started on " + url);
}
startServer()
