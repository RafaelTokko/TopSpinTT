DROP DATABASE IF EXISTS topspintt; 
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

CREATE TABLE regiao (
    id INT NOT NULL auto_increment,
    nome VARCHAR(50) NOT NULL,
    sigla VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE estado (
    id INT NOT NULL auto_increment,
    nome VARCHAR(50) NOT NULL,
    sigla VARCHAR(3) NOT NULL,
	fkRegiao INT NOT NULL,
    PRIMARY KEY(id),
	CONSTRAINT fk_estado_regiao FOREIGN KEY (fkRegiao) REFERENCES regiao(id)
);

CREATE TABLE pesquisa (
    fkUsuario INT NOT NULL,
    r1 INT NOT NULL, -- estado
    r2 VARCHAR(30) NOT NULL,  -- interesse
    r3 VARCHAR(30) NOT NULL, -- nivel
    r4 VARCHAR(30) NOT NULL, -- tempo
    r5 VARCHAR(20) NOT NULL, -- empunhadura
    r6 VARCHAR(30) NOT NULL, -- tipoJogo
    r7 VARCHAR(40) NOT NULL, -- frequencia
    r8 VARCHAR(30) NOT NULL, -- conteudo
    PRIMARY KEY(fkUsuario),
    CONSTRAINT fk_usuario_pesquisa FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    CONSTRAINT fk_estado_pesquisa FOREIGN KEY (r1) REFERENCES estado(id),
    CONSTRAINT chk_r1 CHECK(r1 >= 1 AND r1 <= 26),
    CONSTRAINT chk_r2 CHECK(r2 IN ('Lazer', 'Competição', 'Socialização', 'Condicionamento físico')),
    CONSTRAINT chk_r3 CHECK(r3 IN ('Iniciante', 'Intermediário', 'Avançado', 'Profissional')),
    CONSTRAINT chk_r4 CHECK(r4 IN ('Menos de 1 ano', '1 a 5 anos', '5 a 10 anos', 'Mais de 10 anos')),
    CONSTRAINT chk_r5 CHECK(r5 IN ('Clássico', 'Caneta', 'Classineta')),
    CONSTRAINT chk_r6 CHECK(r6 IN ('Ofensivo', 'Defensivo', 'Allround')),
    CONSTRAINT chk_r7 CHECK(r7 IN ('Nunca joguei', 'Menos de uma vez por semana', 'Uma vez por semana', 'Duas a três vezes por semana', 'Mais de três vezes por semana')),
    CONSTRAINT chk_r8 CHECK(r8 IN ('Regras', 'Equipamentos', 'Técnicas', 'Treinos', 'Estatísticas', 'Outros'))
);

INSERT INTO regiao (nome, sigla) VALUES
    ('Norte', 'N'),
    ('Nordeste', 'NE'),
    ('Centro-Oeste', 'CO'),
    ('Sudeste', 'SE'),
    ('Sul', 'S');

INSERT INTO estado (nome, sigla, fkRegiao) VALUES
    ('Acre', 'AC', 1),
    ('Alagoas', 'AL', 2),
    ('Amazonas', 'AM', 1),
    ('Bahia', 'BA', 2),
    ('Ceará', 'CE', 2),
    ('Distrito Federal', 'DF', 3),
    ('Espírito Santo', 'ES', 4),
    ('Goiás', 'GO', 3),
    ('Maranhão', 'MA', 2),
    ('Mato Grosso', 'MT', 3),
    ('Mato Grosso do Sul', 'MS', 3),
    ('Minas Gerais', 'MG', 4),
    ('Pará', 'PA', 1),
    ('Paraíba', 'PB', 2),
    ('Paraná', 'PR', 5),
    ('Pernambuco', 'PE', 2),
    ('Piauí', 'PI', 2),
    ('Rio de Janeiro', 'RJ', 4),
    ('Rio Grande do Norte', 'RN', 2),
    ('Rio Grande do Sul', 'RS', 5),
    ('Rondônia', 'RO', 1),
    ('Roraima', 'RR', 1),
    ('Santa Catarina', 'SC', 5),
    ('São Paulo', 'SP', 4),
    ('Sergipe', 'SE', 2),
    ('Tocantins', 'TO', 1);
    
SELECT * FROM usuario;
select * from estado;


-- Adicionando coluna de região na tabela estado
ALTER TABLE estado ADD COLUMN fkRegiao INT;
ALTER TABLE estado ADD CONSTRAINT fk_regiao_estado FOREIGN KEY (fkRegiao) REFERENCES regiao(id);


CREATE OR REPLACE VIEW vw_infoDash 
AS 
SELECT u.id AS id,
u.nome AS usuário,
TIMESTAMPDIFF(YEAR, u.dataNasc, NOW()) AS idade,
e.nome AS Estado,
p.r2 AS nível,
p.r3 AS tempoJogo,
p.r4 AS tipo,
p.r5 AS frequencia,
p.r6 AS torneio,
p.r7 AS interesse
FROM usuario u
LEFT JOIN
pesquisa p ON p.fkUsuario = u.id
INNER JOIN
estado e ON p.r1 = e.id;


INSERT INTO usuario VALUE (3, 'Rafael', 'rafael@gmail.com','2006-08-15','123');
insert into pesquisa value (3,'1','1','1','1','1','1','1');
delete from pesquisa where fkUsuario = 3;

select * from usuario;
select * FROM vw_infoDash;

CREATE OR REPLACE VIEW vw AS SELECT * FROM usuario;
SELECT * FROM vw;

select * from pesquisa;
update pesquisa set r1 = 23, r2 = 'adsda' where fkUsuario = 3;

