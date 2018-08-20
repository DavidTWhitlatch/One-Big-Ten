// execute pgp with db config, so a connection is made
const { db } = require('../config/connection');

module.exports = {

  findAllProducts() {
    return db.many(`
        SELECT p.id AS id,
        c.name AS company,
        p.name AS name,
        p.msrp AS msrp,
        p.logo AS logo
        FROM products p
        JOIN companies c ON (c.id = p.company_id)
        `);
  },

  findOneProduct(id) {
    return db.one(`
    SELECT p.id AS id,
    c.name AS company,
    p.name AS name,
    p.msrp AS msrp,
    p.logo AS logo
    FROM products p
    JOIN companies c ON (c.id = p.company_id)
        WHERE p.id=$1`, id
    );
  },

  addNewProduct(product) {
    return db.one(`
    INSERT INTO products
    (company_id, name, msrp, logo)
    VALUES
    ($/company_id/, $/name/, $/msrp/, $/logo/)
    RETURNING *
    `, product);
  },

};