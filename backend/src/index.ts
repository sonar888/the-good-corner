import express from "express";
import "reflect-metadata";
import {Ad} from "./entities/Ad";
import {dataSource} from "./config/db";
import { MoreThan } from "typeorm";
import { Tag } from "./entities/Tag";
import { Category } from "./entities/Category";
import cors from "cors"




const app = express();
// const cors = cors();
const port = 3000;

app.use(express.json()) //permet de lire la reponse json la réponse
app.use(cors())


//Ads
app.get('/ads', async(_req, res)=>{ 
  const ads = await Ad.find({
    relations: {
      tags: true
    }
  });
  res.send(ads);
    
})



app.post('/ad', async (req, res)=>{
  const ad = Ad.create(req.body);
  await ad.save();
  res.send(ad);

})

app.put('/ad/:id', async(req, res) => {
  await Ad.update({id : Number.parseInt(req.params.id)}, req.body)
  res.send("Ad has been updated")

})

app.delete('/ad/:id', async (req, res) => {
  Ad.delete({id : Number.parseInt(req.params.id)})
  res.send(`Ad ${req.params.id} has been removed`)
  
})

// Ads by category

app.get('/ads/category/:name', async(req, res)=> {
  const ads = await Ad.findBy({
    category: {
      name: req.params.name
    }
    
  });
  res.send(ads);
})




//Categories

app.get('/categories', async(req, res) => {
  const categories = await Category.find();
  res.send(categories);
})

app.post('/category', async(req, res) => {
  let category = Category.create(req.body)
  try {
    await category.save()
    res.status(201).send(category)

  } catch(err) {
    res.status(500).send(err)
    console.log(err)

  }
  
  

})

app.put('/category/:id', async (req, res) => {
  await Category.update({id : Number.parseInt(req.params.id)}, req.body)
  res.send("the category has been updated")
})

app.delete('/category/:id', async (req, res) =>{
  Category.delete({id : Number.parseInt(req.params.id)})
  res.send("category deleted")
})





//Tag

app.get('/tags', async (_req , res)=> {
 const tags = await Tag.find();
 res.send(tags)
})

app.post('/tag', async (req , res) => {
  let tag = Tag.create(req.body);
  await tag.save()
  res.send(tag)
})

app.put('/tag/:id', async (req , res)=> {
  await Tag.update({id: Number.parseInt(req.params.id)}, req.body);
  res.send("Tag updated")

})

app.delete('/tag/:id', async (req , res) => {
  Tag.delete({id: Number.parseInt(req.params.id)})
  res.send("Tag deleted")
})







app.listen(port, async() => {
  await dataSource.initialize();
  const categories = await Category.find();
  if (categories.length === 0) {
    const misc = new Category()
    misc.name = "misc";
    misc.save();
  }
  console.log(`Server launched on port ${port}`)
})