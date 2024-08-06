import { Car, User } from '@prisma/client';

export interface CarWithSavedByLabel extends Omit<Car, 'userId'> {
    savedBy: boolean;
}

export interface CarWithSavedByUser extends Omit<Car, 'userId'> {
    savedBy: User[];
}
