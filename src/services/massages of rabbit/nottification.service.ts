import { Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

export @Injectable()
class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private client: ClientProxy) {}

async sendRecruitmentNotification(
    recipient: string,
    messageType: string,
    jobTitle: string,
    positionName: string,
    departmentName: string,
    jobDescription: string,
    requirements: string,
    jobType: string,
    beginningOfWork: string,
    emailAddress:string,
    applicationDeadline: string,
    nameOfHRDepartment:string
  ): Promise<void> {
    const messageContent = `
      Message type: ${messageType}
      Recipient: ${recipient}
      Content of the message:
      Title: Wanted ${jobTitle}
      Overture:
      Hello to all company employees,
      We are pleased to announce the opening of a new position for the position of ${positionName} in the ${departmentName} department.
      Job description:
      ${jobDescription}
      Requirements:
      ${requirements}
      Job type:
      ${jobType}
      Beginning of work:
      ${beginningOfWork}
      Apply for:
      Employees interested in applying for the position are invited to send a resume and cover letter to ${emailAddress}.
      Application deadline:
      ${applicationDeadline}
      Successfully!
      ${nameOfHRDepartment}
    `;
    this.logger.log(messageContent); 
  }

  async sendCVReceiptNotification(
    recipient: string,
    messageType: string,
    jobTitle: string,
    candidateName: string,
    relevantEducation: string,
    yearsOfExperience: string,
    relevantFieldsOfKnowledge: string,
    relevantQualifications: string,
    positiveQualities: string,
    candidatePhone:string,
    candidateEmail:string
  ): Promise<void> {
    const messageContent = `
      Message type: Applying for the position ${jobTitle}
      Recipient: ${recipient}
      Content of the message:
      Overture:
      Hello ${candidateName},
      I would like to thank you for accepting my resume for the ${jobTitle} position at ${recipient}.
      Message body:
      I am ${candidateName}, possessing ${relevantEducation} and ${yearsOfExperience} experience in ${relevantFieldsOfKnowledge}. During my work I gained a lot of knowledge in the following areas:
      ${relevantQualifications}
      Also, I have many qualifications, including:
      ${positiveQualities}
      I am a person ${positiveQualities} and highly motivated to learn and develop. I am sure that I can contribute a lot to the company and the team.
      Finish:
      I would be very happy to meet you and tell you more about myself and my experience .
      Best regards,
      ${candidateName}
      Contact info:
      Phone: ${candidatePhone}
      Email: ${candidateEmail}
    `;
 
  }
  
  async sendInterviewConfirmation(
    recipient: string,
    messageType: string,
    jobTitle: string,
    interviewDate: string,
    interviewTime: string,
    interviewAddress: string,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    companyName: string,
    companyWebsite: string,
    dressCode: string,
    requiredDocuments: string,
    HRDepartment: string
  ): Promise<void> {
    const messageContent = `
      Title: Confirmation of invitation to interview - ${jobTitle}
      Overture:
      Hello ${recipient},
      We are pleased to confirm your invitation to a job interview for the position of ${jobTitle}.
      Message body:
      The interview details have been confirmed and we have scheduled you for an interview at:
      Date: ${interviewDate}
      Time: ${interviewTime}
      Place: ${interviewAddress}
      Contact: ${contactName} | ${contactPhone} | ${contactEmail}
      During the interview we will discuss with you in detail the position, its requirements and your experience.
      Please confirm receipt of this message as soon as possible.
      Thank you,
      ${companyName}
      Finish:
      We would love to see you in the interview!
      Learn more:
      Company website: ${companyWebsite}
      Desired dress code: ${dressCode}
      Relevant documents to bring: ${requiredDocuments}
      Best regards,
      ${HRDepartment}
    `;
   
  }
  

  async sendRecruitmentStatusUpdate(
    recipient: string,
    messageType: string,
    jobTitle: string,
    candidateName: string,
    status: string,
    explanation: string,
    nextStep: string
  ): Promise<void> {
    const messageContent = `
      Title: Status Update - ${jobTitle}
      Overture:
      Hello ${candidateName},
      We are writing to update you on the status of your application for ${jobTitle}.
      Message body:
      ${status === 'Accepted' ? 'Accepting a nomination' : 'Rejection of application'}: "${explanation}"
      The next step:
      ${status === 'Accepted' ? 'The HR team will contact you soon to coordinate a meeting and an intake process.' : 'We wish you the best of luck in your continued job search.'}
      Finish:
      Thank you for your interest in the ${jobTitle}.
      We appreciate the time you spent in the recruitment process.
      Best regards,
      Recruitment team
    `;
   
  }

