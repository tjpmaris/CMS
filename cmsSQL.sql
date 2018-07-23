Create database CMSPHP;
use CMSPHP;

CREATE TABLE IF NOT EXISTS users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(45) NOT null,
  user_role varchar(10) default "user",
  user_password varchar(250) not null,
  PRIMARY KEY (user_id)
);

create Table if Not exists Element(
	element_id int(11) not null auto_increment,
    element_name varchar(45) not null unique,
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
);

create table if not exists webpage_elements(
	web_id int(11) not null,
    element_id int(11) not null,
    primary key(web_id, element_id)
);