import Layout from "../components/Layout/Layout";
import Link from "next/link";
import styles from "./etudiant.module.scss";
import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";
import React, { useState } from "react";
function Etudiant({ etudiants }) {
  const [domaine, setDomaine] = useState("");
  const [bac, setBac] = useState("");
  const [search, setSearch] = useState("");

  if (search !== "") {
    etudiants = etudiants.filter(
      (etu) =>
        etu.nom.toLowerCase().includes(search) ||
        etu.prenom.toLowerCase().includes(search) ||
        etu.promo.toString().includes(search) ||
        etu.metier.toLowerCase().includes(search)
    );
  }

  if (domaine !== "") {
    etudiants = etudiants.filter((etu) => etu.domaine === domaine);
  }
  if (bac !== "") {
    etudiants = etudiants.filter((etu) => etu.bac === bac);
  }

  const onDomaineChange = (e) => {
    e.preventDefault();
    setDomaine(e.target.value);
  };
  const onBacChange = (e) => {
    e.preventDefault();
    setBac(e.target.value);
  };
  const onSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Layout title={"Les étudiants"}>
      <img className={styles.studentImg} src="/assets/student.png" alt="" />
      <div className={styles.filterContainer}>
        <select className={styles.select} onChange={(ev) => onDomaineChange(ev)} name="domaine">
          <option value="">Domaine</option>
          <option value="Generaliste">Généraliste</option>
          <option value="Graphisme">Graphisme</option>
          <option value="Developpement">Développement</option>
          <option value="Communication">Communication</option>
          <option value="Audiovisuel">Audiovisuel</option>
          <option value="Photographie">Photographie</option>
          <option value="Autres">Autres</option>
        </select>
        <select className={styles.select} onChange={(ev) => onBacChange(ev)} name="bac">
          <option value="">Bac</option>
          <option value="ES">ES</option>
          <option value="S">S</option>
          <option value="L">L</option>
          <option value="Technologique">Technologique</option>
          <option value="Pro">Pro</option>
        </select>
        <input
          className={styles.searchBar}
          type="text"
          name={"search"}
          placeholder={"Filtrez par nom, prenom, bac, promo, metier"}
          value={search}
          onChange={(ev) => onSearchChange(ev)}
        />
      </div>
      <div className={styles.cardsContainer}>
        {etudiants.map((etudiant) => {
          return (
            <Link key={etudiant.id} href={`/profil/etudiant/${etudiant.id}`}>
              <div className={styles.card}>
                <img src={etudiant.image ? etudiant.image : "/assets/profil/noImage.png"} alt="" />
                <p>
                  {etudiant.prenom} {etudiant.nom} - PROMO{" "}
                  {etudiant.promo === 0 ? "INDÉFINIE" : etudiant.promo + "-" + (etudiant.promo + 2)}
                </p>
                <p>{etudiant.domaine === "Null" ? "Non défini" : etudiant.domaine}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export default Etudiant;

export async function getServerSideProps(ctx: NextPageContext) {
  const json = await myGet(`${process.env.adress}api/etudiant`, ctx);

  return {
    props: {
      etudiants: json,
    },
  };
}
