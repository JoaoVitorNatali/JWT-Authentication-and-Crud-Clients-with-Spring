const ApiUsuario = {
    create: function(data){
        return $.ajax({
            method: 'post',
            url: '/api/usuario/criar',
            data: JSON.stringify(data),
            contentType: "application/json",
        })
    },
    login: function(data){
        return $.ajax({
            method: 'post',
            url: '/login',
            data: JSON.stringify(data),
            contentType: "application/json",
        })
    }
}