-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-11-29 15:16:32.904

-- tables
-- Table: Doctors
CREATE TABLE Doctors (
    doctorId serial  NOT NULL,
    name int  NOT NULL,
    CONSTRAINT Doctors_pk PRIMARY KEY (doctorId)
);

-- Table: Findings
CREATE TABLE Findings (
    findingId serial  NOT NULL,
    description text  NOT NULL,
    treatmentId int  NOT NULL,
    date date  NOT NULL,
    CONSTRAINT Findings_pk PRIMARY KEY (findingId)
);

-- Table: PatientAllergen
CREATE TABLE PatientAllergen (
    patientId int  NOT NULL,
    allergen text  NOT NULL,
    CONSTRAINT PatientAllergen_pk PRIMARY KEY (patientId,allergen)
);

-- Table: Patients
CREATE TABLE Patients (
    patientId serial  NOT NULL,
    pwd text NOT NULL,
    name text  NOT NULL,
    birthdate date  NOT NULL,
    streetname text  NOT NULL,
    postcode text  NOT NULL,
    city text  NOT NULL,
    country text  NOT NULL,
    telefonnumber text  NOT NULL,
    creditcardnumber text  NOT NULL,
    CONSTRAINT Patients_pk PRIMARY KEY (patientId)
);

-- Table: RoomOccupancies
CREATE TABLE RoomOccupancies (
    roomId serial  NOT NULL,
    patientId int  NOT NULL,
    fromDate date  NOT NULL,
    toDate date  NOT NULL,
    CONSTRAINT RoomOccupancies_pk PRIMARY KEY (roomId)
);

-- Table: Treatments
CREATE TABLE Treatments (
    doctorId int  NOT NULL,
    patientId int  NOT NULL,
    fromDate date  NOT NULL,
    toDate date  NOT NULL,
    treatmentId serial  NOT NULL,
    CONSTRAINT Treatments_pk PRIMARY KEY (treatmentId)
);

INSERT INTO Patients (pwd, name, birthdate, streetname, postcode, city, country, telefonnumber, creditcardnumber) VALUES 
('coolPW', 'Han Solo', '1970-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045504555', '4385822056110982'),
('coolPW', 'Samwise Gamgee', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508755', '5565822056110841'),
('coolPW', 'Jack Sparrow', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '030455087567', '8315822056110334'),
('coolPW', 'Harry Potter', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045507532', '4975822056110510'),
('coolPW', 'John Snow', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508452', '1165822056110887'),
('coolPW', 'Leia Organa', '1970-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508476', '9875822056110434'),
('coolPW', 'Galadriel', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045558145', '3545822056110479'),
('coolPW', 'Tia Dalma', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508676', '2845822056110369'),
('coolPW', 'Hermione Granger', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508637', '9875822056110754'),
('coolPW', 'Rhaenyra Targaryen', '2000-01-01', 'streetname', '12345', 'Berlin', 'Germany', '03045508765', '1445822056110922');


INSERT INTO PatientAllergen (patientId, allergen) VALUES (1, 'egg');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (1, 'lactose');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (2, 'peanut');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (4, 'peanut');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (5, 'lactose');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (5, 'peanut');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (9, 'egg');
INSERT INTO PatientAllergen (patientId, allergen) VALUES (10, 'lactose');

-- End of file.

