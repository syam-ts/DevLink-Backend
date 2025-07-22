import { IJobPostDocument } from "../../../domain/entities/JobPost";

interface ProjectSubmission {
    contractId: string;
    description: string;
    progress: number;
    attachedFile: string;
    jobPostData: IJobPostDocument;
    createdAt: Date;
  }
  
  // ✅ Ensure it's an array type
  export type ProjectSubmissions = ProjectSubmission[];

export interface ClientRepository {
    viewSubmissions(clientId: string): Promise<ProjectSubmissions>;
}

export class ViewSubmissions {
    constructor(private clientRepository: ClientRepository) { }

    async execute(clientId: string) {
        const response = await this.clientRepository.viewSubmissions(clientId);

        return response;
    }
}
