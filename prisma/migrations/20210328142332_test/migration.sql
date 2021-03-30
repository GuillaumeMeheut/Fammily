-- CreateEnum
CREATE TYPE "Domaine" AS ENUM ('Generaliste', 'Graphisme', 'Developpement', 'Communication', 'Audiovisuel', 'Photographie', 'Autres', 'Null');

-- CreateEnum
CREATE TYPE "Bac" AS ENUM ('ES', 'S', 'L', 'Technologique', 'Pro', 'Null');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT E'',
    "activate" BOOLEAN NOT NULL DEFAULT false,
    "etudiant" BOOLEAN NOT NULL DEFAULT true,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "nom" TEXT NOT NULL DEFAULT E'',
    "prenom" TEXT NOT NULL DEFAULT E'',
    "image" TEXT NOT NULL DEFAULT E'',
    "domaine" "Domaine" NOT NULL DEFAULT E'Null',
    "bac" "Bac" NOT NULL DEFAULT E'Null',
    "promo" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT E'',
    "metier" TEXT NOT NULL DEFAULT E'',
    "conseil" TEXT NOT NULL DEFAULT E'',
    "portfolio" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offre" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL DEFAULT E'',
    "lieu" TEXT NOT NULL DEFAULT E'',
    "domaine" "Domaine" NOT NULL DEFAULT E'Null',
    "description" TEXT NOT NULL DEFAULT E'',
    "entrepriseId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entreprise" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL DEFAULT E'',
    "siren" TEXT NOT NULL DEFAULT E'',
    "ville" TEXT NOT NULL DEFAULT E'',
    "departement" TEXT NOT NULL DEFAULT E'',
    "mail" TEXT NOT NULL DEFAULT E'',
    "tel" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actualite" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL DEFAULT E'',
    "texte" TEXT NOT NULL DEFAULT E'',
    "date" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "offre" ADD FOREIGN KEY ("entrepriseId") REFERENCES "entreprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
