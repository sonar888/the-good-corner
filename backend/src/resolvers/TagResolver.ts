import { Query, Mutation, Resolver, Arg, InputType, Field, ID } from "type-graphql";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { FindManyOptions } from "typeorm";

@InputType()
class dataInput {
    @Field()
    name: string
}

@Resolver(Tag)
export default class TagResolver {
    @Query(()=> [Tag])
    async  getAllTags() {
        let options: FindManyOptions<Tag> = {
            relations: { ads: true },
          };

        const tags = await Tag.find(options);
        return tags

    }

    @Query(()=>Tag)
    async getOneTag(@Arg("id") id: number) {
        let options: FindManyOptions<Tag> = {
            relations: { ads: true },
          };
        const tag = await Tag.findOne({
            where: {
                id: id,
            },
            relations: {
                ads: true,
            },
        })
        return tag

    }

    @Mutation(() => ID)
    async createTag(@Arg("data") data: dataInput) {
        const tag = Tag.create({...data});
        await tag.save()
        return tag.id
       }

    @Mutation(() => ID)
    async deleteTag(@Arg("id") id: number) {
        await Tag.delete({id})
        return id
    }


}

