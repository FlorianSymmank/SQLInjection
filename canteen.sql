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

INSERT INTO Dishes (dishId, price, name) VALUES (0, $3.50, "Chicken Noodle Casserole");
INSERT INTO Dishes (dishId, price, name) VALUES (1, $3.90, "Tuna Patties");
INSERT INTO Dishes (dishId, price, name) VALUES (2, $3.50, "Quattro Formaggi Pizza");
INSERT INTO Dishes (dishId, price, name) VALUES (3, $4.80, "Veggie Burger");
INSERT INTO Dishes (dishId, price, name) VALUES (4, $2.40, "Biscuits and Gravy");
INSERT INTO Dishes (dishId, price, name) VALUES (5, $2.80, "Bacon and Spinach Pasta");
INSERT INTO Dishes (dishId, price, name) VALUES (6, $2.20, "Chicken Caesar Salad");
INSERT INTO Dishes (dishId, price, name) VALUES (7, $5.00, "Honey Garlic Shrimp");
INSERT INTO Dishes (dishId, price, name) VALUES (8, $4.70, "Honey Mustard Salmon");
INSERT INTO Dishes (dishId, price, name) VALUES (9, $3.30, "Tuna melt Sandwich");
INSERT INTO Dishes (dishId, price, name) VALUES (10, $4.90, "Lemon Butter Shrimp with Asparagus");
INSERT INTO Dishes (dishId, price, name) VALUES (11, $2.90, "Bacon Corn Chowder");
INSERT INTO Dishes (dishId, price, name) VALUES (12, $2.30, "Fried Noodles with Chicken and Peanut Sauce");
INSERT INTO Dishes (dishId, price, name) VALUES (13, $4.00, "Chicken Cordon Bleu");
INSERT INTO Dishes (dishId, price, name) VALUES (14, $2.20, "Chocolate Cake");
INSERT INTO Dishes (dishId, price, name) VALUES (15, $2.20, "Creme Brulee");


INSERT INTO Menu (id, dishId, date, secret) VALUES (0, 0, '2023-01-02', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (1, 6, '2023-01-02', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (2, 1, '2023-01-03', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (3, 2, '2023-01-03', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (4, 12, '2023-01-04', true);
INSERT INTO Menu (id, dishId, date, secret) VALUES (5, 7, '2023-01-04', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (6, 6, '2023-01-04', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (7, 3, '2023-01-05', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (8, 4, '2023-01-05', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (9, 5, '2023-01-06', false); 
INSERT INTO Menu (id, dishId, date, secret) VALUES (10, 6, '2023-01-06', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (11, 9, '2023-01-07', true);
INSERT INTO Menu (id, dishId, date, secret) VALUES (12, 7, '2023-01-07', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (13, 8, '2023-01-07', false);

INSERT INTO Menu (id, dishId, date, secret) VALUES (14, 14, '2023-01-08', true);
INSERT INTO Menu (id, dishId, date, secret) VALUES (15, 10, '2023-01-08', false);
INSERT INTO Menu (id, dishId, date, secret) VALUES (16, 11, '2023-01-08', false);

INSERT INTO DishAllergen (dishId, allergen) VALUES (0, "lactose");
INSERT INTO DishAllergen (dishId, allergen) VALUES (2, "lactose");
INSERT INTO DishAllergen (dishId, allergen) VALUES (4, "lactose");
INSERT INTO DishAllergen (dishId, allergen) VALUES (11, "lactose");
INSERT INTO DishAllergen (dishId, allergen) VALUES (12, "peanut");
INSERT INTO DishAllergen (dishId, allergen) VALUES (13, "lactose");
INSERT INTO DishAllergen (dishId, allergen) VALUES (14, "egg");
INSERT INTO DishAllergen (dishId, allergen) VALUES (15, "lactose");

-- End of file.