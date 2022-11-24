# Documentation

This is the parking-manager-api Documentation
# Parking Slot
## Get
### /parking-slot/
Return all the parking slot in the parking
### /parking-slot/:floor
Where floor is a number. Return all parking slot at this floor.

## Post
### /parking-slot/
Post the parking slot that has been send in the body of the request. A parking slot must have a floor (number) and a slot (number).

## Patch
### /parking-slot/:id
Where id is a number. Change the data of the parking slot that has been select by the id with the data sent in the body of the request.

## Delete
### /parking-slot/:id
Delete the selected parking slot.

# Users
## Get
### /users/
Return all the users from the database

### /users/:id
Return the data from the selected user

## Post
### /users/
Create a new user with the body-s request.

## Patch
### /users/:id
Update user's data.
### /users/:id/:parkinSlotId
Give the selected user a parking slot and put this parking slot isUsed's property to true.
### /users/:id/unclaimParkingSlot
Put the value of user's parking slot to null.

## Delete
### /users/:id
Delete this user.

