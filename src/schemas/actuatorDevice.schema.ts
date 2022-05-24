import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ActuatorDeviceDocument = ActuatorDevice & Document;
@Schema()
export class ActuatorDevice {
  @Prop({ type: String })
  code: string;

  @Prop({ type: Number })
  value: number;
}
export const ActuatorDeviceSchema =
  SchemaFactory.createForClass(ActuatorDevice);
