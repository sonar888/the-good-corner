import {
    BaseEntity,
    Column,
    Entity,
    CreateDateColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {Category} from "./Category";
import {Tag } from "./Tag";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({length: 100, nullable: false})
    @Field()
    title: string;

    @Column({nullable: true})
    @Field()
    description: string

    @Column({length: 300, nullable: true})
    @Field()
    owner: string;

    @Column({length: 100, nullable: true})
    @Field()
    location: string;

    @Column({nullable: true})
    @Field()
    price: number;

    @Column({nullable: true})
    @Field()
    image: string;

    
    @CreateDateColumn()
    @Field()
    createdDate: Date

    @ManyToOne(() => Category, (category) => category.ads, {
        eager: true,
    })
    @Field(()=> Category)
    category: Category;

    @ManyToMany(()=> Tag, (tag) => tag.ads, {
        eager: true
    } )
    @JoinTable()
    @Field(()=>[Tag])
    tags: Tag[];

}

