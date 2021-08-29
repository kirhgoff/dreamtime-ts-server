import bcrypt from "bcryptjs";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";

  @Entity("people")
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ name: 'full_name'})
    fullName!: string;
  
    @Column()
    email!: string;

    @Column()
    role!: string;

    @Column()
    @Length(4, 100)
    password!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // TODO: use async and check if this is up to date
    hashPassword(value: string) {
      this.password = bcrypt.hashSync(value, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }