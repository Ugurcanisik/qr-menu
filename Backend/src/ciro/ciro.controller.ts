import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CiroService } from './ciro.service';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';
import { RolesGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('ciro')
export class CiroController {
  constructor(private readonly ciroService: CiroService) {}

  @Post()
  create(@Body() createCiroDto: CreateCiroDto) {
    return this.ciroService.create(createCiroDto);
  }

  @Get()
  findAll() {
    return this.ciroService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiroDto: UpdateCiroDto) {
    return this.ciroService.update(id, updateCiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciroService.remove(id);
  }
}
