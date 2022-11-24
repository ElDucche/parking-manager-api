import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSlot } from './parkingSlot.entity';

@Injectable()
export class ParkingSlotService {
    constructor(
        @InjectRepository(ParkingSlot)
        private parkingSlotRepository: Repository<ParkingSlot>,
    ) {}

    findAll(): Promise<ParkingSlot[]> {
        return this.parkingSlotRepository.find();
    }

    findAllParkingSlotsByFloor(floor: number): Promise<ParkingSlot[]> {
        return this.parkingSlotRepository.find({where : {floor : floor}})
    }

    createParkingSlot(parkingSlot: ParkingSlot) {
        if (!parkingSlot.floor || !parkingSlot.slot){
            throw new BadRequestException();
        }
        this.parkingSlotRepository.save(parkingSlot)
    }

    updateParkingSlot(id: number, parkingSlot: ParkingSlot) {
        return this.parkingSlotRepository.update({ id }, { ...parkingSlot});
    }

    deleteParkingSlot(id: number) {
        return this.parkingSlotRepository.delete({ id });
    }




}
