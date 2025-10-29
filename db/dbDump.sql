-- Abilita estensione PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- ===============================
-- TABELLA: Comuni
-- ===============================
CREATE TABLE Comuni (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    regione VARCHAR(15) NOT NULL
);

-- ===============================
-- TABELLA: Cittadini
-- ===============================
CREATE TABLE Cittadini (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(50) UNIQUE,
    data_nascita DATE,
    password VARCHAR(255)
);

-- ===============================
-- TABELLA: Vetture
-- ===============================
CREATE TABLE Vetture (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    euro INT NOT NULL,
    vin VARCHAR(20) NOT NULL
);

-- ===============================
-- TABELLA: Proprietà
-- ===============================
CREATE TABLE Proprietà (
    id SERIAL PRIMARY KEY,
    id_cittadino INT NOT NULL,
    id_vettura INT NOT NULL,
    FOREIGN KEY (id_cittadino)
        REFERENCES Cittadini(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (id_vettura)
        REFERENCES Vetture(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===============================
-- TABELLA: Sessioni
-- ===============================
CREATE TABLE Sessioni (
    id SERIAL PRIMARY KEY,
    id_cittadino INT NOT NULL,
    FOREIGN KEY (id_cittadino)
        REFERENCES Cittadini(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===============================
-- TABELLA: Area
-- ===============================
CREATE TABLE Area (
    id SERIAL PRIMARY KEY,
    polygon geometry(POLYGON, 4326),
    id_comune INT NOT NULL,
    FOREIGN KEY (id_comune)
        REFERENCES Comuni(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===============================
-- TABELLA: EcoScores
-- ===============================
CREATE TABLE EcoScores (
    id SERIAL PRIMARY KEY,
    punteggio DOUBLE PRECISION,
    id_area INT NOT NULL DEFAULT 0,
    id_sessione INT NOT NULL,
    FOREIGN KEY (id_area)
        REFERENCES Area(id)
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT,
    FOREIGN KEY (id_sessione)
        REFERENCES Sessioni(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ===============================
-- INDICI

-- Indice sul campo polygon della tabella Area
CREATE INDEX idx_area_polygon ON Area USING GIST (polygon);

-- Indice sul campo email della tabella Cittadini
CREATE INDEX idx_cittadini_email ON Cittadini(email);

-- Indice sul campo id_sessione della tabella EcoScores
CREATE INDEX idx_ecoscores_id_sessione ON EcoScores(id_sessione);