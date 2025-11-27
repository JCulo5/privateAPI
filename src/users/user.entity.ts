import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';

console.log(Report);

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  loginsert() {
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logupdate() {
    console.log('Updated User with id:', this.id);
  }

  @AfterRemove()
  logremove() {
    console.log('Removed User with id:', this.id);
  }
}
