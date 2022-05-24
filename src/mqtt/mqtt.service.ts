import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { InjectModel } from '@nestjs/mongoose';
import {
  ActuatorDevice,
  ActuatorDeviceDocument,
} from '../schemas/actuatorDevice.schema';
import { Model } from 'mongoose';

@Injectable()
export class MqttService {
  constructor(
    @InjectModel(ActuatorDevice.name)
    private actuatorDeviceModel: Model<ActuatorDeviceDocument>,
  ) {}
  client = mqtt.connect('mqtt://206.189.46.172');

  async getTemperature() {
    this.client.subscribe('opc-test');
    this.client.on('connect', (cb) => {
      console.log('connect', cb);
    });
    const thisModel = this.actuatorDeviceModel;
    this.client.on('message', async function (topic, message) {
      const stringBuf = message.toString('utf-8');
      try {
        const json = JSON.parse(stringBuf);
        console.log(json);
        const actuator = new thisModel({
          code: json.nodeId,
          value: Number(json.value),
        });
        await actuator.save();
      } catch (e) {
        console.log(stringBuf);
      }
    });
    return 'check console log';
  }
}
