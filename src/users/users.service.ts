import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSlot } from 'src/parking-slot/parkingSlot.entity';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(ParkingSlot) private parkingSlotRepository: Repository<ParkingSlot>
    ) {}

    findUsers() {
        return this.userRepository.find({ relations: ['parkingSlot']});
    }

    findOneUser(id: number) {
        return this.userRepository.findOneBy({id})
    }

    async createUser(user: User) {
        const saltOrRounds = 10;
        const password = user.password;
        const hash = bcrypt.hash(password, saltOrRounds)
        user.password = await hash;
        return this.userRepository.save({...user});
    
        
    }

    async updateUser(id: number, user: User) {
        const saltOrRounds = 10;
        const password = user.password;
        const hash = bcrypt.hash(password, saltOrRounds)
        user.password = await hash;
        return this.userRepository.update({ id }, {...user})
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id })
    }

    async claimParkingSlot(id: number, parkingSlotId: number ) {
        //Attribue au user qui a l'id 'id' la place indiquée en body
        // je trouve mon user
        const user = await this.userRepository.findOneBy( { id });
        if (!user) {
            throw new NotFoundException();
        }
        if (user.parkingSlot) {
            throw new ConflictException();
        }
        const parkingSlot = await this.parkingSlotRepository.findOneBy({ id: parkingSlotId })
        // Je lui donne la place.
        parkingSlot.isUsed = true;
        this.parkingSlotRepository.update({ id: parkingSlotId}, {...parkingSlot})
        user.parkingSlot = parkingSlot;
        return this.userRepository.update({ id }, {parkingSlot})
    }

    //id c'est celui de mon user. Je dois récup l'id de ma place de parking
    async unclaimParkingSlot(id: number) {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new BadRequestException();
        }
        if (!user.parkingSlot) {
            throw new ConflictException();
        }
        const parkingSlotId = user.parkingSlot["id"];
        const parkingSlot = await this.parkingSlotRepository.findOneBy({id: parkingSlotId});
        parkingSlot.isUsed = false;
        this.parkingSlotRepository.update({id: parkingSlotId}, {...parkingSlot})
        user.parkingSlot = null;
        return this.userRepository.update({id}, {...user})
        
    }
}
