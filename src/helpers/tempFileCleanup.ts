import { deleteAllTemps } from "../db/imgur";
import cron from 'node-cron';

const fileCleanCron = () => {
    cron.schedule("0 3 * * *", () => {

        task();

    });



    task();


};


    const task=async()=>{

    try{

    const result = await deleteAllTemps();
    if(result&& result.acknowledged){
        console.log("Executed DB file clean up "+result.deletedCount)
    }else{

        console.log("Something wrong with DB acknowledgedment of cron job "+result)

    }


    }catch(error){
        console.log("Something happened with DB clean up jod: "+error)
    }

    }

export default fileCleanCron;