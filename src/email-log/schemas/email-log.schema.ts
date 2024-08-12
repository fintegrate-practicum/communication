import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailLogDocument = HydratedDocument<EmailLog>;

@Schema({ timestamps: true })
export class EmailLog {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  kindSubject: string;

  @Prop({ required: true })
  recipient: string;

  @Prop()
  errorMessage?: string;

  @Prop({ required: true })
  timestamp: Date;
}
export const EmailLogSchema = SchemaFactory.createForClass(EmailLog);
