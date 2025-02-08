import { Car, SavedCarItem } from '@prisma/client';

export interface CarWithSavedByLabel extends Car {
    savedBy: boolean;
}

export interface CarWithSavedByUser extends Car {
    savedBy: SavedCarItem[];
}
