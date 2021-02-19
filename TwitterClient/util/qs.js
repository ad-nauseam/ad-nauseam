module.exports = (params) => {
        if(typeof params !== 'object') return;
        let query = ''
        for (const i in params) {
            if(params[i] == undefined) continue
            query += `${i}=${params[i] == '' ? true : params[i]}&`
        }
        query = query.slice(0, -1)
        return query
    }