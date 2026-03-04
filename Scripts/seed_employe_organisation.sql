-- ============================================================
-- Remplissage table EmployeOrganisation
-- Base: shiftmaster_employees (Employee.Service)
-- Exécuter: psql -U postgres -d shiftmaster_employees -f Scripts/seed_employe_organisation.sql
-- ============================================================

-- Créer la table si elle n'existe pas (Id avec défaut pour INSERT sans Id)
CREATE TABLE IF NOT EXISTS "EmployeOrganisation" (
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "Pole" text NOT NULL,
    "Cellule" text NOT NULL,
    "Departement" text,
    "Nom" text NOT NULL,
    CONSTRAINT "PK_EmployeOrganisation" PRIMARY KEY ("Id")
);

-- Optionnel : vider avant de réinsérer (décommenter si besoin)
-- TRUNCATE TABLE "EmployeOrganisation" RESTART IDENTITY;

-- Insert (sans Id : utilise DEFAULT gen_random_uuid())
INSERT INTO "EmployeOrganisation" ("Pole", "Cellule", "Departement", "Nom") VALUES
-- =====================
-- PÔLE CLIENT / SUPPORT CLIENT
-- =====================
('Pôle client','Support Client',NULL,'AIT NEJMA Meriem'),
('Pôle client','Support Client',NULL,'BEGHDADI Fatima Zahra'),
('Pôle client','Support Client',NULL,'BELKASMI Younes'),
('Pôle client','Support Client',NULL,'BOUCHAMMA Nour El Imane'),
('Pôle client','Support Client',NULL,'BOUGRIYENE Ouidad'),
('Pôle client','Support Client',NULL,'DANTHIA Divine Perpetue Rossita'),
('Pôle client','Support Client',NULL,'EL OUADGHIRI Hanane'),
('Pôle client','Support Client',NULL,'LAHROUR Zayneb'),
('Pôle client','Support Client',NULL,'MBARKI Chaimae'),
('Pôle client','Support Client',NULL,'MELLOUKI Samah'),
('Pôle client','Support Client',NULL,'NASSIF Rajae'),
('Pôle client','Support Client',NULL,'OUAZIZ Amal'),
('Pôle client','Support Client',NULL,'OUHNIZI Khadija'),
('Pôle client','Support Client',NULL,'TAIBI Mohammed'),
('Pôle client','Support Client',NULL,'YAZIDI Khadija'),

-- =====================
-- PÔLE CLIENT / SATISFACTION CLIENT
-- =====================
('Pôle client','Satisfaction Client',NULL,'ABDELJALIL Zayneb'),
('Pôle client','Satisfaction Client',NULL,'BOURAADA Nisrine'),
('Pôle client','Satisfaction Client',NULL,'BRIRICH Chaimae'),
('Pôle client','Satisfaction Client',NULL,'DKHISSI Hadil'),
('Pôle client','Satisfaction Client',NULL,'KHATIRI Kaouthar'),
('Pôle client','Satisfaction Client',NULL,'TAJ Ouafae'),

-- =====================
-- PÔLE CLIENT / GESTION DE RETARDS
-- =====================
('Pôle client','Gestion de retards','ZONE 1','LABIYED Islam'),
('Pôle client','Gestion de retards','ZONE 1','LAZAR Islam'),
('Pôle client','Gestion de retards','ZONE 1','HOUSSINI Souhaila'),
('Pôle client','Gestion de retards','ZONE 1','BEQQADA Youssra'),
('Pôle client','Gestion de retards','ZONE 1','BELHOUARI Fatima Zahra'),
('Pôle client','Gestion de retards','ZONE 1','MAACHI Imane'),
('Pôle client','Gestion de retards','ZONE 1','NGOIMON Fabrice Ulrich'),
('Pôle client','Gestion de retards','ZONE 1','BADR Rajae'),
('Pôle client','Gestion de retards','ZONE 1','BENSAID Imane'),

('Pôle client','Gestion de retards','ZONE 2','BENHADDOU Samia'),
('Pôle client','Gestion de retards','ZONE 2','MHAMDI Fayza'),
('Pôle client','Gestion de retards','ZONE 2','Bah Mamadou Oury'),

('Pôle client','Gestion de retards','ZONE 3','RAOUI Aouatif'),
('Pôle client','Gestion de retards','ZONE 3','ZEROUAL Siham'),
('Pôle client','Gestion de retards','ZONE 3','HARMA Raja'),
('Pôle client','Gestion de retards','ZONE 3','EL HASSANI SARA'),

('Pôle client','Gestion de retards','CIBLE','MEACH Hala'),
('Pôle client','Gestion de retards','CIBLE','DERRAZ Ikram'),
('Pôle client','Gestion de retards','CIBLE','GUENGOMBE Abed Prince'),

-- =====================
-- PÔLE SÉCURISATION
-- =====================
('Pôle sécurisation','Rang 4 et plus & GRE',NULL,'ECH CHETOUANI Amal'),
('Pôle sécurisation','Rang 4 et plus & GRE',NULL,'MERNY Oumaima'),
('Pôle sécurisation','Rang 4 et plus & GRE',NULL,'SMEIRI Imane'),

('Pôle sécurisation','Cibles prioritaires',NULL,'MERZAQ Wiam'),
('Pôle sécurisation','Cibles prioritaires',NULL,'LAHMIDI Sabah'),
('Pôle sécurisation','Cibles prioritaires',NULL,'BANANA Sabrine'),
('Pôle sécurisation','Cibles prioritaires',NULL,'OUDGHIRI Kaoutar'),
('Pôle sécurisation','Cibles prioritaires',NULL,'OUERDI Ayoub'),
('Pôle sécurisation','Cibles prioritaires',NULL,'TALBI Youssef'),

('Pôle sécurisation','Ticket CO',NULL,'AMIZIANE IMANE'),
('Pôle sécurisation','Ticket CO',NULL,'BENHEDDOU Chaimae'),
('Pôle sécurisation','Ticket CO',NULL,'EL OUARYACHI Yassine'),
('Pôle sécurisation','Ticket CO',NULL,'ABOUCH Hind'),

('Pôle sécurisation','Planification PDC + Lissage',NULL,'MEZOUAR Ahlam'),
('Pôle sécurisation','Planification PDC + Lissage',NULL,'MANNAD Farah'),
('Pôle sécurisation','Planification PDC + Lissage',NULL,'ELKASSIMI Fatine'),

('Pôle sécurisation','Préparation de RDV',NULL,'NEJJAR Imane'),
('Pôle sécurisation','Préparation de RDV',NULL,'SIDALI Fatima Zahra'),

('Pôle sécurisation','Support VIP',NULL,'DIALLO Souleymane Seydi'),
('Pôle sécurisation','Support VIP',NULL,'QERRECH Fatima Zahra'),
('Pôle sécurisation','Support VIP',NULL,'SABER Chaymae'),
('Pôle sécurisation','Support VIP',NULL,'EL AMRANI Younes'),
('Pôle sécurisation','Support VIP',NULL,'FARES Mehdi'),
('Pôle sécurisation','Support VIP',NULL,'SGHIR Mariem'),
('Pôle sécurisation','Support VIP',NULL,'LABIYED Ghita'),
('Pôle sécurisation','Support VIP',NULL,'BOUZAKRI Fatima Zahra'),
('Pôle sécurisation','Support VIP',NULL,'BANANA Achraf'),
('Pôle sécurisation','Support VIP',NULL,'RHARBI Saad');
