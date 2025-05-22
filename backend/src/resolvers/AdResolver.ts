import { Query, Mutation, Resolver, Arg, InputType, Field, ID } from "type-graphql";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { FindManyOptions } from "typeorm";

@InputType()
class AdInput {
        @Field()
        title: string;
     
        @Field()
        description: string
      
        @Field()
        owner: string;
      
        @Field()
        location: string;
     
        @Field()
        price: number;
   
        @Field()
        image: string;
    
        @Field(() => ID)
        category: Category;
    
        @Field(()=> [ID])
        tags: Tag[];
}

@Resolver(Ad)
export default class AdResolver {
    @Query(()=>[Ad])
    async getAllAds () {
        let options: FindManyOptions<Ad> = {
            relations: { category: true, tags: true },
          };
        //   if (req.query.category !== undefined) {
        //     findOptions = {
        //       ...findOptions,
        //       where: {
        //         category: { id: Number.parseInt(req.query.category as string) },
        //       },
        //     };
        //   }
        //   if (req.query.search !== undefined) {
        //     console.log("search query", req.query.search);
        //     findOptions = {
        //       ...findOptions,
        //       where: { title: ILike(`%${req.query.search}%`) },
        //     };
        //   }
          const ads = await Ad.find(options);
          return ads;
        
    }

    @Query(()=>Ad)
    async getOneAd(@Arg("id") id: number) {
        const ad = await Ad.findOneByOrFail({id})
        return ad

    }

    @Mutation(()=>Ad)
    async createAd(@Arg("data") data:AdInput) {
       const ad = Ad.create({
        ...data,
        tags: data.tags.map((tag)=>({id:Number(tag)}))
       });
       await ad.save() 
       return await Ad.findOneBy({ id: ad.id })      

    }

    @Mutation(()=> Ad)
    async updateAd(@Arg("id") id: number, @Arg("data") data:AdInput) {
      let ad = await Ad.findOneByOrFail({id});
      ad =Object.assign(ad, data, {
        tags: data.tags.map((tag)=>({id:Number(tag)}))
      });
      await ad.save();
      return await Ad.findOneBy({id: ad.id})

    }

    @Mutation(()=>ID)
    async deleteAd(@Arg("id") id:number) {
      await Ad.delete({id});
      return id
    }
}

