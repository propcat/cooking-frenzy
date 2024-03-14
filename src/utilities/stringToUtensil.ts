import { UtensilState } from '@mytypes/UtensilState';

export const stringToUtensil = (utensil: string) => JSON.parse(utensil) as UtensilState;