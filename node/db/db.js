import { Sequelize } from 'sequelize';

const db = new Sequelize('LigaFutbol' , 'root' , '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3307',
})
export default db;