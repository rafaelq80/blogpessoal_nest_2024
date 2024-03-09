import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../auth/enums/role.enum";

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    public nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    public usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    public senha: string

    @Column({ length: 5000 })
    @ApiProperty()
    public foto: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    public roles: Role[];

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    @ApiProperty()
    postagem: Postagem[]


}