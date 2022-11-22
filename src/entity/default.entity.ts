import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
    nullable: false,
  })
  gmtCreate: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    nullable: false,
  })
  gmtModified: Date;

  @DeleteDateColumn({
    comment: '软删除时间',
  })
  gmtDeleted: Date;
}
