import { CronJob } from 'cron';


export const startContract = new CronJob('*/1 * * * *',  
    function() { 
        console.log('Running cronjob in every 1 minute!');
    },
    null,
    true
 )

 