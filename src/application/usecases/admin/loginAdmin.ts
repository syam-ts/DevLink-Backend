 
interface Admin {
  _id: string
  role: string
  email: string
 password: string
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
    );
 

    if (!foundAdmin) {
      throw new Error("Admin not Found");
    }

    return foundAdmin;
  }
}
