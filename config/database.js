const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql'); // Definir MySQL como padrão

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'sql.freedb.tech'), // Host do FreeDB.tech
        port: env.int('DATABASE_PORT', 3306), // Porta padrão do MySQL
        database: env('DATABASE_NAME', 'freedb_strapi_db'), // Nome do banco
        user: env('DATABASE_USERNAME', 'freedb_chavane798'), // Usuário
        password: env('DATABASE_PASSWORD', '4#e&YjJed*n5FgZ'), // Senha
        ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: true } : false, // SSL desativado
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) }, // Ajuste de conexão
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000), // Timeout da conexão
    },
  };
};
