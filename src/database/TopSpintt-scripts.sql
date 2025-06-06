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
    CONSTRAINT chk_r8 CHECK(r8 IN ('Regras', 'Equipamentos', 'Técnicas', 'Treinos', 'Outros'))
);



    
    
    

SELECT * FROM usuario;
select * from estado;

select * from pesquisa;

select * from usuario;
select * from pesquisa;
    
SELECT
        e.nome as regiao, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY e.nome
        ORDER BY total DESC;
        
        
SELECT
        r5, r6, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY r5, r6
	ORDER BY total DESC;