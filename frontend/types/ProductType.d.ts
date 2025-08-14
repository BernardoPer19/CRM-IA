export interface ProductCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductType {
    success: boolean;
    data:    Datum[];
}

export interface ProductDatum {
    id:          string;
    name:        string;
    description: string;
    price:       number;
    stock:       number;
    img:         string;
    categoryId:  CategoryID;
    createdAt:   Date;
    updatedAt:   Date;
    category:    Category;
}

export interface Category {
    id:        CategoryID;
    name:      Name;
    createdAt: Date;
    updatedAt: Date;
}

export enum CategoryID {
    Cme8Sydvp0000Qu0Fwieautcp = "cme8sydvp0000qu0fwieautcp",
    Cme8Syehj0001Qu0Fh5683Czo = "cme8syehj0001qu0fh5683czo",
    Cme8Syej90002Qu0F3Tk2K92P = "cme8syej90002qu0f3tk2k92p",
}

export enum Name {
    Electrónica = "Electrónica",
    Hogar = "Hogar",
    Ropa = "Ropa",
}
