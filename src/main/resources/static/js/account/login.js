function login(event){
    event.preventDefault();
    limparErrosFormulario();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if(validaFormulario()) return;

    requisitarLogin(email, password);
}

function requisitarLogin(email, password){
    ApiUsuario.login({email, password})
    .then(
        response => {
            localStorage.setItem("token", response);
            window.location.href = "/clientes";
        },
        error => {
            $("#status").empty().append("<div class='invalid-feedback'>Usuario ou senha inválidos</div>");
        }
    )
}

function limparErrosFormulario(){
    $(".invalid-feedback").each(function(){
        $(this).remove();
    })
    $(".is-invalid").each(function(){
        $(this).removeClass("is-invalid");
    })
}

function validaFormulario(){
    let hasError = false;
    $(".form-control").each(function(){
        if($(this).prop('required') && $(this).val() == ''){
            hasError = true;
            $(this).addClass('is-invalid')
            const name = $(this).attr('name')
            if(name){
                $(this).after(`
                    <div class="invalid-feedback">O campo ${name} é obrigatório</div>
                `)
            }
        }
    })
    return hasError;
}