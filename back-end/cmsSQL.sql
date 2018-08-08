Create database if not exists CMSPHP;
use CMSPHP;

CREATE TABLE IF NOT EXISTS users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(45) NOT null,
  user_role varchar(10) default "user",
  user_password varchar(250) not null,
  PRIMARY KEY (user_id)
);

insert into users(user_id, user_name, user_role, user_password)
value(0,'admin','admin','password');

create Table if Not exists Element(
	element_id int(11) not null auto_increment,
    webpage_id int(11),
    element_name varchar(45) not null unique,
    element_content varchar(255),
    element_type varchar(45) not null,
    element_color varchar(50),
    element_background_color varchar(50),
    element_font_size int(11),
    element_size int(11),
	primary key(element_id),
    index(element_name)
);

create table if not exists webpage(
	webpage_id int(11) not null auto_increment Primary key,
    webpage_name varchar(50)
    webpage_filepath varchar(255),
    webpage_filename varchar(45)
);

CREATE TABLE IF NOT EXISTS theme(
    theme_id int not null auto_increment PRIMARY KEY,
    webpage_id int not null, 
    theme_name VARCHAR(45) NOT NULL unique
);

CREATE TABLE IF NOT EXISTS theme_rule(
    rule_id INT NOT NULL auto_increment PRIMARY KEY,
    theme_id INT NOT NULL,
    rule_value VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS theme_property(
    property_id INT NOT NULL auto_increment PRIMARY KEY,
    theme_id INT NOT NULL,
    property_name VARCHAR(128) NOT NULL,
    property_value VARCHAR(128) NOT NULL
);

insert into theme (theme_name) values (0, 'CoolTheme');
INSERT INTO theme_property(theme_id, property_name, property_value) VALUES (1, '--primary-color', '#ff00ff');
INSERT INTO theme_rule(theme_id, rule_value) VALUES (1, 'h1 {color: var(--primary-color);}') 