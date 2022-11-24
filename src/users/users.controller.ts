import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParkingSlot } from 'src/parking-slot/parkingSlot.entity';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Get(':id')
    getOneUser(@Param('id') id: number) {
        return this.userService.findOneUser(id) ;
    }

    @Post()
    createUser(@Body() user: User) {
       return this.userService.createUser(user)
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: number,
        @Body() user: User
        ) {
        return this.userService.updateUser(id, user);
    }

    @Patch(':id/:parkingSlotId')
    claimParkingSlot(
        @Param('id') id: number,
        @Param('parkingSlotId') parkingSlotId: number
    ) {
        return this.userService.claimParkingSlot(id, parkingSlotId)
    }

    @Patch(':id/unclaimParkingSlot')
    unclaimParkingSlot(@Param('id') id: number) {
        return this.userService.unclaimParkingSlot(id);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}
