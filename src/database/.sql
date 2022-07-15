DROP TABLE IF EXISTS register CASCADE;

DROP SCHEMA IF EXISTS main CASCADE;
DROP SCHEMA IF EXISTS adm CASCADE;

DROP SEQUENCE IF EXISTS register_seq CASCADE;

CREATE SCHEMA main;
CREATE SCHEMA adm;

CREATE SEQUENCE register_seq;

CREATE TABLE register (
  id INT NOT NULL DEFAULT NEXTVAL('register_seq'),
  names VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  passwor VARCHAR(12) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO
  register (
    names,
    lastname,
    email,
    passwor
)
VALUES
  (
    'Juliana',
    'Torres',
    'julianatorres181218@gmail.com',
    '2746587kjm'
);