async sendTaskAssignment(
    recipient: string,
    taskName: string,
    employeeName: string,
    missionDescription: string,
    dueDate: string,
    requiredKnowledge: string,
    requiredResources: string,
    contactPerson: string
  ): Promise<void> {
    const messageContent = `
      Message Type: Task Assignment
      Recipient: ${recipient}
      Content of the message:
      Title: New Task Assignment - ${taskName}
      Overture:
      Hello ${employeeName},
      I am writing to assign you a new task: ${taskName}.
      Message body:
      Mission description:
      1. The purpose of the mission: ${missionDescription}
      Due date: ${dueDate}
      Requirements:
      Required knowledge and experience: ${requiredKnowledge}
      Required resources: ${requiredResources}
      Contact: ${contactPerson}
      finish:
      Please let me know if you have any questions about the assignment.
      I trust you to carry out the task properly.
      Best regards,
      [Director's name]
    `;
 
  }

async sendTaskStatusUpdate(
    recipient: string,
    taskName: string,
    employeeName: string,
    currentStatus: string,
    progressDescription: string,
    challenges: string,
    solutions: string,
    updatedSchedule: string
  ): Promise<void> {
    const messageContent = `
      Message Type: Update
      Recipient: ${recipient}
      Content of the message:
      Title: Task Status Update - ${taskName}
      Overture:
      Hello ${employeeName},
      I am writing to update you on the status of the task ${taskName}.
      Message body:
      Current Status: ${currentStatus}
      More details:
      1. Description of progress: ${progressDescription}
      2. Challenges: ${challenges}
      3. Solutions: ${solutions}
      4. Updated schedule: ${updatedSchedule}
      Finish:
      I will be happy to answer any questions you may have about the assignment.
      Thank you for your cooperation.
      Best regards,
      [name of updating employee]
    `;
  
  }

  async sendApprovalRequest(
    recipient: string,
    employeeName: string,
    actionDescription: string,
    consequences: string,
    requiredResources: string,
    schedule: string
  ): Promise<void> {
    const messageContent = `
      Message Type: Request
      Recipient: ${recipient}
      Content of the message:
      Title: Authorization Request for ${actionDescription}
      Overture:
      Hello ${employeeName},
      I am writing to you requesting approval for ${actionDescription}.
      Message body:
      Request details:
      1. A detailed description of the action: ${actionDescription}
      2. Consequences of the action: ${consequences}
      3. Required resources: ${requiredResources}
      4. Schedule: ${schedule}
      Finish:
      I would appreciate your approval as soon as possible.
      Thank you for your cooperation.
      Best regards,
      [name of requesting employee]
    `;
  
  }
  
  async sendFeedbackToEmployee(
    recipient: string,
    employeeName: string,
    strengths: string,
    areasForImprovement: string,
    recommendations: string
  ): Promise<void> {
    const messageContent = `
      Message Type: Feedback
      Recipient: ${recipient}
      Content of the message:
      Overture:
      Hello ${employeeName},
      We are writing to you as a result of receiving feedback on your work.
      We appreciate your contribution to the company and your commitment to work.
      Message body:
      Strengths:
      ${strengths}
      Areas for improvement:
      ${areasForImprovement}
      Recommendations:
      ${recommendations}
      Finish:
      We believe in you and your potential.
      We are available to you for any question or request.
      We are confident that you will continue to be successful in your role.
      Best regards,
      [Director's name]
    `;

  }

  async sendNewCourseNotification(
    courseName: string,
    courseSubject: string,
    courseGoals: string,
    targetAudience: string,
    prerequisites: string,
    startDate: string,
    endDate: string,
    courseDuration: string,
    courseHours: string,
    courseLocation: string,
    lecturer: string,
    curriculum: string,
    registrationDetails: string,
    moreDetailsLink: string,
    HumanResourcesDepartment:string
  ): Promise<void> {
    const messageContent = `
      Message Type: Advertising
      Title: New Course: ${courseName}
      Overture:
      Hello dear employees,
      We are happy to inform you about the opening of a new course: ${courseName}!
      Message body:
      Course details:
      Course Name: ${courseName}
      The subject of the course: ${courseSubject}
      Course goals: ${courseGoals}
      Target audience: ${targetAudience}
      Prerequisites: ${prerequisites}
      Start date: ${startDate}
      End date: ${endDate}
      Course duration: ${courseDuration}
      Course hours: ${courseHours}
      Course location: ${courseLocation}
      Lecturer: ${lecturer}
      Curriculum: ${curriculum}
      How to register: ${registrationDetails}
      Link to more details: ${moreDetailsLink}
      Finish:
      We invite you to register for the course and learn a new and interesting topic!
      The number of places is limited, so you should register as soon as possible.
      Signature:
      ${HumanResourcesDepartment}
    `;

  }
  
  async sendTrainingInvitation(
    recipient: string,
    trainingName: string,
    trainingTopic: string,
    trainingGoals: string,
    targetAudience: string,
    trainingDate: string,
    tuitionStartTime: string,
    trainingDuration: string,
    trainingLocation: string,
    lecturer: string,
    prerequisites: string,
    requiredMaterials: string,
    howToShowUp: string,
    moreDetailsLink: string,
    confirmationDeadline: string,
    nameOfHRDepartment:string
  ): Promise<void> {
    const messageContent = `
      Message Type: Update
      Title: Invitation to Training - ${trainingName}
      Overture:
      Hello ${recipient},
      We are pleased to invite you to participate in training ${trainingName}.
      Message body:
      Training details:
      Name of training: ${trainingName}
      Training topic: ${trainingTopic}
      The goals of the training: ${trainingGoals}
      Target audience: ${targetAudience}
      Date: ${trainingDate}
      Time: ${tuitionStartTime}
      Training duration: ${trainingDuration}
      Place of training: ${trainingLocation}
      Lecturer: ${lecturer}
      Prerequisites: ${prerequisites}
      Required materials: ${requiredMaterials}
      How to show up: ${howToShowUp}
      Link for more details: ${moreDetailsLink}
      Finish:
      Please confirm your participation by ${confirmationDeadline}.
      We look forward to seeing you!
      Signature:
      ${nameOfHRDepartment}
    `;

  }
  
  async sendTrainingStatusUpdate(
    recipient: string,
    trainingName: string,
    trainingTopic: string,
    trainingStatus: string,
    feedback: string,
    evaluationLink: string,
    trainingOrganizer:string,
    nameOfHRDepartment:string
  ): Promise<void> {
    const messageContent = `
      Message Type: Update
      Title: training status update - ${trainingName}
      Overture:
      Hello ${recipient},
      We will update you on the status of the training ${trainingName}.
      Message body:
      Name of training: ${trainingName}
      Training topic: ${trainingTopic}
      Training status: ${trainingStatus}
      Feedback:
      ${feedback}
      Link to the evaluation: ${evaluationLink}
      Finish:
      Thank you for your cooperation.
      For more information, you can contact **${trainingOrganizer}**.
      Signature:
      ${nameOfHRDepartment}
    `;
 
  }

    async sendAttendanceReportUpdate(
        employeeName: string,
        date: string,
        startTime: string,
        endTime: string,
        breaksDetail: string,
        projectCode: string,
        activityType: string,
        additionalNotes: string,
        HumanResourcesDepartment:string,
        HRManagementSystem:string,
        IDNumber:string,
        payrollDepartment:string,
        nameOfHRDepartment:string
      ): Promise<void> {
        const messageContent = `
          Message Type: Update
          Title: Attendance report update - ${employeeName}
          Overture:
          Hello ${HRManagementSystem},
          We are updating you regarding reporting attendance for ${employeeName} for ${date}.
          Message body:
          General information:
          Employee Name: ${employeeName}
          ID number: ${IDNumber}
          Date: ${date}
          Presence:
          Workday start time: ${startTime} 
          Workday end time: ${endTime}
          Breaks: ${breaksDetail}
          More details:    
          Project code: ${projectCode}
          Activity Type: ${activityType}
          Additional Notes: ${additionalNotes}
          Finish:
          Thank you for your cooperation.
          For more information, you can contact **${HumanResourcesDepartment}**.
          Signature:
          ${nameOfHRDepartment}
        `;
      
      }
      
      async sendSalaryCalculationUpdate(
        employeeName: string,
        paymentPeriod: string,
        salaryNumber: string,
        grossSalary: string,
        deductions: string,
        netSalary: string,
        workingHoursDetail: string,
        addonsDetail: string,
        deductionsDetail: string,
        paymentMethod: string,
        transferDate: string,
        paymentAmount: string,
        bankAccountNumber: string,
        vacationUtilization: string,
        remainingVacationDays: string,
        HRManagementSystem:string,
        IDNumber:string,
        payrollDepartment:string,
        nameOfHRDepartment:string
      ): Promise<void> {
        const messageContent = `
          Message Type: Update
          Title: Salary calculation update - ${employeeName}
          Overture:
          Hello ${HRManagementSystem},
          We are updating you regarding salary calculation for ${employeeName} for ${paymentPeriod}.
          Message body:
          General information:
          Employee Name: ${employeeName}
          ID number: ${IDNumber}
          Salary Number: ${salaryNumber}
          Wage:
          Gross salary: ${grossSalary}
          Deductions: ${deductions}
          Net salary: ${netSalary}
          Detail:
          Working hours: ${workingHoursDetail}
          Add-ons: ${addonsDetail}
          Deductions: ${deductionsDetail}
          Payment transference:
          Method of payment: ${paymentMethod}
          Transfer Date: ${transferDate}
          Payment amount: ${paymentAmount}
          Bank account number: ${bankAccountNumber} (in case of bank transfer)
          More details:
          Utilization of vacations: ${vacationUtilization}
          Remaining vacation days: ${remainingVacationDays}
          Finish:
          Thank you for your cooperation.
          For more information, you can contact **${payrollDepartment}**.
          Signature:
          ${nameOfHRDepartment}
        `;
       
      }

      async sendPaymentTransferConfirmation(
        employeeName: string,
        paymentDescription: string,
        paymentAmount: string,
        transferDate: string,
        paymentMethod: string,
        bankAccountNumber: string,
        payrollDepartment:string,
        nameOfHRDepartment:string
      ): Promise<void> {
        const messageContent = `
          Message Type: Confirmation
          Title: Confirmation of payment transfer
          Overture:
          Hello ${employeeName},
          We are pleased to confirm that payment for ${paymentDescription} has been successfully completed.
          Message body:
          Employee Name: ${employeeName}
          Payment amount: ${paymentAmount}
          Transfer Date: ${transferDate}
          Method of payment: ${paymentMethod}
          Bank account number: ${bankAccountNumber} (in case of bank transfer)
          Finish:
          Thank you for your cooperation.
          For more information, you can contact **${payrollDepartment}**.
          Signature:
          ${nameOfHRDepartment}
        `;
  
      }
    }