import chalk  from  'chalk'

type IMessageColor = "blue"|"green"|"red"|"yellow"

const message = (message:string,color:IMessageColor = "blue")=>{
  return console.log(chalk[color](message));
}

export default message