export interface AdminRepository {
     clientMetrics(): Promise<number>
     userMetrics(): Promise<number>
     getRevenue(sortType: string): void
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

    async execute(sortType: string) {
       const result = await this.adminRepository.getRevenue(sortType);
       
       return result;
    }
}
