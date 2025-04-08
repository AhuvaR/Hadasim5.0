use superMarket

create table supplier(
supplier_id int identity(1,1) not null,
company_name varchar(40) null,
company_code varchar(40) not null,
phone_number varchar(15) null,
supplier_name varchar(40) null
constraint PK_Spid PRIMARY KEY(supplier_id)

)

create table products(
product_id int identity(1,1) not null,
supplier_id int not null,
product_name varchar(40) not null,
product_price float not null
constraint PK_Prid PRIMARY KEY(product_id)
constraint FK_products_supplier FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)

)
create table  orders (
order_id int identity(1,1) not null,
product_id int not null,
status varchar(20) null
constraint PK_Orid PRIMARY KEY(order_id)
constraint FK_orders_products FOREIGN KEY(product_id) REFERENCES products(product_id)
) 


INSERT INTO supplier (company_name, company_code, phone_number, supplier_name)  
VALUES ('תבליני השף','1234', '03-1234567', 'דוד לוי');  

INSERT INTO supplier (company_name, company_code,phone_number, supplier_name)  
VALUES ('מאפיית הזהב','nest56', '04-7654321', 'חנה כהן');  

-- הכנסת מוצרים  
INSERT INTO products (supplier_id, product_name, product_price)  
VALUES (1, 'כמון טחון', 12.5);  

INSERT INTO products (supplier_id, product_name, product_price)  
VALUES (2, 'לחם מחיטה מלאה', 18.0);  

-- הכנסת הזמנות  
INSERT INTO orders (product_id, status)  
VALUES (1, 'ממתין לאישור');  

INSERT INTO orders (product_id, status)  
VALUES (2, 'בתהליך');  



SELECT name FROM sys.sql_logins;
select * from supplier where company_code='1234'

select *
from orders o
left join products p on o.product_id=p.product_id
where supplier_id=1


INSERT INTO supplier (company_name, company_code, phone_number, supplier_name)  VALUES 
        ('תנובה','0999','0594837543','חגי דן');
         SELECT SCOPE_IDENTITY() AS supplier_id;