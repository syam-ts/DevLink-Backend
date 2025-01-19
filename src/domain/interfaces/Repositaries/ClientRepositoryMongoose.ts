import { Client, ClientModel } from '../../entities/Client';
import { User } from '../../entities/User';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';
import { UserModel } from '../../entities/User'; 
import { NotificationModel } from '../../entities/Notification';
import { JobPostModel } from '../../entities/JobPost'; 
import { AdminModel } from '../../entities/Admin';
import { ContractModel } from '../../entities/Contract';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import allCronJobs from '../../../helper/cron-jobs/index'
import { ObjectId, Schema } from 'mongoose';

   


export class ClientRepositoryMongoose implements ClientRepositary {

  async createClient(client: Client | any): Promise<Client | any> {
    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      name: client.name,
      email: client.email,
      password: hashedPassword
    });

    const savedClient = await createdClient.save()

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password
    } as unknown as Client;

  }




  async signupClient(client: Client | any): Promise<Client | any> {


    if (!client.companyName || !client.email || !client.password) {
      throw new Error('CompanyName, email, and password are required');
    }

    if (client.companyName.length < 4 || client.companyName.length > 20) {
      throw new Error('Name should be between 4 to 20 characters');
    }


    if (!validator.isEmail(client.email)) {
      throw new Error('Invalid email format');
    }

    if (!validator.isStrongPassword(client.password)) {
      throw new Error('Please enter a strong password');
    }

    const foundClient: any = this.findClientByEmail(client.email);

    if (foundClient) {
      return foundClient
    } else {
      return null
    }
  };



  async verifyOtp(client: any): Promise<Client> {
 

    const { companyName, email, password } = client;
    if (client.mailOtp === parseInt(client.clientOtp.otp)) {

      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      let wallet = {
        balance: 0, 
        transactions: [
            {
                type: "",
                amount: 0,
                from: "",
                fromId: "",
                date: ""
            }
        ]
    };

      const createdClient = new ClientModel({
        companyName: companyName,
        email: email,
        password: hashedPassword, 
        description: '',
        numberOfEmployees: '',
        location: '',
        domain: '',
        since: '',
        totalJobs: '',
        isVerified: false,
        isGoogle: false,
        totalSpend: 0,
        totalHours: 0,
        wallet: {wallet},
        request: [],
        isBlocked: false,
        createdAt: new Date()
      });

      const savedClient = await createdClient.save();

      return {
        companyName: savedClient.companyName,
        email: savedClient.email,
        password: savedClient.password
      } as Client;
    } else {
      throw new Error('incorrect OTP');
    }
  }





  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      return null
    } else {

      return {
        _id: client._id,
        companyName: client.companyName,
        email: client.email,
        password: client.password,
      } as Client;
    };

  }





  async findClientByEmailAndPassword(email: string, password: string): Promise<Client | any> {

    if (!email || !password) {
      throw new Error('Email, and password are required');
    }


    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }

    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      throw new Error('client not Found');
    }

    if(client.isBlocked) {
      throw new Error('Client not Authenticated');
    }

    if (!client.password) {
      throw new Error('Password is wrong');
    } 

    const isValidPassword = await bcrypt.compare(password, client.password as string);

    if (!isValidPassword) {
      throw new Error('wrong password')
    }; 

    const CLIENT_ACCESS_TOKEN: any = process.env.CLIENT_ACCESS_TOKEN;
         const CLIENT_REFRESH_TOKEN: any = process.env.CLIENT_REFRESH_TOKEN;
    
         const refreshToken = jwt.sign({id: client._id, email: client.email},CLIENT_REFRESH_TOKEN, {expiresIn: "7d"});
         const accessToken = jwt.sign({id: client._id, email: client.email},CLIENT_ACCESS_TOKEN, {expiresIn: "15m"});
              
         client.refreshToken = refreshToken;
         await client.save();

     return { client:{ client }, accessToken, refreshToken };
        };




  async findClientByOnlyEmail(email: string, name: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) {
      return {
        companyName: client.companyName,
        email: client.email
      } as Client;
    } else {

      const createdClient = new ClientModel({
        name: name,
        email: email
      });

      const savedClient = await createdClient.save();

      return {
        companyName: savedClient.companyName,
        email: savedClient.email
      } as Client;
    }
  }




  async findAllUsers(): Promise<User | any> {
    const users: any = await UserModel.find().exec();
    if (users) {
      
      return {
        ...users
      } as User;
    }
  }





  async resetPassword(clientId: string, password: string): Promise<User | any> {
    const pass = { password: password }

    const updatedClient = await ClientModel.findByIdAndUpdate(clientId, pass, { new: true }).exec();

    if (!updatedClient) {
      throw new Error("Client not found or password update failed.");
    }

    return "Password reset successfully!";

  }





  async getClientProfile(clientId: string): Promise<any> {
    const client = await ClientModel.findById(clientId);

    if (!client) {
      throw new Error('Client not found')
    }

    return client;
  }

 



  async profileVerification(clientId: any, data: any): Promise<any> {
 
    const adminId = process.env.ADMIN_OBJECT_ID;   
    const existingClient: any = await ClientModel.findById(clientId);

 
    if(existingClient.isEditRequest) {
      throw new Error('Request already sended');
    }

      const request = {
        type: 'Profile Verification Request',
        clientId: clientId,
        status: 'pending',
        data: data
      }
  
      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $push: { request: request } },
        { new: true }
      ); 
      
      const editclientRequest = await ClientModel.findByIdAndUpdate(clientId,
        {isEditRequest : true },
        { update : true }
      );

      return updatedAdmin;
  }





  async editClientProfile(clientId: string, editData: any): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;   
    const existingClient: any = await ClientModel.findById(clientId);
     
    if(existingClient.isEditRequest) {
      throw new Error('Request already sended');
    }
 
      const request = {
        type: 'Profile Updation Request',
        clientId: clientId,
        status: 'pending',
        data: editData
      }
 
      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $push: { request: request } },
        { new: true }
      ); 
      
      const editclientRequest = await ClientModel.findByIdAndUpdate(clientId,
        {isEditRequest : true },
        { update : true }
      );

      return updatedAdmin;
  }






  async createJobPost(clientId: string, data: any): Promise<any> {
    // const data = JSON.parse(jobPost);
 
   try{
 
 

    const client: any = await ClientModel.findById(clientId);
             
    if(data.paymentType === 'hourly') { 
        // const minWorkingHours: number = data.estimateTime * 8;
        // const finalDate: number = (data.estimateTime * 24 ) - minWorkingHours;
          
       
        const parsedEstimatedTimeInHours = parseInt(data.estimateTime)

        const totalAmount = data.estimateTime * data.payment;

        data.amount = totalAmount; //updatig the total amount 
      
      

        //ADD REST OF THE FIELDS
        const createdJobPost = new JobPostModel({
          title: data.title,
          description: data.description,
          keyResponsiblities: data.keyResponsiblities,
          requiredSkills: data.requiredSkills,
          paymentType: data.paymentType,
          estimateTime: new Date(),
          estimateTimeinHours: parsedEstimatedTimeInHours,
          amount: data.payment,
          expertLevel: data.expertLevel,
          location: data.location,
          projectType: data.projectType,
          totalProposals: 0,
          proposalCount: 0,
          aboutClient: {
            companyName: client.companyName,
            location: client.location,
            totalSpend: client.totalSpend,
            totalHours: client.totalHours,
            domain: client.domain,
            numberOfEmployees: client.numberOfEmployees,
            joined: client.createdAt
          },
          status: "pending",
          isPayment: true,
          createdAt: new Date(),
          clientId: clientId
        });

        const savedJobPost = await createdJobPost.save(); 
    

        return { savedJobPost };  
      } else {
        return ; 
      }
   }catch(err: any) {
    console.log('ERROR: ',err.message)
   }
  }




  async getAllNotifications(clientId: any): Promise<any> {
    const notifications = await NotificationModel.find({ $or: [{ sender_id: clientId }, { reciever_id: clientId }] })

    if (!notifications) {
      throw new Error('No notification found')
    } else {
      return notifications;
    }
  }






  async findAllJobs(): Promise< any> {
    const allJobs = await JobPostModel.find().exec();
 
    if(!allJobs) {
      throw new Error('No job found');
    } else {
      return allJobs;
    }
  }

  




  async getUserProfile(userId: string): Promise< any> {
    const userProfile = await UserModel.findById(userId).exec();

    
    if(!userProfile) {
      throw new Error('User not found');
    } else {
      return userProfile;
    }
  }





  async getProposals(clientId: string): Promise< any > {
          const client: any = await ClientModel.findById(clientId);
          if(!client) {
            throw new Error('Client not found');
          }

          const proposals = client.proposals;
          return proposals;
  }





  async addMoneyToAdminWallet(role: string, roleId: any, amount: number): Promise< any > { 
    const adminId = process.env.ADMIN_OBJECT_ID;
          const admin: any = await AdminModel.findById(adminId);
         
          if(!admin) throw new Error('Unknown Error Occured'); 
          const walletEntry = {
            type: 'credit',
            amount: amount,
            from: role,
            fromId: roleId,
            date: new Date()
          };
 
          const updateAdminWallet = await AdminModel.findByIdAndUpdate(adminId, {
              $inc: {"wallet.balance": amount},
              $push: {"wallet.transactions": walletEntry}
            }, {
              new: true, upsert: false
            }).exec();

            if (!updateAdminWallet) {
              console.error('Update failed. Admin Wallet was not updated.');
              throw new Error('Admin wallet update failed.');
            }
          return 'success';
      }




  async getMyJobs(clientId: string): Promise< any > {
    const jobs: any = await JobPostModel.find({ clientId: clientId}); 
    if(!jobs) {
      throw new Error('No job found');
    }
 
    return jobs;
}





  async latestJobs(): Promise< any > {
 
    const jobs: any = await JobPostModel.find().sort({date: 'desc'}); 
    if(!jobs) {
      throw new Error('No job found');
    }
    return jobs;
}





  async createContract(clientId: string, userId: string, jobPostId: string): Promise< any > {
  

    // updating job post status 
    const currentJobPost: any = await JobPostModel.findByIdAndUpdate(jobPostId, {
      status: 'on progress'
    }, {
      update: true
    }).exec();
 
    
   // reomove all the proposals for this jobpost
   const client = await ClientModel.findByIdAndUpdate(
    clientId,  
    {
      $pull: {
        proposals: { jobPostId: jobPostId }
      }
    },
    {
      new: true  
    }
  );
 

   // send notification to rejectd and accepted user
  //  const notification = new NotificationModel({

  //  })

   
    const deduction = currentJobPost.amount % 10;

     const newContract = new ContractModel({
       userId: userId,
       clientId: clientId, 
       jobPostData: currentJobPost,
       amount: currentJobPost.amount,
       deduction: deduction,
       created: new Date(),
       deadline: currentJobPost.estimateTime,
       active: true,
       status: 'on progress'
     } );

     const savedContract = await newContract.save();
 
     const timer = currentJobPost.estimateTimeinHours;
     const contractId: any = savedContract._id;
 
   await allCronJobs.startContractHelperFn(timer, jobPostId, userId, contractId);
 
     return savedContract;
 
    
  }

}