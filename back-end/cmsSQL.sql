Create database if not exists CMSPHP;
use CMSPHP;

CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT null,
  role varchar(10) default "user",
  password varchar(250) not null,
  PRIMARY KEY (id)
);

-- this password is 'admin'
insert into users(id, name, role, password)value(0,'admin','admin','$2y$10$d2XZKkwhPEiXjIJZUvve6OQNkiUZ.uYf5DGpLtcTdSDNVe9z89/Zm');

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

CREATE TABLE IF NOT EXISTS theme(
    theme_id int not null auto_increment PRIMARY KEY,
    theme_name VARCHAR(45) NOT NULL unique, 
    theme_css text NOT NULL
);
insert into theme (theme_name, theme_css) values
('Light', '.navigation,body,main{display:flex}.navigation li,body,html{width:100%}html{height:100%;--primary-color:#3498DB;--secondary-color:#3498DB;--text-color:rgba(0, 0, 0, .72);--background-color:#fafafa;--navigation-color:#D62956;--brand-color:#fff;--link-color:#fefefe;--shadow-color:rgba(0, 0, 0, .72)}body{min-height:100%}body,html{margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}.navigation,.navigation button{background:var(--navigation-color)}main{flex-grow:1;flex-direction:column;padding-left:10%;padding-right:30%;flex-basis:60%}main h1{color:var(--secondary-color)}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:30%;flex-direction:column;box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .75em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation button{padding:.5rem 0 .5rem 4rem;display:block;color:var(--link-color);text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100;border:none;width:100%;text-align:left}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation button:last-child,.navigation button:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation button:hover{background-color:var(--background-color);color:var(--text-color)}.navigation button:active{color:#fefefe;background-color:rgba(255,255,255,.3)}.navigation button:focus{outline:0}.form input[type=text],.form input[type=password],.form input[type=email],.form input[type=number],.form select,.form textarea{padding:.5em .6em;border:1px solid #ccc;box-shadow:inset 0 1px 3px #ddd;border-radius:4px}.form label{margin:.25em 0 0;display:block}.form button,.form input{display:block;margin:.5em 0}.button{font-family:inherit;font-size:100%;padding:.5em 1em;border:transparent;color:#fff;letter-spacing:.5px;background-color:var(--primary-color);text-decoration:none;border-radius:2px}'),
('Dark', '.navigation,body,main{display:flex}.navigation li,body,html{width:100%}html{height:100%;--primary-color:rgb(235, 42, 90);--secondary-color:rgb(235, 42, 90);--text-color:rgb(188, 224, 238);--background-color:rgb(39, 44, 39);--navigation-color:#333;--brand-color:#fefefe;--shadow-color:rgba(0, 0, 0, 0.72)}body{min-height:100%}body,html{margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}.navigation,.navigation button{background:var(--navigation-color)}main{flex-grow:1;flex-direction:column;padding-left:10%;padding-right:30%;flex-basis:60%}main h1{color:var(--secondary-color)}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:30%;flex-direction:column;box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .75em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation button{padding:.5rem 0 .5rem 4rem;display:block;color:var(--link-color);text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100;border:none;width:100%;text-align:left}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation button:last-child,.navigation button:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation button:hover{background-color:var(--background-color);color:var(--text-color)}.navigation button:active{color:#fefefe;background-color:rgba(255,255,255,.3)}.navigation button:focus{outline:0}.form input[type=text],.form input[type=password],.form input[type=email],.form input[type=number],.form select,.form textarea{padding:.5em .6em;border:1px solid #ccc;box-shadow:inset 0 1px 3px #ddd;border-radius:4px}.form label{margin:.25em 0 0;display:block}.form button,.form input{display:block;margin:.5em 0}.button{font-family:inherit;font-size:100%;padding:.5em 1em;border:transparent;color:#fff;letter-spacing:.5px;background-color:var(--primary-color);text-decoration:none;border-radius:2px}'),
('Colorful', '.navigation,body,main{display:flex}.navigation li,body,html{width:100%}html{height:100%;--primary-color:#AA78A6;--secondary-color:#AA78A6;--text-color:#495F41;--background-color:#D7FDF0;--navigation-color:rgb(86, 126, 122);--brand-color:#fff;--link-color:rgb(202, 203, 218);--shadow-color:rgba(1, 0, 12, 0.72)}body{min-height:100%}body,html{margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}main{flex-grow:1;flex-direction:column;padding-left:10%;padding-right:30%;flex-basis:60%}main h1{color:var(--secondary-color)}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:30%;flex-direction:column;background:var(--navigation-color);box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .75em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation a{padding:.5rem 0 .5rem 4rem;display:block;color:var(--link-color);text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation a:last-child,.navigation a:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation a:hover{background-color:var(--background-color);color:var(--text-color)}.navigation a:active{color:#fefefe;background-color:rgba(255,255,255,.3)}.form input[type=text],.form input[type=password],.form input[type=email],.form input[type=number],.form select,.form textarea{padding:.5em .6em;border:1px solid #ccc;box-shadow:inset 0 1px 3px #ddd;border-radius:4px}.form label{margin:.25em 0 0;display:block}.form button,.form input{display:block;margin:.5em 0}.button{font-family:inherit;font-size:100%;padding:.5em 1em;border:transparent;color:#fff;letter-spacing:.5px;background-color:var(--primary-color);text-decoration:none;border-radius:2px}');

CREATE TABLE IF NOT EXISTS site_theme(
    id int not null auto_increment PRIMARY KEY,
    theme_id int not null
);
insert into site_theme (theme_id)
select theme_id from theme
limit 1,1;