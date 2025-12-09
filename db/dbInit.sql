-- Abilita estensione PostGIS
CREATE EXTENSION postgis;

-- ================= TABELLE =================

CREATE TABLE comuni (
    istat     int     PRIMARY KEY,
    citta     varchar NOT NULL,
    provincia varchar NOT NULL,
    regione   varchar NOT NULL
);

CREATE TABLE comuni_registrati (
    comune   int     PRIMARY KEY REFERENCES comuni(istat),
    email    varchar NOT NULL UNIQUE,
    password varchar NOT NULL
);

CREATE TABLE tipologie_zone (
    nome varchar PRIMARY KEY
);

CREATE TABLE zone (
    id        serial   PRIMARY KEY,
    comune    int      NOT NULL REFERENCES comuni_registrati(comune) ON DELETE CASCADE ON UPDATE CASCADE,
    tipologia varchar  NOT NULL REFERENCES tipologie_zone(nome) DEFAULT 'generica',
    poligono  geometry NOT NULL
);


CREATE TABLE cittadini (
    email     varchar PRIMARY KEY,
    password  varchar NOT NULL,
    nome      varchar NOT NULL,
    cognome   varchar NOT NULL,
    residenza int NOT NULL REFERENCES comuni(istat)
);

CREATE TABLE vetture (
    proprietario varchar  NOT NULL REFERENCES cittadini(email) ON DELETE CASCADE ON UPDATE CASCADE,
    vin          char(17) PRIMARY KEY
);

CREATE TABLE sessioni (
    id      serial   PRIMARY KEY,
    vettura char(17) NOT NULL REFERENCES vetture(vin) ON DELETE CASCADE ON UPDATE CASCADE,
    km      real     NOT NULL,      -- km percorsi
    co2     real     NOT NULL DEFAULT 0,       -- CO2 emessa
    inizio   bigint  NOT NULL DEFAULT 0   -- timestamp unix epoch (momento di avvio sessione)
);

CREATE TABLE rilevazioni(
    id        serial   PRIMARY KEY,
    sessione  int      NOT NULL REFERENCES sessioni(id) ON DELETE CASCADE ON UPDATE CASCADE,
    punto     geometry NOT NULL,
    punteggio real     NOT NULL
);


-- ================= POPOLAMENTO =================

\copy comuni FROM '/docker-entrypoint-initdb.d/comuni.csv' WITH (FORMAT csv)

INSERT INTO tipologie_zone VALUES
    ('generica'),
    ('residenziale'),
    ('industriale'),
    ('commerciale'),
    ('centro storico');


-- ================= TRIGGER =================

CREATE FUNCTION fn_impedisci_modifiche()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION '% e'' una tabella statica!', TG_TABLE_NAME;
END;
$$ LANGUAGE 'plpgsql';

DO $$
DECLARE
	tabelle text[] := '{"comuni", "tipologie_zone"}';
	tabella text;
BEGIN
	FOREACH tabella IN ARRAY tabelle LOOP
		EXECUTE format(
			'CREATE OR REPLACE TRIGGER tg_impedisci_modifiche_%I
			 BEFORE INSERT OR UPDATE OR DELETE
			 ON %I
			 FOR EACH ROW
			 EXECUTE FUNCTION fn_impedisci_modifiche()',
		tabella, tabella);
	END LOOP;
END;
$$ LANGUAGE 'plpgsql';


-- ================= FUNZIONI =================

CREATE FUNCTION ecoscore_sessione(sessione int)
RETURNS real AS $$
    SELECT AVG(r.punteggio)
    FROM   rilevazioni r
    WHERE  r.sessione = $1
$$ LANGUAGE 'sql';

CREATE FUNCTION ecoscore_cittadino(cittadino varchar)
RETURNS real AS $$
    SELECT AVG(ecoscore_sessione(s.id))
    FROM   vetture v JOIN sessioni s ON s.vettura = v.vin
    WHERE  v.proprietario = $1
$$ LANGUAGE 'sql';

CREATE FUNCTION ecoscore_zona(poligono geometry)
RETURNS real AS $$
    SELECT AVG(r.punteggio)
    FROM   rilevazioni r
    WHERE  ST_Within(r.punto, poligono) OR ST_Touches(r.punto, poligono)
$$ LANGUAGE 'sql';

CREATE FUNCTION ecoscore_comune(comune int)
RETURNS real AS $$
    SELECT AVG(ecoscore_zona(z.poligono))
    FROM   zone z
    WHERE  z.comune = $1
$$ LANGUAGE 'sql';