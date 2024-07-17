export interface Message {
  to: string;
  subject?: string;
  text?: string;
  name?: string;
  html: string;
  numOrder?: string;
  nameBusinessCode?: string;
  dateOrder?: string;
  city?: string;
  street?: string;
  numBuild?: number;
  type: MessageType;
  invitationLink?: string;
  jobTitle?: string;
  kindSubject: string;
  code?: string;
  businessId: string;
}
export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}
