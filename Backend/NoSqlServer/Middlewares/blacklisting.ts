import log  from '../logs';
// import {createClient} from 'redis'
require('dotenv').config()
import Redis from 'ioredis'


const client =new  Redis({
  username:"default",
 password:"WPLTaFd5aCdPzBZCFFy6YAgrMJVSXke2",
  host: 'redis-12070.c301.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12070,
})

const  BlacklistToken = async (token : string , expiresIn : number):Promise<void>=>{
    log.info(`${token+"-"+expiresIn}`)
    try {
        await client.set(token, "Blacklisted", 'EX', expiresIn);
    } catch (error) {
        log.error(`Error blacklisting token: ${error.message}`);
    }
}



const  isBlacklisted = async (token : string ):Promise<Boolean>=>{
    try {
        const reply = await client.get(token);

        return reply === "blacklisted"
    } catch (error) {
        log.error(`Error blacklisting token: ${error.message}`);
    }
}

export {BlacklistToken,isBlacklisted}

