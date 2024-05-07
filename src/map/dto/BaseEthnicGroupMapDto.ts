import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BaseEthnicGroupMapDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: '', nullable: false })
  @IsNumber()
  latitude: number;

  constructor(longitude: number, latitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
