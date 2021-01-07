module.exports = {
age: function (timestamp){
    let today = new Date()
    let birthDate = new Date(timestamp) 

    let age = today.getFullYear() - birthDate.getFullYear()

    var month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){ 
        age = age -1 
    }
    return age
},
date: function(timestamp){
    var date = new Date(timestamp)
    var year = date.getUTCFullYear() 
    var month = `0${date.getUTCMonth() + 1}`.slice(-2)
    var day = `0${date.getUTCDate()}`.slice(-2)
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birth_day: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
}
}