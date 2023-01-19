import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';

@Table
export class WatchList extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
