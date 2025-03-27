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

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    title: string;

    @Column({nullable: true})
    description: string

    @Column({length: 300, nullable: true})
    owner: string;

    @Column({length: 100, nullable: true})
    location: string;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    image: string;

    
    @CreateDateColumn()
    createdDate: Date

    @ManyToOne(() => Category, category => category.ads, {
        eager: true,
    })
    category: Category;

    @ManyToMany(()=> Tag, {
        eager: true
    } )
    @JoinTable()
    tags: Tag[];

}
