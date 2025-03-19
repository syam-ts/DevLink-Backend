export interface AdminRepository {
     clientMetrics(): Promise<number>
     userMetrics(): Promise<number>
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
