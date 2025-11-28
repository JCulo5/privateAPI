const { type } = require("os");

const dbConfig={
    synchronize: false,
    migrations:['migrations/*.js'],
    cli:{
        migrationsDir:'migrations',
    },

};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig,{
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['src/**/*.entity.js'],
        });
    case 'test':
         Object.assign(dbConfig,{
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['src/**/*.entity.ts'],
        });
    case 'production':
        Object.assign(dbConfig,{
            type: 'postgres',
            url: 'test.sqlite',
            migrationsRun:true,
        });
    default:
        throw new Error('unknown environment type');
}

module.exports=dbConfig;