DROP DATABASE IF EXISTS LabTricolor;
CREATE DATABASE LabTricolor;

USE LabTricolor;

select * from usuario;


CREATE TABLE sociotorcedor (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
    imagem_perfil VARCHAR(300),
	senha VARCHAR(50),
	fkSocioTorcedor INT,
	FOREIGN KEY (fkSocioTorcedor) REFERENCES socioTorcedor(id)
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    qtdPontos INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

insert into socioTorcedor (nome, codigo_ativacao) values 
('Vermelho', 'VMST01'),
('Branco', 'BRST01'),
('Preto', 'PRST01'),
('Tricolor', 'TRSTO1'),
('Diamante', 'DMST01');


SELECT * FROM sociotorcedor;
SELECT * FROM usuario;
SELECT * FROM aviso;


