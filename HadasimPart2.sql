use [Hadsim_H.W.]

/*
Introduction to the exercise

create table  personDetails (
person_id int not null,
personal_name varchar (20)  null,
family_name varchar (20)  null,
gender varchar(9) null CHECK (gender = 'male' OR gender = 'female'),
father_id int    null,
mother_id int  null,
spouse_id int null
constraint PK_CLid PRIMARY KEY(person_id),
constraint FK_father_personDetails FOREIGN KEY(father_id) REFERENCES personDetails(person_id),
constraint FK_mother_personDetails FOREIGN KEY(mother_id) REFERENCES personDetails(person_id)
) 



INSERT INTO personDetails (person_id, personal_name, family_name, gender, father_id, mother_id, spouse_id) VALUES

(1, 'Avraham', 'Cohen', 'male', NULL, NULL, 2),  
(2, 'Miriam', 'Cohen', 'female', NULL, NULL, 1),  
(3, 'Yaakov', 'Levi', 'male', NULL, NULL, 4),  
(4, 'Rivka', 'Levi', 'female', NULL, NULL, 3),  


(5, 'Moshe', 'Cohen', 'male', 1, 2, 6),  
(6, 'Esther', 'Cohen', 'female', 1, 2, 7),  


(7, 'David', 'Levi', 'male', 3, 4, 6),  
(8, 'Leah', 'Levi', 'female', 3, 4, 9),  


(9, 'Shlomo', 'Cohen', 'male', 5, 6, NULL),  
(10, 'Batya', 'Cohen', 'female', 5, 6, NULL),  


(11, 'Yosef', 'Levi', 'male', 7, 8, NULL),  
(12, 'Tzipora', 'Levi', 'female', 7, 8, NULL),  


(13, 'Eliyahu', 'Goldberg', 'male', NULL, NULL, 14),  
(14, 'Chana', 'Goldberg', 'female', NULL, NULL, 13),  
(15, 'Shimon', 'Weiss', 'male', NULL, NULL, 16),  
(16, 'Devorah', 'Weiss', 'female', NULL, NULL, 15),  
(17, 'Aharon', 'Friedman', 'male', NULL, NULL, 18),  
(18, 'Sarah', 'Friedman', 'female', NULL, NULL, 17),  
(19, 'Noach', 'Schwartz', 'male', NULL, NULL, NULL),  
(20, 'Rachel', 'Schwartz', 'female', NULL, NULL, NULL), 



(21, 'Shlomo', 'Mizrahi', 'male', NULL, NULL, 22),
(22, 'Dina', 'Mizrahi', 'female', NULL, NULL, NULL),

(23, 'Yossi', 'Levi', 'male', NULL, NULL, 24),
(24, 'Tamar', 'Levi', 'female', NULL, NULL, NULL),

(25, 'Eitan', 'Sharabi', 'male', NULL, NULL, 26),
(26, 'Rivka', 'Sharabi', 'female', NULL, NULL, NULL),

(27, 'Avi', 'Peretz', 'male', NULL, NULL, 28),
(28, 'Hila', 'Peretz', 'female', NULL, NULL, NULL),

(29, 'Nadav', 'Biton', 'male', NULL, NULL, 30),
(30, 'Yael', 'Biton', 'female', NULL, NULL, NULL),

(31, 'David', 'Ohayon', 'male', NULL, NULL, 32),
(32, 'Michal', 'Ohayon', 'female', NULL, NULL, NULL),

(33, 'Avraham', 'Cohen', 'male', 1, 2, NULL), 
(34, 'Leah', 'Cohen', 'female', 1, 2, NULL), 


(35, 'Esther', 'Levi', 'female', 3, 4, NULL);
*/


--I was referring to the fact that in the first table, the father's, mother's, and spouse's id necessarily exist in the personDetails table as a record (person_id) 
--(as long as they are not null).
--Therefore, when I created the table in Exercise 1, a symmetric relationship was automatically created.
--For example, in a father-child relationship, two records were automatically created:
--Father & Child
--Similarly, for a spouse relationship: two records were created:
--Husband $ Wife
--So, in Exercise 2, all that’s left for me to do is to update the original table with the spouse relationships.


--אני התייחסתי לכך שבטבלה הראשונה הקוד של האבא האמא ובן/בת זוג בהכחר כבר קיימים בטבלה (כאשר הם לא null)
--לכן כאשר יצרתי טבלה בתרגיל 1 אוטומטית נוצר קשר סימטרי
--לדוגמא קשר אבא אוטומטית נוצרו 2 רשומות 1.אבא 2.בן
--לדוגמא קשר בן זוג: 2 רשומות 1.בעל 2.אישה
--לכן נשאר לי רק לעדכן בתרגיל 2 את הטבלה המקורית בקשר של בני זוג 


--חלק 1

create table  personRelations (
person_id int not null,
relative_id int null,
connection_type varchar (30)  null,
) 



INSERT INTO personRelations (person_id, relative_id, connection_type) 
select person_id,father_id, 'father' from personDetails where father_id is not null
union
select person_id,mother_id, 'mother' from personDetails where mother_id is not null
union
select person_id,spouse_id, 'wife' from personDetails where gender='male' and spouse_id is not null
union
select person_id,spouse_id, 'husbend' from personDetails where gender='female' and spouse_id is not null
union
select father_id,person_id, 'son' from personDetails where father_id is not null
union
select mother_id,person_id, 'daughter' from personDetails where mother_id is not null
UNION
select p1.person_id, p2.person_id , case p2.gender when 'male' then 'brother' when 'female' then 'sister' end 
from personDetails p1, personDetails p2 where p1.person_id<>p2.person_id
and (p1.father_id=p2.father_id or p1.mother_id=p2.mother_id )



--תרגיל 2

UPDATE personDetails 
SET personDetails.spouse_id=p1.person_id
from personDetails as p1 , personDetails as personDetails where p1.spouse_id=personDetails.person_id 
and personDetails.spouse_id is null
	 



