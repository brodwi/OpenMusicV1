/* eslint-disable camelcase */


exports.up = (pgm) => {
    pgm.createTable('user_album_likes', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      users_id: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      albums_id: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
    }, {
      constraints: {
        foreignKeys: [
          {
            references: 'users(id)',
            columns: 'users_id',
            onDelete: 'CASCADE',
          },
          {
            references: 'albums(id)',
            columns: 'albums_id',
            onDelete: 'CASCADE',
          },
        ],
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('user_album_likes');
  };
  