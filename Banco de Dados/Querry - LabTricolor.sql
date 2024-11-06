CREATE DATABASE LabTricolor;
USE LabTricolor;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

CREATE TABLE Jogador (
    idJogador INT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    posicao VARCHAR(45) NOT NULL
);

CREATE TABLE Publicacao (
    idPublicacao INT PRIMARY KEY,
    titulo VARCHAR(45) NOT NULL,
    descricao VARCHAR(45) NOT NULL,
    fkJogador INT,
    fkUsuario INT,
    FOREIGN KEY (fkJogador) REFERENCES Jogador(idJogador),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Perguntas (
    idPerguntas INT PRIMARY KEY,
    pergunta VARCHAR(45) NOT NULL
);

CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY,
    pontos VARCHAR(45),
    fkUsuario INT,
    fkPerguntas INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkPerguntas) REFERENCES Perguntas(idPerguntas)
);
