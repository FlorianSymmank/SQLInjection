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
    name text  NOT NULL,
    birthdate date  NOT NULL,
    streetname text  NOT NULL,
    postcode text  NOT NULL,
    city text  NOT NULL,
    country text  NOT NULL,
    telefonnumber text  NOT NULL,
    creditcardnumber text  NOT NULL,
    balance money  NOT NULL,
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

-- End of file.

