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

  async saveTemperature() {
    this.client.subscribe(
      'DigiFarm/GFV.Station 1.101/0_Ambient_Average_Temperature',
    );
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

  async unsubscribeTopic(topic) {
    console.log('unsubscribe ' + topic);
    this.client.unsubscribe(topic);
    return { msg: 'unsubscribed this topic: ' + topic };
  }

  async getChangeStream() {
    const changeStream = this.actuatorDeviceModel.watch();
    changeStream.on('change', (cb) => console.log('data', cb.fullDocument)); //return newest data
  }
}
