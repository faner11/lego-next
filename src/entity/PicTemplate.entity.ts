import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity('pic_template')
export class PicTemplateEntity extends DefaultEntity {
  @Column({
    default: '',
    nullable: false,
    unique: true,
    comment: '模版名称',
  })
  name: string;

  @Column({
    nullable: false,
    comment: '模版',
    type: 'jsonb',
  })
  template: any;

  @Column({
    default: '',
    nullable: false,
    comment: '缩略图',
  })
  thumbnail: string;

  constructor(partial?: Partial<PicTemplateEntity>) {
    super();
    Object.assign(this, partial);
  }
}
