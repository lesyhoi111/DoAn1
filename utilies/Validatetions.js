export const isValidEmail=(stringEmail)=>{return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))||stringEmail.length==0}
export const isValidPass=(stringPassword)=>{return stringPassword.length>=6||stringPassword.length==0}
export const isValidRePass=(stringPassword,stringRePassword)=>{return stringPassword==stringRePassword}
export const isValidName=(stringName)=>{return stringName.length>0}