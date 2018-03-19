import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsArray } from 'class-validator'

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('json', {nullable: true})
    stack: any[]


    @Column('json', {nullable: true})
    played: any[]

    @Column('json', {nullable: true})
    active: number

    @Column('json', {nullable: true})
    player1: any[]

    @Column('json', {nullable: true})
    player2: any[]

    @Column('text', {nullable: true})
    userId_to_player1: any

    @Column('text', {nullable: true})
    userId_to_player2: any
}
