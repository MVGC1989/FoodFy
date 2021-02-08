module.exports = {
age: function (timestamp){
    let today = new Date()
    let birthDate = new Date(timestamp) 

    let age = today.getFullYear() - birthDate.getFullYear()

    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){ 
        age = age -1 
    }
    return age
},

date: function(timestamp){
    const date = new Date(timestamp)
    const year = date.getFullYear() 
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
            birth_day: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
},

emailTemplate(content) {
return `
<body style="margin:0;padding:0;font-family: helvetica;color:#444;">
    <table width="100%" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <tr>
            <td style="padding:20px 0;" bgcolor="#111" align="center">
                <img
                    style="display:block;"
                    alt="Logo Foodfy"
                    src="/images/logoadmin.png"
                />
            </td>
        </tr>
        <tr>
            <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding:30px 0;">
                            ${content}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
                
        <tr>
            <td style="padding:15px 10px 15px 10px;" bgcolor="#eee">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="480" style="color:#999;" align="center">Todos direitos reservados. Receitas Foodfy &copy; </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
        `
},

checkAllFields(body) {
    const keys = Object.keys(body);

    for (let key of keys) {
        if (body[key] == '' & key != 'removed_files') {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos!'
            };
        }
    }
}
}