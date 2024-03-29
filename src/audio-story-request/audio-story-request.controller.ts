import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AudioStoryRequestService } from './audio-story-request.service';
import { RoleGuard } from '@/util/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('AudioStoryRequestController')
@Controller('api/audio-story-request')
export class AudioStoryRequestController {
  private readonly logger = new Logger('RequestAudioStoryController');
  constructor(private audioStoryRequestService: AudioStoryRequestService) {}

  @ApiOperation({ summary: 'Создание заявки на проверку озвучки | TODO' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post('/add')
  async createAddAudioRequest() {}
}
