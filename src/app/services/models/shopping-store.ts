export enum ShoppingStore {
    novus = 'novus',
    metro = 'metro',
    aushan = 'aushan',
    silpo = 'silpo',
    atb = 'atb',
};

export type ShoppingStoreType = keyof typeof ShoppingStore;
