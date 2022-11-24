import { ParkingSlot } from 'src/parking-slot/parkingSlot.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column({ default: 'user' })
    role: Role;

    @OneToOne(() => ParkingSlot)
    @JoinColumn()
    parkingSlot: ParkingSlot | null;
    
  }
