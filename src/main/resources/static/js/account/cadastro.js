function cadastro(event){
    event.preventDefault();
    limparErrosFormulario();
    if(validaFormulario()) return;

    const email = $("#email").val();
    const nome = $("#nome").val();
    const password = $("#password").val();

    ApiUsuario.create({email, nome, password})
    .then(
        response => {
            requisitarLogin(email, password);
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