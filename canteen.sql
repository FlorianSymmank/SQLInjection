-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-11-29 15:21:45.998

-- tables
-- Table: DishAllergen
CREATE TABLE DishAllergen (
    dishId int  NOT NULL,
    allergen text  NOT NULL,
    CONSTRAINT DishAllergen_pk PRIMARY KEY (allergen,dishId)
);

-- Table: Dishes
CREATE TABLE Dishes (
    dishId serial  NOT NULL,
    price money  NOT NULL,
    name text  NOT NULL,
    description text  NOT NULL,
    CONSTRAINT Dishes_pk PRIMARY KEY (dishId)
);

-- Table: Menu
CREATE TABLE Menu (
    id serial  NOT NULL,
    dishId int  NOT NULL,
    date date  NOT NULL,
    secret boolean  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: Orders
CREATE TABLE Orders (
    orderId serial  NOT NULL,
    dishId int  NOT NULL,
    date date  NOT NULL,
    patientId int  NOT NULL,
    CONSTRAINT Orders_pk PRIMARY KEY (orderId)
);


INSERT INTO DishAllergen (dishId, allergen) VALUES (1, 'Hannes');

-- End of file.

