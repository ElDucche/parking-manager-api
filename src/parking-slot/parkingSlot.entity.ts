
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class ParkingSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slot: number;

  @Column()
  floor: number;

  @Column({default : false})
  isUsed: boolean;

}
