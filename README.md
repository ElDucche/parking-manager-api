# Documentation

## Endpoint
* /parking-slot
* /users

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
