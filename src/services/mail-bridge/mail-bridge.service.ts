import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';
import { log } from 'handlebars';
import { TaskMessage } from 'src/interface/task-message.interface';
import { readFile } from 'fs/promises';


@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {

  constructor(private readonly messageService: MessageService) {}

  private async sendNewEmployeeEmail(message: any): Promise<string> {
    try {
      const filePath =
        'src/EmployeeInvitationEmail/EmployeeInvitationEmail.html';
      const htmlContent = await readFile(filePath, 'utf-8');
      const personalizedHtml = htmlContent
        .replace("[candidate's name]", message.name)
        .replace('[job title]', message.jobTitle)
        .replace('[Invitation Link]', message.invitationLink);
      return personalizedHtml;
    } catch (error) {
      console.error('Error reading HTML file:', error);
      throw new Error('Failed to read HTML file for new employee email');
    }
  }

  private async messageHtml(to: string, subject: string, text: string): Promise<string> {
  
    try {
      const filePath =
        'src/EmployeeInvitationEmail/EmployeeMessageEmail.html';
      const htmlContent = await readFile(filePath, 'utf-8');
      const personalizedHtml = htmlContent
        .replace("[Name]", to)
        .replace("[Subject]", subject)
        .replace("[content of the message]", text)
      return personalizedHtml;
    } catch (error) {
      console.error('Error reading HTML file:', error);
      throw new Error('Failed to read HTML file for new employee email');
    }

  }

  private async sendCodeHtml(to: string, subject: string, text: string,code:string): Promise<string> {
    try {
      const filePath =
        'src/EmployeeInvitationEmail/EmployeeSendCodeEmail.html';
      const htmlContent = await readFile(filePath, 'utf-8');
      const personalizedHtml = htmlContent
        .replace("[Name]", to)
        .replace("[Subject]", subject)
        .replace("[content of the message]", text)
        .replace("[code]", code)
      return personalizedHtml;
    } catch (error) {
      console.error('Error reading HTML file:', error);
      throw new Error('Failed to read HTML file for new employee email');
  }
}

  private messageHtmlNewTask(message: TaskMessage): string {
    return `
        <h1>Assign a new task-${message.subject}</h1>
        <h2>hello ${message.name}</h2>
        <h2>A new task has been assigned for you:${message.subject}</h2>
        <p>Mission description:
        ${message.description}
        </p>
        <h2>Due Date: ${message.date}</h2>
        <p>
        Please let me know if you have any questions about the assignment.</br>
        I trust you to carry out the task in the best possible way.</br>
        Successfully,
        </p>
        <h2>${message.managerName}</h2>

      `;
  }

  async handleMessage(message: any): Promise<void> {
    let htmlContent: string;

    try {
      switch (message.kindSubject) {
        case 'message':
          htmlContent = await this.messageHtml(
            message.to,
            message.subject,
            message.text,
          );
          case 'send-code':
            htmlContent = await this.sendCodeHtml(
              message.to,
              message.subject,
              message.text,
              message.code,
            );
          break;
        case 'newTask':
          htmlContent = await this.messageHtmlNewTask(
            message
          );
          break;
        case 'new Employee':
          htmlContent = await this.sendNewEmployeeEmail(message);
          break;
        default:
          throw new Error(`Unknown kindSubject: ${message.kindSubject}`);
      }
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
    };
    await this.messageService.sendMessage(formattedMessage);
  }     
}
