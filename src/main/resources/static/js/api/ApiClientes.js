const ApiCliente = {
    post: function(data){
        return $.ajax({
            method: 'post',
            url: '/api/clientes',
            data: data,
            contentType: "application/json",
        })
    },
    get: function(params = {}){
        return $.ajax({
            url: '/api/clientes',
            data: params
        })
    },
    getById: function(id){
        return $.ajax({
            url: `/api/clientes/${id}`,
        })
    },
    patch: function(codigo, data){
        return $.ajax({
            method: 'put',
            url: `/api/clientes/${codigo}`,
            data: data,
            contentType: "application/json",
        })
    },
    delete: function(codigo){
        return $.ajax({
            method: 'delete',
            url: `/api/clientes/${codigo}`,
        })
    }
}