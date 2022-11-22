import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity('thumbnail')
export class ThumbnailEntity extends DefaultEntity {
  @Column({
    default: '',
    nullable: false,
    unique: true,
    comment: '文件id',
  })
  uid: string;

  @Column({
    nullable: false,
    comment: '文件',
    type: 'bytea',
  })
  file: Uint8Array;

  constructor(partial?: Partial<ThumbnailEntity>) {
    super();
    Object.assign(this, partial);
  }
}
