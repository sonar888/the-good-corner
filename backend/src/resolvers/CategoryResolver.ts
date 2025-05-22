import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { ID, Arg, Field, InputType, Query, Mutation, Resolver } from "type-graphql";
import { FindManyOptions } from "typeorm";


@InputType()
class TagInput{
  @Field()
  name: string;
}

@Resolver(Category)
export default class CategoryResolver{
    @Query(()=>[Category])
    async getAllCategories () {
        let options: FindManyOptions<Category> = {
            relations: { ads: true },
          };
        const categories = await Category.find(options)
        return categories
}

  @Query(()=> Category)
    async getOneCategory (@Arg("id") id: number) {
      const category = await Category.findOne({
        where: {
            id: id,
        },
        relations: {
            ads: true,
        },
    });
      return category

}
@Mutation(() => ID)
  async createCategory(@Arg("data") data: TagInput) {
    const category = Category.create({...data});
    await category.save();
    return category.id;
}

@Mutation (()=>ID)
  async deleteCategory(@Arg("id") id: number) {
    await Category.delete({id})
    return id
  }


}