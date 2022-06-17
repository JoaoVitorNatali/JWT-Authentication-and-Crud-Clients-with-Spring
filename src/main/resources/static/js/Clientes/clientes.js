$(document).ready(function(){
    listarClientes();
})

$("#btnConcluir").click(function(){
    cadastrarAlterarCliente();
});

$("#btnAdicionarCliente").click(function(){
    limparCamposFormulario();
    alterarModal("criar");
})

$(document).on("click", '.btnEditarCliente', function(){
    limparCamposFormulario();
    alterarModal("editar");
})

$(document).on("click", ".btnExcluirCliente", function(){
    $("#codigoCliente").val($(this).data('codigo'))
    $("#nomeCliente").empty().append($(this).data('nome'))
    console.log($(this).data('nome'))
})

$("#btnConcluirExcluir").click(function(){
    excluirCliente();
})

$("#btnPesquisar").click(function(){
    listarClientes();
})

function excluirCliente(){
    const codigoCliente = $("#codigoCliente").val();

    ApiCliente.delete(codigoCliente)
    .then(
        response => {
            console.log(response);
            $("#btnCancelarExcluir").click();
            listarClientes();
        }
    )
}

function cadastrarAlterarCliente(){
    limparErrosFormulario();

    const nome = $("#nome").val();
    const email = $("#email").val();
    const telefone = $("#telefone").val();
    const cpf = $("#cpf").val();

    const params = {
        nome, email, telefone, cpf
    };

    const tipo = getTipoModal();

    let request;

    if(tipo === "criar") request = cadastrarCliente;
    else request = alterarCliente;

    request(params)
    .then(
        response => {
            $("#btnCancelar").click();
            listarClientes();
        },
        error => {
            const errors = error.responseJSON.errors;
            Object.keys(errors).forEach(erro => {
                $(`#${erro}`).addClass("is-invalid");
                $(`#${erro}`).after(`<div class="invalid-feedback">${errors[erro]}</div>`);
            });
        }
    )
}

function cadastrarCliente(params){
    return ApiCliente.post(JSON.stringify(params))
}

function alterarCliente(params){
    const codigoCliente = $("#id").val();
    return ApiCliente.patch(codigoCliente,JSON.stringify(params))
}

function mostrarCliente(codigoCliente){
    limparCamposFormulario();

    ApiCliente.getById(codigoCliente)
    .then(
        response => {
            Object.keys(response).forEach(campo => {
                $(`#${campo}`).val(response[campo])
            })
        }
    )

}

function listarClientes(){
    $("#lista_clientes").empty();
    $("#loader_clientes").removeClass('d-none');

    const nome = $("#nome_filtro").val();
    const email = $("#email_filtro").val();
    const cpf = $("#cpf_filtro").val();


    const params = {};

    if(nome !== '') params['nome'] = nome;
    if(email !== '') params['email'] = email;
    if(cpf !== '') params['cpf'] = cpf;

    ApiCliente.get(params)
    .then(
        response => {
            $("#loader_clientes").addClass('d-none');
            response.forEach(cliente => {
                $("#lista_clientes").append(`
                    <tr>
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefone}</td>
                        <td>${cliente.cpf}</td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-sm btn-secondary btnEditarCliente"
                                    type="button" data-toggle="modal" data-target="#modalCliente"
                                    onClick="mostrarCliente(${cliente.id})"
                                >
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary btnExcluirCliente"
                                    type="button" data-toggle="modal" data-target="#modalExcluirCliente"
                                    data-codigo="${cliente.id}"
                                    data-nome="${cliente.nome}"
                                >
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `);
            })
        },
        error => {
            $("#loader_clientes").addClass('d-none');
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

function limparCamposFormulario(){
    $(".form-control").each(function(){
        $(this).val('');
    })
}

function alterarModal(tipo){
    $("#tipoFormCliente").val(tipo);
}

function getTipoModal(){
    return $("#tipoFormCliente").val();
}