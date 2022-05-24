import { Controller, Get, Inject } from '@nestjs/common';
import { MqttService } from './mqtt.service';
@Controller('mqtt')
export class MqttController {
  constructor(private mqttService: MqttService) {}
  @Get()
  getTemperature() {
    return this.mqttService.getTemperature();
  }
  @Get('end')
  endGetTemperature() {
    return this.mqttService.endGetTemperature();
  }
}
