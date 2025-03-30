export interface AdminRepository {
     clientMetrics(): Promise<{ 
        totalClients: number;
        verifiedClients: number;
        totalJobs: number;}>
     userMetrics(): Promise<{
        totalUsers: number;
        verifiedUsers: number;
        boostedUsers: number;
        totalJobs: number;
     }>
     getRevenue(range: string): Promise<unknown>
}

export class ClientMetrics {
    constructor(private adminRepository: AdminRepository) { }

    async execute() {
       const result = await this.adminRepository.clientMetrics();
       
       return result;
    }
}

export class UserMetrics {
    constructor(private adminRepository: AdminRepository) { }

    async execute() {
       const result = await this.adminRepository.userMetrics();
       
       return result;
    }
}

export class GetRevenue {
    constructor(private adminRepository: AdminRepository) { }

    async execute(range: string) {
       const result = await this.adminRepository.getRevenue(range); 
       return result;
    }
}
