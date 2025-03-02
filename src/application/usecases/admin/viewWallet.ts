export interface AdminRepository {
  viewWallet( urrentPage: number | any): Promise<any>;
}

export class ViewWalletAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute( currentPage: number | any) {
    const result = await this.adminRepository.viewWallet(currentPage);

    return result;
  }
}
