//METÓDO .up É RESPONSÁVEL PELA CRIAÇÃO DA TABLE
exports.up = function(knex) {
    //CRIAÇÃO DA TABLE ongs
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary(); //chave primaria, formato string pq vai ser gerada pelo dev
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
  
};

//METODO .DOWN PARA EXCLUIR A TABLE
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
