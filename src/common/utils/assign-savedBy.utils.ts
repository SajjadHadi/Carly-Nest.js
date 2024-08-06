import { CarWithSavedByLabel, CarWithSavedByUser } from '../../cars/types';

export const assignSavedByLabel = (cars: CarWithSavedByUser[], userId: number): CarWithSavedByLabel[] =>
    cars.map((car) => {
        const isSaved = userId ? car.savedBy.some((savedUser) => savedUser.id == userId) : false;
        return { ...car, savedBy: isSaved };
    });
