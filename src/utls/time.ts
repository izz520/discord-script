import dayjs from "dayjs";

export const nextTime = (second:number)=>{
  return dayjs().add(second,'second').format("YYYY-MM-DD HH:mm:ss");
}
