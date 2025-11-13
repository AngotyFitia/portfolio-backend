import pool from '../../db.config.js';
import Position from './Position.js';
import Utilisateur from './Utilisateur.js';

export default class Description {
  constructor(data = {}) {
    const { titre = '', introduction = '', photo = '', id_position = null , id_utilisateur = null} = data;

    this.titre = titre;
    this.introduction = introduction;
    this.photo = photo;
    this.photoBase64 = '';

    // Si id_position existe, on crée une instance de Position
    this.position = id_position ? new Position({ idPosition: id_position }) : null;
    this.utilisateur = id_utilisateur ? new Utilisateur({ idUtilisateur: id_utilisateur}) : null;
  }

  static async getRecentDescription() {
    const query = `SELECT * FROM v_description_utilisateur ORDER BY id_description DESC LIMIT 1`;
    const { rows } = await pool.query(query);
  
    if (!rows || rows.length === 0) {
      console.log("ato tsy misy");
      return new Description();
    }
    const descriptionData = rows[0];    
    const utilisateur = new Utilisateur({idUtilisateur: descriptionData.id_utilisateur, nom: descriptionData.nom, firstname: descriptionData.firstname, username: descriptionData.username, email: descriptionData.email, password: descriptionData.password});
    const position = new Position({ idPosition: descriptionData.id_position, intitule: descriptionData.intitule,    });
    const description = new Description(descriptionData);
    description.position = position;
    description.utilisateur=utilisateur;

    return description;
  }
  

  static async create(idUtilisateur, idPosition, { titre, introduction, photo }) {
    const query = await pool.query('INSERT INTO description (id_utilisateur, id_position, titre, introduction, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *',[idUtilisateur, idPosition, titre, introduction, photo]);
    return new Description(query.rows[0]);
  }

}
