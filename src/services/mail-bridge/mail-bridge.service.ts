import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';
import { readFile } from 'fs/promises';
import * as ejs from 'ejs';

@Injectable()
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) {}

  private async renderTemplate(templatePath: string, data: object): Promise<string> {
    try {
      const template = await readFile(templatePath, 'utf-8');
      return ejs.render(template, data);
    } catch (error) {
      console.error('Error reading or rendering EJS template:', error);
      throw new Error('Failed to read or render EJS template');
    }
  }

  async handleMessage(message: any): Promise<void> {
    let htmlContent: string;

    const templateData = {
      to: message.to,
      subject: message.subject,
      text: message.text,
      code: message.code,
      name: message.name,
      jobTitle: message.jobTitle,
      invitationLink: message.invitationLink,
      description: message.description,
      date: message.date?.toISOString().split('T')[0],
      managerName: message.managerName,
      numOrder: message.numOrder,
      nameBussniesCode: message.nameBussniesCode,
      dataOrder: message.dataOrder,
      city: message.city,
      street: message.street,
      numBuild: message.numBuild,
    };

    const templateMap = {
      'message': 'src/EmployeeInvitationEmail/EmployeeMessageEmail.ejs',
      'send-code': 'src/EmployeeInvitationEmail/employeeSendCodeEmail.ejs',
      'newTask': 'src/EmployeeInvitationEmail/employeeNewTask.ejs',
      'orderMessage': 'src/EmployeeInvitationEmail/orderMessage.ejs',
      'new Employee': 'src/EmployeeInvitationEmail/EmployeeInvitationEmail.ejs',
    };

    const templatePath = templateMap[message.kindSubject];

    if (!templatePath) {
      throw new Error(`Unknown kindSubject: ${message.kindSubject}`);
    }

    try {
      htmlContent = await this.renderTemplate(templatePath, templateData);
    } catch (error) {
      console.error('Error generating HTML content:', error);
      htmlContent = 'Default HTML content';
    }

    const formattedMessage: Message = {
      to: message.to,
      subject: message.subject,
      html: htmlContent,
      type: MessageType.Email,
      kindSubject: message.kindSubject,
      businessId: message.businessId,
    };

    await this.messageService.sendMessage(formattedMessage);
  }
}
