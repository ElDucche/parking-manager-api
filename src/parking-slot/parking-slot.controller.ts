import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { ParkingSlotService } from './parking-slot.service';
import { ParkingSlot } from './parkingSlot.entity';

@Controller('parking-slot')
export class ParkingSlotController {
    constructor(private readonly parkingSlotService: ParkingSlotService) {}

    @Get()
    getAllParkingSlot() {
        return this.parkingSlotService.findAll();
    }

    @Get(':floor')
    getAllParkingSlotByFloor(@Param('floor') floor: number) {
        return this.parkingSlotService.findAllParkingSlotsByFloor(floor);
    }

    @Post()
    // @Roles(Role.Admin)
    createParkingSlot(@Body() parkingSlot: ParkingSlot) {
        return this.parkingSlotService.createParkingSlot(parkingSlot);
    }

    @Patch(':id')
    updateParkingSlot(@Param('id') id : number, @Body() parkingSlot: ParkingSlot) {
        return this.parkingSlotService.updateParkingSlot(id, parkingSlot)
    }

    @Delete(':id')
    deleteParkingSlot(@Param('id') id: number) {
        return this.parkingSlotService.deleteParkingSlot(id);
    }
}
