import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false, unique: true})
    name: string;

    @OneToMany(() => Ad, (ad) => ad.category)
    ads: Ad[]
}