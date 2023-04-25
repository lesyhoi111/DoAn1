export const isValidEmail=(stringEmail)=>{return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))||stringEmail.length==0}
export const isValidPass=(stringPassword)=>{return stringPassword.length>=3||stringPassword.length==0}
export const isValidRePass=(stringPassword,stringRePassword)=>{return stringPassword==stringRePassword}