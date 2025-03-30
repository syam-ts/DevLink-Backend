 
interface Admin {
  _id: string
  email: string
  password: string
  role?: string
};

export interface AdminRepositary {
  findAdmin(name: string, password: string): unknown;
}

export class LoginAdmin {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(admin: Admin) {
    const foundAdmin = await this.adminRepositary.findAdmin(
      admin.email,
      admin.password
    ) as Admin; 
    if (!foundAdmin) {
      throw new Error("Admin not Found");
    } 
    return foundAdmin;
  }
}
