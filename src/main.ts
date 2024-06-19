require('dotenv').config()
import sleep  from  './utls/sleep'
import axios  from  'axios-https-proxy-fix'
import message from './utls/message'
import { nextTime } from './utls/time'


const discordAuth = process.env.DISCORD_AUTH
const discordChannelId = process.env.DISCORD_CHANNEL_ID
const artelAddress = process.env.ARTELA_ADDRESS
const barkKey = process.env.BARK_KEY

const defaultTime = 6*60*60 // 6 hours

let sleepTime =defaultTime 
const main =async ()=>{
  message("🔥 Start Run Script")
  await sleep(2)
  message("💦 Start Run Artela Network Faucet")
  await sleep(2)
  sendMessage() 
}

const sendMessage = async()=>{
  const url = `https://discordapp.com/api/v6/channels/${discordChannelId}/messages`
  const messageInfo  = {
    "content": `$request ${artelAddress}`,
    "tts": "false",
  }
  message(`🚀 Send Message: ${messageInfo.content}`)
  try{
    const res =  await axios.post(url,messageInfo, {
      headers: {
        "content-type": "application/json",
        "authorization": discordAuth
    }
    })
    message(`👍 Faucet Token Success`,"green")
    await sleep(2)
    const time = defaultTime + 60
    const nextRunTime =  nextTime(time)
    sleepTime =  time
    message(`😴 Next Run Start Is ${nextRunTime}`,"yellow")
    axios.get(`https://api.day.app/${barkKey}/${"Artela Faucet Success"}`)
  } catch(err:any){
    // console.log(err.response.data.message);
    const errorInfo = err?.response?.data
    message(`💣 Runing Error Because ${errorInfo?.message || err}`,"red")
    if(errorInfo.code === 20016){
      message(`🤨 Current Now Feucet Is Cooling.`,"yellow")
      await sleep(2)
      // rate limit
      sleepTime = Math.floor(errorInfo.retry_after/1000) + 60
      const nextRunTime =  nextTime(sleepTime)
      message(`😴 Update Run Start Time To ${nextRunTime}`,"yellow")
      await sleep(sleepTime)
      sendMessage()
    }
  } 
}

main()