import { AddTypeRequestDto } from '@/request/dto/type-request/AddTypeRequestDto';
import { EditTypeRequestDto } from '@/request/dto/type-request/EditTypeRequestDto';
import { TypeRequestDto } from '@/request/dto/type-request/TypeRequestDto';
import { Role } from '@/util/Constants';
import { Roles } from '@/util/decorators/Roles';
import { RoleGuard } from '@/util/guards/role.guard';
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
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { EntityStatusRequestDto } from './dto/status-request/EntityStatusRequestDto';
import { AddStatusRequestDto } from './dto/status-request/AddStatusRequestDto';
import { EditStatusRequestDto } from './dto/status-request/EditStatusRequestDto';

@ApiTags('RequestController')
@Controller('/api/request')
export class RequestController {
  private readonly logger = new Logger('RequestController');
  private readonly codeMessages: { P2025: 'выбранной записи не существует' };

  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ summary: 'получение списка всех типов заявок' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [TypeRequestDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/type/all')
  async getAllRequestTypes(): Promise<TypeRequestDto[]> {
    this.logger.debug('GET ALL REQUEST TYPES');
    return this.requestService.getAllRequestTypes();
  }

  @ApiOperation({ summary: 'получение типа заявки по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [TypeRequestDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/type/:typeRequestId')
  async getTypeRequestById(
    @Param('typeRequestId', ParseIntPipe) typeRequestId: number,
  ) {
    this.logger.debug('GET TYPE REQUEST BY ID');
    return this.requestService.getTypeRequestById(typeRequestId);
  }

  @ApiOperation({ summary: 'добавление типа заявки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TypeRequestDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/type/add')
  async addTypeRequest(
    @Body() dto: AddTypeRequestDto,
  ): Promise<TypeRequestDto> {
    this.logger.debug('ADD TYPE REQUEST');
    return this.requestService.addTypeRequest(dto);
  }

  @ApiOperation({ summary: 'редактирование типа заявки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TypeRequestDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/type/edit/:typeRequestId')
  async editTypeRequest(
    @Param('typeRequestId', ParseIntPipe) typeRequestId: number,
    @Body() dto: EditTypeRequestDto,
  ): Promise<TypeRequestDto> {
    this.logger.debug('ADD TYPE REQUEST');
    return this.requestService.editTypeRequest(typeRequestId, dto);
  }

  @ApiOperation({ summary: 'удаление типа заявки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/type/delete/:typeRequestId')
  async deleteTypeRequestById(
    @Param('typeRequestId', ParseIntPipe) typeRequestId: number,
  ) {
    this.logger.debug('DELETE TYPE REQUEST BY ID');
    return this.requestService
      .deleteTypeRequestById(typeRequestId)
      .then((result) => {});
  }

  @ApiOperation({ summary: 'получение списка статусов заявок' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [EntityStatusRequestDto],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/status/all')
  async getStatusRequestAll(): Promise<EntityStatusRequestDto[]> {
    return await this.requestService.getStatusRequestAll();
  }

  @ApiOperation({ summary: 'получение статуса по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EntityStatusRequestDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/status/:statusId')
  async getStatusRequestById(
    @Param('statusId', ParseIntPipe) statusId: number,
  ): Promise<EntityStatusRequestDto> {
    return await this.requestService.getStatusRequestById(statusId);
  }

  @ApiOperation({ summary: 'добавление статуса' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EntityStatusRequestDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/status/add')
  async addNewStatusRequest(@Body() dto: AddStatusRequestDto) {
    this.logger.debug('ADD NEW STATUS REQUEST');
    return await this.requestService.addStatusRequest(dto);
  }

  @ApiOperation({ summary: 'редактирование статуса | TODO | FIX' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EntityStatusRequestDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/status/edit/:statusId')
  async editStatusRequest(
    @Param('statusId', ParseIntPipe) statusId: number,
    @Body() dto: EditStatusRequestDto,
  ): Promise<EntityStatusRequestDto> {
    this.logger.debug('EDIT STATUS REQUEST');
    return await this.requestService.editStatusRequest(statusId, dto);
  }

  @ApiOperation({ summary: 'удаление статуса по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/status/delete/:statusId')
  async deleteStatusRequestById(
    @Param('statusId', ParseIntPipe) statusId: number,
  ): Promise<void> {
    this.logger.debug('DELETE STATUS REQUEST BY ID');
    return await this.deleteStatusRequestById(statusId);
  }
}
