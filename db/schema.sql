CREATE DATABASE flashcards_db;

USE flashcards_db;

CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
    card_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    catergory VARCHAR(50) NOT NULL,
    term TEXT NOT NULL,
    definition TEXT NOT NULL,
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_Scores (
       score_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       score INT, 
       user_id INT NOT NULL, 
       FOREIGN KEY (user_id) REFERENCES users(user_id),
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);