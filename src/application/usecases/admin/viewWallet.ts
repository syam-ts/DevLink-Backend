export interface AdminRepository {
  viewWallet( currentPage: number): void;
}

export class ViewWalletAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute( currentPage: number) {
    const result = await this.adminRepository.viewWallet(currentPage);

    return result;
  }
}
