Create database if not exists CMSPHP;
use CMSPHP;

CREATE TABLE IF NOT EXISTS users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(45) NOT null,
  user_role varchar(10) default "user",
  user_password varchar(250) not null,
  PRIMARY KEY (user_id)
);

-- insert into users(user_id, user_name, user_role, user_password)
-- value(0,'admin','admin','password');

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
    theme_name VARCHAR(45) NOT NULL unique, 
    theme_css text NOT NULL
);

insert into theme (theme_name, theme_css) values
('Modern', '.navigation,body,main{display:flex}html{height:100%;--primary-color:#3498DB;--secondary-color:#3498DB;--text-color:rgba(0, 0, 0, .72);--background-color:#fafafa;--navigation-color:#D62956;--brand-color:#fff;--link-color:#fefefe;--shadow-color:rgba(0, 0, 0, .72)}body{min-height:100%}body,html{width:100%;margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}main{flex-grow:1;flex-basis:auto;flex-direction:column}main h1{color:var(--secondary-color)}main h1,main p{margin-left:10%;width:50%}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:90%;flex-direction:column;background:var(--navigation-color);box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .75em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation li{width:100%}.navigation a{padding:.5rem 0 .5rem 4rem;display:block;color:var(--link-color);text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation a:last-child,.navigation a:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation a:hover{background-color:var(--background-color);color:var(--text-color)}.navigation a:active{color:#fefefe;background-color:rgba(255,255,255,.3)}'),
('Dark', '.navigation,body,main{display:flex}html{height:100%;--primary-color:rgb(235, 42, 90);--secondary-color:rgb(235, 42, 90);--text-color:rgb(188, 224, 238);--background-color:rgb(39, 44, 39);--navigation-color:#333;--brand-color:#fefefe;--shadow-color:rgba(0, 0, 0, 0.72)}body{min-height:100%}body,html{width:100%;margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}main{flex-grow:1;flex-basis:auto;flex-direction:column}main h1{color:var(--secondary-color)}main h1,main p{margin-left:10%;width:50%}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:90%;flex-direction:column;background:var(--navigation-color);box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .5em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation li{width:100%}.navigation a{padding:.5rem 0 .5rem 3rem;display:block;color:#ccc;text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation a:last-child,.navigation a:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation a:hover{background-color:var(--background-color);color:var(--text-color)}.navigation a:active{color:#fefefe;background-color:rgba(255,255,255,.3)}'),
('Pastel', '.navigation,body,main{display:flex}html{height:100%;--primary-color:#B2FFD6;--secondary-color:#AA78A6;--text-color:#495F41;--background-color:#D7FDF0;--navigation-color:rgb(86, 126, 122);--brand-color:#fff;--link-color:rgb(202, 203, 218);--shadow-color:rgba(1, 0, 12, 0.72)}body{min-height:100%}body,html{width:100%;margin:0;padding:0;color:var(--text-color);background-color:var(--background-color);line-height:1.5em;font-family:sans-serif}main{flex-grow:1;flex-basis:auto;flex-direction:column}main h1{color:var(--secondary-color)}main h1,main p{margin-left:10%;width:50%}h1{margin-top:1em;margin-bottom:.25em}.navigation{flex-grow:1;flex-basis:90%;flex-direction:column;background:var(--navigation-color);box-shadow:1px 0 12px 0 var(--shadow-color)}.navigation h1{margin-top:.75em;padding:0 0 0 .75em;color:var(--brand-color);font-size:3rem;margin-bottom:.75rem;font-style:italic;letter-spacing:.1rem;font-family:serif;font-weight:800}.navigation ul{padding-left:0;margin-left:0;list-style-type:none}.navigation li{width:100%}.navigation a{padding:.5rem 0 .5rem 4rem;display:block;color:var(--link-color);text-decoration:none;letter-spacing:1px;font-size:18px;font-weight:100}.navigation li:nth-child(1){border-top:2px solid rgba(255,255,255,.3)}.navigation a:last-child,.navigation a:nth-child(2){border-bottom:2px solid rgba(255,255,255,.3)}.navigation a:hover{background-color:var(--background-color);color:var(--text-color)}.navigation a:active{color:#fefefe;background-color:rgba(255,255,255,.3)}');