import cron from 'node-cron';
import { ContractDocument, ContractModel } from '../../domain/entities/Contract';
import { UserModel } from '../../domain/entities/User';
import { JobPostModel } from '../../domain/entities/JobPost';

type Id = string;

const sendingContractFinishRequest = async (jobPostId: Id, userId: Id, contractId: Id) => {
     const currentContract = await ContractModel.findById(contractId).lean<ContractDocument>().exec();
     const updateJobPost = await JobPostModel.findByIdAndUpdate(jobPostId, {
      status: 'finished'
     }, {
      update: true
     });
     if(!currentContract) throw new Error('Contract not exists');
     console.log('updateJobPost: ',updateJobPost);
     

     if(currentContract.status === 'closed') { 
     } else {
         const request = {
            type: 'What about the job progress ?',
            contractInfo : currentContract,
            date: new Date()
         };

         const sendRequest = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { request: request}},
            {new: true}
         );
     
         console.log('Finish sending request to user', sendRequest);
     }
} 


export const startContractHelperFn = async (timer: string, jobPostId: Id, userId: Id, contractId: Id) => {
  
   const schedule: string = `*/${timer} * * * * *`;  // This will run every second
 // const schedule: string = `0 */${timer} * * *`; // hour timer

     cron.schedule(schedule, () => { 
        sendingContractFinishRequest(jobPostId, userId, contractId);
    }) 
    console.log(`Cron job scheduled with timer: ${timer} hours(s).`);
}
 