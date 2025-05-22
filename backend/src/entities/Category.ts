import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Ad } from "./Ad";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({length: 100, nullable: false, unique: true})
    @Field()
    name: string;

    @OneToMany(() => Ad, (ad) => ad.category)
    @Field(()=>[Ad])
    ads: Ad[]
}