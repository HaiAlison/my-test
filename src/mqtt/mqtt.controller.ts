import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';
@Controller('mqtt')
export class MqttController {
  constructor(private mqttService: MqttService) {}
  @Post()
  getTemperature() {
    return this.mqttService.saveTemperature();
  }
  @Post('unsubscribe')
  unsubscribeTopic(@Body('topic') topic: string) {
    return this.mqttService.unsubscribeTopic(topic);
  }
  @Get('change-stream')
  endGetTemperature() {
    return this.mqttService.getChangeStream();
  }
}
