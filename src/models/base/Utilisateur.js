import pool from '../../db.config.local.js';

export default class Utilisateur {
  constructor({ id_utilisateur, nom, firstname, username, email, password  }) {
    this.idUtilisateur = id_utilisateur;
    this.nom = nom;
    this.firstname = firstname;
    this.email = email;
    this.username = username;
    this.mot_de_passe = password;
  } 


  static async create({ intitule}) {
    const result = await pool.query('INSERT INTO position (intitule, etat) VALUES ($1, 0) RETURNING *', [intitule]);
    return new Utilisateur(result.rows[0]);
  }

  static async findById({email, password}) {
    const result = await pool.query('SELECT * FROM utilisateur WHERE email = $1 AND password = $2', [email, password]);
    return result.rows[0] ? new Utilisateur(result.rows[0]) : null;
  }

}
