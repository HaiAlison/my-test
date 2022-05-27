import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as mqtt from 'mqtt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require('firebase-admin');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  admin.initializeApp({
    credential: admin.credential.cert(path.resolve('firebase-cert.json')),
  });
  const client = mqtt.connect('mqtt://206.189.46.172');
  client.subscribe('DigiFarm/GFV.Station 1.101/0_Ambient_Average_Temperature');
  client.on('connect', (cb) => {
    console.log('connect', cb);
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000, () => {
    //this is always get message when start service
    // client.on('message', async function (topic, message) {
    //   const stringBuf = message.toString('utf-8');
    //   try {
    //     const json = JSON.parse(stringBuf);
    //     console.log(json);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
  });
}
bootstrap();
