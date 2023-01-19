import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchList } from 'src/watchlist/models/watchlist.model';

@Table
export class User extends Model {
  @Column
  firstname: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => WatchList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wathlist: WatchList[];
}
