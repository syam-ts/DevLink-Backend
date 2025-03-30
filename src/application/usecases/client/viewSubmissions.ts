import { ObjectId } from "mongoose";
import { Client } from "../../../domain/entities/Client";

interface ProjectSubmission {
    contractId: ObjectId;
    description: string;
    progress: number;
    attachedFile: string;
    jobPostData: any;
    createdAt: Date;
  }
  
  // ✅ Ensure it's an array type
  export type ProjectSubmissions = ProjectSubmission[];

export interface ClientRepository {
    viewSubmissions(clientId: string): Promise<any>;
}

export class ViewSubmissions {
    constructor(private clientRepository: ClientRepository) { }

    async execute(clientId: string) {
        const response = await this.clientRepository.viewSubmissions(clientId);

        return response;
    }
}
