let oldStr = "12345678912345678912345678912345678912345678";
//oldStr 是原始字符串，newStr 是要替换的字符串，startIndex 是要替换的字符串的起始位置，fontStyle 是替换字符串的样式
const replaceStrTool = (oldStr: string, newStr: string, startIndex: number,fontStyle:string) => {
    let res =oldStr.split('').map((strPart,index)=>index === startIndex? `<${fontStyle}>${newStr}</${fontStyle}>` : strPart)
    res.splice(startIndex+1,newStr.length-1)
    return res.join('');
}
// console.log(replaceStrTool(oldStr, 'haha', 5,'span'))
let originalhtml = '111111111111111111111111<b>12345678912345678</b>11111111111111111111111'
let res = originalhtml.split('').map((value, index) => {})
const clearStrTool =(originalhtml:string)=> {
}
// let res 
// =oldStr.split('').map((value, index) => 
// //     {
// //     if (index === 5) {
// //         return value+'hahahahahahaha'
// //     }else{
// //         return value
// //     }
// // }
// )

