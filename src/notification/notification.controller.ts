import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private notification: NotificationService) {}

  @Post()
  sendNotification(@Body() dto: NotificationDto) {
    return this.notification.sendNotification(dto, 2);
  }
}
