import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'guitars'
})
class Guitar extends Model {
    // Marca (ej. Fender, Ibanez)
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare brand: string;

    // Modelo (ej. Lukather, SRV)
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    declare description: string;

    @Column({
        type: DataType.DECIMAL(8, 2),
        allowNull: false
    })
    declare price: number;

    // Nombre de archivo en /public/img del frontend (ej. "guitarra_01") o una URL http(s)
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    declare image: string;
}

export default Guitar;
