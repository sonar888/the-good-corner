import { Query, Mutation, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { FindManyOptions } from "typeorm";


@Resolver(Ad)
class AdResolver {
    @Query(()=>[Ad])
    async getAllAds () {
        let findOptions: FindManyOptions<Ad> = {
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
          const allAds = await Ad.find(findOptions);
          return allAds;
        
    }
}