import pool from '../../db.config.js';

export default class Position {
  constructor({ id_position, intitule, etat }) {
    this.idPosition = id_position;
    this.intitule = intitule;
    this.etat = etat;
  }

  static async exception(){
    if(this.intitule==null){
      throw this.exception('Veuillez soumettre une position valide.');
    }
  }

  static async create({ intitule}) {
    const result = await pool.query('INSERT INTO position (intitule, etat) VALUES ($1, 0) RETURNING *',[intitule]);
    return new Position(result.rows[0]);
  }

  static formatEtat(position) {
    if (position.etat == 1) {
      position.color = "orange";
      position.etatVue = "en attente";
    } else if (position.etat == 5) {
      position.color = "green";
      position.etatVue = "validé";
      position.boutonVue = "none";
    }
    return position;
  }

  static async findAll(limit = 5, offset = 0) {
    const result = await pool.query(
      'SELECT * FROM position ORDER BY id_position ASC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows.map(row => this.formatEtat(new Position(row)));
  }

  static async getPostionValidated() {
    const result = await pool.query('SELECT * FROM position  WHERE etat =5 ORDER BY id_position',    );
    return result.rows.map(row => new Position(row));
  }

  static async countAll() {
    const result = await pool.query('SELECT COUNT(*) FROM position');
    return parseInt(result.rows[0].count, 10);
  }

  static async findFiltered({ intitule, etat }, limit = 5, offset = 0) {
    let query = 'SELECT * FROM position';
    let conditions = [];
    let params = [];

    if (intitule && intitule.trim() !== '') {
      params.push(`%${intitule.trim()}%`);
      conditions.push(`intitule ILIKE $${params.length}`);
    }

    if (etat && etat !== 'all') {
      params.push(etat);
      conditions.push(`etat = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    params.push(limit);
    params.push(offset);
    query += ` ORDER BY id_position ASC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const result = await pool.query(query, params);
    return result.rows.map(row => this.formatEtat(new Position(row)));
  }

  static async countFiltered({ intitule, etat }) {
    let query = 'SELECT COUNT(*) FROM position';
    let conditions = [];
    let params = [];

    if (intitule && intitule.trim() !== '') {
      params.push(`%${intitule.trim()}%`);
      conditions.push(`intitule ILIKE $${params.length}`);
    }

    if (etat && etat !== 'all') {
      params.push(etat);
      conditions.push(`etat = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count, 10);
  }

  static async findById(id) {
    
    const result = await pool.query('DELETE * FROM position WHERE id_position = $1', [id]);
    return result.rows[0] ? new Position(result.rows[0]) : null;
  }

  static async findByIntitule({intitule, etat}) {
    const result = await pool.query('SELECT * FROM position WHERE intitule=$1 AND etat=$2', [intitule, etat]);
    const position = result.rows.map(row => new Position(row));
    return position;
  }

  static async update(id, intitule) {
    console.log(intitule);
    const result = await pool.query(
      'UPDATE position SET intitule=$1 WHERE id_position=$2 RETURNING *',
      [intitule, id]
    );
    return result.rows[0] ? new Position(result.rows[0]) : null;
  }

  static async validate(id) {
    const result = await pool.query('UPDATE position SET etat=5 WHERE id_position=$1 RETURNING *',[id]);
    return result.rows[0] ? new Position(result.rows[0]) : null;
  }

  static async delete(id) {
    await pool.query('DELETE FROM position WHERE id_position = $1', [id]);
    return true;
  }

//   // 🔗 Relation : récupérer les posts de l’utilisateur
//   async getPosts() {
//     const result = await pool.query(
//       'SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC',
//       [this.id]
//     );
//     return result.rows;
//   }
}
