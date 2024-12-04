DROP DATABASE IF EXISTS LabTricolor;
CREATE DATABASE LabTricolor;

USE LabTricolor;	

CREATE TABLE sociotorcedor (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
	codigo_ativacao VARCHAR(50)
);

INSERT INTO sociotorcedor (nome, codigo_ativacao) VALUES
('Vermelho', 'VMST01'),
('Branco', 'BRST01'),
('Preto', 'PRST01'),
('Tricolor', 'TRSTO1'),
('Diamante', 'DMST01');


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
    imagem_perfil VARCHAR(300),
	senha VARCHAR(50),
	fkSocioTorcedor INT,
	FOREIGN KEY (fkSocioTorcedor) REFERENCES sociotorcedor(id)
);

CREATE TABLE quiz (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    qtdPontos INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);


CREATE TABLE publicacoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(250),
    imagem_publicacao VARCHAR(300),
    data_publicacao DATETIME,
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

SELECT * FROM sociotorcedor;
SELECT * FROM usuario; 
SELECT * FROM publicacoes;
SELECT * FROM Quiz;



TRUNCATE TABLE publicacoes;









