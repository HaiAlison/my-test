import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Notification } from '../entity/notification.entity';
import { NotificationDto } from './notification.dto';
import { User } from '../entity/User.entity';

@Injectable()
export class NotificationService {
  async sendNotification(dto: NotificationDto, userId: number) {
    const user = await User.findOne({ id: userId });
    const notification = Notification.create(dto);
    await Notification.save(notification);
    const content = {
      data: {
        body: dto.body,
        title: dto.title,
      },
      tokens: user.firebaseTokens,
    };
    return this.pushNotification(content);
  }
  async pushNotification(message) {
    if (message.tokens) {
      return admin.messaging().sendMulticast(message);
    }
  }
}
