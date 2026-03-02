-- ============================================================
-- Script de remplissage EmployeOrganisation + Users (Manager, RH, Admin)
-- Base: shiftmaster_employees (EmployeOrganisation) + shiftmaster_auth (Users)
-- ============================================================

-- Créer la table EmployeOrganisation si elle n'existe pas
CREATE TABLE IF NOT EXISTS "EmployeOrganisation" (
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "Pole" text NOT NULL,
    "Cellule" text NOT NULL,
    "Departement" text,
    "Nom" text NOT NULL,
    CONSTRAINT "PK_EmployeOrganisation" PRIMARY KEY ("Id")
);

-- Vider la table avant insert (optionnel - décommenter si nécessaire)
-- TRUNCATE TABLE "EmployeOrganisation" CASCADE;

-- =====================
-- PÔLE CLIENT / SUPPORT CLIENT
-- =====================
INSERT INTO "EmployeOrganisation" ("Id", "Pole", "Cellule", "Departement", "Nom") VALUES
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'AIT NEJMA Meriem'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'BEGHDADI Fatima Zahra'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'BELKASMI Younes'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'BOUCHAMMA Nour El Imane'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'BOUGRIYENE Ouidad'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'DANTHIA Divine Perpetue Rossita'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'EL OUADGHIRI Hanane'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'LAHROUR Zayneb'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'MBARKI Chaimae'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'MELLOUKI Samah'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'NASSIF Rajae'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'OUAZIZ Amal'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'OUHNIZI Khadija'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'TAIBI Mohammed'),
(gen_random_uuid(), 'Pôle client', 'Support Client', NULL, 'YAZIDI Khadija'),

-- =====================
-- PÔLE CLIENT / SATISFACTION CLIENT
-- =====================
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'ABDELJALIL Zayneb'),
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'BOURAADA Nisrine'),
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'BRIRICH Chaimae'),
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'DKHISSI Hadil'),
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'KHATIRI Kaouthar'),
(gen_random_uuid(), 'Pôle client', 'Satisfaction Client', NULL, 'TAJ Ouafae'),

-- =====================
-- PÔLE CLIENT / GESTION DE RETARDS
-- =====================
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'LABIYED Islam'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'LAZAR Islam'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'HOUSSINI Souhaila'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'BEQQADA Youssra'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'BELHOUARI Fatima Zahra'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'MAACHI Imane'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'NGOIMON Fabrice Ulrich'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'BADR Rajae'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 1', 'BENSAID Imane'),

(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 2', 'BENHADDOU Samia'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 2', 'MHAMDI Fayza'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 2', 'Bah Mamadou Oury'),

(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 3', 'RAOUI Aouatif'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 3', 'ZEROUAL Siham'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 3', 'HARMA Raja'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'ZONE 3', 'EL HASSANI SARA'),

(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'CIBLE', 'MEACH Hala'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'CIBLE', 'DERRAZ Ikram'),
(gen_random_uuid(), 'Pôle client', 'Gestion de retards', 'CIBLE', 'GUENGOMBE Abed Prince'),

-- =====================
-- PÔLE SÉCURISATION
-- =====================
(gen_random_uuid(), 'Pôle sécurisation', 'Rang 4 et plus & GRE', NULL, 'ECH CHETOUANI Amal'),
(gen_random_uuid(), 'Pôle sécurisation', 'Rang 4 et plus & GRE', NULL, 'MERNY Oumaima'),
(gen_random_uuid(), 'Pôle sécurisation', 'Rang 4 et plus & GRE', NULL, 'SMEIRI Imane'),

(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'MERZAQ Wiam'),
(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'LAHMIDI Sabah'),
(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'BANANA Sabrine'),
(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'OUDGHIRI Kaoutar'),
(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'OUERDI Ayoub'),
(gen_random_uuid(), 'Pôle sécurisation', 'Cibles prioritaires', NULL, 'TALBI Youssef'),

(gen_random_uuid(), 'Pôle sécurisation', 'Ticket CO', NULL, 'AMIZIANE IMANE'),
(gen_random_uuid(), 'Pôle sécurisation', 'Ticket CO', NULL, 'BENHEDDOU Chaimae'),
(gen_random_uuid(), 'Pôle sécurisation', 'Ticket CO', NULL, 'EL OUARYACHI Yassine'),
(gen_random_uuid(), 'Pôle sécurisation', 'Ticket CO', NULL, 'ABOUCH Hind'),

(gen_random_uuid(), 'Pôle sécurisation', 'Planification PDC + Lissage', NULL, 'MEZOUAR Ahlam'),
(gen_random_uuid(), 'Pôle sécurisation', 'Planification PDC + Lissage', NULL, 'MANNAD Farah'),
(gen_random_uuid(), 'Pôle sécurisation', 'Planification PDC + Lissage', NULL, 'ELKASSIMI Fatine'),

(gen_random_uuid(), 'Pôle sécurisation', 'Préparation de RDV', NULL, 'NEJJAR Imane'),
(gen_random_uuid(), 'Pôle sécurisation', 'Préparation de RDV', NULL, 'SIDALI Fatima Zahra'),

(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'DIALLO Souleymane Seydi'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'QERRECH Fatima Zahra'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'SABER Chaymae'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'EL AMRANI Younes'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'FARES Mehdi'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'SGHIR Mariem'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'LABIYED Ghita'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'BOUZAKRI Fatima Zahra'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'BANANA Achraf'),
(gen_random_uuid(), 'Pôle sécurisation', 'Support VIP', NULL, 'RHARBI Saad');
