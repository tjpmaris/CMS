Create database if not exists CMSPHP;
use CMSPHP;

CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT null,
  role varchar(10) default "user",
  password varchar(250) not null,
  PRIMARY KEY (id)
);

insert into users(id, name, role, password)
value(0,'admin','admin','password');

create Table if Not exists Element(
	id int(11) not null auto_increment,
    webpageId int(11),
    name varchar(45) not null unique,
    content varchar(255),
    `type` varchar(45) not null,
    color varchar(50),
    backgroundColor varchar(50),
    fontSize int(11),
    `size` int(11),
	primary key(id),
    unique index(name)
);

create table if not exists webpage(
	id int(11) not null auto_increment Primary key,
    name varchar(50),
    filepath varchar(255),
	isParent boolean
);

insert into webpage(name, filepath, isParent)
value('Home', '/home/', true);
insert into webpage(name, filepath, isParent)
value('About', '/about/', true);
insert into webpage(name, filepath, isParent)
value('Contact', '/contact/', true);

