import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActuatorDevice,
  ActuatorDeviceSchema,
} from '../schemas/actuatorDevice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActuatorDevice.name, schema: ActuatorDeviceSchema },
    ]),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
