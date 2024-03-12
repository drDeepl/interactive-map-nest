import { ApiProperty } from '@nestjs/swagger';
import { BaseEthnicGroupMapDto } from './BaseEthnicGroupMapDto';
import { EthnicGroupDto } from '@/ethnic-group/dto/EthnicGroupDto';

export class EthnicGroupMapWithGroupDto extends BaseEthnicGroupMapDto {
  @ApiProperty({ description: '', nullable: false })
  ethnicGroup: EthnicGroupDto;
}
