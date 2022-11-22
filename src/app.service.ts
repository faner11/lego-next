import { Injectable, StreamableFile } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { fabric } from 'fabric';
import { Canvas, PNGStream } from 'canvas';
import { myObj } from './t';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PicTemplateEntity } from './entity/PicTemplate.entity';
import { ThumbnailEntity } from './entity/thumbnail.entity';
const loadJson = (fa: fabric.StaticCanvas, json: any) => {
  return new Promise((resolve, reject) => {
    fa.loadFromJSON(json, () => {
      console.log('加载完成');
      resolve(true);
    });
  });
};
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PicTemplateEntity)
    private readonly picTemplateEntity: Repository<PicTemplateEntity>,
    @InjectRepository(ThumbnailEntity)
    private readonly thumbnailEntity: Repository<ThumbnailEntity>,
  ) {}

  async getHello() {
    const images = [
      'https://cdn.indexed.cn/op-icon/op-biaoqian-jisuan.png',
      'https://cdn.indexed.cn/statics/img/op-bg.jpeg',
      'https://cdn.indexed.cn/statics/img/op-logo.png',
      'https://cdn.indexed.cn/statics/img/常规图1.jpg	',
      'https://cdn.indexed.cn/statics/img/gianpaolo-antonucci-Jo9lg22aK6Q-unsplash.jpg',
      'https://cdn.indexed.cn/statics/img/023f5b61b5118eeb0bed3a99e67b3508.jpeg	',
    ];
    const index = Math.floor(Math.random() * images.length);

    const list = myObj.objects.map((p) => {
      if (p.data?.canEdit) {
        return {
          ...p,
          text: nanoid(8),
        };
      }
      if (p.data?.canEditImage) {
        return {
          ...p,
          src: images.at(index),
        };
      }
      return p;
    });
    const obj = {
      ...myObj,
      objects: list,
    };
    const fa = new fabric.StaticCanvas(null, obj);
    // 等待图片加载完成
    await loadJson(fa, obj);
    const stream: PNGStream = (fa as unknown as Canvas).createPNGStream();
    return new StreamableFile(stream);
  }

  async getImage(json: object) {
    const fa = new fabric.StaticCanvas(null, json);
    // 等待图片加载完成
    await loadJson(fa, json);
    const stream: PNGStream = (fa as unknown as Canvas).createPNGStream();
    return new StreamableFile(stream);
  }

  async saveTemplate(json: Partial<PicTemplateEntity>) {
    const width = 200;
    const height = json.template.height / (json.template.width / 200);
    const thumbnail = await this.saveThumbnail(json.template, {
      width: width,
      height: height,
      centeredScaling: true,
    });
    const entity = new PicTemplateEntity(json);
    entity.thumbnail = thumbnail.uid;
    return this.picTemplateEntity.save(entity);
  }

  async templates() {
    return await this.picTemplateEntity.find();
  }

  private async saveThumbnail(json: any, config: fabric.ICanvasOptions) {
    const fa = new fabric.StaticCanvas(null, json);
    const zoomNum = config.width / json.width;
    fa.setZoom(zoomNum);
    // 等待图片加载完成
    await loadJson(fa, json);
    fa.setWidth(config.width);
    fa.setHeight(config.height);
    fa.renderAll();
    const stream = (fa as unknown as Canvas).createPNGStream();
    // const blob = new StreamableFile(stream);
    const file = stream.read();
    const entity = new ThumbnailEntity({
      uid: nanoid(8),
      file: file,
    });
    const bb = await this.thumbnailEntity.save(entity);
    return bb;
  }

  async thumbnail(uid: string) {
    const bb = await this.thumbnailEntity.findOne({
      where: {
        uid: uid,
      },
    });
    return new StreamableFile(bb.file);
  }
}
