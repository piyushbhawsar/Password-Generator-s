const numbers = [] ;for (let i=0 ; i<10 ; i++) numbers.push(i) 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'

const lowercase = Array.from(Array(26)).map( (val,ind,arr) => {
    return String.fromCharCode(ind+97) 
})

const uppercase = lowercase.map( (el,i,arr) => {
    return el.toUpperCase()
})

const generatePassword = (len , hasNum , hasUpper , hasLower , hasSym) => {
    const allAvailableChars = [
        ...(hasNum ? numbers : []) , 
        ...(hasUpper ? uppercase : []) , 
        ...(hasLower ? lowercase : []) ,
        ...(hasSym ? symbols : [])
    ]
    // console.log(allAvailableChars)
    // console.log(allAvailableChars.length)
    let password = ""
    if (!len) return ""
    for (let i=0 ; i<len ; i++) {
        let randInt = Math.floor(Math.random()*allAvailableChars.length ) //0 to len-1
        password += allAvailableChars[randInt] 
    }
    return password
}
console.log(`
    yelo password 
    tumhara
    ${generatePassword(5,1,0,0,0)}
`)

