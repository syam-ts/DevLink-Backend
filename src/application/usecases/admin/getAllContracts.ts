 
export interface AdminRepositary {
    getAllContracts(): Promise< any >;
}


export class GetAllContracts {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute () {
        const result = await this.adminRepositary.getAllContracts(); 

        return result;
   }
}