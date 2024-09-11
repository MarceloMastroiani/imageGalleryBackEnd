import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImagesService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  //Listar imagenes
  async listImages(): Promise<string[]> {
    try {
      const result = await cloudinary.api.resources();
      return result.resources.map((resource) => resource.url);
    } catch (error) {
      throw new HttpException(
        `Failed to list images`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Obtener imagen por ID
  async getImage(publicId: string): Promise<string> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result.url;
    } catch (error) {
      throw new HttpException(
        `Failed to get image with publicId ${publicId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Eliminar imagen
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new HttpException(
        `Failed to delete image with publicId ${publicId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
