-- DROP TABLE IF EXISTS ad_tags_tags;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS tag;
-- DROP TABLE IF EXISTS ad_tags_tags;
-- DROP TABLE IF EXISTS category;


-- PRAGMA foreign_keys = ON;

CREATE TABLE tag (
tagId INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
);


-- CREATE TABLE category (
-- categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
-- name TEXT NOT NULL
-- );



-- INSERT INTO category (name) VALUES
-- ("animaux"),
-- ("véhicules"),
-- ("livres"),
-- ("électronique"),
-- ("autre");

-- SELECT * FROM category;


INSERT INTO tag (name) VALUES
("vintage"),
("nouveau"),
("comme neuf"),
("occasion");


CREATE TABLE ad (
adId INTEGER PRIMARY KEY,
title TEXT NOT NULL,
description TEXT,
owner TEXT NOT NULL,
price INTEGER,
image TEXT,
createdAt TEXT,
location TEXT NOT NULL,
categoryId INTEGER,
FOREIGN KEY(categoryId) REFERENCES category(categoryId) 
);


INSERT INTO ad (title, description, owner, price, image, location, categoryId) VALUES
('Vélo à vendre', 'Vélo en bon état, peu servi', 'john.doe@gmail.com', 150, 'https://auber93cyclisme.com/wp-content/uploads/2022/01/image00003-730x487.jpeg', 'Paris', 1),
('Voiture d occasion', 'Voiture très bien entretenue', 'jane.smith@gmail.com', 5000, 'https://cdn-s-www.ledauphine.com/images/1EC992CF-2EA2-42E2-A62A-5E37C1B8A55D/NW_detail/la-peugeot-106-et-par-extension-la-saxo-se-trouvent-encore-en-occasion-la-plupart-du-temps-vendue-sans-controle-technique-photo-dr-1611656055.jpg', 'Lyon', 4),
('Stylo plume', 'Stylo plume Parker, encre bleue', 'writer.seller@gmail.com', 15, 'https://www.montblanc.com/variants/images/1647597318120613/A/w534.jpg', 'Bordeaux', 3),
('Chaise pliante', 'Chaise pliante pratique pour camping', 'camping.seller@gmail.com', 30, 'https://www.lafoirfouille44.com/media/catalog/product/cache/53c7d08f1bb453e4621980349ad43c6c/2/4/x242376-2_1.jpg.pagespeed.ic.Bg5XAAIzGA.jpg', 'Paris', 3),
('Lampe de chevet', 'Lampe LED moderne, plusieurs couleurs', 'home.seller@gmail.com', 35, 'https://www.xiled.fr/68762-large_default/lampe-de-chevet-table-pied-metal-noir-culot-e27-bois-et-cage.jpg', 'Lyon', 3),
('Table en bois massif', 'Table en chêne, très solide', 'woodworker@gmail.com', 200, 'https://www.trendymobilier.com/app/uploads/2022/03/table-de-repas-moderne-en-bois-de-chene-240-cm.jpg', 'Bordeaux', 3),
('Smartphone Android', 'Samsung Galaxy S21, très bon état', 'phone.seller@gmail.com', 500, 'https://www.blackview.fr/cdn/shop/files/BlackviewA53Pro_1.jpg?v=1688021342&width=700', 'Paris', 2),
('Montre connectée', 'Apple Watch Series 7, fonctionne parfaitement', 'watch.seller@gmail.com', 250, 'https://www.bijourama.com/media/produits/smarty-montres/img/montre-connectee-homme-smarty-sw035g02-bracelet-acier-argent_3520400_1140x1140.jpg', 'Lyon', 2),
('Paquet de stylos', 'Lot de 10 stylos Bic', 'office.seller@gmail.com', 5, 'https://vedi-express.twic.pics/1638194-thickbox_default/bic-stylo-bille-cristal-soft-pointe-moyenne-paquet-de-50-pieces-bleu.jpg?twic=v1/resize=520', 'Paris', 3),
('Câble USB-C', 'Chargeur rapide USB-C 2m', 'tech.seller@gmail.com', 12, 'https://media.startech.com/cms/products/gallery_large/ucc-3m-10g-usb-cable.main.jpg', 'Lyon', 2),
('Sac à dos', 'Sac à dos 20L, idéal pour la randonnée', 'sport.seller@gmail.com', 35, 'https://static.kiabi.com/images/sac-a-dos-eastpak-padded-pakr-noir-ahr43_1_hd1.jpg?width=120', 'Bordeaux', 3);


-- CREATE TABLE ad_tags (
-- id INTEGER PRIMARY KEY AUTOINCREMENT,
-- adId INTEGER NOT NULL,
-- tagId INTEGER NOT NULL,
-- FOREIGN KEY(adId) REFERENCES ad(adId),
-- FOREIGN KEY(tagId) REFERENCES tags(tagId)
-- );

-- INSERT INTO ad_tags (adId, tagId) VALUES 
-- (3, 1),
-- (3, 2),
-- (3, 4),
-- (7, 4),
-- (7, 3);

SELECT * FROM ad;
SELECT * FROM category;
SELECT * FROM tag;
-- SELECT * FROM ad_tags;

-- SELECT * FROM ad JOIN category on ad.categoryId = category.categoryId;
-- SELECT * FROM ad JOIN ad_tags on ad.adId = tags.tagId;

-- SELECT * FROM ad WHERE city = "Bordeaux";

-- DELETE FROM ad WHERE price > 40;

-- UPDATE ad SET price = 0 WHERE created_at = '2024-09-01';

-- SELECT AVG(price) FROM ad WHERE city = "Paris";

-- SELECT AVG(price) FROM ad GROUP BY city;


