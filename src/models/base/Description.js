import pool from '../../db.config.local.js';

export default class Description {
  constructor(data ={}) {
    const { titre = '', introduction = '', photo = '' } = data;
    this.titre = titre;
    this.introduction = introduction;
    this.photo = photo;
  }

  static async getRecentDescription() {
    const query = `
      SELECT * FROM description
      ORDER BY id_description DESC
      LIMIT 1;
    `;
    const { rows } = await pool.query(query);

    // ✅ Vérifie si la table contient au moins une ligne
    if (!rows || rows.length === 0) {
      console.log("ato tsy misy");
      return new Description(); // Renvoie un objet vide sans planter
    }

    return new Description(rows[0]);
  }

  static async create(idUtilisateur, idPosition, { titre, introduction, photo }) {
    // Crée un nouvel objet Description
    const description = new Description(idUtilisateur, idPosition, { titre, introduction, photo });

    // Exemple : insertion dans la base
    const query = `
      INSERT INTO description (id_utilisateur, id_position, titre, introduction, photo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [description.idUtilisateur, description.idPosition, description.titre, description.introduction, description.photo];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

}
