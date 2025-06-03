DROP DATABASE IF EXISTS topspintt; 
CREATE DATABASE topspintt;
USE topspintt;

CREATE TABLE usuario (
    id INT NOT NULL auto_increment,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    dataNasc DATE NOT NULL,
    senha_hash VARCHAR(200) NOT NULL,
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

CREATE TABLE post (
	id INT NOT NULL auto_increment,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    conteudo TEXT NOT NULL,
    capa VARCHAR(300) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE tema (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE post_tema (
    fkPost INT NOT NULL,
    fkTema INT NOT NULL,
    PRIMARY KEY(fkPost, fkTema),
    FOREIGN KEY (fkPost) REFERENCES post(id),
    FOREIGN KEY (fkTema) REFERENCES tema(id)
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
    
INSERT INTO tema (nome) 
	VALUES
    ('Iniciante'),
    ('Intermediário'),
    ('Avançado'),
    ('Equipamento'),
    ('Técnica'),
    ('Treino'),
    ('Regras'),
    ('Jogadores Profissionais'),
    ('Notícias');

SELECT * FROM usuario;
select * from estado;

select * from pesquisa;

select * from usuario;
select * from pesquisa;

-- Usuários de exemplo
INSERT INTO usuario (nome, email, dataNasc, senha_hash)
	VALUES
	('Rafael', 'rafael@gmail.com', '2006-08-15', SHA2('123',256)),
	('Ana', 'ana@email.com', '1998-04-22', SHA2('senhaana',256)),
	('Carlos', 'carlos@email.com', '1990-12-01', SHA2('senhacarlos',256)),
	('Beatriz', 'bia@email.com', '2002-07-30', SHA2('senhabia',256)),
	('João', 'joao@email.com', '1985-03-10', SHA2('senhajoao',256)),
	('Marina', 'marina@email.com', '2001-11-05', SHA2('senhamarina',256)),
	('Lucas', 'lucas@email.com', '1995-02-17', SHA2('senhalucas',256)),
	('Paula', 'paula@email.com', '1988-09-23', SHA2('senhapaula',256)),
	('Felipe', 'felipe@email.com', '1993-06-12', SHA2('senhafelipe',256)),
	('Juliana', 'juliana@email.com', '2000-01-30', SHA2('senhajuliana',256));

-- Pesquisas respondidas de exemplo (uma por usuário)
INSERT INTO pesquisa (fkUsuario, r1, r2, r3, r4, r5, r6, r7, r8)
	VALUES
	(1, 24, 'Competição', 'Avançado', 'Mais de 10 anos', 'Clássico', 'Ofensivo', 'Mais de três vezes por semana', 'Técnicas'),
	(2, 12, 'Lazer', 'Iniciante', '1 a 5 anos', 'Caneta', 'Defensivo', 'Uma vez por semana', 'Equipamentos'),
	(3, 5, 'Socialização', 'Intermediário', '5 a 10 anos', 'Classineta', 'Allround', 'Duas a três vezes por semana', 'Treinos'),
	(4, 18, 'Condicionamento físico', 'Intermediário', 'Menos de 1 ano', 'Clássico', 'Ofensivo', 'Menos de uma vez por semana', 'Regras'),
	(5, 9, 'Competição', 'Profissional', 'Mais de 10 anos', 'Caneta', 'Ofensivo', 'Mais de três vezes por semana', 'Estatísticas'),
	(6, 1, 'Lazer', 'Iniciante', '1 a 5 anos', 'Caneta', 'Defensivo', 'Uma vez por semana', 'Outros'),
	(7, 15, 'Socialização', 'Intermediário', '5 a 10 anos', 'Classineta', 'Allround', 'Duas a três vezes por semana', 'Treinos'),
	(8, 20, 'Condicionamento físico', 'Intermediário', 'Menos de 1 ano', 'Clássico', 'Ofensivo', 'Menos de uma vez por semana', 'Regras'),
	(9, 23, 'Competição', 'Profissional', 'Mais de 10 anos', 'Caneta', 'Ofensivo', 'Mais de três vezes por semana', 'Técnicas'),
	(10, 7, 'Lazer', 'Iniciante', '1 a 5 anos', 'Caneta', 'Defensivo', 'Uma vez por semana', 'Equipamentos');


SELECT
        r.nome as regiao, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY r.nome
        ORDER BY total DESC;