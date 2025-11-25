import {AfterInsert, AfterRemove,AfterUpdate,Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column() 
  password: string;

  @AfterInsert()
  loginsert(){
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logupdate(){
    console.log('Updated User with id:', this.id);
  }

  @AfterRemove()
  logremove(){
    console.log('Removed User with id:', this.id);
  }
}
