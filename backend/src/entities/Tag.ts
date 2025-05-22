import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import { ObjectType, Field } from "type-graphql";

import { Ad } from "./Ad";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    @ManyToMany(() => Ad, ad => ad.tags)
    @Field(()=>[Ad])
    ads: Ad[];
}