import pool from '../../db.config.local.js';

export default class Position {
  constructor({ id_position, intitule, etat, color, etatVue,boutonVue  }) {
    this.idPosition = id_position;
    this.intitule = intitule;
    this.etat = etat;
    this.etatVue = etatVue;
    this.color = color;
    this.boutonVue = boutonVue;
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

  static async findAll() {
    const result = await pool.query('SELECT * FROM position  ORDER BY id_position ASC LIMIT 4');
    // console.log(result);
    // console.log(result.rows.map(row => new Position(row).etat));
    const element = result.rows.map(row => new Position(row).etat);
    const position = result.rows.map(row => new Position(row));
    for(let i=0; i<=element.length; i++){
      if(element[i]==1){
        position[i].color = "orange";
        position[i].etatVue = "en attente";
      }else if(element[i]==5){
        position[i].color = "green";
        position[i].etatVue= "validé"
        position[i].boutonVue = "none";
      }
    }
    return position;
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
