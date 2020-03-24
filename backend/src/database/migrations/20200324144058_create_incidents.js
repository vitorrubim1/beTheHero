
exports.up = function(knex) {
    //CRIAÇÃO DA TABELA incidents
    return knex.schema.createTable('incidents', function(table){

        table.increments(); //CHAVE PRIMÁRIA, AUTO_INCREMENT

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //RELACIONAMENTO COM A TABLE ONGS
        table.string('ong_id').notNullable();

        //CHAVE ESTRANGEIRA
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
