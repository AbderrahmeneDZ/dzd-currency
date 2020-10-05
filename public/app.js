fetch('/bank-of-algeria').then(async (response) => {
    if (response.status === 200) {
        const data = await response.json()
        updateTable('ACB', data)
    }
})

fetch('/cpa').then(async (response) => {
    if (response.status === 200) {
        const data = await response.json()
        updateTable('CPA', data)
    }
})


const updateTable = (table, data) => {
    Object.keys(data['DZD']).forEach(key => {
        console.log(key)
        document.getElementById(`${table}-${key}-SELL`).innerHTML = data['DZD'][key]['SELL'].toFixed(4)
        document.getElementById(`${table}-${key}-BUY`).innerHTML = data['DZD'][key]['BUY'].toFixed(4)
    })
}