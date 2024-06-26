import { ApiProperty } from '@nestjs/swagger';

export class BaseAddStoryRequestDto {
  @ApiProperty({ description: 'название истории', nullable: false })
  storyName: string;

  constructor(storyName: string) {
    this.storyName = storyName;
  }
}
