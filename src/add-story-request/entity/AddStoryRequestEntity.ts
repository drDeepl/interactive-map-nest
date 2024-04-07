import { ApiProperty } from '@nestjs/swagger';

export class AddStoryRequestEntity {
  @ApiProperty({ description: '', nullable: false })
  id: number;
  @ApiProperty({ description: 'название истории', nullable: false })
  storyName: string;
  @ApiProperty({ description: 'комментарий проверяющего', nullable: false })
  comment: string;
  @ApiProperty({
    description: 'ид полльзователя, создавшего заявку',
    nullable: false,
  })
  userId: number;
}
