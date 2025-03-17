export interface ClientRepositary {
  viewWallet(clientId: string, currentPage: number): void;
}

export class ViewWallet {
  constructor(private clientRepositary: ClientRepositary) {}

  async execute(clientId: string, currentPage: number) {
    const result = await this.clientRepositary.viewWallet(
      clientId,
      currentPage
    );

    return result;
  }
}
