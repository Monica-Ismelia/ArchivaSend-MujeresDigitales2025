import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Emails')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('mail')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Envía un correo con un archivo adjunto' })
  async sendEmail(@Body() dto: SendEmailDto, @Req() req) {
    return this.emailsService.send(dto, req.user.id);
  }
}
