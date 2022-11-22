import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PicTemplateEntity } from './entity/PicTemplate.entity';
import { myObj, myObj1 } from './t';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/img')
  @Header('Content-Type', 'image/png')
  async getHello(): Promise<any> {
    const file = await this.appService.getHello();
    return file;
  }

  @Get('/img1')
  @Header('content-type', 'image/png')
  async getImage(@Body() json: object): Promise<any> {
    const file = await this.appService.getImage(myObj1);
    return file;
  }

  @Post('/template/save')
  async saveTemplate(@Body() json: Partial<PicTemplateEntity>): Promise<any> {
    return await this.appService.saveTemplate(json);
  }

  @Get('/template/list')
  async templates(): Promise<any> {
    return await this.appService.templates();
  }

  @Get('/template/show')
  @Header('content-type', 'image/jpeg')
  async showTemplate(@Query('uid') uid: string): Promise<any> {
    return await this.appService.thumbnail(uid);
  }
}
