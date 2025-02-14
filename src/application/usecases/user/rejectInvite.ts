 
 interface Invite {
     clientId?: String;
     userId?: String;
     jobPostData?: {
       title: string;
     description: string;
     expertLevel: string;
     location: string;
     requiredSkills: string[];
     amount: number,
     paymentType: String,
     estimateTimeinHours: Number;
     projectType: String;
     };
     status: String;
     createdAt: Date;
 };
 

export interface UserRepositary {
    rejectInvite(inviteId: string): Promise<Invite>;
}


export class RejectInvite {
    constructor(private userRepositary: UserRepositary) { }

    async execute(inviteId: string) {  
        const rejectedInvite: any = await this.userRepositary.rejectInvite(inviteId);
  
      return rejectedInvite;
    }
}