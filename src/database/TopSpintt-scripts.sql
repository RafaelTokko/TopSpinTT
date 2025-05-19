CREATE DATABASE topspintt;
USE topspintt;

CREATE TABLE usuario (
    id INT NOT NULL auto_increment,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    dataNasc DATE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE estado (
    id INT NOT NULL auto_increment,
    nome VARCHAR(50) NOT NULL,
    sigla VARCHAR(3) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pesquisa (
    fkUsuario INT NOT NULL,
    fkEstado INT NOT NULL,
    nivel VARCHAR(30) NOT NULL,
    tempoJogo VARCHAR(30) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    frequencia VARCHAR(20) NOT NULL,
    torneio VARCHAR(30) NOT NULL,
    interesse VARCHAR(30) NOT NULL,
    PRIMARY KEY(fkUsuario),
    CONSTRAINT fk_usuario_pesquisa FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    CONSTRAINT fk_estado_pesquisa FOREIGN KEY (fkEstado) REFERENCES estado(id)
);




INSERT INTO estado (nome, sigla)
	VALUES
	('Acre', 'AC'),
	('Alagoas', 'AL'),
	('Amazonas', 'AM'),
	('Bahia', 'BA'),
	('Ceará', 'CE'),
	('Distrito Federal', 'DF'),
	('Espírito Santo', 'ES'),
	('Goiás', 'GO'),
	('Maranhão', 'MA'),
	('Mato Grosso', 'MT'),
	('Mato Grosso do Sul', 'MS'),
	('Minas Gerais', 'MG'),
	('Pará', 'PA'),
	('Paraíba', 'PB'),
	('Paraná', 'PR'),
	('Pernambuco', 'PE'),
	('Piauí', 'PI'),
	('Rio de Janeiro', 'RJ'),
	('Rio Grande do Norte', 'RN'),
	('Rio Grande do Sul', 'RS'),
	('Rondônia', 'RO'),
	('Roraima', 'RR'),
	('Santa Catarina', 'SC'),
	('São Paulo', 'SP'),
	('Sergipe', 'SE'),
	('Tocantins', 'TO');
    
SELECT * FROM usuario;
