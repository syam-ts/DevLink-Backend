import cron from 'node-cron';
import { ContractModel } from '../../domain/entities/Contract';
import { UserModel } from '../../domain/entities/User';

type Id = string;

const sendingContractFinishRequest = async (jobPostId: Id, userId: Id, contractId: Id) => {
     const currentContract = await ContractModel.findById(contractId).exec();

     if(!currentContract?.active) {
        console.log('Contract alredy finished!');
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


export const startContractHelperFn = async (timer: any, jobPostId: Id, userId: Id, contractId: Id) => {
   console.log('THE TIMER : ', timer)

 
   const schedule: string = `*/${timer} * * * * *`;  // This will run every second

      // const schedule: string = `0 */${timer} * * *`; 

     cron.schedule(schedule, () => { 
        sendingContractFinishRequest(jobPostId, userId, contractId);
    }) 
    console.log(`Cron job scheduled with timer: ${timer} hours(s).`);
}
 