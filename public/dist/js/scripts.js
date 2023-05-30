$("#cadastrarAvaliacao").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlCadastrarAvaliacao").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=cadastrarAvaliacao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce('Erro: '+vet[1]);
            }
            else if (vet[0] == 1) {
                alertBHCommerce('Avaliação do site gravada com sucesso! Ela será analisada por nossa equipe e caso aprovada começará a aparecer no site!');
                $('#nomeAvaliacao').val(vet[1]);
                $('#emailAvaliacao').val(vet[2]);
                $('#comentarioAvaliacao').val('');
                $('#avaliacaoAvaliacao').val('0');
                var html = "";
                for (i = 1; i <= 5; i++){
                    html += "<img src='"+url+"img/starApagada.png' width='18' title='Nota "+i+"' style='cursor:pointer' onclick=selecionaAvaliacaoSite('"+i+"','"+url+"')> ";
                }
                $('#estrelasAvaliacao').html(html);
                fecha('avaliacao');
            }
        },
    });
    return false;
});
$("#edicaoAvaliacao").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlCadastrarAvaliacao").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=edicaoAvaliacao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce('Erro: '+vet[1]);
            }
            else if (vet[0] == 1) {
                alertBHCommerce('Solicitão de alteração de avaliação gravada com sucesso! Aguarde até que seja lida e aprovada! Você será informado por email quando isso acontecer!');
                $('#avaliacaoEdicao').val(vet[1]);
                $('#comentarioEdicao').val('');
                $('#avaliacaoAEdicao').val('0');
                $('#idEdicao').val("");
                var html = "";
                for (i = 1; i <= 5; i++){
                    html += "<img src='"+url+"img/starApagada.png' width='18' title='Nota "+i+"' style='cursor:pointer' onclick=selecionaAvaliacaoSite('"+i+"','"+url+"')> ";
                }
                $('#estrelasEdicao').html(html);
            }
            fecha('editarAvaliacao');
        },
    });
    return false;
});
function selecionaAvaliacaoSite(avaliacao, url){
    var html = "";
    for(i = 1; i <= avaliacao; i++){
        html += "<img src='"+url+"img/star.png' width='18' title='Nota "+i+"' style='cursor:pointer' onclick=selecionaAvaliacaoSite('"+i+"','"+url+"')> ";
    }
    if (avaliacao < 5){
        for (j = i; j <= 5; j++){
            html += "<img src='"+url+"img/starApagada.png' width='18' title='Nota "+j+"' style='cursor:pointer' onclick=selecionaAvaliacaoSite('"+j+"','"+url+"')> ";
        }
    }
    $('#estrelasAvaliacao').html(html);
    $('#avaliacaoAvaliacao').val(avaliacao);
}
function excluirAvaliacao(id, url){
    if (confirm('Tem certeza que  deseja excluir essa avaliação?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirAvaliacao&id='+id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Avaliação excluída com sucesso!');
                } else if (data[0] == 0) {
                    alertBHCommerce(data[1]);
                }
                $('#avaliacoesSite').html('<img src="'+url+'img/loader.gif" width="18"> Aguarde... Carregando...');
                visualizaAvaliacoes(url);
            },
            beforeSend: function () {
                $('#avaliacoesSite').html('<img src="'+url+'img/loader.gif" width="18"> Aguarde... Carregando...');
            }
        });
    }
}
function visualizaAvaliacoes(url){
    $.ajax({
        url: url+'ajax.php?&acao=visualizarAvaliacao',
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $('#avaliacoesSite').html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce(data[1]);
            }
        },
        beforeSend: function () {
            $('#avaliacoesSite').html('<img src="'+url+'img/loader.gif" width="18"> Aguarde... Carregando...');
        }
    });
}
function editarAvaliacao(id, url){
    abre('editarAvaliacao');  
    $.ajax({
        url: url+'ajax.php?&acao=editarAvaliacao&id='+id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $('#avaliacaoEdicao').val(data[1]);
                $('#comentarioEdicao').val(data[2]);
                $('#idEdicao').val(data[3]);
                $('#botaoEditarSolicitacao').show('slow');
                editAvaliacaoEditar(data[1],url);
            } else if (data[0] == 0) {
                alertBHCommerce(data[1]);
            }
        },
        beforeSend: function () {
        }
    });  
    $("#comentarioEdicao").focus();
}
function editAvaliacaoEditar(num, url){
    var html = "";
    for(i = 1; i <= num; i++){
        html += "<img src='"+url+"img/star.png' width='18' style='cursor:pointer' onclick=editAvaliacaoEditar('"+i+"','"+url+"')> ";
    }
    if (num < 5){
        for (j = i; j <= 5; j++){
            html += "<img src='"+url+"img/starApagada.png' width='18' style='cursor:pointer' onclick=editAvaliacaoEditar('"+j+"','"+url+"')> ";
        }
    }
    $("#avaliacaoEditarCampo").html(html);
    $("#avaliacaoEdicao").val(num);
}
function edicaoAvaliacao(id, url){
    if ($("#avaliacaoEdicao"+id).val() == ''){
        alertBHCommerce('Por favor, informe a avaliação corretamente!');
        $("#avaliacaoEdicao"+id).focus();
    }
    else if ($("#comentarioEdicao"+id).val() == ""){
        alertBHCommerce('Por favor, informe o comentário corretamente!');
        $("#comentarioEdicao"+id).focus();
    }
    else if ($("#idEdicao"+id).val() == ''){
        alertBHCommerce('Por favor, informe o id corretamente!');
        $("#idEdicao"+id).focus();
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=edicaoAvaliacao&id='+$("#idEdicao"+id).val()+"&avaliacao="+$("#avaliacaoEdicao"+id).val()+"&comentario="+$("#comentarioEdicao"+id).val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Solicitação de comentário enviada com sucesso! Ela será lida e em breve publicada aqui em nosso site!');
                    fecha('editarAvaliacao'+id);
                    $('#avaliacaoEdicao'+id).val(data[1]);
                    $('#comentarioEdicao'+id).val(data[2]);
                    editarAvaliacaoEditar(data[1], id, url)
                } else if (data[0] == 0) {
                    alertBHCommerce(data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function confirmLimparCarrinho(url, idUser){
    if (confirm('Tem certeza que deseja limpar todos os produtos do carrinho?')){
        $.ajax({
            url: url+'ajax.php?&acao=limparCarrinhoAdmin',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Produtos limpos do carrinho com sucesso! Aguarde o refresh da página!');
                    location.href="";
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                //$("#visualizacaoCarrinho").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
$("#edicaoLogo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=logo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Logo editada com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoFavicon").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=favicon',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Favicon editada com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemGeral").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemFundoGeral',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemLogin").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemFundoLogin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemEsqueceuSuaSenha").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemEsqueceuSuaSenha',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemAlterarSenha").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemAlterarSenha',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemCadastro").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemCadastro',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#formCadastro").submit(function(evt){
    evt.preventDefault();
    var url = $('#urlCadastro').val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=formCadastro',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                $(".messageBoxSuccess").addClass('d-none');
                $(".messageBox").removeClass('d-none').html(vet[1]);
            } else if (vet[0] == 1) {
                $(".messageBox").addClass('d-none');
                $(".messageBoxSuccess").removeClass('d-none').html('Cadastro efetuado com sucesso! Aguarde o nosso email informando que o cadastro está ok!!');
                $("#nome").val('');
                $("#email").val('');
                $("#password").val('');
                $("#password2").val('');
            }
        },
    });
    return false;
});
$("#formLogin").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: 'ajax.php?acao=formLogin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alert(vet[1]);
            } else if (vet[0] == 1) {
                $(".messageBox").addClass('d-none');
                $(".messageBoxSuccess").removeClass('d-none').html('Login efetuado com sucesso! Aguarde o refresh da página!');
                if ($("#urlVolta").val() == "" || $("#urlVolta").val() == undefined){
                    $("#urlVolta").val('principal');
                }
                location.href = $("#urlVolta").val();
            }
        },
    });
    return false;
});
$("#formAlterarSenha").submit(function(evt){
    evt.preventDefault();
    var url = $('#urlAlterarSenha').val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=formAlterarSenha',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alert(vet[1]);
            } else if (vet[0] == 1) {
                alert('Senha alterada com sucesso! Você será redirecionado para a página de login.');
                location.href=url+"login?pagina=";
            }
        },
    });
    return false;
});
$("#formEsqueceuSuaSenha").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: 'ajax.php?acao=formEsqueceuSuaSenha',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alert(vet[1]);
            } else if (vet[0] == 1) {
                alert('Email enviado com sucesso! Confira seu email! Você será redirecionado para a página de login.');
                location.href="login?pagina=";
            }
        },
    });
    return false;
});
$("#formEstoque").submit(function(evt){
    if ($("#id").val() == "") {
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=cadastrarEstoque',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Estoque cadastrado com sucesso!');
                    listarEstoque($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    for (i = 1; i <= 10; i++) {
                        $("#attribute"+i).val('0');
                    }
                    $("#code").val('');
                    $("#name").val('');
                    $("#value").val('');
                    $("#promotion").val('');
                    $("#validity_promotion").val('');
                    $("#estoque").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
    else{
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=editarEstoque',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Estoque atualizado com sucesso!');
                    listarEstoque($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    for (i = 1; i <= 10; i++) {
                        $("#attribute" + i).val('0');
                    }
                    $("#code").val('');
                    $("#name").val('');
                    $("#value").val('');
                    $("#promotion").val('');
                    $("#validity_promotion").val('');
                    $("#estoque").val('');
                    $("#peso").val('');
                    $("#altura").val('');
                    $("#largura").val('');
                    $("#comprimento").val('');
                    $("#diametro").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
});
$("#formImagens").submit(function(evt){
    if ($("#id").val() == "") {
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=cadastrarImagem',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Imagem cadastrada com sucesso!');
                    listarImagens($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    $("#item").val('');
                    $("#name").val('');
                    $("#imagem").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
    else{
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=editarImagem',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Imagem atualizada com sucesso!');
                    listarImagens($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    $("#item").val('');
                    $("#name").val('');
                    $("#imagem").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
});
$("#formVideos").submit(function(evt){
    if ($("#id").val() == "") {
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=cadastrarVideo',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Vídeo cadastrado com sucesso!');
                    listarVideos($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    $("#v").val('');
                    $("#name").val('');
                    $("#imagem").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
    else{
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'ajax.php?acao=editarVideos',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Vídeo atualizada com sucesso!');
                    listarVideos($('#product').val(), $("#url").val(), $("#idUserEdicao").val());
                    $("#id").val('');
                    $("#v").val('');
                    $("#name").val('');
                    $("#imagem").val('');
                    $("#status").val('0');
                }
            },
        });
        return false;
    }
});
$("#edicaoNewsletter").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=newsletter',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cadastro na newsletter editado com sucesso!');
                verificaNovamente('newsletter', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemFundo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemFundo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoImagemBusca").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=imagemBusca',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                location.href="";
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoBugTracking").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=bugTracking',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Bug Tracking editado com sucesso!');
                verificaNovamente('bugTracking', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoAnuncie").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=anuncie',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Anuncie Aqui editado com sucesso!');
                verificaNovamente('anuncie', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setTimeout('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoFaleConosco").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=faleConosco',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Fale Conosco editado com sucesso!');
                verificaNovamente('faleConosco', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoStatusOrcamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=statusOrcamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Status de orçamento editado com sucesso!');
                verificaNovamente('statusOrcamento', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTiposDocumento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tiposDocumento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipos de documento editado com sucesso!');
                verificaNovamente('tiposDocumento', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoCliente").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=clientes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Ciente editado com sucesso!');
                verificaNovamente('clientes', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTiposProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tiposProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de produto editado com sucesso!');
                verificaNovamente('tiposProduto', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=produto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Produto editado com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val(), $("#idUserEdicao").val());
            }
        },
    });
    return false;
});
$("#edicaoComentarioProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=comentarioProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentário de produto editados com sucesso!');
                verificaNovamente('comentariosProduto', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoSolicitacaoComentario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=solicitacaoComentario',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Solicitação de Comentário editada com sucesso!');
                verificaNovamente('solicitacaoComentario', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoRelacionamentos").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=relacionamentosProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamentos editados com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoFormaPagamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=formaPagamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Forma de pagamento editada com sucesso!');
                verificaNovamente('formasPagamento', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoFormaFrete").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=formaFrete',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Forma de frete editada com sucesso!');
                verificaNovamente('formasFrete', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoPosicao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=posicao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Posição editada com sucesso!');
                verificaNovamente('posicoes', $("#urlEdicao").val(), $('#idUserEdicao').val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTempoBanner").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tempoBanner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tempo Banner editado com sucesso!');
                verificaNovamente('tempoBanner', $("#urlEdicao").val(), $('#idUserEdicao').val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTarget").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=target',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Target editado com sucesso!');
                verificaNovamente('target', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoBanner").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=banner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Banner editado com sucesso!');
                verificaNovamente('banners', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoFeriados").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=feriados',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriado editado com sucesso!');
                verificaNovamente('feriados', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoParceiros").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=parceiros',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parceiro editado com sucesso!');
                verificaNovamente('parceiros', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoNacionalidade").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=nacionalidade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Nacionalidade editada com sucesso!');
                verificaNovamente('nacionalidade', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoPais").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=pais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('País editado com sucesso!');
                verificaNovamente('pais', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoCliente").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=cliente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Clientes importados com sucesso!');
                verificaNovamente('clientes', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#arquivo').val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoClienteXml").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=clientes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Clientes importados com sucesso!');
                verificaNovamente('clientes', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $('#arquivoXml').val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoClienteJson").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=clientes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Clientes importados com sucesso!');
                verificaNovamente('clientes', $("#urlEdicaoJson").val(), $("#idUserImportarJson"));
                jQuery('#modalImportarJson').modal('hide');
                $('#arquivoJson').val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoEnderecos").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlImportarEnderecos").val()+'ajax.php?acao=importar&table=enderecos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Endereços importados com sucesso!');
                visualizaEndereco($("#idClienteImportarEnderecos").val(), $("#urlImportarEnderecos").val(), $("#idUserImportarEnderecos").val());
                jQuery('#modalImportarEnderecos').modal('hide');
                jQuery('#modalEndereco').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoEnderecosXml").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlImportarEnderecosXml").val()+'ajax.php?acao=importarXml&table=enderecos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Endereços importados com sucesso!');
                visualizaEndereco($("#idClienteImportarEnderecosXml").val(), $("#urlImportarEnderecosXml").val(), $("#idUserImportarEnderecosXml").val());
                jQuery('#modalImportarXmlEnderecos').modal('hide');
                jQuery('#modalEndereco').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoEnderecosJson").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlImportarEnderecosJson").val()+'ajax.php?acao=importarJSON&table=enderecos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Endereços importados com sucesso!');
                visualizaEndereco($("#idClienteImportarEnderecosJson").val(), $("#urlImportarEnderecosJson").val(), $("#idUserImportarEnderecosJson").val());
                jQuery('#modalImportarJsonEnderecos').modal('hide');
                jQuery('#modalEndereco').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoStatusOrcamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=statusOrcamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Status do Orçamento importado com sucesso!');
                verificaNovamente('statusOrcamento', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXmlStatusOrcamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=statusOrcamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Status do Orçamento importado com sucesso!');
                verificaNovamente('statusOrcamento', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJsonStatusOrcamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=statusOrcamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Status do Orçamento importado com sucesso!');
                verificaNovamente('statusOrcamento', $("#urlEdicao").val());
                jQuery('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoComentariosProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=comentariosProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Produto importados com sucesso!');
                verificaNovamente('comentariosProduto', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $("#arquivo").val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLComentariosProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=comentariosProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Produto importados com sucesso!');
                verificaNovamente('comentariosProduto', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $("#arquivoXml").val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONComentariosProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=comentariosProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Produto importados com sucesso!');
                verificaNovamente('comentariosProduto', $("#urlEdicao").val());
                jQuery('#modalImportarJson').modal('hide');
                $("#arquivoJson").val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSolicitacaoComentario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=solicitacaoComentario',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Solicitações de Comentários Importadas com sucesso!');
                verificaNovamente('solicitacaoComentario', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLSolicitacaoComentario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=solicitacaoComentario',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Solicitações de comentários importadas com sucesso!');
                verificaNovamente('solicitacaoComentario', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONSolicitacaoComentario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=solicitacaoComentario',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Solicitações de comentários importadas com sucesso!');
                verificaNovamente('solicitacaoComentario', $("#urlEdicao").val());
                jQuery('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoListasPresentes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=listasPresentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Listas de Presentes Importadas com sucesso!');
                verificaNovamente('listasPresentes', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLListasPresentes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=listasPresentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Listas de Presentes Importadas com sucesso!');
                verificaNovamente('listasPresentes', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONListasPresentes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=listasPresentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Listas de Presentes Importadas com sucesso!');
                verificaNovamente('listasPresentes', $("#urlEdicao").val());
                jQuery('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPresentes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaPresentes").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=presentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Presentes importados com sucesso!');
                visualizarPresentes($("#idListaImportaPresentes").val(), $("#urlImportaPresentes").val(), $("#idUserImportaPresentes").val());
                $('#modalImportarPresentes').modal('hide');
                $('#modalPresentes').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLPresentes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaPresentes").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=presentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Presentes importados com sucesso!');
                visualizarPresentes($("#idListaImportaPresentesXml").val(), $("#urlImportaPresentesXml").val(), $("#idUserImportaPresentesXml").val());
                $('#modalImportarXmlPresentes').modal('hide');
                $('#modalPresentes').modal('show');
                $('#arquivoPresenteXml').val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONPresentes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaPresentes").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=presentes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Presentes importados com sucesso!');
                visualizarPresentes($("#idListaImportaPresentesJson").val(), $("#urlImportaPresentesJson").val(), $("#idUserImportaPresentesJson").val());
                $('#modalImportarJsonPresentes').modal('hide');
                $('#modalPresentes').modal('show');
                $('#arquivoPresenteJson').val('');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoConvidados").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaConvidados").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=convidados',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Convidados importados com sucesso!');
                visualizarConvidados($("#idListaImportaConvidados").val(), $("#urlImportaConvidados").val(), $("#idUserImportaConvidados").val());
                $('#modalImportarConvidados').modal('hide');
                $('#modalConvidados').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoConvidadosXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaConvidadosXml").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=convidados',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Convidados importados com sucesso!');
                visualizarConvidados($("#idListaImportaConvidadosXml").val(), $("#urlImportaConvidadosXml").val(), $("#idUserImportaConvidadosXml").val());
                $('#modalImportarXmlConvidados').modal('hide');
                $('#modalConvidados').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoConvidadosJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportaConvidadosJson").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=convidados',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Convidados importados com sucesso!');
                visualizarConvidados($("#idListaImportaConvidadosJson").val(), $("#urlImportaConvidadosJson").val(), $("#idUserImportaConvidadosJson").val());
                $('#modalImportarJsonConvidados').modal('hide');
                $('#modalConvidados').modal('show');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoBanner").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=banners',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Banners importados com sucesso!');
                verificaNovamente('banners', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXmlBanner").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=banners',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Banners importados com sucesso!');
                verificaNovamente('banners', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJsonBanner").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=banners',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Banners importados com sucesso!');
                verificaNovamente('banners', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaginas").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=pagina',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Páginas importadas com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaginasXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportarXml").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=pagina',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Páginas importadas com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaginasJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportarJson").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=pagina',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Páginas importadas com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaginasDescricoes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=paginasDescricoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Descrições das Páginas importadas com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarDescricoes').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSubitems").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=subitems',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Subítens importados com sucesso!');
                verificaNovamente('subitem', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSubitemsXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=subitems',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Subítens importados com sucesso!');
                verificaNovamente('subitem', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSubitemsJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=subitems',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Subítens importados com sucesso!');
                verificaNovamente('subitem', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoAtributos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=atributos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Atributos importados com sucesso!');
                verificaNovamente('atributos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoAtributosXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=atributos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Atributos importados com sucesso!');
                verificaNovamente('atributos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoAtributosJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=atributos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Atributos importados com sucesso!');
                verificaNovamente('atributos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoCategorias").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=categorias',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Categprias importadas com sucesso!');
                verificaNovamente('categorias', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLCategorias").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=categorias',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Categprias importadas com sucesso!');
                verificaNovamente('categorias', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONCategorias").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=categorias',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Categprias importadas com sucesso!');
                verificaNovamente('categorias', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoMarcas").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=marcas',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Marcas importadas com sucesso!');
                verificaNovamente('marcas', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLMarcas").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=marcas',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Marcas importadas com sucesso!');
                verificaNovamente('marcas', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONMarcas").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=marcas',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Marcas importadas com sucesso!');
                verificaNovamente('marcas', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSelos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=selos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Selos importados com sucesso!');
                verificaNovamente('selos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLSelos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=selos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Selos importados com sucesso!');
                verificaNovamente('selos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONSelos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=selos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Selos importados com sucesso!');
                verificaNovamente('selos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoSugestoes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=sugestoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Sugestões importadas com sucesso!');
                verificaNovamente('sugestoes', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLSugestoes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=sugestoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Sugestões importadas com sucesso!');
                verificaNovamente('sugestoes', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONSugestoes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=sugestoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Sugestões importadas com sucesso!');
                verificaNovamente('sugestoes', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoRelacionamentos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=relacionamentos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamentos importados com sucesso!');
                verificaNovamente('relacionamentos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoXMLRelacionamentos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=relacionamentos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamentos importados com sucesso!');
                verificaNovamente('relacionamentos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoJSONRelacionamentos").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=relacionamentos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamentos importados com sucesso!');
                verificaNovamente('relacionamentos', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importaProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=produto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Produtos importados com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importaProdutoXML").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarXml&table=produto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Produtos importados com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val());
                jQuery('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importaProdutoJSON").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importarJSON&table=produto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Produtos importados com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val());
                jQuery('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParceiros").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=parceiros',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parceiros importados com sucesso!');
                verificaNovamente('parceiros', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParceirosXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=parceiros',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parceiros importados com sucesso!');
                verificaNovamente('parceiros', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParceirosJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=parceiros',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parceiros importados com sucesso!');
                verificaNovamente('parceiros', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoRedesSociais").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=redesSociais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Redes Sociais importadas com sucesso!');
                verificaNovamente('redesSociais', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoRedesSociaisXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=redesSociais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Redes Sociais importadas com sucesso!');
                verificaNovamente('redesSociais', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoRedesSociaisJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=redesSociais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Redes Sociais importadas com sucesso!');
                verificaNovamente('redesSociais', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoCupomDesconto").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=cupomDesconto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cupons de Desconto importados com sucesso!');
                verificaNovamente('cupomDesconto', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoCupomDescontoXML").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=cupomDesconto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cupons de Desconto importados com sucesso!');
                verificaNovamente('cupomDesconto', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoCupomDescontoJSON").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=cupomDesconto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cupons de Desconto importados com sucesso!');
                verificaNovamente('cupomDesconto', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoValePresentes").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=valePresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Vale Presentes importados com sucesso!');
                verificaNovamente('valePresente', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoValePresenteXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=valePresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Vale Presentes importados com sucesso!');
                verificaNovamente('valePresente', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoValePresenteJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=valePresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Vale Presentes importados com sucesso!');
                verificaNovamente('valePresente', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamSite").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=paramSite',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Site importados com sucesso!');
                verificaNovamente('paramSite', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamSiteXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=paramSite',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Site importados com sucesso!');
                verificaNovamente('paramSite', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamSiteJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=paramSite',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Site importados com sucesso!');
                verificaNovamente('paramSite', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamAdmin").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=paramAdmin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Admin importados com sucesso!');
                verificaNovamente('paramAdmin', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamAdminXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=paramAdmin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Admin importados com sucesso!');
                verificaNovamente('paramAdmin', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoParamAdminJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=paramAdmin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetros do Admin importados com sucesso!');
                verificaNovamente('paramAdmin', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoVersao").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=versao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriados importados com sucesso!');
                verificaNovamente('versao', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoVersaoXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=versao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Versões do Sistema importadas com sucesso!');
                verificaNovamente('versao', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoVersaoJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=versao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Versões do Sistema importadas com sucesso!');
                verificaNovamente('versao', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFeriado").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=feriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriados importados com sucesso!');
                verificaNovamente('feriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFeriadoXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=feriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriados importados com sucesso!');
                verificaNovamente('feriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFeriadoJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=feriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriados importados com sucesso!');
                verificaNovamente('feriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoComentarioFeriado").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=comentarioFeriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Feriados importados com sucesso!');
                verificaNovamente('comentariosFeriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoComentariosFeriadoXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=comentarioFeriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Feriados importados com sucesso!');
                verificaNovamente('comentariosFeriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoComentariosFeriadoJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=comentarioFeriado',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Comentários de Feriados importados com sucesso!');
                verificaNovamente('comentariosFeriados', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasPagamento").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importar&table=formasPagamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de Pagamento importadas com sucesso!');
                verificaNovamente('formasPagamento', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasPagamentoXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=formasPagamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de Pagamento importadas com sucesso!');
                verificaNovamente('formasPagamento', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasPagamentoJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=formasPagamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de Pagamento importadas com sucesso!');
                verificaNovamente('formasPagamento', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoNacionalidade").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=nacionalidade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Nacionalidades importadas com sucesso!');
                verificaNovamente('nacionalidade', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoNacionalidadeXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=nacionalidade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Nacionalidades importadas com sucesso!');
                verificaNovamente('nacionalidade', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoNacionalidadeJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=nacionalidade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Nacionalidades importadas com sucesso!');
                verificaNovamente('nacionalidade', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPais").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=pais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Países importados com sucesso!');
                verificaNovamente('pais', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaisXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=pais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Países importados com sucesso!');
                verificaNovamente('pais', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPaisJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=pais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Países importadas com sucesso!');
                verificaNovamente('pais', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasFrete").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=formasFrete',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de frete importadas com sucesso!');
                verificaNovamente('formasFrete', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasFreteXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=formasFrete',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de frete importadas com sucesso!');
                verificaNovamente('formasFrete', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoFormasFreteJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=formasFrete',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Formas de frete importadas com sucesso!');
                verificaNovamente('formasFrete', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPosicao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=posicoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Posições de Banners importadas com sucesso!');
                verificaNovamente('posicoes', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPosicaoXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=posicoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Posições importadas com sucesso!');
                verificaNovamente('posicoes', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoPosicaoJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=posicao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Posições importadas com sucesso!');
                verificaNovamente('posicoes', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTempoBanner").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=tempoBanner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tempos de Banners importados com sucesso!');
                verificaNovamente('tempoBanner', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTempoBannerXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=tempoBanner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tempos de Banners importados com sucesso!');
                verificaNovamente('tempoBanner', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTempoBannerJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=tempoBanner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tempos de Banners importados com sucesso!');
                verificaNovamente('tempoBanner', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTarget").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=target',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Targets de Banners importados com sucesso!');
                verificaNovamente('target', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTargetXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=target',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Target de Banners importados com sucesso!');
                verificaNovamente('target', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoTargetJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=target',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Target de Banners importados com sucesso!');
                verificaNovamente('target', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoBackgrounds").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=importar&table=backgrounds',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Backgrounds importados com sucesso!');
                verificaNovamente('backgrounds', $("#urlEdicao").val());
                jQuery('#modalImportar').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoBackgroundsXml").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarXml&table=backgrounds',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Backgrounds importados com sucesso!');
                verificaNovamente('backgrounds', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarXml').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#importacaoBackgroundsJson").submit(function(evt){
    evt.preventDefault();
    var url = $("#urlImportar").val();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: url+'ajax.php?acao=importarJSON&table=backgrounds',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Backgrounds importados com sucesso!');
                verificaNovamente('backgrounds', $("#urlEdicao").val(),  $("#idUserEdicao").val());
                $('#modalImportarJson').modal('hide');
                $('#registroImportadoComSucesso').show('slow');
                window.setInterval('$("#registroImportadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoRedesSociais").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=redesSociais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Rede Social editada com sucesso!');
                verificaNovamente('redesSociais', $("#urlEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoMarcas").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=marcas',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Marca editada com sucesso!');
                verificaNovamente('marcas', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoCupomDesconto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=cupomDesconto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cupom de Desconto editado com sucesso!');
                verificaNovamente('cupomDesconto', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoValePresente").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=valePresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Vale Presente editado com sucesso!');
                verificaNovamente('valePresente', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoSelos").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=selos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Selo editado com sucesso!');
                verificaNovamente('selos', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoSugestoes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=sugestoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Sugestão editada com sucesso!');
                verificaNovamente('sugestoes', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoListaPresentes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=listaPresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Lista de Presente editada com sucesso!');
                verificaNovamente('listasPresentes', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoPagina").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=pagina',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Página editada com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoBackground").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=backgrounds',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background editado com sucesso!');
                verificaNovamente('backgrounds', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoSubitem").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=subitem',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Subítem editado com sucesso!');
                verificaNovamente('subitem', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTipoServico").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tipoServico',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de serviço editado com sucesso!');
                verificaNovamente('tipoServico', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTipoModulo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tipoModulo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de módulo editado com sucesso!');
                verificaNovamente('tiposModulo', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoModulo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=modulo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Módulo editado com sucesso!');
                verificaNovamente('modulos', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoPrioridade").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=prioridade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Prioridade editada com sucesso!');
                verificaNovamente('prioridade', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoTipoVersao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=tipoVersao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de versão editado com sucesso!');
                verificaNovamente('tipoVersao', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoCategoria").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=categoria',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Categoria editado com sucesso!');
                verificaNovamente('categorias', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoRelacionamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=relacionamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamento editado com sucesso!');
                verificaNovamente('relacionamentos', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoAtributo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=atributo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Atributo editado com sucesso!');
                verificaNovamente('atributos', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoParametroSite").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=parametroSite',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetro do site editado com sucesso!');
                verificaNovamente('paramSite', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoParametroAdmin").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=parametroAdmin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetro do admin editado com sucesso!');
                verificaNovamente('paramAdmin', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoVersao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=versao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                verificaNovamente('versao', $("#urlEdicao").val(), $("#idUserEdicao").val());
                alertBHCommerce('Versão editada com sucesso!');
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoUsuario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=usuario',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
                jQuery('#modalEdicao').modal('hide');''
            } else if (vet[0] == 1) {
                if (vet[1] == $("#idUserEdicao").val() && vet[2]){
                    $('#imgUser').html('<img src="'+vet[2]+'" onclick="abreFecha(\'saiUsuarios\')" style="cursor:pointer" class="img-circle elevation-2" alt="User Image">');
                }
                alertBHCommerce('Usuário editado com sucesso!');
                verificaNovamente('usuarios', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#edicaoUsuarioPre").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=editar&table=usuarioPre',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
                jQuery('#modalEdicao').modal('hide');
            } else if (vet[0] == 1) {
                alertBHCommerce('Usuário editado com sucesso!');
                jQuery('#modalEdicao').modal('hide');
                verificaNovamente('usuarios-pre', $("#urlEdicao").val(), $("#idUserEdicao").val());
                jQuery('#modalEdicao').modal('hide');
                $('#registroAtualizadoComSucesso').show('slow');
                window.setInterval('$("#registroAtualizadoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroStatusOrcamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=statusOrcamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Status de Orçamento cadastrado com sucesso!');
                verificaNovamente('statusOrcamento', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#siglaCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTiposDocumento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tiposDocumento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de Documento cadastrado com sucesso!');
                verificaNovamente('tiposDocumento', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTiposProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tiposProduto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de Produto cadastrado com sucesso!');
                verificaNovamente('tiposProduto', $("#urlEdicao").val(), $("#idUserEdicao").val());;
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroProduto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=produto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Produto cadastrado com sucesso!');
                verificaNovamente('produto', $("#urlEdicao").val(), $("#idUserEdicao").val());;
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#apareceVitrineCadastro").val('0');
                $("#destaqueCadastro").val('0');
                $("#compreAgoraCadastro").val('0');
                $("#freteGratisCadastro").val('0');
                $("#mostraCarrinhoCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroFormaPagamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlCadastro").val()+'ajax.php?acao=cadastrar&table=formaPagamento',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Forma de pagamento cadastrada com sucesso!');
                verificaNovamente('formasPagamento', $("#urlEdicao").val(), $("#idUserEdicao").val());;
                $("#nomeCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroFormaFrete").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlCadastro").val()+'ajax.php?acao=cadastrar&table=formaFrete',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Forma de frete cadastrada com sucesso!');
                verificaNovamente('formasFrete', $("#urlEdicao").val(), $("#idUserEdicao").val());;
                $("#nomeCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroPosicao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=posicao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Posição cadastrada com sucesso!');
                verificaNovamente('posicoes', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTempoBanner").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tempoBanner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tempo de Banner cadastrado com sucesso!');
                verificaNovamente('tempoBanner', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#daysCadastro").val('0');
                $("#daysCadastro").attr('disabled', false);
                document.getElementById("eternoCadastro").checked = false;
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTarget").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=target',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Target de Banner cadastrado com sucesso!');
                verificaNovamente('target', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroBanner").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=banner',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Banner cadastrado com sucesso!');
                verificaNovamente('banners', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#posicaoCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroMarcas").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=marcas',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Marca cadastrada com sucesso!');
                verificaNovamente('marcas', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroRedesSociais").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=redesSociais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Rede Social cadastrada com sucesso!');
                verificaNovamente('redesSociais', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#imagemCadastro").val('');
                $("#linkCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroParceiros").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=parceiros',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parceiro cadastrado com sucesso!');
                verificaNovamente('parceiros', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#linkCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroFeriados").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=feriados',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Feriado cadastrado com sucesso!');
                verificaNovamente('feriados', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#dataCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroNacionalidade").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=nacionalidade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Nacionalidade cadastrada com sucesso!');
                verificaNovamente('nacionalidade', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#padraoCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroPais").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=pais',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('País cadastrado com sucesso!');
                verificaNovamente('pais', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroSelos").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=selos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Selo cadastrado com sucesso!');
                verificaNovamente('selos', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroSugestoes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=sugestoes',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Sugestão cadastrada com sucesso!');
                verificaNovamente('sugestoes', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroListaPresentes").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=listaPresente',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Lista de Presente cadastrada com sucesso!');
                verificaNovamente('listasPresentes', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#subtituloCadastro").val('');
                $("#imagemCadastro").val('');;
                $("#apareceMenuCadastro").val('0');
                $("#apareceSiteCadastro").val('0');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroPagina").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=pagina',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Página cadastrada com sucesso!');
                verificaNovamente('pagina', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#imagemCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroBackground").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=backgrounds',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Background cadastrado com sucesso!');
                verificaNovamente('backgrounds', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroImportar").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlCadastro").val()+'ajax.php?acao=cadastrar&table=importar',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Imagem à se importar cadastrado com sucesso!');
                location.href="";
            }
        },
    });
    return false;
});
$("#cadastroSubitem").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=subitem',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Subítem cadastrado com sucesso!');
                verificaNovamente('subitem', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#paginaCadastro").val('');
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');
                $("#descricaoCadastro").val('');
                $("#subtituloCadastro").val('');
                $("#imagemCadastro").val('');;
                $("#mostraImagemCadastro").val('0');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTipoServico").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tipoServico',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de serviço cadastrado com sucesso!');
                verificaNovamente('tipoServico', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');;
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroPrioridade").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=prioridade',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Prioridade cadastrada com sucesso!');
                verificaNovamente('prioridade', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');;
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTipoVersao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tipoVersao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de versão cadastrada com sucesso!');
                verificaNovamente('tipoVersao', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#tipoServicoCadastro").val('');
                $("#nomeCadastro").val('');
                $("#statusCadastro").val(0);
            }
        },
    });
    return false;
});
    $("#cadastroCategoria").submit(function(evt){
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=categoria',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (result) {
                var vet = result.split('|-|');
                if (vet[0] == 0) {
                    alertBHCommerce(vet[1]);
                } else if (vet[0] == 1) {
                    alertBHCommerce('Categoria cadastrado com sucesso!');
                    verificaNovamente('categorias', $("#urlEdicao").val(), $("#idUserCadastro").val());
                    $("#categoriaCadastro").val(0);
                    $("#nomeCadastro").val('');
                    $("#statusCadastro").val(0);
                }
            },
        });
        return false;
});
$("#cadastroAtributo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=atributos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Atributo cadastrado com sucesso!');
                verificaNovamente('atributos', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#atributoCadastro").val(0);
                $("#nomeCadastro").val('');
                $("#statusCadastro").val(0);
            }
        },
    });
    return false;
});
$("#cadastroRelacionamento").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=relacionamentos',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Relacionamento cadastrado com sucesso!');
                verificaNovamente('relacionamentos', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#relacionamentoCadastro").val(0);
                $("#nomeCadastro").val('');
                $("#statusCadastro").val(0);
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroCupomDesconto").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=cupomDesconto',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Cupom de Desconto cadastrado com sucesso!');
                verificaNovamente('cupomDesconto', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#codigoCadastro").val('');
                $("#valorCadastro").val('');
                $("#validadeCadastro").val('');
                $("#utilizavelCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroParametroSite").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=parametroSite',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetro do site cadastrado com sucesso!');
                verificaNovamente('paramSite', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#valorCadastro").val('');
                $("#nomeCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroParametroAdmin").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=parametroAdmin',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Parâmetro do admin cadastrado com sucesso!');
                verificaNovamente('paramAdmin', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#valorCadastro").val('');
                $("#nomeCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroVersao").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=versao',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Versão cadastrada com sucesso!');
                verificaNovamente('versao', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#descricaoCadastro").val('');
                $("#nomeCadastro").val('');
                $("#dataCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroUsuario").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=usuarios',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Usuário cadastrado com sucesso!');
                verificaNovamente('usuarios', $("#urlEdicao").val(), $("#idUserCadastro").val());
                $("#nomeCadastro").val('');
                $("#emailCadastro").val('');
                $("#senhaCadastro").val('');
                $("#imagemCadastro").val('');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroTipoModulo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=tipoModulo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Tipo de módulo cadastrado com sucesso!');
                verificaNovamente('tiposModulo', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#nomeCadastro").val('');
                $("#statusCadastro").val('0');;
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
$("#cadastroModulo").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: $("#urlEdicao").val()+'ajax.php?acao=cadastrar&table=modulo',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            var vet = result.split('|-|');
            if (vet[0] == 0) {
                alertBHCommerce(vet[1]);
            } else if (vet[0] == 1) {
                alertBHCommerce('Módulo cadastrado com sucesso!');
                verificaNovamente('modulos', $("#urlEdicao").val(), $("#idUserEdicao").val());
                $("#tipoModuloCadastro").val('');
                $("#nomeCadastro").val('');
                $("#urlAmigavelCadastro").val('');
                $("#statusCadastro").val('0');
                jQuery('#modalCadastro').modal('hide');
                $('#registroInseridoComSucesso').show('slow');
                window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
            }
        },
    });
    return false;
});
function reescreveUrlCadastro(nome, url, aguardeCarregando, table){
    $.ajax({
        url: url+'ajax.php?&acao=reescreveUrlCadastro&nome=' + nome+ "&table="+table,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#slugCadastro").val(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#slugCadastro").val(aguardeCarregando);
        }
    });
}
function abrePermissoes(usuario, url){
    $.ajax({
        url: url+'ajax.php?&acao=pegaPermissoes&usuario=' + usuario,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#permissoes"+usuario).html(data[1]);
            } else if (data[0] == 0) {
                alert('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#permissoes"+usuario).show('slow');
            $("#permissoes"+usuario).html('<img src="'+url+'dist/img/loader.gif" width="18"> Aguarde... Carregando...');
        }
    });
}
function alteraPermissoes(user, module, tipo, url){
    $.ajax({
        url: 'ajax.php?&acao=alteraPermissoes&user=' + user+'&module='+module+'&tipo='+tipo,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#"+tipo+module+"_"+user).html(data[1]);
            } else if (data[0] == 0) {
                alert('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#"+tipo+module+"_"+user).html('<img src="'+url+'dist/img/loader.gif" width="18">');
        }
    });
}
function reescreveUrlEdicao(nome, url, aguardeCarregando, table, id){
    $.ajax({
        url: url+'ajax.php?&acao=reescreveUrlEdicao&nome=' + nome+ "&table="+table+"&id="+id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#slugEdicao").val(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#slugEdicao").val(aguardeCarregando);
        }
    });
}
function visualizarAprovacoesComentariosFeriados(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=visualizarAprovacoesComentariosFeriados&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoComentariosFeriadosAprovar").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoComentariosFeriadosAprovar").html("<img src='"+url+"img/loader.gif' width='20'> Aguarde... Carregando...");
        }
    });
}
function aprovarSolicitacaoComentarioFeriado(id, url){
    if (confirm('Tem certeza que deseja aprovar essa solicitação de comentário de feriado?')){
        $.ajax({
            url: url+'ajax.php?&acao=aprovarSolicitacaoComentariosFeriados&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Comentário aprovado com sucesso!');
                    visualizarAprovacoesComentariosFeriados(id, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    visualizarAprovacoesComentariosFeriados(id, url);
                }
            },
            beforeSend: function () {
                $("#visualizacaoComentariosFeriadosAprovar").html("<img src='"+url+"img/loader.gif' width='20'> Aguarde... Carregando...");
            }
        });
    }
}
function importaAnoPassadoFeriado(url, idUser){
    if (confirm('Tem certeza que deseja importar os feriados do ano passado?')){
        $.ajax({
            url: url+'ajax.php?&acao=importaAnoPassadoFeriado&ano=' + $("#anoFiltro").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Feriados importados com sucesso!');
                    verificaNovamente('feriados', url, idUser)
                    ;
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    verificaNovamente('feriados', url, idUser)
                }
            },
            beforeSend: function () {
                $("#visualizacaoComentariosFeriadosAprovar").html("<img src='"+url+"img/loader.gif' width='20'> Aguarde... Carregando...");
            }
        });
    }
}
function importaAnoSeguinteFeriado(url, idUser){
    if (confirm('Tem certeza que deseja importar os feriados do ano seguinte?')){
        $.ajax({
            url: url+'ajax.php?&acao=importaAnoSeguinteFeriado&ano=' + $("#anoFiltro").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Feriados importados com sucesso!');
                    verificaNovamente('feriados', url, idUser)
                    ;
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    verificaNovamente('feriados', url, idUser)
                }
            },
            beforeSend: function () {
    
            }
        });
    }
}
function excluirSolicitacaoComentarioFeriado(id, url){
    if (confirm('Tem certeza que deseja excluir essa solicitação de comentário de feriado?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirSolicitacaoComentariosFeriados&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Comentário excluído com sucesso!');
                    visualizarAprovacoesComentariosFeriados(id, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    visualizarAprovacoesComentariosFeriados(id, url);
                }
            },
            beforeSend: function () {
                $("#visualizacaoComentariosFeriadosAprovar").html("<img src='"+url+"img/loader.gif' width='20'> Aguarde... Carregando...");
            }
        });
    }
}
function selEstrelasComentariosFeriadosCadastro(num, url){
    var html = "";
    for (i = 1; i <= num; i++){
        html += "<img src='"+url+"img/star.png' title='Nota "+i+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosCadastro('"+i+"','"+url+"')> ";
    }
    if (num < 5){
        for (j = i; j <= 5; j++){
           html += "<img src='"+url+"img/starApagada.png' title='Nota "+j+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosCadastro('"+j+"','"+url+"')> ";
        }
    }
    $("#estrelasCadastro").html(html);
    $("#avaliacaoCadastro").val(num);
}
function limparSelecaoAvaliacaoComentarioProdutoCadastro(url){
    var html = "";
    for (j = 1; j <= 5; j++){
        html += "<img src='"+url+"img/starApagada.png' title='Nota "+j+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosCadastro('"+j+"','"+url+"')> ";
     }
     html += '<span style="background:#E7E7E7; color:#000000; border:1px solid #000000; padding:5px; width:350px; font-size:12px; float:left; position:absolute; display:none" id="msgSelecionarEstrelasCadastro"><div style="position:absolute; float:left; left:95%"><img src="'+url+'img/close.png" width="25" style="cursor:pointer" title="Fechar Alerta" onclick=fecha("msgSelecionarEstrelasCadastro")></div>Por favor, selecione o número de estrelas do comentário!</span>';
     $("#estrelasCadastro").html(html);
     $("#avaliacaoCadastro").val('0');
}
function verificaFeriadoCadastro(url){
    if (!$('#feriadoCadastro').val() || $('#feriadoCadastro').val() == ""){
        $("#msgFeriadoCadastro").show('slow');
    }
    else{
        $("#msgFeriadoCadastro").hide('fast');
    }
}
function verificaClienteCadastro(url){
    if (!$('#clienteCadastro').val() || $('#clienteCadastro').val() == ""){
        $("#msgClienteCadastro").show('slow');
    }
    else{
        $("#msgClienteCadastro").hide('fast');
    }
}
function verificaComentarioCadastro(url){
    if (!$('#comentarioCadastro').val() || $('#comentarioCadastro').val() == ""){
        $("#msgComentarioCadastro").show('slow');
    }
    else{
        $("#msgComentarioCadastro").hide('fast');
    }
}
function cadastrarComentariosFeriado(url){
    if (!$("#feriadoCadastro").val()){
        $("#msgFeriadoCadastro").show('slow');
        $("#msgClienteCadastro").hide('fast');
        $("#msgSelecionarEstrelasCadastro").hide('fast');
        $("#msgComentarioCadastro").hide('fast');
        $("#feriadoCadastro").focus();
    }
    else if (!$("#clienteCadastro").val()){
        $("#msgFeriadoCadastro").hide('fast');
        $("#msgClienteCadastro").show('slow');
        $("#msgSelecionarEstrelasCadastro").hide('fast');
        $("#msgComentarioCadastro").hide('fast');
        $("#clienteCadastro").focus();
    }
    else if (!$('#avaliacaoCadastro').val() || $('#avaliacaoCadastro').val() == 0){
        $("#msgFeriadoCadastro").hide('fast');
        $("#msgClienteCadastro").hide('fast');
        $("#msgSelecionarEstrelasCadastro").show('slow');
        $("#msgComentarioCadastro").hide('fast');
        $("#avaliacaoCadastro").focus();
    }
    else if (!$('#comentarioCadastro').val() || $('#comentarioCadastro').val() == "0"){
        $("#msgFeriadoCadastro").hide('fast');
        $("#msgClienteCadastro").hide('fast');
        $("#msgSelecionarEstrelasCadastro").hide('fast');
        $("#msgComentarioCadastro").show('slow');
        $("#comentarioCadastro").focus();
    }
    else{
        $("#msgFeriadoCadastro").hide('fast');
        $("#msgClienteCadastro").hide('fast');
        $("#msgSelecionarEstrelasCadastro").hide('fast');
        $("#msgComentarioCadastro").hide('fast');
        $.ajax({
            url: url+'ajax.php?&acao=cadastrar&table=comentariosFeriados&feriado=' + $("#feriadoCadastro").val()+"&cliente="+$("#clienteCadastro").val()+"&avaliacao="+$("#avaliacaoCadastro").val()+"&comentario="+$("#comentarioCadastro").val()+"&status="+$("#statusCadastro").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Comentário de Feriado adicionado com sucesso!');
                    verificaNovamente('comentariosFeriados', $("#urlEdicao").val(), $("#idUserCadastro").val());
                    jQuery('#modalCadastro').modal('hide');
                    $('#registroInseridoComSucesso').show('slow');
                    window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
                } else if (data[0] == 0) {
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function selEstrelasComentariosFeriadosEdicao(num, url){
    var html = "";
    for (i = 1; i <= num; i++){
        html += "<img src='"+url+"img/star.png' title='Nota "+i+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosEdicao('"+i+"','"+url+"')> ";
    }
    if (num < 5){
        for (j = i; j <= 5; j++){
           html += "<img src='"+url+"img/starApagada.png' title='Nota "+j+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosEdicao('"+j+"','"+url+"')> ";
        }
    }
    $("#estrelasEdicao").html(html);
    $("#avaliacaoEdicao").val(num);
}
function limparSelecaoAvaliacaoComentarioProdutoEdicao(url){
    var html = "";
    for (j = 1; j <= 5; j++){
        html += "<img src='"+url+"img/starApagada.png' title='Nota "+j+"' style='cursor:pointer' onclick=selEstrelasComentariosFeriadosEdicao('"+j+"','"+url+"')> ";
     }
     html += '<span style="background:#E7E7E7; color:#000000; border:1px solid #000000; padding:5px; width:350px; font-size:12px; float:left; position:absolute; display:none" id="msgSelecionarEstrelasEdicao"><div style="position:absolute; float:left; left:95%"><img src="'+url+'img/close.png" width="25" style="cursor:pointer" title="Fechar Alerta" onclick=fecha("msgSelecionarEstrelasEdicao")></div>Por favor, selecione o número de estrelas do comentário!</span>';
     $("#estrelasEdicao").html(html);
     $("#avaliacaoEdicao").val('0');
}
function verificaFeriadoEdicao(url){
    if (!$('#feriadoEdicao').val() || $('#feriadoEdicao').val() == ""){
        $("#msgFeriadoEdicao").show('slow');
    }
    else{
        $("#msgFeriadoEdicao").hide('fast');
    }
}
function verificaClienteEdicao(url){
    if (!$('#clienteEdicao').val() || $('#clienteEdicao').val() == ""){
        $("#msgClienteEdicao").show('slow');
    }
    else{
        $("#msgClienteEdicao").hide('fast');
    }
}
function verificaComentarioEdicao(url){
    if (!$('#comentarioEdicao').val() || $('#comentarioEdicao').val() == ""){
        $("#msgComentarioEdicao").show('slow');
    }
    else{
        $("#msgComentarioEdicao").hide('fast');
    }
}
function editaComentariosFeriados(url){
    if (!$("#feriadoEdicao").val()){
        $("#msgFeriadoEdicao").show('slow');
        $("#msgClienteEdicao").hide('fast');
        $("#msgSelecionarEstrelasEdicao").hide('fast');
        $("#msgComentarioEdicao").hide('fast');
        $("#feriadoEdicao").focus();
    }
    else if (!$("#clienteEdicao").val()){
        $("#msgFeriadoEdicao").hide('fast');
        $("#msgClienteEdicao").show('slow');
        $("#msgSelecionarEstrelasEdicao").hide('fast');
        $("#msgComentarioEdicao").hide('fast');
        $("#clienteEdicao").focus();
    }
    else if (!$('#avaliacaoEdicao').val() || $('#avaliacaoEdicao').val() == 0){
        $("#msgFeriadoEdicao").hide('fast');
        $("#msgClienteEdicao").hide('fast');
        $("#msgSelecionarEstrelasEdicao").show('slow');
        $("#msgComentarioEdicao").hide('fast');
        $("#avaliacaoEdicao").focus();
    }
    else if (!$('#comentarioEdicao').val() || $('#comentarioEdicao').val() == "0"){
        $("#msgFeriadoEdicao").hide('fast');
        $("#msgClienteEdicao").hide('fast');
        $("#msgSelecionarEstrelasEdicao").hide('fast');
        $("#msgComentarioEdicao").show('slow');
        $("#comentarioEdicao").focus();
    }
    else{
        $("#msgFeriadoEdicao").hide('fast');
        $("#msgClienteEdicao").hide('fast');
        $("#msgSelecionarEstrelasEdicao").hide('fast');
        $("#msgComentarioEdicao").hide('fast');
        $.ajax({
            url: url+'ajax.php?&acao=editar&table=comentariosFeriados&feriado=' + $("#feriadoEdicao").val()+"&cliente="+$("#clienteEdicao").val()+"&avaliacao="+$("#avaliacaoEdicao").val()+"&comentario="+$("#comentarioEdicao").val()+"&status="+$("#statusEdicao").val()+"&id="+$("#idEdicao").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Comentário de Feriado editado com sucesso!');
                    verificaNovamente('comentariosFeriados', $("#urlEdicao").val(), $("#idUserEdicao").val());
                    jQuery('#modalEdicao').modal('hide');
                    $('#registroAtualizadoComSucesso').show('slow');
                    window.setInterval('$("#registroInseridoComSucesso").hide("fast")', 15000);
                } else if (data[0] == 0) {
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function sairSistema(url){
    if (confirm('Tem certeza que deseja sair do sistema?')){
        $.ajax({
            url: url+'ajax.php?&acao=logout',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alert('Logout efetuado com sucesso! Aguarde o refresh da página!');
                    location.href="";
                } else if (data[0] == 0) {
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function adicionarConvidado(url, idUser){
    if ($("#nomeConvidadoAdd").val() == ""){
        alertBHCommerce('Informe o nome do convidado corretamente!');
        $("#nomeConvidadoAdd").focus();
    }
    else if ($("#emailConvidadoAdd").val() == "" || !validateEmail($("#emailConvidadoAdd").val())){
        alertBHCommerce('Informe o email do convidado corretamente!');
        $("#emailConvidadoAdd").focus();
    }
    else if ($("#celConvidadoAdd").val() && document.getElementById("celConvidadoAdd").value.length < 14){
        alertBHCommerce('Informe o celular do convidado corretamente!');
        $("#celConvidadoAdd").focus();
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=adicionarConvidado&lista=' + $("#listaConvidadoAdd").val()+"&nome="+$("#nomeConvidadoAdd").val()+"&email="+$("#emailConvidadoAdd").val()+"&cel="+$("#celConvidadoAdd").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Convidado adicionado com sucesso!');
                    $('#addConvidado').hide('fast');
                    visualizarConvidados($('#listaConvidadoAdd').val(), url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    $("#nomeConvidadoAdd").val('');
                    $("#emailConvidadoAdd").val('');
                    $("#celConvidadoAdd").val('');
                }
            },
            beforeSend: function () {
                $("#nomeConvidadoAdd").val('Aguarde... Cadastrando...');
                $("#emailConvidadoAdd").val('Aguarde... Cadastrando...');
                $("#celConvidadoAdd").val('Aguarde... Cadastrando...');
            }
        });
    }
}
function atualizarConvidado(url, idUser){
    if ($("#nomeConvidadoEdita").val() == ""){
        alertBHCommerce('Informe o nome do convidado corretamente!');
        $("#nomeConvidadoEdita").focus();
    }
    else if ($("#emailConvidadoEdita").val() == "" || !validateEmail($("#emailConvidadoEdita").val())){
        alertBHCommerce('Informe o email do convidado corretamente!');
        $("#emailConvidadoEdita").focus();
    }
    else if ($("#celConvidadoEdita").val() && document.getElementById("celConvidadoEdita").value.length < 14){
        alertBHCommerce('Informe o celular do convidado corretamente!');
        $("#celConvidadoEdita").focus();
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=atualizaConvidado&lista=' + $("#listaConvidadoEdita").val()+"&nome="+$("#nomeConvidadoEdita").val()+"&email="+$("#emailConvidadoEdita").val()+"&cel="+$("#celConvidadoEdita").val()+"&id="+$("#idConvidadoEdita").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Convidado atualizado com sucesso!');
                    $('#editaConvidado').hide('fast');
                    visualizarConvidados($('#listaConvidadoAdd').val(), url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    $("#nomeConvidadoEdita").val('');
                    $("#emailConvidadoEdita").val('');
                    $("#celConvidadoEdita").val('');
                }
            },
            beforeSend: function () {
                $("#nomeConvidadoEdita").val('Aguarde... Atualizando...');
                $("#emailConvidadoEdita").val('Aguarde... Atualizando...');
                $("#celConvidadoEdita").val('Aguarde... Atualizando...');
            }
        });
    }
}
function verificaCepCaixa(valor, id) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroAdd').value="Aguarde... Pesquisando...";
            document.getElementById('numeroAdd').value="Aguarde... Pesquisando...";
            document.getElementById('complementoAdd').value="Aguarde... Pesquisando...";
            document.getElementById('bairroAdd').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeAdd').value="Aguarde... Pesquisando...";
            document.getElementById('estadoAdd').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPCaixa2';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroAdd').value="";
            document.getElementById('bairroAdd').value="";
            document.getElementById('numeroAdd').value="";
            document.getElementById('complementoAdd').value="";
            document.getElementById('cidadeAdd').value="";
            document.getElementById('estadoAdd').value="";
            document.getElementById('logradouroAdd').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
};
function retornoCEPCaixa2(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroAdd').value=conteudo.logradouro;
        document.getElementById('bairroAdd').value=conteudo.bairro;
        document.getElementById('numeroAdd').value="";
        document.getElementById('complementoAdd').value="";
        document.getElementById('cidadeAdd').value=conteudo.localidade;
        document.getElementById('estadoAdd').value=conteudo.uf;
        document.getElementById('numeroAdd').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroAdd').value="";
        document.getElementById('bairroAdd').value="";
        document.getElementById('numeroAdd').value="";
        document.getElementById('complementoAdd').value="";
        document.getElementById('cidadeAdd').value="";
        document.getElementById('estadoAdd').value="";
        document.getElementById('logradouroAdd').focus();
    }
}
function pesquisacep(valor, id) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEndereco').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEP';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEndereco').value="";
            document.getElementById('bairroEndereco').value="";
            document.getElementById('numeroEndereco').value="";
            document.getElementById('complementoEndereco').value="";
            document.getElementById('cidadeEndereco').value="";
            document.getElementById('estadoEndereco').value="";
            document.getElementById('logradouroEndereco').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
};
function retornoCEP(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroEndereco').value=(conteudo.logradouro);
        document.getElementById('bairroEndereco').value=(conteudo.bairro);
        document.getElementById('numeroEndereco').value="";
        document.getElementById('complementoEndereco').value="";
        document.getElementById('cidadeEndereco').value=(conteudo.localidade);
        document.getElementById('estadoEndereco').value=(conteudo.uf);
        document.getElementById('numeroEndereco').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroEndereco').value="";
        document.getElementById('bairroEndereco').value="";
        document.getElementById('numeroEndereco').value="";
        document.getElementById('complementoEndereco').value="";
        document.getElementById('cidadeEndereco').value="";
        document.getElementById('estadoEndereco').value="";
        document.getElementById('logradouroEndereco').focus();
    }
}
function verificacepcadastraendereco (valor, id, id2 = "") {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEndereco').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEndereco').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPCadastraEndereco';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEndereco').value="";
            document.getElementById('bairroEndereco').value="";
            document.getElementById('numeroEndereco').value="";
            document.getElementById('complementoEndereco').value="";
            document.getElementById('cidadeEndereco').value="";
            document.getElementById('estadoEndereco').value="";
            document.getElementById('logradouroEndereco').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function verificacepatualizaendereco (valor, id, id2 = "") {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEndereco'+id+id2).value="Aguarde... Pesquisando...";
            document.getElementById('numeroEndereco'+id+id2).value="Aguarde... Pesquisando...";
            document.getElementById('complementoEndereco'+id+id2).value="Aguarde... Pesquisando...";
            document.getElementById('bairroEndereco'+id+id2).value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEndereco'+id+id2).value="Aguarde... Pesquisando...";
            document.getElementById('estadoEndereco'+id+id2).value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPAtualizaEndereco'+id+id2;
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEndereco'+id+id2).value="";
            document.getElementById('bairroEndereco'+id+id2).value="";
            document.getElementById('numeroEndereco'+id+id2).value="";
            document.getElementById('complementoEndereco'+id+id2).value="";
            document.getElementById('cidadeEndereco'+id+id2).value="";
            document.getElementById('estadoEndereco'+id+id2).value="";
            document.getElementById('logradouroEndereco'+id+id2).focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPCadastraEndereco(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroEndereco').value=(conteudo.logradouro);
        document.getElementById('bairroEndereco').value=(conteudo.bairro);
        document.getElementById('numeroEndereco').value="";
        document.getElementById('complementoEndereco').value="";
        document.getElementById('cidadeEndereco').value=(conteudo.localidade);
        document.getElementById('estadoEndereco').value=(conteudo.uf);
        document.getElementById('numeroEndereco').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroCaixa').value="";
        document.getElementById('bairroCaixa').value="";
        document.getElementById('numeroCaixa').value="";
        document.getElementById('complementoCaixa').value="";
        document.getElementById('cidadeCaixa').value="";
        document.getElementById('estadoCaixa').value="";
        document.getElementById('logradouroCaixa').focus();
    }
}
function verificacepcadastrolista(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('numeroCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('complementoCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('bairroCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('estadoCadastro').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPCadastroLista';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroCadastro').value="";
            document.getElementById('bairroCadastro').value="";
            document.getElementById('numeroCadastro').value="";
            document.getElementById('complementoCadastro').value="";
            document.getElementById('cidadeCadastro').value="";
            document.getElementById('estadoCadastro').value="";
            document.getElementById('logradouroCadastro').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPCadastroLista(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroCadastro').value=(conteudo.logradouro);
        document.getElementById('bairroCadastro').value=(conteudo.bairro);
        document.getElementById('numeroCadastro').value="";
        document.getElementById('complementoCadastro').value="";
        document.getElementById('cidadeCadastro').value=(conteudo.localidade);
        document.getElementById('estadoCadastro').value=(conteudo.uf);
        document.getElementById('numeroCadastro').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroCaixa').value="";
        document.getElementById('bairroCaixa').value="";
        document.getElementById('numeroCaixa').value="";
        document.getElementById('complementoCaixa').value="";
        document.getElementById('cidadeCaixa').value="";
        document.getElementById('estadoCaixa').value="";
        document.getElementById('logradouroCaixa').focus();
    }
}
function verificacepedicaolista(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEdicao').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEdicao').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEdicao').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEdicao').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEdicao').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEdicao').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPEdicaoLista';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEdicao').value="";
            document.getElementById('bairroEdicao').value="";
            document.getElementById('numeroEdicao').value="";
            document.getElementById('complementoEdicao').value="";
            document.getElementById('cidadeEdicao').value="";
            document.getElementById('estadoEdicao').value="";
            document.getElementById('logradouroEdicao').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPEdicaoLista(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroEdicao').value=(conteudo.logradouro);
        document.getElementById('bairroEdicao').value=(conteudo.bairro);
        document.getElementById('numeroEdicao').value="";
        document.getElementById('complementoEdicao').value="";
        document.getElementById('cidadeEdicao').value=(conteudo.localidade);
        document.getElementById('estadoEdicao').value=(conteudo.uf);
        document.getElementById('numeroEdicao').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroCaixa').value="";
        document.getElementById('bairroCaixa').value="";
        document.getElementById('numeroCaixa').value="";
        document.getElementById('complementoCaixa').value="";
        document.getElementById('cidadeCaixa').value="";
        document.getElementById('estadoCaixa').value="";
        document.getElementById('logradouroCaixa').focus();
    }
}
function retornoCEPRealizarPedido(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logadouroRealizarPedido').value=(conteudo.logradouro);
        document.getElementById('bairroRealizarPedido').value=(conteudo.bairro);
        document.getElementById('numeroRealizarPedido').value="";
        document.getElementById('complementoRealizarPedido').value="";
        document.getElementById('cidadeRealizarPedido').value=(conteudo.localidade);
        document.getElementById('estadoRealizarPedido').value=(conteudo.uf);
        document.getElementById('numeroRealizarPedido').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logadouroRealizarPedido').value="";
        document.getElementById('bairroRealizarPedido').value="";
        document.getElementById('numeroRealizarPedido').value="";
        document.getElementById('complementoRealizarPedido').value="";
        document.getElementById('cidadeRealizarPedido').value="";
        document.getElementById('estadoRealizarPedido').value="";
        document.getElementById('logradouroRealizarPedido').focus();
    }
}
function verificacepcaixa(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroCaixa').value="Aguarde... Pesquisando...";
            document.getElementById('numeroCaixa').value="Aguarde... Pesquisando...";
            document.getElementById('complementoCaixa').value="Aguarde... Pesquisando...";
            document.getElementById('bairroCaixa').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeCaixa').value="Aguarde... Pesquisando...";
            document.getElementById('estadoCaixa').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPCaixa';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroCaixa').value="";
            document.getElementById('bairroCaixa').value="";
            document.getElementById('numeroCaixa').value="";
            document.getElementById('complementoCaixa').value="";
            document.getElementById('cidadeCaixa').value="";
            document.getElementById('estadoCaixa').value="";
            document.getElementById('logradouroCaixa').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPCaixa(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroCaixa').value=(conteudo.logradouro);
        document.getElementById('bairroCaixa').value=(conteudo.bairro);
        document.getElementById('numeroCaixa').value="";
        document.getElementById('complementoCaixa').value="";
        document.getElementById('cidadeCaixa').value=(conteudo.localidade);
        document.getElementById('estadoCaixa').value=(conteudo.uf);
        document.getElementById('numeroCaixa').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroCaixa').value="";
        document.getElementById('bairroCaixa').value="";
        document.getElementById('numeroCaixa').value="";
        document.getElementById('complementoCaixa').value="";
        document.getElementById('cidadeCaixa').value="";
        document.getElementById('estadoCaixa').value="";
        document.getElementById('logradouroCaixa').focus();
    }
}
function verificacepescolar(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEscola').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEscola').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEscola').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEscola').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEscola').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEscola').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPEscolar';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEscola').value="";
            document.getElementById('bairroEscola').value="";
            document.getElementById('numeroEscola').value="";
            document.getElementById('complementoEscola').value="";
            document.getElementById('cidadeEscola').value="";
            document.getElementById('estadoEscola').value="";
            document.getElementById('logradouroEscola').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPEscolar(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroEscola').value=(conteudo.logradouro);
        document.getElementById('bairroEscola').value=(conteudo.bairro);
        document.getElementById('numeroEscola').value="";
        document.getElementById('complementoEscola').value="";
        document.getElementById('cidadeEscola').value=(conteudo.localidade);
        document.getElementById('estadoEscola').value=(conteudo.uf);
        document.getElementById('numeroEscola').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroEscola').value="";
        document.getElementById('bairroEscola').value="";
        document.getElementById('numeroEscola').value="";
        document.getElementById('complementoEscola').value="";
        document.getElementById('cidadeEscola').value="";
        document.getElementById('estadoEscola').value="";
        document.getElementById('logradouroEscola').focus();
    }
}
function pesquisacepEscolaRealizarPedido(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logadouroEscolaRealizarPedido').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEscolaRealizarPedido').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEscolaRealizarPedido').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEscolaRealizarPedido').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEscolaRealizarPedido').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEscolaRealizarPedido').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPEscolaRealizarPedido';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logadouroEscolaRealizarPedido').value="";
            document.getElementById('bairroEscolaRealizarPedido').value="";
            document.getElementById('numeroEscolaRealizarPedido').value="";
            document.getElementById('complementoEscolaRealizarPedido').value="";
            document.getElementById('cidadeEscolaRealizarPedido').value="";
            document.getElementById('estadoEscolaRealizarPedido').value="";
            document.getElementById('logradouroEscolaRealizarPedido').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
}
function retornoCEPEscolaRealizarPedido(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logadouroEscolaRealizarPedido').value=(conteudo.logradouro);
        document.getElementById('bairroEscolaRealizarPedido').value=(conteudo.bairro);
        document.getElementById('numeroEscolaRealizarPedido').value="";
        document.getElementById('complementoEscolaRealizarPedido').value="";
        document.getElementById('cidadeEscolaRealizarPedido').value=(conteudo.localidade);
        document.getElementById('estadoEscolaRealizarPedido').value=(conteudo.uf);
        document.getElementById('numeroEscolaRealizarPedido').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logadouroEscolaRealizarPedido').value="";
        document.getElementById('bairroEscolaRealizarPedido').value="";
        document.getElementById('numeroEscolaRealizarPedido').value="";
        document.getElementById('complementoEscolaRealizarPedido').value="";
        document.getElementById('cidadeEscolaRealizarPedido').value="";
        document.getElementById('estadoEscolaRealizarPedido').value="";
        document.getElementById('logradouroEscolaRealizarPedido').focus();
    }
}
function selecionaEnviarEmail(valor){
    if (valor == 1){
        $("#enviarEmail").show('slow');
    }
    else{
        $("#enviarEmail").hide('fast');
    }
}
function selecionaStatusOrcamento(valor){
    if (valor == 5 || valor == 6){
        $("#codigoRastreamento").show('slow');
    }
    else{
        $("#codigoRastreamento").hide('fast');
        $("#codRastreamento").val('');
    }
}
function selecionaEnviarEmailCadastro(valor){
    if (valor == 1){
        $("#enviarEmailCad").show('slow');
    }
    else{
        $("#enviarEmailCad").hide('fast');
    }
}
function selecionaTipoEstabelecimento(id){
    if (id == ''){
        $('#tiposEstabelecimentoRealizarPedido').html('Selecione o tipo do estabelecimento acima...');
    }
    else{
        var html = "";
        if (id == 1){
            html += '<label for="quantidadeRealizarPedido">Quantidade de Mesas do Estabelecimento</label>' +
                '<input type="number" id="quantidadeRealizarPedido" name="quantidadeRealizarPedido" class="form-control" required placeholder="Informe a quantidade de mesas do estabelecimento...">' +
                '<label for="numPessoasRealizarPedido">Número de Pessoas por Mesa do Estabelecimento</label>' +
                '<input type="number" id="numPessoasRealizarPedido" name="numPessoasRealizarPedido" class="form-control" required placeholder="Informe número de pessoas por mesa do estabelecimento...">' +
                '<label for="perGarcomRealizarPedido">Percentual do Garçom do Estabelecimento (em %)</label>' +
                '<input type="number" id="perGarcomRealizarPedido" name="perGarcomRealizarPedido" class="form-control" required placeholder="Percentual do garçom do estabelecimento (em %)...">';
        }
        else{
            html += '<label for="quantidade">Quantidade de Caixas do Estabelecimento</label>' +
                '<input type="number" id="quantidadeRealizarPedido" name="quantidadeRealizarPedido" class="form-control" required placeholder="Informe a quantidade de caixas do estabelecimento...">';
        }
        $('#tiposEstabelecimentoRealizarPedido').html(html);
    }
}
function pesquisacepedit(valor, id) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep.length == 8) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroEditaCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('numeroEditaCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('complementoEditaCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('bairroEditaCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('cidadeEditaCadastro').value="Aguarde... Pesquisando...";
            document.getElementById('estadoEditaCadastro').value="";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=retornoCEPEdit';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            alertBHCommerce("Formato de CEP inválido.");
            document.getElementById('logradouroEditaCadastro').value="";
            document.getElementById('bairroEditaCadastro').value="";
            document.getElementById('numeroEditaCadastro').value="";
            document.getElementById('complementoEditaCadastro').value="";
            document.getElementById('cidadeEditaCadastro').value="";
            document.getElementById('estadoEditaCadastro').value="";
            document.getElementById('logradouroEditaCadastro').focus();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }
};
function retornoCEPEdit(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroEditaEndereco').value=(conteudo.logradouro);
        document.getElementById('bairroEditaEndereco').value=(conteudo.bairro);
        document.getElementById('numeroEditaEndereco').value="";
        document.getElementById('complementoEditaEndereco').value="";
        document.getElementById('cidadeEditaEndereco').value=(conteudo.localidade);
        document.getElementById('estadoEditaEndereco').value=(conteudo.uf);
        document.getElementById('numeroEditaEndereco').focus();
    } //end if.
    else {
        //CEP não Encontrado.
        alertBHCommerce("CEP não encontrado. Digeite as informações manualmente!");
        document.getElementById('logradouroEditaEndereco').value="";
        document.getElementById('bairroEditaEndereco').value="";
        document.getElementById('numeroEditaEndereco').value="";
        document.getElementById('complementoEditaEndereco').value="";
        document.getElementById('cidadeEditaEndereco').value="";
        document.getElementById('estadoEditaEndereco').value="";
        document.getElementById('logradouroEditaEndereco').focus();
    }
}
function selecionaMesFimFiltro(url){
    $.ajax({
        url: url+"ajax.php?&acao=verificaNumeroDias&dataFiltro="+$("#dataFiltro").val()+"&anoFiltro="+$("#anoFiltro").val()+"&diaFiltro="+$("#diaFiltro").val()+"&diaFimFiltro="+$('#diaFimFiltro').val()+"&mesFimFiltro="+$('#mesFimFiltro').val()+"&anoFimFiltro="+$('#anoFimFiltro').val(),
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#spanDataFimFiltro").html(data[1]);
                $("#spanDataFiltro").html(data[2]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#spanDataFimFiltro").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#spanDataFiltro").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function mascara(src, mask, evt){

    var i = src.value.length;

    var saida = mask.substring(i,i+1);

    var ascii = evt.keyCode;

    if(i < mask.length || ascii == 8 || ascii == 9){

        if(document.all){

            var evt = event.keyCode;

        }

        else{

            var evt = evt.which;

        }

        if (saida == "A")

        {

            if ((ascii >=97) && (ascii <= 122))

                evt.keyCode -= 32;

            else

                evt.keyCode = 0;

        }

        else if (saida == "0")

        {

            if ((ascii >= 48) && (ascii <= 57))

                return;

            else

                evt.keyCode = 0;

        }

        else if (saida == "#")

            return;

        else if(ascii != 8)

        {

            src.value += saida;

            i += 1;

            saida = mask.substring(i,i+1);

            if (saida == "A")

            {

                if ((ascii >=97) && (ascii <= 122))

                    evt.keyCode -= 32;

                else

                    evt.keyCode = 0;

            }

            else if (saida == "0")

            {

                if ((ascii >= 48) && (ascii <= 57))

                    return;

                else

                    evt.keyCode = 0;

            }

            else

                return;

        }

    }

    else

        return false;

}
function gerarAutomaticamente(url){
    $.ajax({
        url: url+'ajax.php?&acao=gerarAutomaticamente',
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#codigoCadastro").val(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#codigoCadastro").val('Aguarde... Carregando...');
        }
    });
}
function selecionaTipoCupom(tipo){
    if(tipo == 1){
        var html = '<label for="valorCadastro">Valor: R$</label><input type="text" name="valorCadastro" id="valorCadastro" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorCadastro\')">';
    }
    else if(tipo == 2){
        var html = '<label for="valorCadastro">Valor: %</label><input type="text" name="valorCadastro" id="valorCadastro" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorCadastro\')">';
    }
    else{
        var html = "Selecione o tipo corretamente...";
    }
    $("#valorCad").html(html);
}
function selecionaTipoCupomEdicao(tipo){
    if(tipo == 1){
        var html = '<label for="valorEdicao">Valor: R$</label><input type="text" name="valorEdicao" id="valorEdicao" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorEdicao\')">';
    }
    else if(tipo == 2){
        var html = '<label for="valorEdicao">Valor: %</label><input type="text" name="valorEdicao" id="valorEdicao" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorEdicao\')">';
    }
    else{
        var html = "Selecione o tipo corretamente...";
    }
    $("#valorEdit").html(html);
}
function pegaLogsAcesso(idUser, url){
    $.ajax({
        url: url+'ajax.php?&acao=verificaNovamente&tela=logs&idUser=' + idUser+"&pagina="+$("#pagina").val()+"&usuarioFiltro="+$("#usuarioFiltro").val()+"&acaoFiltro="+$('#acaoFiltro').val(),
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#conteudo").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        }
    });
}
function paginacaoLogs(pagina, idUser, url){
    $('#pagina').val(pagina);
    $.ajax({
        url: url+'ajax.php?&acao=pegaLogsAcesso&user=' + idUser+"&pagina="+$("#pagina").val()+"&usuarioFiltro="+$("#usuarioFiltro").val()+"&acaoiltro="+$("#acaoFiltro").val(),
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#registros").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#registros").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function verificaTipoBannerCadastro(url){
    if (!$("#tipoCadastro").val()){
        $('#qualCadastroMostra').hide('fast');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=pegaTipoBanner&tipo=Cadastro&qual=' + $('#tipoCadastro').val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#qualCadastroMostra").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#qualCadastroMostra").show('slow');
                $("#qualCadastroMostra").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function verificaTipoBannerEdicao(url, idEdicao){
    if (!$("#tipoEdicao").val()){
        $('#qualEdicaoMostra').hide('fast');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=pegaTipoBanner&tipo=Edicao&qual=' + $('#tipoEdicao').val()+"&id="+idEdicao,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#qualEdicaoMostra").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#qualEdicaoMostra").show('slow');
                $("#qualEdicaoMostra").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function mostraPermissaoUsuario(id, url, user){
    $.ajax({
        url: url+'ajax.php?&acao=pegaPermissaoUsuario&id=' + id+"&user="+user,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#permissaoUsuario"+id).html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#permissaoUsuario"+id).show('slow');
            $("#permissaoUsuario"+id).html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function editarAnuncie(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=anuncie&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                alteraStatusEdicao2(data[4]);
                $("#assuntoEdicao").val(data[5]);
                $("#telefoneEdicao").val(data[6]);
                $("#mensagemEdicao").val(data[7]);
                $("#respostaEdicao").val(data[8]);
                $("#imagemEdicao").val('');
                $("#nomeBannerEdicao").val(data[9]);
                $("#linkBannerEdicao").val(data[10]);
                $("#targetBannerEdicao").val(data[11]);
                $("#posicaoBannerEdicao").val(data[12]);
                $("#tipoBannerEdicao").val(data[13]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#assuntoEdicao").val('Aguarde... Carregando...');
            $("#telefoneEdicao").val('Aguarde... Carregando...');
            $("#mensagemEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('');
            $("#respostaEdicao").val('Aguarde... Carregando...');
            $("#imagemEdicao").val('');
            $("#nomeBannerEdicao").val('Aguarde... Carregando...');
            $("#linkBannerEdicao").val('Aguarde... Carregando...');
            $("#targetBannerEdicao").val('_parent');
            $("#posicaoBannerEdicao").val('1');
            $("#tipoBannerEdicao").val('1');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function alteraStatusEdicao(id){
    if (id == 1){
        $("#respostaHTML").hide('fast');
    }
    else{
        $("#respostaHTML").show('slow');
    }
}
function alteraStatusEdicao2(id){
    if (id == 2){
        $("#respostaHTML").show('slow');
    }
    else{
        $("#respostaHTML").hide('fast');
    }
}
function editaProdutoPedido(id, request, url){
    $('#atualizarItem').show('slow');
    $.ajax({
        url: url+'ajax.php?&acao=editaProdutoPedido&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#productEdita").val(data[1]);
                selecionaProdutoEdita(data[2], request, data[1], data[3], url);

            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#selecionadoProdutoEdita").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function selecionaEnderecoPedido(id, url){
    if (id == "") {
        $("#enderecoCliente").html('Selecione o endereço corretamente!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaEnderecoPedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#enderecoCliente").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#enderecoCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function pegaEnderecosCliente(idCliente, idEndereco, url){
    if (idCliente == "") {
        $("#enderecosCliente").html('Selecione o cliente corretamente!');
        $("#enderecoCliente").html('');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=pegaEnderecosCliente&idCliente=' + idCliente+"&idEndereco="+idEndereco,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#enderecosCliente").html(data[1]);
                    $("#enderecoCliente").html(data[2]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#enderecosCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#enderecoCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function selecionaClientePedido(id, url){
    if (id == "") {
        $("#detalhesCliente").html('Selecione o cliente corretamente!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaClientePedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#detalhesCliente").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#detalhesCliente").show('slow');
                $("#detalhesCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function adicionaPermissao(user, module, field, url, userLog){
    $.ajax({
        url: url+'ajax.php?&acao=addPermissao&module=' + module+"&user="+user+"&field="+field+"&userLog="+userLog,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#"+field+module+user).html('<img src="'+url+'img/sucesso.png" width="20" style="cursor:pointer" onclick=removePermissao("'+user+'","'+module+'","'+field+'","'+url+'","'+userLog+'")>');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#"+field+module+user).html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function removePermissao(user, module, field, url, userLog){
    $.ajax({
        url: url+'ajax.php?&acao=removePermissao&module=' + module+"&user="+user+"&field="+field+'&userLog='+userLog,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#"+field+module+user).html('<img src="'+url+'img/erro.ico" width="20" style="cursor:pointer" onclick=adicionaPermissao("'+user+'","'+module+'","'+field+'","'+url+'","'+userLog+'")>');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#"+field+module+user).html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function editaEndereco(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=editarEndereco&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEditaEndereco").val(data[1]);
                $("#nomeEdita").val(data[2]);
                $("#cepEditaEndereco").val(data[3]);
                $("#logradouroEditaEndereco").val(data[4]);
                $("#numeroEditaEndereco").val(data[5]);
                $("#complementoEditaEndereco").val(data[6]);
                $("#bairroEditaEndereco").val(data[7]);
                $("#cidadeEditaEndereco").val(data[8]);
                $("#estadoEditaEndereco").val(data[9]);
                $("#botoesEditaEndereco").val(data[10]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#nomeEdita").val('Aguarde... Carregando...');
            $("#cepEditaEndereco").val('Aguarde... Carregando...');
            $("#logradouroEditaEndereco").val('Aguarde... Carregando...');
            $("#numeroEditaEndereco").val('Aguarde... Carregando...');
            $("#complementoEditaEndereco").val('Aguarde... Carregando...');
            $("#bairroEditaEndereco").val('Aguarde... Carregando...');
            $("#cidadeEditaEndereco").val('Aguarde... Carregando...');
            $("#estadoEditaEndereco").val('Aguarde... Carregando...');
            $("#botoesEditaEndereco").val('Aguarde... Carregando...');
        }
    });
}
function calculaFreteAdminPedido(cep, peso, altura, largura, comprimento, diametro, valorTotal, produtos, vale_presentes, valorCarrinho, url, freteSelecionado, idPedido, descontoAVista){
    if (cep.length == 9) {
        $.ajax({
            url: url+'ajax.php?&acao=calculaFreteAdminPedido&cep=' + cep+'&peso='+peso+'&altura=' + altura+'&largura=' + largura+'&comprimento=' + comprimento+"&diametro="+diametro+"&valorTotal="+valorTotal+"&produtos="+produtos+"&vale_presentes="+vale_presentes+"&valorCarrinho="+valorCarrinho+"&freteSelecionado="+freteSelecionado+"&idPedido="+idPedido+"&descontoAVista="+descontoAVista,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    var htmlFrete = data[1];
                    $("#freteAdminPedido").html(htmlFrete);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#freteAdminPedido").show('slow');
                $("#freteAdminPedido").html('<img src="'+url+'img/loader.gif" height="25">  Aguarde... Carregando...');
            }
        });
    }
}
function selecionaFormaFreteAdminPedido(key, cep, peso, comprimento, altura, largura, diametro, valorTotal, desconto, tela, valorFrete, prazoFrete, codigoFrete, tipo, produtos, vale_presentes, url, sessao, idPedido, idUser, descontoAVista){
    $.ajax({
        url: url+'ajax.php?&acao=selecionaFormaFreteAdminPedido&cep=' + cep+'&peso='+peso+'&altura=' + altura+'&largura=' + largura+'&comprimento=' + comprimento+"&diametro="+diametro+"&valorTotal="+valorTotal+"&desconto="+desconto+"&valorFrete="+valorFrete+"&prazoFrete="+prazoFrete+"&codigoFrete="+codigoFrete+"&tipo="+tipo+"&produtos="+produtos+"&vale_presentes="+vale_presentes+"&sessao="+sessao+"&idPedido="+idPedido+"&idUser="+idUser+"&descontoAVista="+descontoAVista,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                editarPedido(idPedido, url, idUser);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {

        }
    });
}
function cadastrarEndereco(um, url, id, user){
    if ($("#nome").val() == ''){
        alertBHCommerce('Informe o nome do endereço corretamente. Ex: Casa, Trabalho, etc.');
        $("#nome").focus();
    }
    else if ($("#cepEndereco").val() == ''){
        alertBHCommerce('Informe o cep do endereço corretamente.');
        $("#cepEndereco").focus();
    }
    else if ($("#logradouroEndereco").val() == ''){
        alertBHCommerce('Informe o logradouro do endereço corretamente.');
        $("#logradouroEndereco").focus();
    }
    else if ($("#numeroEndereco").val() == ''){
        alertBHCommerce('Informe o número do endereço corretamente.');
        $("#numeroEndereco").focus();
    }
    else if ($("#bairroEndereco").val() == ''){
        alertBHCommerce('Informe o bairro do endereço corretamente.');
        $("#bairroEndereco").focus();
    }
    else if ($("#cidadeEndereco").val() == ''){
        alertBHCommerce('Informe a cidade do endereço corretamente.');
        $("#cidadeEndereco").focus();
    }
    else if ($("#estadoEndereco").val() == ''){
        alertBHCommerce('Informe o estado do endereço corretamente.');
        $("#estadoEndereco").focus();
    }
    else if ($("#paisEndereco").val() == '' || $("#paisEndereco").val() == 'undefined'){
        alertBHCommerce('Informe o país do endereço corretamente.');
        $("#paisEndereco").focus();
    }
    else {
        $.ajax({
            url: url + 'ajax.php?&acao=cadastraEndereco&url=' + url + '&idCliente=' + $("#idCliente").val() + "&nome=" + $('#nome').val() + "&cepEndereco=" + $("#cepEndereco").val() + "&logradouroEndereco=" + $("#logradouroEndereco").val() + "&numeroEndereco=" + $("#numeroEndereco").val() + "&complementoEndereco=" + $("#complementoEndereco").val() + "&bairroEndereco=" + $("#bairroEndereco").val() + "&cidadeEndereco=" + $("#cidadeEndereco").val() + "&estadoEndereco=" + $("#estadoEndereco").val() + "&paisEndereco=" + $("#paisEndereco").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Endereço cadastrado com sucesso!');
                    visualizaEndereco(id, url, user);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: ' + data[1]);
                }
            }
        });
    }
}
function salvarEndereco(url){
    if ($("#nome").val() == ''){
        alertBHCommerce('Informe o nome do endereço corretamente. Ex: Casa, Trabalho, etc.');
        $("#nome").focus();
    }
    else if ($("#cepEndereco").val() == ''){
        alertBHCommerce('Informe o cep do endereço corretamente.');
        $("#cepEndereco").focus();
    }
    else if ($("#logradouroEndereco").val() == ''){
        alertBHCommerce('Informe o logradouro do endereço corretamente.');
        $("#logradouroEndereco").focus();
    }
    else if ($("#numeroEndereco").val() == ''){
        alertBHCommerce('Informe o número do endereço corretamente.');
        $("#numeroEndereco").focus();
    }
    else if ($("#bairroEndereco").val() == ''){
        alertBHCommerce('Informe o bairro do endereço corretamente.');
        $("#bairroEndereco").focus();
    }
    else if ($("#cidadeEndereco").val() == ''){
        alertBHCommerce('Informe a cidade do endereço corretamente.');
        $("#cidadeEndereco").focus();
    }
    else if ($("#estadoEndereco").val() == ''){
        alertBHCommerce('Informe o estado do endereço corretamente.');
        $("#estadoEndereco").focus();
    }
    else {
        $.ajax({
            url: url + 'ajax.php?&acao=cadastraEndereco&url=' + url + '&idCliente=' + $("#idClienteEndereco").val() + "&nome=" + $('#nome').val() + "&cepEndereco=" + $("#cepEndereco").val() + "&logradouroEndereco=" + $("#logradouroEndereco").val() + "&numeroEndereco=" + $("#numeroEndereco").val() + "&complementoEndereco=" + $("#complementoEndereco").val() + "&bairroEndereco=" + $("#bairroEndereco").val() + "&cidadeEndereco=" + $("#cidadeEndereco").val() + "&estadoEndereco=" + $("#estadoEndereco").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Endereço cadastrado com sucesso!');
                    pegaEnderecos($("#idClienteEndereco").val(), url);
                    fecha('cadastrarEndereco');
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: ' + data[1]);
                }
            }
        });
    }
}
function atualizarEndereco(id, url, id2, user){
    if ($("#nome"+id+id2).val() == ''){
        alertBHCommerce('Informe o nome do endereço corretamente. Ex: Casa, Trabalho, etc.');
        $("#nome"+id+id2).focus();
    }
    else if ($("#cepEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe o cep do endereço corretamente.');
        $("#cepEndereco"+id+id2).focus();
    }
    else if ($("#logradouroEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe o logradouro do endereço corretamente.');
        $("#logradouroEndereco"+id+id2).focus();
    }
    else if ($("#numeroEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe o número do endereço corretamente.');
        $("#numeroEndereco"+id+id2).focus();
    }
    else if ($("#bairroEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe o bairro do endereço corretamente.');
        $("#bairroEndereco"+id+id2).focus();
    }
    else if ($("#cidadeEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe a cidade do endereço corretamente.');
        $("#cidadeEndereco"+id+id2).focus();
    }
    else if ($("#estadoEndereco"+id+id2).val() == ''){
        alertBHCommerce('Informe o estado do endereço corretamente.');
        $("#estadoEndereco"+id+id2).focus();
    }
    else if ($("#paisEndereco" + id+id2).val() == ''){
        alertBHCommerce('Informe o país do endereço corretamente.');
        $("#paisEndereco"+id+id2).focus();
    }
    else {
        $.ajax({
            url: url + 'ajax.php?&acao=atualizarEndereco&url=' + url + '&user='+user+'&idCliente=' + $("#idCliente" + id+id2).val() + '&idEndereco=' + $("#idEndereco" + id+id2).val() + "&nome=" + $('#nome' + id+id2).val() + "&cepEndereco=" + $("#cepEndereco" + id+id2).val() + "&logradouroEndereco=" + $("#logradouroEndereco" + id+id2).val() + "&numeroEndereco=" + $("#numeroEndereco" + id+id2).val() + "&complementoEndereco=" + $("#complementoEndereco" + id+id2).val() + "&bairroEndereco=" + $("#bairroEndereco" + id+id2).val() + "&cidadeEndereco=" + $("#cidadeEndereco" + id+id2).val() + "&estadoEndereco=" + $("#estadoEndereco" + id+id2).val() + "&paisEndereco=" + $("#paisEndereco" + id+id2).val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Endereço atualizado com sucesso!');
                    visualizaEndereco(id2, url);
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: ' + data[1]);
                }
            }
        });
    }
}
function editarEndereco(url){
    var id2 = $("#idClienteEditaEndereco").val();
    if ($("#nomeEdita").val() == ''){
        alertBHCommerce('Informe o nome do endereço corretamente. Ex: Casa, Trabalho, etc.');
        $("#nomeEdita").focus();
    }
    else if ($("#cepEditaEndereco").val() == ''){
        alertBHCommerce('Informe o cep do endereço corretamente.');
        $("#cepEditaEndereco").focus();
    }
    else if ($("#logradouroEditaEndereco").val() == ''){
        alertBHCommerce('Informe o logradouro do endereço corretamente.');
        $("#logradouroEditaEndereco").focus();
    }
    else if ($("#numeroEditaEndereco").val() == ''){
        alertBHCommerce('Informe o número do endereço corretamente.');
        $("#numeroEditaEndereco").focus();
    }
    else if ($("#bairroEditaEndereco").val() == ''){
        alertBHCommerce('Informe o bairro do endereço corretamente.');
        $("#bairroEditaEndereco").focus();
    }
    else if ($("#cidadeEditaEndereco").val() == ''){
        alertBHCommerce('Informe a cidade do endereço corretamente.');
        $("#cidadeEditaEndereco").focus();
    }
    else if ($("#estadoEditaEndereco").val() == ''){
        alertBHCommerce('Informe o estado do endereço corretamente.');
        $("#estadoEditaEndereco").focus();
    }
    else if ($("#paisEndereco").val() == ''){
        alertBHCommerce('Informe o país do endereço corretamente.');
        $("#paisEndereco").focus();
    }
    else {
        $.ajax({
            url: url + 'ajax.php?&acao=atualizarEndereco&url=' + url + '&idCliente=' + $("#idClienteEditaEndereco").val() + '&idEndereco=' + $("#idEditaEndereco").val() + "&nome=" + $('#nomeEdita').val() + "&cepEndereco=" + $("#cepEditaEndereco").val() + "&logradouroEndereco=" + $("#logradouroEditaEndereco").val() + "&numeroEndereco=" + $("#numeroEditaEndereco").val() + "&complementoEndereco=" + $("#complementoEditaEndereco").val() + "&bairroEndereco=" + $("#bairroEditaEndereco").val() + "&cidadeEndereco=" + $("#cidadeEditaEndereco").val() + "&estadoEndereco=" + $("#estadoEditaEndereco").val()+ "&paisEndereco=" + $("#paisEditaEndereco").val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Endereço atualizado com sucesso!');
                    fecha('editaEndereco');
                    pegaEnderecos(id2, url);
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: ' + data[1]);
                }
            }
        });
    }
}
function mostraCarrinhoDeCompras(idClient, url){
    $("#finalizarPedido").hide('fast');
    $.ajax({
        url: url+'ajax.php?&acao=mostraCarrinhoDeCompras&idClient=' + idClient,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#carrinhoDeCompras").html(data[1]);
                $("#numProdutosCarrinho").val(data[2]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#carrinhoDeCompras").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function excluirCarrinho(id, url){
    if (confirm('Tem certeza que deseja excluir esse produto do carrinho?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirCarrinho&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('itensCarrinho', url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#carrinhoDeCompras").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function finalizarPedido(url) {
    if ($("#numProdutosCarrinho").val() == 0){
        alertBHCommerce('Nenhum produto no carrinho de compras!');
    }
    else {
        $("#finalizarPedido").show('slow');
        $.ajax({
            url: url + 'ajax.php?&acao=finalizarPedido',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#finalizarPedido").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: ' + data[1]);
                }
            },
            beforeSend: function () {
                $("#finalizarPedido").html('<button type="button" class="close" onClick=fecha("finalizarPedido")><span aria-hidden="true">&times;</span></button><img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
        location.href = "#finalizarPedido";
    }
}
function comprar(url){
    if ($('#formaPagamentoCompra').val() == ""){
        alertBHCommerce('Informe a forma de pagamento corretamente!');
        $("#formaPagamentoCompra").focus();
    }
    else if ($('#enderecoCompra').val() == ""){
        alertBHCommerce('Informe o endereço da compra corretamente!');
        $("#enderecoCompra").focus();
    }
    else{
        if(confirm('Tem certeza que deseja realizar o orçamento?')) {
            $.ajax({
                url: url + 'ajax.php?&acao=comprar&payment_method=' + $('#formaPagamentoCompra').val() + '&address=' + $('#enderecoCompra').val(),
                success: function (data) {
                    var data = data.split('|-|');
                    if (data[0] == 1) {
                        $("#finalizarPedido").html(data[1]);
                        mostraComprovante(data[2], url);
                        //mostraCarrinhoDeCompras('', url);
                    } else if (data[0] == 0) {
                        alertBHCommerce('Erro: ' + data[1]);
                    }
                },
                beforeSend: function () {
                    $("#finalizarPedido").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando Comprovante...');
                }
            });
        }
    }
}
function verInformacoesSistemaEscolar(id) {
    $("#informacoesSistemaEscolar" + id).show('slow');
}
function verInformacoesSistemaCaixa(id){
    $("#informacoesSistemaCaixa"+id).show('slow');
}
function mostraComprovante(request_id, url){
    $.ajax({
        url: url + 'ajax.php?&acao=mostra_comprovante&request_id=' + request_id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#finalizarPedido").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: ' + data[1]);
            }
        },
        beforeSend: function () {
            $("#finalizarPedido").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando Comprovante...');
        }
    });
}
function selecionaFormaPagamento(id, url, t){
    $.ajax({
        url: url+'ajax.php?&acao=enderecosCompra&id='+id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#enderecosCompra").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#enderecosCompra").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function limparCarrinho(url){
    if (confirm('Tem certeza que deseja limpar esse carrinho?')){
        $.ajax({
            url: url+'ajax.php?&acao=limparCarrinho',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    mostraCarrinhoDeCompras('', url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#carrinhoDeCompras").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function pegaPedidos(idClient, url){
    $.ajax({
        url: url+'ajax.php?&acao=pegaPedidos&idClient=' + idClient,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#pedidosCliente").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#pedidosCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function excluirEndereco(id, url, id2, user) {
    if(confirm("Tem certeza que deseja excluir o endereço "+id+"?")){
        $.ajax({
            url: url+'ajax.php?&acao=excluirEndereco&id=' + id+"&user="+user,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Endereço excluído com sucesso! Aguarde o carregamento dos endereços!');
                    visualizaEndereco(id2, url);
                    pegaEnderecos(id2, url);
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#htmlVisualizaEnderecos"+id).html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function visualizaEndereco(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizaEnderecos&id=' + id + "&user="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#htmlVisualizaEnderecos").html(data[1]);
            } else if (data[0] == 2) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#htmlVisualizaEnderecos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function selecionaTipoServicoBugTracking(id){
    if (id == ""){
        $("#tipoVersaoHTML").html('<label class="form-label">\n' +
            '                                Versão\n' +
            '                                <span class="text-danger">*</span>\n' +
            '                            </label>\n' +
            '\n' +
            '                            <select class="form-control" name="typeVersion" id="typeVersion" required\n' +
            '                                    data-msg="Por Favor, informe o tipo de Serviço."\n' +
            '                                    data-error-class="u-has-error"\n' +
            '                                    data-success-class="u-has-success">\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                            </select>');
        $("#prioridadeHTML").html('<label class="form-label">\n' +
            '                                Prioridade\n' +
            '                                <span class="text-danger">*</span>\n' +
            '                            </label>\n' +
            '\n' +
            '                            <select class="form-control" name="priority" id="priority" required\n' +
            '                                    data-msg="Por Favor, informe a prioridade."\n' +
            '                                    data-error-class="u-has-error"\n' +
            '                                    data-success-class="u-has-success">\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                            </select>');
        $("#categoriaHTML").html('<label class="form-label">\n' +
            '                                Categoria\n' +
            '                                <span class="text-danger">*</span>\n' +
            '                            </label>\n' +
            '\n' +
            '                            <select class="form-control" name="category" id="category" required\n' +
            '                                    data-msg="Por Favor, informe a categoria."\n' +
            '                                    data-error-class="u-has-error"\n' +
            '                                    data-success-class="u-has-success">\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                            </select>');
    }
    else {
        $.ajax({
            url: 'ajax.php?&acao=selecionaTipoServiço&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#tipoVersaoHTML").html(data[1]);
                    $("#prioridadeHTML").html(data[2]);
                    $("#categoriaHTML").html(data[3]);
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#tipoVersaoHTML").html('<img src="img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#prioridadeHTML").html('<img src="img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#categoriaHTML").html('<img src="img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function selecionaTipoServicoAdmin(id, url, version = "", priority = 0, category = 0){
    if (id == ""){
        $("#versaoHTML").html('<select name="typeVersion" id="typeVersion" required>\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                            </select>');
        $("#prioridadeHTML").html('<select  name="priority" id="priority" required>\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                       </select>');
        $("#categoriaHTML").html('<select name="category" id="category" required>\n' +
            '                                <option value="">Selecione o tipo de serviço corretamente</option>\n' +
            '                            </select>');
    }
    else {
        $.ajax({
            url: url+'ajax.php?&acao=selecionaTipoServiçoAdmin&id=' + id+"&version="+version+"&priority="+priority+"&category="+category,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#versaoHTML").html(data[1]);
                    $("#prioridadeHTML").html(data[2]);
                    $("#categoriaHTML").html(data[3]);
                } else if (data[0] == 2) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#versaoHTML").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#prioridadeHTML").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#categoriaHTML").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function alteraStatusEdicao(id){
    if (id == 2){
        $("#respostaHTML").show('slow');
    }
    else{
        $("#respostaHTML").hide('fast');
    }
}
function pegaEnderecos(idCliente, url){
    $.ajax({
        url: url+'ajax.php?&acao=pegaEnderecos&idCliente=' + idCliente,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#enderecosCliente").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#enderecosCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function novoEndereco(){
    $("#novoEndereco").show('slow');
}
function abre(id){
    $("#loja-virtual").hide('fast');
    $("#sites").hide('fast');
    $("#sites-internacionais").hide('fast');
    $("#sistema-escolar").hide('fast');
    $("#sistema-de-caixa").hide('fast');
    $("#catalogo-virtual").hide('fast');
    $("#hospedagem-de-sites").hide('fast');
    $("#registro-de-dominios").hide('fast');
    $("#aplicativos-para-celular").hide('fast');
    $("#videos").hide('fast');
    $("#"+id).show('slow');
    location.href='#'+id;
}
function abreFecha(id){
    if (document.getElementById(id).style.display == 'none'){
        $("#"+id).show('slow');
    }
    else{
        $("#"+id).hide('fast');
    }
}
function detalhesPedido(id, url){
    $("#detalhesPedido").show('slow');
    if (id == ""){
        $("#detalhesPedido").html('<button type="button" class="close" onClick=fecha("detalhesPedido")><span aria-hidden="true">&times;</span></button>Selecione o orçamento corretamente...');
    }else{
        $.ajax({
            url: url+'ajax.php?&acao=detalhesPedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#detalhesPedido").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#detalhesPedido").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function selecionaProduto(id, url){
    $("#productItemsRealizarPedido").show('slow');
    if(id == ""){
        $("#productItemsRealizarPedido").hide('fast');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaProduto&product=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#productItemsRealizarPedido").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#productItemsRealizarPedido").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function selecionaProdutoItem(id, url, id2){
    $("#passo03").show('slow');
    if(id2 == ""){
        alertBHCommerce('Selecione o item do produto corretamente!');
        $("#passo03").hide('fast');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaPasso03&product=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#passo03").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#passo03").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function fazNada(){

}
function mostraMenu(qual, qtosTem){
    for (i = 0; i < qtosTem; i++){
        document.getElementById('menu'+i).className = "nav-item";
    }
    document.getElementById('menu'+qual).className = "nav-item active";
}
function gerarArquivo(tipo, table, idUser, url, idCliente = ''){
    window.open(url+'gerarArquivo.php?tipo='+tipo+'&table='+table+'&idCliente='+idCliente+'&listaPresenteEdita='+$("#listaPresenteEdita").val()+'&listaConvidadosEdita='+$("#listaConvidadosEdita").val()+'&nomeFiltro='+$('#nomeFiltro').val()+'&emailFiltro='+$('#emailFiltro').val()+'&dataFiltro='+$('#dataFiltro').val()+"&dataFimFiltro="+$("#dataFimFiltro").val()+"&paginaFiltro="+$("#paginaFiltro").val()+"&subitemFiltro="+$("#subitemFiltro").val()+"&bannerFiltro="+$("#bannerFiltro").val()+"&categoriaFiltro="+$("#categoriaFiltro").val()+"&marcaFiltro="+$("#marcaFiltro").val()+"&sugestaoFiltro="+$("#sugestaoFiltro").val()+"&relacionamentoFiltro="+$("#relacionamentoFiltro").val()+"&seloFiltro="+$("#seloFiltro").val()+"&produtoFiltro="+$("#produtoFiltro").val()+"&redeSocialFiltro="+$("#redeSocialFiltro").val()+"&parceiroFiltro="+$("#parceiroFiltro").val()+"&clienteFiltro="+$("#clienteFiltro").val()+"&acaoFiltro="+$("#acaoFiltro").val()+"&nomeFiltro="+$("#nomeFiltro").val()+"&emailFiltro="+$("#emailFiltro").val()+"&redeSocialFiltro="+$("#redeSocialFiltro").val()+"&parceiroFiltro="+$("#parceiroFiltro").val()+"&seloFiltro="+$("#seloFiltro").val()+"&listaPresenteFiltro="+$("#listaPresentesFiltro").val()+"&buscaFiltro="+$('#buscaFiltro').val()+"&atributoFiltro="+$('#atributoFiltro').val()+"&anoFiltro="+$('#anoFiltro').val()+"&diaFiltro="+$("#diaFiltro").val()+"&diaFimFiltro="+$("#diaFimFiltro").val()+"&mesFimFiltro="+$("#mesFimFiltro").val()+"&anoFimFiltro="+$("#anoFimFiltro").val()+"&feriadoFiltro="+$("#feriadoFiltro").val()+"&idUser="+idUser);
}
function exportarNews(url, idUser){
    location.href=url+'exportarNews.php?nomeFiltro='+$('#nomeFiltro').val()+'&emailFiltro='+$('#emailFiltro').val()+'&dataFiltro='+$('#dataFiltro').val()+"&idUser="+idUser;
}
function exportarProduto(url, idUser){
    location.href=url+'exportarProduto.php?nomeFiltro='+$('#nomeFiltro').val()+"&idUser="+idUser;
}
function exportarNacionalidade(url, idUser){
    location.href=url+'exportarNacionalidade.php?nomeFiltro='+$('#nomeFiltro').val()+"&idUser="+idUser;
}
function exportarPais(url, idUser){
    location.href=url+'exportarPais.php?nomeFiltro='+$('#nomeFiltro').val()+"&idUser="+idUser;
}
function exportarLogs(url, idUser){
    location.href=url+'exportarLogs.php?usuarioFiltro='+$('#usuarioFiltro').val()+'&acaoFiltro='+$('#acaoFiltro').val()+"&idUser="+idUser;
}
function exportarLogsCliente(url, idUser){
    location.href=url+'exportarLogsCliente.php?clienteFiltro='+$('#clienteFiltro').val()+'&acaoFiltro='+$('#acaoFiltro').val()+'&dataFiltro='+$('#dataFiltro').val()+"&idUser="+idUser;
}
function exportarClientes(url, idUser){
    location.href=url+'exportarClientes.php?nomeFiltro='+$('#nomeFiltro').val()+'&emailFiltro='+$('#emailFiltro').val()+"&idUser="+idUser;
}
function exportarPedidos(url, idUser){
    location.href=url+'exportarPedidos.php?idFiltro='+$('#idFiltro').val()+'&emailFiltro='+$('#emailFiltro').val()+"&idUser="+idUser;
}
function editarNewsletter(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=newsletter&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarBugTracking(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=bugTracking&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                alteraStatusEdicao(data[4]);
                $("#tituloEdicao").val(data[5]);
                $("#tipoServicoEdicao").val(data[6]);
                selecionaTipoServicoAdmin(data[6], $("#urlEdicao").val(), data[7], data[8], data[9]);
                $("#mensagemEdicao").val(data[10]);
                $("#respostaEdicao").val(data[11]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#tituloEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarFaleConosco(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=faleConosco&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                alteraStatusEdicao(data[4]);
                $("#assuntoEdicao").val(data[5]);
                $("#telefoneEdicao").val(data[6]);
                $("#mensagemEdicao").val(data[7]);
                $("#respostaEdicao").val(data[8]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#assuntoEdicao").val('Aguarde... Carregando...');
            $("#telefoneEdicao").val('Aguarde... Carregando...');
            $("#mensagemEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('');
            $("#respostaEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function visualizarNewsletter(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=newsletter&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoNewsletter").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoNewsletter").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarPedido(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=pedido&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoOrcamentos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoOrcamentos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarBugTracking(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=bugTracking&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoNews").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoNews").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarAnuncie(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=anuncie&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoAnuncie").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoAnuncie").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function excluirAnuncie(id, url, idUser, artigo, table, lista){
    if (confirm('Tem certeza que deseja excluir esse anuncie aqui?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=anuncie_aquis&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('anuncie', url, idUser);
                    $('#registroExcluidoComSucessoListasPresentes').show('slow');
                    window.setTimeout('$("#registroExcluidoComSucessoListasPresentes").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirImportar(img, url){
    if (confirm('Tem certeza que deseja excluir essa imagem à se importar?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirImportar&img='+img,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alert('Imagem excluída com sucesso! Aguarde o refresh da página!');
                    location.href="";
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setTimeout('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function visualizarFaleConosco(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=faleConosco&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoNews").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoNews").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarBackgrounds(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=backgrounds&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoBackground").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoBackground").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function editarPedido(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=pedido&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#edicaoOrcamentos").html(data[1]);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#edicaoOrcamentos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#botaoEditar").hide('fast');
        }
    });
}
function visualizarVale(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=visualizarVale&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#vale").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#vale").show('slow');
            $("#vale").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function edicaoOrcamento(url){
    $.ajax({
        url: url+'ajax.php?&acao=editar&table=orcamento&id=' + $("#idEdicao").val()+"&idEdicao=" + $("#idEdicao").val()+"&statusEditar="+$("#statusEditar").val()+"&codRastreamento="+$("#codRastreamento").val()+"&formaPagamentoEditar="+$("#formaPagamentoEditar").val()+"&clienteEditar="+$("#clienteEditar").val()+"&enderecoEditar="+$("#enderecoEditar").val()+"&idUserEdicao="+$("#idUserEdicao").val(),
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                alertBHCommerce('Orçamento editado com sucesso!');
                editarPedido($("#idEdicao").val(), url, $("#idUserEdicao").val());
                verificaNovamente('pedido', url, $("#idUserEdicao").val());
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        }
    });
}
function editarBanner(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=banner&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#posicaoEdicao").val(data[5]);
                $("#linkEdicao").val(data[6]);
                $("#targetEdicao").val(data[7]);
                $("#slugEdicao").val(data[8]);
                $("#tipoEdicao").val(data[9]);
                verificaTipoBannerEdicao(url, data[10]);
                $("#idUserEdicao").val(idUser);
                $("#imagemEdicao").val('');
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#descricaoEdicao").val('Aguarde... Carregando...');
            $("#linkEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#targetEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#imagemEdicao").val('');
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarFeriados(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=feriados&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#dataEdicao").val(data[4]);
                $("#comMsgEdicao").val(data[5]);
                selecionaComMsgEdi(data[5]);
                $("#msgEdicao").val(data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#dataEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarComentariosFeriados(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=comentariosFeriados&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#feriadoEdicao").val(data[2]);
                $("#clienteEdicao").val(data[3]);
                $("#comentarioEdicao").val(data[4]);
                selEstrelasComentariosFeriadosEdicao(data[5], url);
                $("#statusEdicao").val(data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#comentarioEdicao").val('Aguarde... Carregando...');
            $("#feriadoEdicao").val('');
            $("#clienteEdicao").val('');
            $("#statusEdicao").val(0);
            limparSelecaoAvaliacaoComentarioProdutoEdicao(url);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarParceiros(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=parceiros&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#linkEdicao").val(data[5]);
                $("#cliquesEdicao").html("<label for=''>Cliques:</label> "+data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#descricaoEdicao").val('Aguarde... Carregando...');
            $("#linkEdicao").val('Aguarde... Carregando...');
            $("#cliquesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarNacionalidade(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=nacionalidade&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#padraoEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val(0);
            $("#padraoEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarPais(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=pais&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#padraoEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val(0);
            $("#padraoEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarRedesSociais(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=redesSociais&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#linkEdicao").val(data[5]);
                $("#cliquesEdicao").html("<label for=''>Cliques:</label> "+data[6]);
                $("#slugEdicao").val(data[7]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#linkEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#cliquesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#imagemEdicao").val('');
            $("#backgroundEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarMarcas(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=marcas&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#slugEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#backgroundEdicao").val('');
            $("#imagemEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarSelos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=selos&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#slugEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#backgroundEdicao").val('');
            $("#imagemEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarSugestoes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=sugestoes&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#descricaoEdicao").val(data[4]);
                $("#slugEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#backgroundEdicao").val('');
            $("#imagemEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTipoVersao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tipoVersao&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#tipoServicoEdicao").val(data[2]);
                $("#nomeEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#tipoServicoEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarCategorias(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=categorias&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#categoriaEdicao").val(data[2]);
                $("#nomeEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#slugEdicao").val(data[5]);
                $("#apareceMenuEdicao").val(data[6]);
                $("#imagemEdicao").val('');
                $("#backgroundEdicao").val('');
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#categoriaEdicao").val('0');
            $("#statusEdicao").val(0);
            $("#apareceMenuEdicao").val(0);
            $("#imagemEdicao").val('');
            $("#backgroundEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarRelacionamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=relacionamentos&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#relacionamentoEdicao").val(data[2]);
                $("#nomeEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#slugEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#slugEdicao").val('Aguarde... Carregando...');
            $("#relacionamentoEdicao").val('0');
            $("#imagemEdicao").val('');
            $("#backgroundEdicao").val('');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarAtributos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=atributo&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#atributoEdicao").val(data[2]);
                $("#nomeEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#atributoEdicao").val('0');
            $("#statusEdicao").val(0);
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarStatusOrcamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=statusOrcamento&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#siglaEdicao").val(data[2]);
                $("#nomeEdicao").val(data[3]);
                $("#colorEdicao").val(data[4]);
                $("#backgroundEdicao").val(data[5]);
                $("#enviarEmailEdicao").val(data[6]);
                if (data[6] == 1){
                    $("#enviarEmail").show('slow');
                }
                else{
                    $("#enviarEmail").hide('fast');
                }
                $("#emailEdicao").val(data[7]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#siglaEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarUsuarios(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=usuarios&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#senhaEdicao").val('');
                $("#imagemEdicao").val('');
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#senhaEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarUsuariosPre(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=usuariosPre&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[3]);
                $("#senhaEdicao").val('');
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#senhaEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTipoDocumento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tipoDocumento&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarClientes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=clientes&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#emailEdicao").val(data[2]);
                $("#senhaEdicao").val('');
                $("#tipoEdicao").val(data[3]);
                $("#infsPessoaEdicao").html(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#emailEdicao").val('Aguarde... Carregando...');
            $("#senhaEdicao").val('Aguarde... Carregando...');
            $("#infsPessoaEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#tipoEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function selecionaTipoPessoa(valor, nome){
    if (valor == ""){
        var html = "Sem o tipo de pessoa selecionado!";
    }
    else if (valor == 'F'){
        var html = '<label for="nomeEdicao">Nome: </label><input type="text" name="nomeEdicao" id="nomeEdicao" class="form-control" value="" required><label for="cpfEdicao">CPF: </label><input type="text" name="cpfEdicao" id="cpfEdicao" class="form-control" value="" onkeyup="formataCampo(this, \'###.###.###-##\', event)" maxlength="14" required><label for="rgEdicao">RG: </label><input type="text" name="rgEdicao" id="rgEdicao" class="form-control" value="" required><label for="dtNascEdicao">Data de Nascimento: </label><input type="date" name="dtNascEdicao" id="dtNascEdicao" class="form-control" value="" required><label for="celEdicao">Celular: </label><input type="text" name="celEdicao" id="celEdicao" class="form-control" value="" onkeyup="formataCampo(this, \'(XX)XXXXX-XXXX\', event)" maxlength="14" required>';
    }
    else if (valor == 'J'){
        var html = '<label for="razaoSocialEdicao">Razão Social: </label><input type="text" name="razaoSocialEdicao" id="razaoSocialEdicao" class="form-control" value="" required>\n' +
            '                                   <label for="nomeFantasiaEdicao">Nome Fantasia: </label><input type="text" name="nomeFantasiaEdicao" id="nomeFantasiaEdicao" class="form-control" value="" required>\n' +
            '                                   <label for="contatoEdicao">Nome do Contato: </label><input type="text" name="contatoEdicao" id="contatoEdicao" class="form-control" value="" required>\n' +
            '                                   <label for="cnpjEdicao">CNPJ: </label><input type="text" name="cnpjEdicao" id="cnpjEdicao" class="form-control" value="" onkeyup="formataCampo(this, \'##.###.###/####-##\', event)" maxlength="18" required>\n' +
            '                                   <label for="ieEdicao">Inscrição Estadual: </label><input type="text" name="ieEdicao" id="ieEdicao" class="form-control" value="" required><sup>* Informe "ISENTO" caso não posssua esse dado.</sup><br>\n' +
            '                                   <label for="imEdicao">Inscrição Municipal: </label><input type="text" name="imEdicao" id="imEdicao" class="form-control" value="" required><sup>* Informe "ISENTO" caso não posssua esse dado.</sup><br>\n' +
            '                                   <label for="dataAberturaEdicao">Data de Abertura: </label><input type="date" name="dataAberturaEdicao" id="dataAberturaEdicao" class="form-control" value="" required>\n' +
            '                                   <label for="telefoneEdicao">Telefone: </label><input type="text" name="telefoneEdicao" id="telefoneEdicao" class="form-control" value="" onkeyup="formataCampo(this, \'(XX)XXXX-XXXX\', event)" maxlength="13" required>\n' +
            '                                   <label for="celEdicao">Celular: </label><input type="text" name="celEdicao" id="celEdicao" class="form-control" value="" onkeyup="formataCampo(this, \'(XX)XXXXX-XXXX\', event)" maxlength="14" required>';
    }
    $('#infsPessoaEdicao').html(html);
}
function editarCupomDesconto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=cupomDesconto&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#codigoEdicao").val(data[2]);
                $("#tipoEdicao").val(data[3]);
                if(data[3] == 1){
                    var html = '<label for="valorEdicao">Valor: R$</label><input type="text" name="valorEdicao" id="valorEdicao" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorEdicao\')">';
                }
                else if(data[3] == 2){
                    var html = '<label for="valorEdicao">Valor: %</label><input type="text" name="valorEdicao" id="valorEdicao" value="" required class="form-control" onkeyup="mascaraValor(this.value, \'valorEdicao\')">';
                }
                else{
                    var html = "Selecione o tipo corretamente...";
                }
                $("#valorEdit").html(html);
                $("#valorEdicao").val(data[4]);
                $("#validadeEdicao").val(data[5]);
                $("#utilizavelEdicao").val(data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#codigoEdicao").val('Aguarde... Carregando...');
            $("#tipoEdicao").val('');
            $("#valorEdit").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#validadeEdicao").val('');
            $("#utilizavelEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarValePresente(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=valePresente&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#codigoEdicao").val(data[2]);
                $("#valorEdicao").val(data[3]);
                $("#validadeEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#codigoEdicao").val('Aguarde... Carregando...');
            $("#validadeEdicao").val('');
            $("#valorEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTiposProduto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tiposProduto&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarListasPresentes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=listaPresente&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#clienteEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#dataAniversarioEdicao").val(data[4]);
                $("#nomeMaeEdicao").val(data[5]);
                $("#nomePaiEdicao").val(data[6]);
                $("#idadeEdicao").val(data[7]);
                $("#cepEdicao").val(data[8]);
                $("#logradouroEdicao").val(data[9]);
                $("#numeroEdicao").val(data[10]);
                $("#complementoEdicao").val(data[11]);
                $("#bairroEdicao").val(data[12]);
                $("#cidadeEdicao").val(data[13]);
                $("#estadoEdicao").val(data[14]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#clienteEdicao").val('');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#dataAniversarioEdicao").val('Aguarde... Carregando...');
            $("#nomeMaeEdicao").val('Aguarde... Carregando...');
            $("#nomePaiEdicao").val('Aguarde... Carregando...');
            $("#idadeEdicao").val('Aguarde... Carregando...');
            $("#cepEdicao").val('Aguarde... Carregando...');
            $("#logradouroEdicao").val('Aguarde... Carregando...');
            $("#numeroEdicao").val('Aguarde... Carregando...');
            $("#complementoEdicao").val('Aguarde... Carregando...');
            $("#bairroEdicao").val('Aguarde... Carregando...');
            $("#cidadeEdicao").val('Aguarde... Carregando...');
            $("#estadoEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarProdutos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=produto&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#idProdutoRelacionamento").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#apareceVitrineEdicao").val(data[5]);
                $("#destaqueEdicao").val(data[6]);
                $("#compreAgoraEdicao").val(data[7]);
                $("#freteGratisEdicao").val(data[8]);
                $("#mostraCarrinhoEdicao").val(data[9]);
                $("#valorContaParaOFreteEdicao").val(data[10]);
                $("#marcaEdicao").val(data[11]);
                for (i = 0; i < 999; i++){
                    if (document.getElementById('deptoEditar'+i)){
                        document.getElementById("deptoEditar"+i).checked = false;
                    }
                    if (document.getElementById('subdeptoEditar'+i)){
                        document.getElementById("subdeptoEditar"+i).checked = false;
                    }
                    if (document.getElementById('sugestaoEditar'+i)){
                        document.getElementById("sugestaoEditar"+i).checked = false;
                    }
                    if (document.getElementById('selosEditar'+i)){
                        document.getElementById("selosEditar"+i).checked = false;
                    }
                    if (document.getElementById('relacionamentosEditar'+i)){
                        document.getElementById("relacionamentosEditar"+i).checked = false;
                    }
                    if (document.getElementById('atributosEditar'+i)){
                        document.getElementById("atributosEditar"+i).checked = false;
                    }
                }
                var vet = data[12].split('*|*');
                if (vet.length > 0){
                    for (i = 0; i < vet.length; i++){
                        if (document.getElementById('deptoEditar'+vet[i])){
                            document.getElementById("deptoEditar" + vet[i]).checked = true;
                        }
                    }
                }
                verificaDepto(url);
                var vet = data[14].split('*|*');
                if (vet.length > 0){
                    for (i = 0; i < vet.length; i++){
                        if (document.getElementById('sugestaoEditar'+vet[i])){
                            document.getElementById("sugestaoEditar" + vet[i]).checked = true;
                        }
                    }
                }
                var vet = data[15].split('*|*');
                if (vet.length > 0){
                    for (i = 0; i < vet.length; i++){
                        if (document.getElementById('selosEditar'+vet[i])){
                            document.getElementById("selosEditar" + vet[i]).checked = true;
                        }
                    }
                }
                var vet = data[16].split('*|*');
                if (vet.length > 0){
                    for (i = 0; i < vet.length; i++){
                        if (document.getElementById('relacionamentosEditar'+vet[i])){
                            document.getElementById("relacionamentosEditar" + vet[i]).checked = true;
                        }
                    }
                }
                var vet = data[17].split('*|*');
                if (vet.length > 0){
                    for (i = 0; i < vet.length; i++){
                        if (document.getElementById('atributosEditar'+vet[i])){
                            document.getElementById("atributosEditar" + vet[i]).checked = true;
                        }
                    }
                }
                $("#imagemEdicao").val('');
                var htmlEstoque = "<br><br><h3>Estoque</h3><iframe src='"+data[18]+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
                $('#estoqueDados').html(htmlEstoque);
                var htmlImagens = "<br><br><h3>Imagens</h3><iframe src='"+data[19]+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
                $('#imagensDados').html(htmlImagens);
                var htmlVideos = "<br><br><h3>Vídeos</h3><iframe src='"+data[20]+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
                $('#videosDados').html(htmlVideos);
                $("#promocaoEdicao").val(data[21]);
                $("#itemRecomendadoEdicao").val(data[22]);
                $("#apareceLateralEsquerdaEdicao").val(data[23]);
                $("#slugEdicao").val(data[24]);
                $("#ofertaDoDiaEdicao").val(data[25]);
                $("#ofertaEspecialEdicao").val(data[26]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
				$.ajax({
					url: url+'ajax.php?&acao=pegaDados&table=produto_description&id=' + id,
					success: function (data) {
						var data = data.split('|-|');
						if (data[0] == 1) {
							$("#qtasTemEdicao").val(data[1]);
							$("#descricoesEdicao").html(data[2]);
						} else if (data[0] == 0) {
							alertBHCommerce('Erro: '+data[1]);
						}
					},
					beforeSend: function () {
						$("#qtasTemEdicao").val('Aguarde... Carregando...');
						$("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
					}
				});
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function cadastraMensagemPedido(idPedido, url){
    if(document.getElementById("msInterna").checked == false && document.getElementById("msExterna").checked == false && document.getElementById("msEmail").checked == false){
        alertBHCommerce('Informe o tipo de mensagem corretamente!');
    }
    else if ($("#mensagem").val() == ""){
        alertBHCommerce('Informe a mensagem corretamente');
        $("#mensagem").focus();
    }
    else {
        if (document.getElementById('msInterna').checked == true){
            msInterna = 1;
        }
        else{
            msInterna = 0;
        }
        if (document.getElementById('msExterna').checked == true){
            msExterna = 1;
        }
        else{
            msExterna = 0;
        }
        if (document.getElementById('msEmail').checked == true){
            msEmail = 1;
        }
        else{
            msEmail = 0;
        }
        $.ajax({
            url: url+'ajax.php?&acao=cadastraMensagemPedido&msInterna='+msInterna+'&msExterna='+msExterna+'&msEmail='+msEmail+'&mensagem='+$("#mensagem").val()+'&idPedido=' + idPedido,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#addMensagemPedido").hide('fast');
                    document.getElementById('msInterna').checked = false;
                    document.getElementById('msExterna').checked = false;
                    document.getElementById('msEmail').checked = false;
                    $("#mensagem").val('');
                    listarMensagemPedido(idPedido, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function selecionaItemVendaPedido(id, idProduto, url){
    var html = "<label for='quantidade2Add'>Quantidade: </label><input type='number' name='quantidade2Add' id='quantidade2Add' class='form-control' min='1' max='999999' value='1'><button class='btn btn-primary' onclick=cadastraProdutoPedido('"+id+"','"+idProduto+"','"+$("#pedidoAdd").val()+"','"+url+"')>Cadastrar Produto</button> <button class='btn btn-danger' onclick='fecha(\"addProdutoPedido\")'>Fechar</button>";
    $("#itensVendaPedidoProduto").html(html);
}
function cadastraProdutoPedido(idItem, idProduto, idPedido, url){
    var quantidade = $("#quantidade2Add").val();
    var idUser = $("#idUserAdd").val();
    $.ajax({
        url: url+'ajax.php?&acao=cadastraProdutoPedido&idItem='+idItem+'&idProduto='+idProduto+'&idPedido='+idPedido+'&quantidade='+quantidade+"&idUser="+idUser    ,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#addProdutoPedido").hide('fast');
                editarPedido(idPedido,url,idUser)
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
        }
    });
}
function listarMensagemPedido(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=listarMensagemPedido&id='+id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#mensagens").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#mensagens").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function fecha(id){
    $("#"+id).hide('fast');
}
function editarComentarioProduto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=comentarioProduto&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#emailEdicao").val(data[4]);
                var htmlAvaliacao = "";
                for (i = 1; i <= data[5]; i++){
                    htmlAvaliacao += "<img src='"+url+"img/star.png' title='Nota "+i+"' style='cursor:pointer' onclick=mudaAvaliacao('"+i+"','"+url+"')>";
                }
                if (data[5] < 5) {
                    for (i = i; i <= 5; i++) {
                        htmlAvaliacao += "<img src='" + url + "img/starApagada.png' title='Nota " + i + "' style='cursor:pointer' onclick=mudaAvaliacao('" + i + "','" + url + "')>";
                    }
                }
                $("#avaliacaoEdicao").html("<input type='hidden' name='avaliacaoEditar' id='avaliacaoEditar' value='"+data[5]+"'>"+htmlAvaliacao);
                $("#mensagemEdicao").val(data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarSolicitacaoComentario(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=solicitacaoComentario&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                var htmlAvaliacao = "";
                for (i = 1; i <= data[5]; i++){
                    htmlAvaliacao += "<img src='"+url+"img/star.png' title='Nota "+i+"' style='cursor:pointer' onclick=mudaAvaliacao('"+i+"','"+url+"')>";
                }
                if (data[5] < 5) {
                    for (i = i; i <= 5; i++) {
                        htmlAvaliacao += "<img src='" + url + "img/starApagada.png' title='Nota " + i + "' style='cursor:pointer' onclick=mudaAvaliacao('" + i + "','" + url + "')>";
                    }
                }
                $("#avaliacaoEdicao").html("<input type='hidden' name='avaliacaoEditar' id='avaliacaoEditar' value='"+data[5]+"'>"+htmlAvaliacao);
                $("#mensagemEdicao").val(data[6]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#avaliacaoEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#mensagemEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarPagina(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=pagina&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#subtituloEdicao").val(data[5]);
                $("#apareceMenuEdicao").val(data[6]);
                $("#apareceSiteEdicao").val(data[7]);
                $("#slugEdicao").val(data[8]);
                $("#ordemEdicao").val(data[9]);
                $("#imagemEdicao").val('');
                $('#itensVendaDados').html("<iframe src='"+data[5]+"' width=\"100%\" height=\"300\">");
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
				$.ajax({
					url: url+'ajax.php?&acao=pegaDados&table=pagina_description&id=' + id,
					success: function (data) {
						var data = data.split('|-|');
						if (data[0] == 1) {
							$("#qtasTemEdicao").val(data[1]);
							$("#descricoesEdicao").html(data[2]);
						} else if (data[0] == 0) {
							alertBHCommerce('Erro: '+data[1]);
						}
					},
					beforeSend: function () {
						$("#qtasTemEdicao").val('Aguarde... Carregando...');
						$("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
					}
				});
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#subtituloEdicao").val('Aguarde... Carregando...');
            $("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#apareceMenuEdicao").val('0');
            $("#apareceSiteEdicao").val('0');
            $("#statusEdicao").val('0');
            $("#imagemEdicao").val('');
            $("#backgroundEdicao").val('');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarBackgrounds(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=backgrounds&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#subtituloEdicao").val(data[5]);
                $("#apareceMenuEdicao").val(data[6]);
                $("#apareceSiteEdicao").val(data[7]);
                $("#slugEdicao").val(data[8]);
                $("#imagemEdicao").val('');
                $('#itensVendaDados').html("<iframe src='"+data[5]+"' width=\"100%\" height=\"300\">");
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
				$.ajax({
					url: url+'ajax.php?&acao=pegaDados&table=pagina_description&id=' + id,
					success: function (data) {
						var data = data.split('|-|');
						if (data[0] == 1) {
							$("#qtasTemEdicao").val(data[1]);
							$("#descricoesEdicao").html(data[2]);
						} else if (data[0] == 0) {
							alertBHCommerce('Erro: '+data[1]);
						}
					},
					beforeSend: function () {
						$("#qtasTemEdicao").val('Aguarde... Carregando...');
						$("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
					}
				});
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#subtituloEdicao").val('Aguarde... Carregando...');
            $("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            $("#apareceMenuEdicao").val('0');
            $("#apareceSiteEdicao").val('0');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function excluirDescricaoPagina(id, page, url){
	if (confirm('Tem certeza que deseja excluir essa descrição da página? Essa é uma ação irreversível.')){
		$.ajax({
			url: url+'ajax.php?&acao=excluirDescricaoPagina&id=' + id+'&page='+page,
			success: function (data) {
				var data = data.split('|-|');
				if (data[0] == 1) {
					$("#qtasTemEdicao").val(data[1]);
					$("#descricoesEdicao").html(data[2]);
				} else if (data[0] == 0) {
					alertBHCommerce('Erro: '+data[1]);
				}
			},
			beforeSend: function () {
				$("#qtasTemEdicao").val('Aguarde... Carregando...');
				$("#descricoesEdicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...')
			}
		});
	}
}
function excluirDescricaoProduto(id, product, url){
	if (confirm('Tem certeza que deseja excluir essa descrição do produto? Essa é uma ação irreversível.')){
		$.ajax({
			url: url+'ajax.php?&acao=excluirDescricaoProduto&id=' + id+'&product='+product,
			success: function (data) {
				if (data == 1) {
                    $.ajax({
                        url: url+'ajax.php?&acao=pegaDados&table=produto_description&id=' + product,
                        success: function (data) {
                            var data = data.split('|-|');
                            if (data[0] == 1) {
                                $("#qtasTemEdicao").val(data[1]);
                                $("#descricoesEdicao").html(data[2]);
                            } else if (data[0] == 0) {
                                alertBHCommerce('Erro: '+data[1]);
                            }
                        },
                        beforeSend: function () {
                        }
                    });
				} else if (data == 0) {
					alertBHCommerce('Erro: '+data[1]);
				}
			},
			beforeSend: function () {
			}
		});
	}
}
function addDescricaoEdicao (num, url){
	var proximo = parseInt(num) + 1;
	html = '<label for="tipo'+num+'Edicao">Tipo da Descrição '+num+'</label>';
	html += "<select name='tipo"+num+"Edicao' id='tipo"+num+"Edicao' class='form-control'>";
	html += "<option value=''>Selecione o tipo da descrição abaixo...</option>";
	html += "<option value='h1'>Título 1</option>";
	html += "<option value='h2'>Título 2</option>";
	html += "<option value='h3'>Título 3</option>";
	html += "<option value='h4'>Título 4</option>";
	html += "<option value='h5'>Título 5</option>";
	html += "<option value='p'>Parágrafo</option>";
	html += "</select>";
	html += '<label for="description'+num+'Edicao">Descrição '+num+'</label>';
	html += "<textarea name='description"+num+"Edicao' id='description"+num+"Edicao' class='form-control'></textarea>";
	html += "<div id='addDescricaoEdicao"+proximo+"'><a style='cursor:pointer' onclick=addDescricaoEdicao('"+proximo+"','"+url+"')><img src='"+url+"img/plus.png' width='20'> Adicionar Descrição</a></div>";
	$("#qtasTemEdicao").val(num);
	$("#addDescricaoEdicao"+num).html(html);
}
function editarSubitem(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=subitem&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#descricaoEdicao").val(data[4]);
                $("#subtituloEdicao").val(data[5]);
                $("#mostraImagemEdicao").val(data[6]);
                $("#paginaEdicao").val(data[7]);
                $("#slugEdicao").val(data[8]);
                $("#imagemEdicao").val('');
                $('#itensVendaDados').html("<iframe src='"+data[5]+"' width=\"100%\" height=\"300\">");
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#paginaEdicao").val('');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#subtituloEdicao").val('Aguarde... Carregando...');
            $("#descricaoEdicao").val('Aguarde... Carregando...');
            $("#mostraImagemEdicao").val('0');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTipoServico(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tipoServico&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTipoModulo(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tipoModulo&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarModulo(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=modulo&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#tipoModuloEdicao").val(data[4]);
                $("#urlAmigavelEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarPrioridade(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=prioridade&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#statusEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarParametroSite(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=parametroSite&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#valorMostraEdicao").html(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#tipoEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#tipoEdicao").val('');
            $("#valorMostraEdicao").html('<img src="'+url+'img/loader.gif" width="25"> Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function selecionaTipoParamSiteEdicao(qual, valor){
    html = '<label for="valorEdicao">Valor: </label>';
    if (qual == 'textarea'){
	html += '<textarea name="valorEdicao" id="valorEdicao" required class="form-control">'+valor+'</textarea>';
    }
    else if (qual == 'select'){
	html += '<select name="valorEdicao" name="valorEdicao" class="form-control"><option value="0"';
	if (!valor){
	    html += "selected";
	}
	html += '>Não</option><option value="1"';
	if (valor == 1){
	    html += " selected";
	}
	html += '>Sim</option></select>';
    }
    else{
	html += '<input type="'+qual+'" class="form-control" required value="'+valor+'" name="valorEdicao" id="valorEdicao">';
    }
    $('#valorMostraEdicao').html(html);
}
function selecionaTipoParamSiteCadastro(qual, valor){
    html = '<label for="valorEdicao">Valor: </label>';
    if (qual == 'textarea'){
	html += '<textarea name="valorCadastro" id="valorCadastro" required class="form-control">'+valor+'</textarea>';
    }
    else if (qual == 'select'){
	html += '<select name="valorCadastro" name="valorCadastro" class="form-control"><option value="0"';
	if (!valor){
	    html += "selected";
	}
	html += '>Não</option><option value="1"';
	if (valor == 1){
	    html += " selected";
	}
	html += '>Sim</option></select>';
    }
    else{
	html += '<input type="'+qual+'" class="form-control" required value="'+valor+'" name="valorCadastro" id="valorCadastro">';
    }
    $('#valorMostraCadastro').html(html);
}
function editarParametroAdmin(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=parametroAdmin&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#valorEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#valorEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarVersao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=versao&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#descricaoEdicao").val(data[3]);
                $("#nomeEdicao").val(data[2]);
                $("#dataEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#valorEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function visualizarStatusOrcamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=statusOrcamento&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoStatusOrcamentos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoStatusOrcamentos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTipoDocumento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tiposDocumento&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTiposDocumentos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTiposDocumentos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTipoServico(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tipoServico&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTipoServico").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTipoServico").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTipoModulo(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tipoModulo&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTipoModulo").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTipoModulo").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarModulo(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=modulo&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoModulo").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoModulo").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarPrioridade(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=prioridade&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoPrioridade").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoPrioridade").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function editarFormaPagamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=formaPagamento&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#vlParcelaMinimaEdicao").val(data[3]);
                $("#parcelasEdicao").val(data[4]);
                $("#pagamentoAVistaEdicao").val(data[5]);
                $("#imagemEdicao").val('');
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#vlParcelaMinimaEdicao").val('Aguarde... Carregando...');
            $("#parcelasEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarFormaFrete(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=formaFrete&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#valorEdicao").val(data[3]);
                $("#codigoEdicao").val(data[4]);
                $("#statusEdicao").val(data[5]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#valorEdicao").val('Aguarde... Carregando...');
            $("#codigoEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('0');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarPosicao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=posicao&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#statusEdicao").val(data[3]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTempoBanner(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=tempoBanner&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                if (data[3] == 'eterno'){
                    $("#daysEdicao").val('0');
                    $("#daysEdicao").attr('disabled', true);
                    document.getElementById("eternoEdicao").checked = true;
                }
                else{
                    $("#daysEdicao").val(data[3]);
                    $("#daysEdicao").attr('disabled', false);
                    document.getElementById("eternoEdicao").checked = false; 
                }
                $("#statusEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('Aguarde... Carregando...');
            $("#daysCadastro").val('0');
            $("#daysCadastro").attr('disabled', false);
            document.getElementById("eternoCadastro").checked = false;
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function editarTarget(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=target&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#idEdicao").val(data[1]);
                $("#nomeEdicao").val(data[2]);
                $("#codigoEdicao").val(data[3]);
                $("#statusEdicao").val(data[4]);
                $("#idUserEdicao").val(idUser);
                $("#botaoEditar").show('slow');
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#idEdicao").val('Aguarde... Carregando...');
            $("#nomeEdicao").val('Aguarde... Carregando...');
            $("#codigoEdicao").val('Aguarde... Carregando...');
            $("#statusEdicao").val('Aguarde... Carregando...');
            $("#idUserEdicao").val(idUser);
            $("#botaoEditar").hide('fast');
        }
    });
}
function visualizarClientes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=clientes&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoCliente").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoCliente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarCupomDesconto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=cupomDesconto&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoCupomDesconto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoCupomDesconto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarValePresente(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=valePresente&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
            $("#visualizacaoValePresente").html(data[1]);
        },
        beforeSend: function () {
            $("#visualizacaoValePresente").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTiposProduto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tiposProduto&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTiposProduto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTiposProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarProdutos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=produto&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoProdutos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoProdutos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarComentarioProduto(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=comentarioProduto&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoComentarioProduto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoComentarioProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarFormaPagamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=formaPagamento&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoFormaPagamento").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoFormaPagamento").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarFormaFrete(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=formaFrete&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoFormaFrete").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoFormaFrete").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarPosicao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=posicao&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoPosicao").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoPosicao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTempoBanner(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tempoBanner&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTempoBanner").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTempoBanner").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTarget(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=target&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTarget").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTarget").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarBanner(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=banner&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoBanner").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoBanner").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarFeriados(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=feriados&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoFeriados").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoFeriados").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarComentariosFeriados(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=comentariosFeriados&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoComentariosFeriados").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoComentariosFeriados").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarParceiros(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=parceiros&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoParceiros").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoParceiros").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarNacionalidade(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=nacionalidade&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoNacionalidade").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoNacionalidade").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarPais(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=pais&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoPais").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoPais").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarRedesSociais(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=redesSociais&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoRedesSociais").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoRedesSociais").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function enviarValePresente(id, url, idUser){
    if (confirm('Tem certeza que deseja enviar esse vale?')){
        $.ajax({
            url: url+'ajax.php?&acao=enviarEmailValePresente&id=' + id+"&idUser="+idUser,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Email Enviado com sucesso!');
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            }
        });
    }
}
function visualizarMarcas(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=marcas&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoMarcas").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoMarcas").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarSelos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=selos&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoSelos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoSelos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarSugestoes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=sugestoes&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoSugestoes").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoSugestoes").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarPagina(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=pagina&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoPagina").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoPagina").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function enviarEmailConvidado(id, url, idUser, lista){
    if (confirm("Tem certeza que deseja enviar email a esse convidado?")){
        $.ajax({
            url: url+'ajax.php?&acao=enviarEmailConvidado&id='+id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    visualizarConvidados(lista, url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function enviarTodosNaoEnviados(id, url, idUser){
    if (confirm("Tem certeza que deseja enviar email a todos os status não enviados?")){
        $.ajax({
            url: url+'ajax.php?&acao=enviarTodosNaoEnviados&id='+id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    visualizarConvidados(id, url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function visualizarConvidado(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=convidado&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoConvidado").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            abre('visualizacaoConvidado');
            $("#visualizacaoConvidado").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarListasPresentes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=listaPresente&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoListaPresentes").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoListaPresentes").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function editaConvidado(id, url, idUser){
    $("#editaConvidado").show('slow');
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=convidados&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#nomeConvidadoEdita").val(data[1]);
                $("#emailConvidadoEdita").val(data[2]);
                $("#celConvidadoEdita").val(data[3]);
                $("#idConvidadoEdita").val(data[4]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#nomeConvidadoEdita").val('Aguarde... Carregando...');
            $("#emailConvidadoEdita").val('Aguarde... Carregando...');
            $("#celConvidadoEdita").val('Aguarde... Carregando...');
            $("#idConvidadoEdita").val('Aguarde... Carregando...');
        }
    });
}
function editaPresente(id, url, idUser){
    $("#editaPresente").show('slow');
    $.ajax({
        url: url+'ajax.php?&acao=pegaDados&table=presentes&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#produtoPresenteEdita").val(data[1]);
                $("#idPresenteEdita").val(data[4]);
                $("#produtoPresenteEdita").focus();
                selecionaProdutoPresenteEdita(data[1], url, data[2], data[3]);

            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#produtoPresenteEdita").val('');
        }
    });
}
function selecionaProdutoPresenteEdita(produto, url, qualE = '', qualEQuant = ""){
    if (produto != ''){
        $.ajax({
            url: url+'ajax.php?&acao=selecionaProdutoPresenteEdita&produto='+ produto+"&qualE="+qualE+"&qualEQuant="+qualEQuant,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#itensProdutoEdita").html(data[1]);
                    if (data[2]){
                        selecionaItemProdutoPresenteEdita(qualE, url, data[2]);
                    }
                } else if (data[0] == 0){
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#itensProdutoEdita").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#itensProdutoEdita").html('<div class="btn btn-danger">Selecione o produto acima corretamente!</div>');
    }
}
function selecionaProdutoPresente(produto, url){
    if (produto != ''){
        $.ajax({
            url: url+'ajax.php?&acao=selecionaProdutoPresente&produto='+ produto,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#itensProduto").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#itensProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#itensProduto").html('<div class="btn btn-danger">Selecione o produto acima corretamente!</div>');
    }
}
function adicionarPresente(url, idUser){
    if ($("#produtoPresenteAdd").val() == ''){
        alertBHCommerce('Informe o produto corretamente!');
        document.getElementById('produtoPresenteAdd').focus();
    }
    else if ($("#itemProdutoPresenteAdd").val() == ''){
        alertBHCommerce('Informe o item do produto corretamente!');
        document.getElementById('itemProdutoPresenteAdd').focus();
    }
    else if ($("#quantidadeAdd").val() == '' || $("#quantidadeAdd").val() <= 0 || $("#quantidadeAdd").val() > 999999){
        alertBHCommerce('Informe a quantidade corretamente!\nMínimo: 1\nMáxino: 999999');
        document.getElementById('qantidadeAdd').focus();
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=adicionarPresente&product='+ $("#produtoPresenteAdd").val()+"&product_item="+$("#itemProdutoPresenteAdd").val()+"&quantidade="+$("#quantidadeAdd").val()+"&lista="+$('#listaPresenteAdd').val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    var idLista = $("#listaPresenteAdd").val();
                    $("#produtoPresenteAdd").val('');
                    fecha('addPresente');
                    visualizarPresentes(idLista, url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    $("#produtoPresenteAdd").val('');
                    $("#itemProdutoPresenteAdd").val('');
                    $("#quantidadeAdd").val('');
                }
            },
            beforeSend: function () {
                $("#produtoPresenteAdd").val('');
                $("#itemProdutoPresenteAdd").val('');
                $("#quantidadeAdd").val('');
            }
        });
    }
}
function atualizarPresente(url, idUser){
    if ($("#produtoPresenteEdita").val() == ''){
        alertBHCommerce('Informe o produto corretamente!');
        document.getElementById('produtoPresenteEdita').focus();
    }
    else if ($("#itemProdutoPresenteEdita").val() == ''){
        alertBHCommerce('Informe o item do produto corretamente!');
        document.getElementById('itemProdutoPresenteEdita').focus();
    }
    else if ($("#quantidadeEdita").val() == '' || $("#quantidadeEdita").val() <= 0 || $("#quantidadeEdita").val() > 999999){
        alertBHCommerce('Informe a quantidade corretamente!\nMínimo: 1\nMáxino: 999999');
        document.getElementById('qantidadeEdita').focus();
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=atualizarPresente&id='+$("#idPresenteEdita").val()+'&product='+ $("#produtoPresenteEdita").val()+"&product_item="+$("#itemProdutoPresenteEdita").val()+"&quantidade="+$("#quantidadeEdita").val()+"&lista="+$('#listaPresenteEdita').val(),
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    var idLista = $("#listaPresenteEdita").val();
                    $("#produtoPresenteEdita").val('');
                    fecha('editaPresente');
                    visualizarPresentes(idLista, url, idUser);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                    $("#produtoPresenteEdita").val('');
                    $("#itemProdutoPresenteEdita").val('');
                    $("#quantidadeEdita").val('');
                }
            },
            beforeSend: function () {
                $("#produtoPresenteEdita").val('');
                $("#itemProdutoPresenteEdita").val('');
                $("#quantidadeEdita").val('');
            }
        });
    }
}
function selecionaItemProdutoPresente(item, url){
    if (item != ''){
        $("#qtdeAdd").html('<label for="quantidadeAdd">Quantidade: </label><input type="number" id="quantidadeAdd" name="quantidadeAdd" min="1" max="999999" value="1" class="form-control">');
    }
    else{
        $("#qtdeAdd").html('<div class="btn btn-danger">Selecione o item do produto acima corretamente!</div>');
    }
}
function selecionaItemProdutoPresenteEdita(item, url, quantidade){
    if (item != ''){
        quantidade = (quantidade) ? quantidade : "1";
        $("#qtdeEdita").html('<label for="quantidadeEdita">Quantidade: </label><input type="number" id="quantidadeEdita" name="quantidadeEdita" min="1" max="999999" value="'+quantidade+'" class="form-control">');
    }
    else{
        $("#qtdeEdita").html('<div class="btn btn-danger">Selecione o item do produto acima corretamente!</div>');
    }
}
function addConvidado(){
    abre('addConvidado');
    $('#nomeConvidadoAdd').val('');
    $('#emailConvidadoAdd').val('');
    $('#celConvidadoAdd').val('');
}
function addPresente(){
    abre('addPresente');
    $('#produtoPresenteAdd').val('');
    $('#itensProduto').html('');
}
function addListasPresentes(){
    $("#clienteCadastro").val('');
    $("#nomeCadastro").val('');
    $("#dataAniversarioCadastro").val('');
    $("#nomeMaeCadastro").val('');
    $("#nomePaiCadastro").val('');
    $("#idadeCadastro").val('');
    $("#cepCadastro").val('');
    $("#logradouroCadastro").val('');
    $("#numeroCadastro").val('');
    $("#complementoCadastro").val('');
    $("#bairroCadastro").val('');
    $("#cidadeCadastro").val('');
    $("#estadoCadastro").val('');
    $("#clienteCadastro").focus();
}
function visualizarPresentes(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=presentes&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoPresentes").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoPresentes").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarConvidados(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=convidados&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoConvidados").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoConvidados").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarSubitem(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=subitem&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoSubitem").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoSubitem").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarTipoVersao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=tipoVersao&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoTipoVersao").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoTipoVersao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarParametroSite(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=parametroSite&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoParametroSite").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoParametroSite").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarParametroAdmin(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=parametroAdmin&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoParametroAdmin").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoParametroAdmin").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarVersao(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=versao&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoVersao").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoVersao").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarCategorias(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=categorias&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoCategorias").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoCategorias").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarRelacionamento(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=relacionamentos&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoRelacionamentos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoRelacionamentos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarAtributos(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=atributos&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoAtributos").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoAtributos").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarUsuarios(id, url, idUser = ""){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=usuarios&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoUsuarios").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoUsuarios").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function visualizarUsuariosPre(id, url, idUser = ""){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=usuariosPre&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoUsuariosPre").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoUsuariosPre").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function addCategoria(){
    $("#tipoServicoCadastro").val('');
    $("#nomeCadastro").val('');
    $("#imagemCadastro").val('');
    $("#statusCadastro").val(0);
}
function importarClientes(){
    $("#arquivo").val('');
}
function importarXMLClientes(){
    $("#arquivoXml").val('');
}
function importarJSONClientes(){
    $("#arquivoJson").val('');
}
function importarPaginas(){
    $("#arquivo").val('');
}
function importarXMLPaginas(){
    $("#arquivoXml").val('');
}
function importarJSONPaginas(){
    $("#arquivoJson").val('');
}
function importarSubitems(){
    $("#arquivo").val('');
}
function importarXMLSubitems(){
    $("#arquivoXml").val('');
}
function importarJSONSubitems(){
    $("#arquivoJson").val('');
}
function importarCategorias(){
    $("#arquivo").val('');
}
function importarXMLCategorias(){
    $("#arquivoXml").val('');
}
function importarJSONCategorias(){
    $("#arquivoJson").val('');
}
function importarAtributos(){
    $("#arquivo").val('');
}
function importarXMLAtributos(){
    $("#arquivoXml").val('');
}
function importarJSONAtributos(){
    $("#arquivoJson").val('');
}
function importarSolicitacaoComentario(){
    $("#arquivo").val('');
}
function importarXMLSolicitacaoComentario(){
    $("#arquivoXml").val('');
}
function importarJSONSolicitacaoComentario(){
    $("#arquivoJson").val('');
}
function importarStatusOrcamento(){
    $("#arquivo").val('');
}
function importarXMLStatusOrcamento(){
    $("#arquivoXml").val('');
}
function importarJSONStatusOrcamento(){
    $("#arquivoJson").val('');
}
function importarMarcas(){
    $("#arquivo").val('');
}
function importarXMLMarcas(){
    $("#arquivoXml").val('');
}
function importarJSONMarcas(){
    $("#arquivoJson").val('');
}
function importarSelos(){
    $("#arquivo").val('');
}
function importarXMLSelos(){
    $("#arquivoXml").val('');
}
function importarJSONSelos(){
    $("#arquivoJson").val('');
}
function importarSugestoes(){
    $("#arquivo").val('');
}
function importarXMLSugestoes(){
    $("#arquivoXml").val('');
}
function importarJSONSugestoes(){
    $("#arquivoJson").val('');
}
function importarRelacionamentos(){
    $("#arquivo").val('');
}
function importarXMLRelacionamentos(){
    $("#arquivoXml").val('');
}
function importarJSONRelacionamentos(){
    $("#arquivoJson").val('');
}
function importarProdutos(){
    $("#arquivo").val('');
}
function importarXMLProdutos(){
    $("#arquivoXml").val('');
}
function importarJSONProdutos(){
    $("#arquivoJson").val('');
}
function importarParceiros(){
    $("#arquivo").val('');
}
function importarXMLParceiros(){
    $("#arquivoXml").val('');
}
function importarJSONParceiros(){
    $("#arquivoJson").val('');
}
function importarRedesSociais(){
    $("#arquivo").val('');
}
function importarXMLRedesSociais(){
    $("#arquivoXml").val('');
}
function importarJSONRedesSociais(){
    $("#arquivoJson").val('');
}
function importarCupomDesconto(){
    $("#arquivo").val('');
}
function importarXMLCupomDesconto(){
    $("#arquivoXml").val('');
}
function importarJSONCupomDesconto(){
    $("#arquivoJson").val('');
}
function importarValePresente(){
    $("#arquivo").val('');
}
function importarXMLValePresente(){
    $("#arquivoXml").val('');
}
function importarJSONValePresente(){
    $("#arquivoJson").val('');
}
function importarParamSite(){
    $("#arquivo").val('');
}
function importarXMLParamSite(){
    $("#arquivoXml").val('');
}
function importarJSONParamSite(){
    $("#arquivoJson").val('');
}
function importarParamAdmin(){
    $("#arquivo").val('');
}
function importarVersao(){
    $("#arquivo").val('');
}
function importarXMLVersao(){
    $("#arquivoXml").val('');
}
function importarJSONVersao(){
    $("#arquivoJson").val('');
}
function importarFeriado(){
    $("#arquivo").val('');
}
function importarXMLFeriado(){
    $("#arquivoXml").val('');
}
function importarJSONFeriado(){
    $("#arquivoJson").val('');
}
function importarFormasPagamento(){
    $("#arquivo").val('');
}
function importarXMLFormasPagamento(){
    $("#arquivoXml").val('');
}
function importarJSONFormasPagamento(){
    $("#arquivoJson").val('');
}
function importarNacionalidade(){
    $("#arquivo").val('');
}
function importarXMLNacionalidade(){
    $("#arquivoXml").val('');
}
function importarJSONNacionalidade(){
    $("#arquivoJson").val('');
}
function importarPais(){
    $("#arquivo").val('');
}
function importarXMLPais(){
    $("#arquivoXml").val('');
}
function importarJSONPais(){
    $("#arquivoJson").val('');
}
function importarFormasFrete(){
    $("#arquivo").val('');
}
function importarXMLFormasFrete(){
    $("#arquivoXml").val('');
}
function importarJSONFormasFrete(){
    $("#arquivoJson").val('');
}
function importarPosicao(){
    $("#arquivo").val('');
}
function importarXMLPosicao(){
    $("#arquivoXml").val('');
}
function importarJSONPosicao(){
    $("#arquivoJson").val('');
}
function importarTempoBanner(){
    $("#arquivo").val('');
}
function importarXMLTempoBanner(){
    $("#arquivoXml").val('');
}
function importarJSONTempoBanner(){
    $("#arquivoJson").val('');
}
function importarTarget(){
    $("#arquivo").val('');
}
function importarXMLTarget(){
    $("#arquivoXml").val('');
}
function importarJSONTarget(){
    $("#arquivoJson").val('');
}
function importarBackgrounds(){
    $("#arquivo").val('');
}
function importarXMLBackgrounds(){
    $("#arquivoXml").val('');
}
function importarJSONBackgrounds(){
    $("#arquivoJson").val('');
}
function importarComentariosProduto(){
    $("#arquivo").val('');
}
function importarXMLComentariosProduto(){
    $("#arquivoXml").val('');
}
function importarJSONComentariosProduto(){
    $("#arquivoJson").val('');
}
function importarEnderecos(idCliente, idUser){
    $("#idClienteImportarEnderecos").val(idCliente);
    $("#idUserImportarEnderecos").val(idUser);
    $("#modalEndereco").modal("hide");
    $("#exampleModalLabelImportarEnderecos").val("Importar Endereços do Cliente "+idCliente);
    $("#arquivoEnderecos").val('');
}
function importarXMLEnderecos(idCliente, idUser){
    $("#idClienteImportarEnderecosXml").val(idCliente);
    $("#idUserImportarEnderecosXml").val(idUser);
    $("#modalEndereco").modal("hide");
    $("#exampleModalLabelImportarEnderecosXml").val("Importar Endereços do Cliente "+idCliente);
    $("#arquivoEnderecosXml").val('');
}
function importarJSONEnderecos(idCliente, idUser){
    $("#idClienteImportarEnderecosJson").val(idCliente);
    $("#idUserImportarEnderecosJson").val(idUser);
    $("#modalEndereco").modal("hide");
    $("#exampleModalLabelImportarEnderecosJson").val("Importar Endereços do Cliente "+idCliente);
    $("#arquivoEnderecosJson").val('');
}
function importarListasPresentes(){
    $("#arquivo").val('');
}
function importarXMLListasPresentes(){
    $("#arquivoXml").val('');
}
function importarJSONListasPresentes(){
    $("#arquivoJson").val('');
}
function importarPresentes(url, idUser, id){
    $("#idListaImportaPresentes").val(id);
    $("#idUserImportaPresentes").val(idUser);
    $("#arquivoPresentes").val('');
    $("#urlImportaPresents").val(url);
    $("#exampleModalLabelImportarPresentes").val("Presentes da Lista  "+id);
    $('#modalPresentes').modal('hide');
}
function importarXMLPresentes(id, idUser, url){
    $("#idListaImportaPresentesXml").val(id);
    $("#idUserImportaPresentesXml").val(idUser);
    $("#arquivoPresentesXml").val('');
    $("#urlImportaPresentsXml").val(url);
    $("#exampleModalLabelImportarPresentesXml").val("Presentes da Lista  "+id);
    $('#modalPresentes').modal('hide');
}
function importarJSONPresentes(id, idUser, url){
    $("#idListaImportaPresentesJson").val(id);
    $("#idUserImportaPresentesJson").val(idUser);
    $("#arquivoPresentesJson").val('');
    $("#urlImportaPresentsJson").val(url);
    $("#exampleModalLabelImportarPresentesJson").val("Presentes da Lista  "+id);
    $('#modalPresentes').modal('hide');
}
function importarConvidados(id, idUser, url){
    $("#idListaImportaConvidados").val(id);
    $("#idUserImportaaConvidados").val(idUser);
    $("#arquivoaConvidados").val('');
    $("#urlImportaaConvidados").val(url);
    $("#exampleModalLabelImportarConvidados").val("Convidados da Lista  "+id);
    $('#modalGuests').modal('hide');
}
function importarXMLConvidados(id, idUser, url){
    $("#idListaImportaConvidadosXml").val(id);
    $("#idUserImportaConvidadosXml").val(idUser);
    $("#arquivoConvidadosXml").val('');
    $("#urlImportaConvidadosXml").val(url);
    $("#exampleModalLabelImportarConvidados").val("Convidados da Lista  "+id);
    $('#modalGuests').modal('hide');
}
function importarJSONConvidados(id, idUser, url){
    $("#idListaImportaConvidadosJson").val(id);
    $("#idUserImportaConvidadosJson").val(idUser);
    $("#arquivoConvidadosJson").val('');
    $("#urlImportaConvidadosJson").val(url);
    $("#exampleModalLabelImportarConvidados").val("Convidados da Lista  "+id);
    $('#modalGuests').modal('hide');
}
function importarBanners(){
    $("#arquivo").val('');
}
function importarXMLBanners(){
    $("#arquivoXml").val('');
}
function importarJSONBanners(){
    $("#arquivoJson").val('');
}
function addVersao(){
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#dataCadastro").val('');
    $("#imagemCadastro").val('');
}
function addParceiros(){
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#linkCadastro").val('');
    $("#statusCadastro").val('0');
}
function addFeriado(){
    $("#nomeCadastro").val('');
    $("#dataCadastro").val('');
    $("#statusCadastro").val('0');
    $("#comMsgCadastro").val('0');
    selecionaComMsgCad('0');
    $("#msgCadastro").val('');
}
function addComentarioFeriado(url){
    $("#feriadoCadastro").val('');
    $("#clienteCadastro").val('');
    limparSelecaoAvaliacaoComentarioProdutoCadastro(url);
    $("#comentarioCadastro").val('');
    $("#statusCadastro").val('1');
}
function addParamSite(){
    $("#valorCadastro").val('');
    $("#nomeCadastro").val('');
}
function addParamAdmin(){
    $("#valorCadastro").val('');
    $("#nomeCadastro").val('');
}
function addTipoVersao(){
    $("#tipoServicoCadastro").val('');
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addStatusOrcamento(){
    $("#siglaCadastro").val('');
    $("#nomeCadastro").val('');
}
function addMarcas(){
    $("#nomeCadastro").val('');
    $("#slugCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#statusCadastro").val('');
    $("#imagemCadastro").val('');
    $("#backgroundCadastro").val('');
}
function addSelos(){
    $("#nomeCadastro").val('');
    $("#slugCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#statusCadastro").val('');
    $("#imagemCadastro").val('');
    $("#backgroundCadastro").val('');
}
function addSugestoes(){
    $("#nomeCadastro").val('');
    $("#slugCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#statusCadastro").val('');
    $("#imagemCadastro").val('');
    $("#backgroundCadastro").val('');
}
function addRelacionamento(){
    $("#nomeCadastro").val('');
    $("#slugCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#statusCadastro").val('');
    $("#imagemCadastro").val('');
    $("#backgroundCadastro").val('');
}
function addTiposDocumento(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addTiposProduto(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addProduto(){
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#apareceVitrineCadastro").val(0);
    $("#destaqueCadastro").val(0);
    $("#compreAgoraCadastro").val(0);
    $("#promocaoCadastro").val(0);
    $("#itemRecomendadoCadastro").val(0);
    $("#freteGratisCadastro").val(0);
    $("#mostraCarrinhoCadastro").val(0);
    $("#valorContaParaOFreteCadastro").val(0);
    $("#apareceLateralEsquerdaCadastro").val(0);
    $("#statusCadastro").val(0);
}
function addNacionalidade(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addFormaPagamento(){
    $("#nomeCadastro").val('');
    $("#vlParcelaMinimaCadastro").val('');
    $("#parcelasCadastro").val('');
    $("#pagamentoAVistaCadastro").val('0');
    $("#imagemCadastro").val('');
}
function addFormaFrete(){
    $("#nomeCadastro").val('');
    $("#valorCadastro").val('');
    $("#codigoCadastro").val('');
}
function addPosicao(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val('0');
}
function addTempoBanner(){
    $("#nomeCadastro").val('');
    $("#daysCadastro").val('0');
    $("#daysCadastro").attr('disabled', false);
    document.getElementById("eternoCadastro").checked = false;
    $("#statusCadastro").val('0');
}
function addTarget(){
    $("#nomeCadastro").val('');
    $("#codigoCadastro").val('');
    $("#statusCadastro").val('0');
}
function addBanner(){
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#imagemCadastro").val('');
    $("#posicaoCadastro").val('');
    $("#statusCadastro").val(0);
}
function addImportar(){
    $("#imagemCadastro").val('');
}
function addPagina(){
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#imagemCadastro").val('');
    $("#subtituloCadastro").val('');
    $("#apareceMenuCadastro").val(0);
    $("#apareceSiteCadastro").val(0);
    $("#ordemCadastro").val('');
    $("#imagemCadastro").val('');
    $("#backgroundCadastro").val('');
    $("#statusCadastro").val(0);
}
function addSubitem(){
    $("#paginaCadastro").val('');
    $("#nomeCadastro").val('');
    $("#descricaoCadastro").val('');
    $("#imagemCadastro").val('');
    $("#subtituloCadastro").val('');
    $("#mostraImagemCadastro").val(0);
    $("#statusCadastro").val(0);
}
function addTipoServico(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addTipoModulo(){
    $("#nomeCadastro").val('');
    $("#statusCadastro").val(0);
}
function addModulo(){
    $("#tipoModuloCadastro").val('');
    $("#nomeCadastro").val('');
    $("#urlAmigavelCadastro").val('');
    $("#statusCadastro").val(0);
}
function addPrioridade(){
    $("#nomeCadastro").val('')
    $("#statusCadastro").val(0);
}
function visualizarCategoria(id, url, idUser){
    $.ajax({
        url: url+'ajax.php?&acao=visualizar&table=categorias&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#visualizacaoCategorias").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#visualizacaoCategorias").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function excluirConvidado(id, url, idUser, artigo, table, lista){
    if (confirm('Tem certeza que deseja excluir esse convidado?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=presents_lists_guests&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    visualizarConvidados(lista, url, idUser);
                    $('#registroExcluidoComSucessoListasPresentes').show('slow');
                    window.setInterval('$("#registroExcluidoComSucessoListasPresentes").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPresente(id, url, idUser, artigo, table, lista){
    if (confirm('Tem certeza que deseja excluir esse presente?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirPresente&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    visualizarPresentes(lista, url, idUser);
                    $('#registroExcluidoComSucessoListasPresentes').show('slow');
                    window.setInterval('$("#registroExcluidoComSucessoListasPresentes").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirSolicitacaoComentario(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa solicitçao de comentário?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=products_reviews_solicitas&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('solicitacaoComentario', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function aprovarAnuncie(id, url, idUser){
    if (confirm('Tem certeza que deseja aprovar esse banner?')){
        $.ajax({
            url: url+'ajax.php?&acao=aprovarAnuncie2&id='+id+'&idUser='+idUser,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('anuncie', url, idUser, $("#pagina").val());
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function aprovarSolicitacaoComentario(id, url, idUser){
	if (confirm('Tem certeza que deseja aprovar essa solicitçao de comentário?')){
        $.ajax({
            url: url+'ajax.php?&acao=aprovar&table=products_reviews_solicitas&id=' + id+"&idUser="+idUser,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('solicitacaoComentario', url, idUser);
                    $('#registroAprovadoComSucesso').show('slow');
                    window.setInterval('$("#registroAprovadoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPagina(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Página?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=pages&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('pagina', url);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirBackgrounds(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse background?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=backgrounds&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('backgrounds', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirListasPresentes(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Lista de Presente?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=presents_lists&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('listasPresentes', url, idUser);
                    $('#registroExcluidoComSucessos').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirCupomDesconto(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Cupom de Desconto?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=coupon_discounts&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('cupomDesconto', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirValePresente(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Vale Presente?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=vales&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('valePresente', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirBanner(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Banner?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=banners&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('banners', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirFeriados(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse feriado?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=holidays&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('feriados', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirComentariosFeriados(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse comentário de feriado?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=holidays_coments&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('comentariosFeriados', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirParceiros(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse parceiro?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=partners&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('parceiros', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirNacionalidade(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa nacionalidade?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=nationalities&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('nacionalidade', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPais(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse país?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=countries&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('pais', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirRedesSociais(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Rede Social?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=social_networks&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('redesSociais', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirMarcas(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Marca?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=brands&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('marcas', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirSelos(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Selo?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=stamps&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('selos', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirSugestoes(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Sugestão?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=suggestions&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('sugestoes', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirUsuarios(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Usuário?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=users&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('usuarios', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirUsuariosPre(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Usuário Pre?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=user_pres&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('usuariosPre', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirSubitem(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Subítem?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=subitems&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('subitem', url);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTipoServico(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Tipo de Serviço?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=types_services&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tipoServico', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTipoVersao(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse Tipo de Serviço?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=type_versions&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tipoVersao', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPrioridade(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Prioridade?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=priorities&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('prioridade', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirVersaoTipo(id){
    if (confirm('Tem certeza que deseja excluir essa Versão Tipo?')){
        $("#excluirVersaoTipo"+id).submit();
    }
}
function excluirVersao(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa Versão?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=versions&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('versao', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirCategorias(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse categoria?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=categories&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('categorias', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirRelacionamento(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse relacionamento?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=relationships&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('relacionamentos', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirAtributos(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse atributo?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=attributes&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('atributos', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirFaleConosco(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse fale conosco?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=messages&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('faleConosco', url);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function selecionaStatusMensagem(qual) {
    if (qual == 1){
        $("#resposta").hide('fast');
    }
    else{
        $("#resposta").show('slow');
    }
}
function excluirBugTracking(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse bug tracking?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=bug_trackings&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('bugTracking', url);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function selecionaStatusBugTracking(qual) {
    if (qual == 1){
        $("#resposta").hide('fast');
    }
    else{
        $("#resposta").show('slow');
    }
}
function mascaraValor(valor, id) {
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
    $('#'+id).val(valor);
}
function verificaNovamente(tela, url, idUser = "", pagina = "") {
    pagina = (pagina) ? pagina : $("#pagina").val();
    $("#pagina").val(pagina);
    $.ajax({
        url: url+'ajax.php?&acao=verificaNovamente&tela=' + tela+"&dataFiltro="+$("#dataFiltro").val()+'&paginaFiltro='+$("#paginaFiltro").val()+"&subitemFiltro="+$("#subitemFiltro").val()+"&bannerFiltro="+$("#bannerFiltro").val()+"&nomeFiltro="+$("#nomeFiltro").val()+"&emailFiltro="+$("#emailFiltro").val()+"&tipoServicoFiltro="+$("#tipoServicoFiltro").val()+"&idUser="+idUser+"&pagina="+$("#pagina").val()+"&usuarioFiltro="+$('#usuarioFiltro').val()+"&acaoFiltro="+$('#acaoFiltro').val()+"&tipoModuloFiltro="+$("#tipoModuloFiltro").val()+"&idFiltro="+$("#idFiltro").val()+"&formaPagamentoFiltro="+$("#formaPagamentoFiltro").val()+"&statusFiltro="+$("#statusFiltro").val()+"&nomeProdutoFiltro="+$("#nomeProdutoFiltro").val()+"&idProdutoFiltro="+$("#idProdutoFiltro").val()+"&dataFimFiltro="+$("#dataFimFiltro").val()+"&categoriaFiltro="+$("#categoriaFiltro").val()+"&atributoFiltro="+$("#atributoFiltro").val()+"&relacionamentoFiltro="+$("#relacionamentoFiltro").val()+"&produtoFiltro="+$("#produtoFiltro").val()+"&marcaFiltro="+$("#marcaFiltro").val()+"&sugestaoFiltro="+$("#sugestaoFiltro").val()+"&clienteFiltro="+$('#clienteFiltro').val()+"&redeSocialFiltro="+$("#redeSocialFiltro").val()+"&parceiroFiltro="+$("#parceiroFiltro").val()+"&seloFiltro="+$("#seloFiltro").val()+"&listaPresenteFiltro="+$("#listaPresentesFiltro").val()+"&buscaFiltro="+$("#buscaFiltro").val()+"&anoFiltro="+$("#anoFiltro").val()+"&diaFiltro="+$("#diaFiltro").val()+"&diaFimFiltro="+$("#diaFimFiltro").val()+"&mesFimFiltro="+$("#mesFimFiltro").val()+"&anoFimFiltro="+$("#anoFimFiltro").val()+"&feriadoFiltro="+$("#feriadoFiltro").val(),
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#conteudo").html(data[1]);
                $("#contadorSite").html(data[2]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            //$("#conteudo").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function limparCampos(){
    $("#id").val('');
    for (i = 1; i <= 10; i++) {
        $("#attribute"+i).val('0');
    }
    $("#code").val('');
    $("#name").val('');
    $("#value").val('');
    $("#promotion").val('');
    $("#validity_promotion").val('');
    $("#estoque").val('');
    $("#status").val('0');
}
function limparCamposImagens(){
    $("#id").val('');
    $("#item").val('');
    $("#name").val('');
    $("#imagem").val('');
    $("#status").val('0');
}
function limparCamposVideos(){
    $("#id").val('');
    $("#v").val('');
    $("#name").val('');
    $("#status").val('0');
}
function listarEstoque(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=listarEstoque&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#estoqueProduto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#estoqueProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function listarImagens(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=listarImagens&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#imagensProduto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#imagensProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function listarVideos(id, url){
    $.ajax({
        url: url+'ajax.php?&acao=listarVideos&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#videosProduto").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#videosProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function verInformacoesCaixa(cashier_systema){
    if (document.getElementById('informacoesCaixa').style.display == 'none'){
        $('#informacoesCaixa').show('slow');
    }
    else{
        $('#informacoesCaixa').hide('fast');
    }
}
function verInformacoesEscolar(school_system){
    if (document.getElementById('informacoesEscolar').style.display == 'none'){
        $('#informacoesEscolar').show('slow');
    }
    else{
        $('#informacoesEscolar').hide('fast');
    }
}
function selectProductItemCadastro(id, url){
    if (id == ""){
        $("#productsItemCadastro").html('Selecione o produto corretamente acima!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=productItemCadastro&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#productsItemCadastro").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#productsItemCadastro").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });;
    }
}
function selectProductItemEdita(id, request, product, url){
    if (id == ""){
        $("#productsItemEdita").html('Selecione o produto corretamente acima!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=productItemEdita&id=' + id+'&request='+request+"&product="+product,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#productsItemEdita").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#productsItemEdita").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });;
    }
}
function selectProductCadastro(id, url){
    if (id == ""){
        $("#selecionadoProdutoCadastro").html('Selecione o produto corretamente acima!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaProdutoCadastro&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#selecionadoProdutoCadastro").html(data[1]);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#selecionadoProdutoCadastro").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });;
    }
}

function selecionaProdutoEdita(id, request, product, id2, url){
    if (id == ""){
        $("#selecionadoProdutoEdita").html('Selecione o produto corretamente acima!');
    }
    else{
        $.ajax({
            url: url+'ajax.php?&acao=selecionaProdutoEdita&id=' + id+"&request="+request+"&product="+product+"&id2="+id2,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#selecionadoProdutoEdita").html(data[1]);
                    $("#idEdita").val(id);
                    selectProductItemEdita(id, request, product, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#selecionadoProdutoEdita").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });;
    }
}
function pegaItensPedido(id, cadastrar, editar, excluir, url){
    $.ajax({
        url: url+'ajax.php?&acao=pegaItensPedido&id=' + id+"&cadastrar="+cadastrar+"&editar="+editar+"&excluir="+excluir,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#itensPedido").html(data[1]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#itensPedido").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });;
}
function vaiProduto(id){
    $("#edicaoProduto").hide('fast');
    $("#relacionamentosDados").hide('fast');
    $("#estoqueDados").hide('fast');
    $("#imagensDados").hide('fast');
    $("#videosDados").hide('fast');
    $("#cadastroProduto").hide('fast');
    $("#relacionamentosCadDados").hide('fast');
    $("#"+id).show('slow');
}
function vaiIframeEstoque(url){
    idProduto = $("#idEdicao").val();
    var htmlEstoque = "<br><br><h3>Estoque</h3><iframe src='"+url+"estoqueProduto.php?idProduto="+idProduto+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
    $('#estoqueDados').html(htmlEstoque);
}
function vaiIframeImagem(url){
    idProduto = $("#idEdicao").val();
    var htmlImagens = "<br><br><h3>Imagens</h3><iframe src='"+url+"imagensProduto.php?idProduto="+idProduto+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
    $('#imagensDados').html(htmlImagens);
}
function vaiIframeVideos(url){
    idProduto = $("#idEdicao").val();
    var htmlVideos = "<br><br><h3>Vídeos</h3><iframe src='"+url+"videosProduto.php?idProduto="+idProduto+"' width=\"100%\" height=\"300\"><br><br><br><br><br><br><br><br><div class=\"modal-footer\"><button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
    $('#videosDados').html(htmlVideos);
}
function vaiPedido(id){
    $("#pedidoDados").hide('fast');
    $("#clienteDados").hide('fast');
    $("#itensDados").hide('fast');
    $("#enderecoDados").hide('fast');
    $("#"+id).show('slow');
}
function incluirItem(url) {
    if ($("#productCadastro").val() != '3' && $("#productCadastro").val() != '4') {
        if ($("#productItemCadastro").val() == "") {
            alertBHCommerce('Informe o item do produto corretamente!');
        } else if ($("#domineCadastro").val() == "") {
            alertBHCommerce('Informe o domínio corretamente!');
            $("#domineCadastro").focus();
        } else {
            $.ajax({
                url: url + 'ajax.php?&acao=incluirItemPedido&request=' + $("#requestCadastro").val() + "&product=" + $("#productCadastro").val() + "&product_item=" + $('#productItemCadastro').val() + "&domine=" + $('#domineCadastro').val(),
                success: function (data) {
                    var data = data.split('|-|');
                    if (data[0] == 1) {
                        $("#productCadastro").val('');
                        $('#selecionadoProdutoCadastro').html('');
                        $("#cadastrarItem").hide('fast');
                        pegaItensPedido($("#requestCadastro").val(), 1, 1, 1, url);
                    } else if (data[0] == 0) {
                        alertBHCommerce('Erro: ' + data[1]);
                    }
                },
                beforeSend: function () {
                    $("#domineCadastro").val('Aguarde... Carregando...')
                }
            });
        }
    } else if ($("#productCadastro").val() == '3') {
        if ($("#razaoSocialCaixa").val() == "") {
            alertBHCommerce('Informe a razao social do estabelecimento corretamente!');
            $("#razaoSocialCaixa").focus();
        } else if ($("#nomeFantasiaCaixa").val() == "") {
            alertBHCommerce('Informe o nome fantasia do estabelecimento corretamente!');
            $("#nomeFantasiaCaixa").focus();
        } else if ($("#emailCaixa").val() == "" || !validateEmail($("#emailCaixa").val())) {
            alertBHCommerce('Informe o email do estabelecimento corretamente!');
            $("#emailCaixa").focus();
        } else if ($("#cnpjCaixa").val() == "") {
            alertBHCommerce('Informe o cnpj do estabelecimento corretamente!');
            $("#cnpjCaixa").focus();
        } else if ($("#cepCaixa").val() == "") {
            alertBHCommerce('Informe o cep do estabelecimento corretamente!');
            $("#cepCaixa").focus();
        } else if ($("#logradouroCaixa").val() == "") {
            alertBHCommerce('Informe o logradouro do estabelecimento corretamente!');
            $("#logradouroCaixa").focus();
        } else if ($("#numeroCaixa").val() == "") {
            alertBHCommerce('Informe o número do estabelecimento corretamente!');
            $("#numeroCaixa").focus();
        } else if ($("#bairroCaixa").val() == "") {
            alertBHCommerce('Informe o bairro do estabelecimento corretamente!');
            $("#bairroCaixa").focus();
        } else if ($("#cidadeCaixa").val() == "") {
            alertBHCommerce('Informe a cidade do estabelecimento corretamente!');
            $("#cidadeCaixa").focus();
        } else if ($("#estadoCaixa").val() == "") {
            alertBHCommerce('Informe o estado do estabelecimento corretamente!');
            $("#estadoCaixa").focus();
        } else if ($("#tipoEstabelecimentoCaixa").val() == "") {
            alertBHCommerce('Informe o tipo do estabelecimento corretamente!');
            $("#tipoEstabelecimentoCaixa").focus();
        } else {
            if ($("#tipoEstabelecimentoCaixa").val() == '1') {
                if ($("#quantidadeRealizarPedido").val() == "") {
                    alertBHCommerce('Informe a quantidade de mesas do estabelecimento corretamente!');
                    $("#quantidadeRealizarPedido").focus();
                } else if ($("#numPessoasRealizarPedido").val() == "") {
                    alertBHCommerce('Informe o número de pessoas por mesa do estabelecimento corretamente!');
                    $("#numPessoasRealizarPedido").focus();
                } else if ($("#perGarcomRealizarPedido").val() == "") {
                    alertBHCommerce('Informe o percentual do garçom do estabelecimento corretamente!');
                    $("#perGarcomRealizarPedido").focus();
                } else {
                    $.ajax({
                        url: url + 'ajax.php?&acao=incluirItemPedido&request=' + $("#requestCadastro").val() + "&product=" + $("#productCadastro").val() + "&product_item=" + $('#productItemCadastro').val() + "&razaoSocial=" + $('#razaoSocialCaixa').val() + "&nomeFantasia=" + $('#nomeFantasiaCaixa').val() + "&email=" + $('#emailCaixa').val() + "&cnpj=" + $('#cnpjCaixa').val() + "&cep=" + $('#cepCaixa').val() + "&logradouro=" + $('#logradouroCaixa').val() + "&numero=" + $('#numeroCaixa').val() + "&complemento=" + $('#complementoCaixa').val() + "&bairro=" + $('#bairroCaixa').val() + "&cidade=" + $('#cidadeCaixa').val() + "&estado=" + $('#estadoCaixa').val() + "&tipoEstabelecimento=" + $('#tipoEstabelecimentoCaixa').val() + "&quantidade=" + $('#quantidadeRealizarPedido').val() + "&numPessoas=" + $('#numPessoasRealizarPedido').val() + "&perGarcom=" + $('#perGarcomRealizarPedido').val(),
                        success: function (data) {
                            var data = data.split('|-|');
                            if (data[0] == 1) {
                                $("#productCadastro").val('');
                                $('#selecionadoProdutoCadastro').html('');
                                $("#cadastrarItem").hide('fast');
                                pegaItensPedido($("#requestCadastro").val(), 1, 1, 1, url);
                            } else if (data[0] == 0) {
                                alertBHCommerce('Erro: ' + data[1]);
                            }
                        },
                        beforeSend: function () {
                            $("#domineCadastro").val('Aguarde... Carregando...')
                        }
                    });
                }
            } else {
                if ($("#quantidadeRealizarPedido").val() == "") {
                    alertBHCommerce('Informe a quantidade de caixas do estabelecimento corretamente!');
                    $("#quantidadeRealizarPedido").focus();
                } else {
                    $.ajax({
                        url: url + 'ajax.php?&acao=incluirItemPedido&request=' + $("#requestCadastro").val() + "&product=" + $("#productCadastro").val() + "&product_item=" + $('#productItemCadastro').val() + "&razaoSocial=" + $('#razaoSocialCaixa').val() + "&nomeFantasia=" + $('#nomeFantasiaCaixa').val() + "&email=" + $('#emailCaixa').val() + "&cnpj=" + $('#cnpjCaixa').val() + "&cep=" + $('#cepCaixa').val() + "&logradouro=" + $('#logradouroCaixa').val() + "&numero=" + $('#numeroCaixa').val() + "&complemento=" + $('#complementoCaixa').val() + "&bairro=" + $('#bairroCaixa').val() + "&cidade=" + $('#cidadeCaixa').val() + "&estado=" + $('#estadoCaixa').val() + "&tipoEstabelecimento=" + $('#tipoEstabelecimentoCaixa').val() + "&quantidade=" + $('#quantidadeRealizarPedido').val(),
                        success: function (data) {
                            var data = data.split('|-|');
                            if (data[0] == 1) {
                                $("#productCadastro").val('');
                                $('#selecionadoProdutoCadastro').html('');
                                $("#cadastrarItem").hide('fast');
                                pegaItensPedido($("#requestCadastro").val(), 1, 1, 1, url);
                            } else if (data[0] == 0) {
                                alertBHCommerce('Erro: ' + data[1]);
                            }
                        },
                        beforeSend: function () {
                            $("#domineCadastro").val('Aguarde... Carregando...')
                        }
                    });
                }
            }
        }
    } else if ($("#productCadastro").val() == '4') {
        if($("#nomeEscola").val() == ''){
            alertBHCommerce('Informe o nome da escola corretamente!');
            $("#nomeEscola").focus();
        }
        else if($("#emailEscola").val() == '' || !validateEmail($("#emailEscola").val())){
            alertBHCommerce('Informe o email da escola corretamente!');
            $("#emailEscola").focus();
        }
        else if ($("#cepEscola").val() == "") {
            alertBHCommerce('Informe o cep da escola corretamente!');
            $("#cepEscola").focus();
        } else if ($("#logradouroEscola").val() == "") {
            alertBHCommerce('Informe o logradouro da escola corretamente!');
            $("#logradouroEscola").focus();
        } else if ($("#numeroEscola").val() == "") {
            alertBHCommerce('Informe o número da escola corretamente!');
            $("#numeroEscola").focus();
        } else if ($("#bairroEscola").val() == "") {
            alertBHCommerce('Informe o bairro da escola corretamente!');
            $("#bairroEscola").focus();
        } else if ($("#cidadeEscola").val() == "") {
            alertBHCommerce('Informe a cidade da escola corretamente!');
            $("#cidadeEscola").focus();
        } else if ($("#estadoEscola").val() == "") {
            alertBHCommerce('Informe o estado da escola corretamente!');
            $("#estadoEscola").focus();
        } else if ($("#tipoNotaEscola").val() == "") {
            alertBHCommerce('Informe o tipo de nota da escola corretamente!');
            $("#tipoNotaEscola").focus();
        } else if ($("#turnoEscola").val() == "") {
            alertBHCommerce('Informe o turno da escola  corretamente!');
            $("#turnoEscola").focus();
        } else if ($("#letraEscola").val() == "") {
            alertBHCommerce('Informe a letra da escola corretamente!');
            $("#letraEscola").focus();
        } else {
            $.ajax({
                url: url + 'ajax.php?&acao=incluirItemPedido&request=' + $("#requestCadastro").val() + "&product=" + $("#productCadastro").val() + "&product_item=" + $('#productItemCadastro').val() + "&nome=" + $('#nomeEscola').val() + "&email=" + $('#emailEscola').val() + "&cep=" + $('#cepEscola').val() + "&logradouro=" + $('#logradouroEscola').val() + "&numero=" + $('#numeroEscola').val() + "&complemento=" + $('#complementoEscola').val() + "&bairro=" + $('#bairroEscola').val() + "&cidade=" + $('#cidadeEscola').val() + "&estado=" + $('#estadoEscola').val() + "&tipoNota=" + $('#tipoNotaEscola').val() + "&turno=" + $('#turnoEscola').val()+"&letra="+$("#letraEscola").val(),
                success: function (data) {
                    var data = data.split('|-|');
                    if (data[0] == 1) {
                        $("#productCadastro").val('');
                        $('#selecionadoProdutoCadastro').html('');
                        $("#cadastrarItem").hide('fast');
                        pegaItensPedido($("#requestCadastro").val(), 1, 1, 1, url);
                    } else if (data[0] == 0) {
                        alertBHCommerce('Erro: ' + data[1]);
                    }
                },
                beforeSend: function () {
                    $("#domineCadastro").val('Aguarde... Carregando...')
                }
            });
        }
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function atualizarItem(url){
    if ($("#productEdita").val() != 3 || $("#productEdita").val() != 4){
        if ($("#productItemCEdita").val() == ""){
            alertBHCommerce('Informe o item do produto corretamente!');
        }
        else if ($("#domineEdita").val() == ""){
            alertBHCommerce('Informe o domínio corretamente!');
            $("#domineCadastro").focus();
        }
        else{
            $.ajax({
                url: url+'ajax.php?&acao=editarItemPedido&id='+$("#idEdita").val()+'&request=' + $("#requestEdita").val()+"&product="+$("#productEdita").val()+"&product_item="+$('#productItemEdita').val()+"&domine="+$('#domineEdita').val(),
                success: function (data) {
                    var data = data.split('|-|');
                    if (data[0] == 1) {
                        $("#productEdita").val('');
                        $('#selecionadoProdutoEdita').html('');
                        $("#cadastrarItem").hide('fast');
                        pegaItensPedido($("#requestEdita").val(), 1, 1, 1, url);
                    } else if (data[0] == 0) {
                        alertBHCommerce('Erro: '+data[1]);
                    }
                },
                beforeSend: function () {
                    $("#domineEdita").val('Aguarde... Carregando...')
                }
            });
        }
    }
}
function excluirItemPedido(id, request, url) {
    if (confirm('Tem certeza que deseja excluir esse item do orçamento?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirItemPedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    pegaItensPedido(request, 1, 1, 1, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function editaEstoque(id, url, idProduto){
    $.ajax({
        url: url+'ajax.php?&acao=editaEstoque&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#id").val(data[1]);
                $("#code").val(data[2]);
                $("#name").val(data[3]);
                $("#value").val(data[4]);
                $("#promotion").val(data[5]);
                $("#validity_promotion").val(data[6]);
                $("#status").val(data[7]);
                $("#estoque").val(data[8]);
                for (i = 1; i <= 10; i++){
                    $("#attribute"+i).val(data[8 + i]);
                }
                $("#peso").val(data[19]);
                $("#largura").val(data[20]);
                $("#altura").val(data[21]);
                $("#comprimento").val(data[22]);
                $("#diametro").val(data[23]);
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#id").val('Aguarde... Carregando...');
            for(i = 1; i <= 10; i++) {
                $("#attribute"+i).val('');
            }
            $("#code").val('Aguarde... Carregando...');
            $("#name").val('Aguarde... Carregando...');
            $("#value").val('Aguarde... Carregando...');
            $("#promotion").val('Aguarde... Carregando...');
            $("#validity_promotion").val('Aguarde... Carregando...');
            $("#estoque").val('Aguarde... Carregando...');
            $("#status").val('0');
        }
    });
}
function editaImagem(id, url, idProduto){
    $.ajax({
        url: url+'ajax.php?&acao=editaImagem&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#id").val(data[1]);
                $("#item").val(data[2]);
                $("#name").val(data[3]);
                $("#status").val(data[4]);
                $("#item").focus();
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#id").val('Aguarde... Carregando...');
            $("#item").val('');
            $("#name").val('Aguarde... Carregando...');
            $("#imagem").val('');
            $("#status").val('0');
        }
    });
}
function editaVideos(id, url, idProduto){
    $.ajax({
        url: url+'ajax.php?&acao=editaVideos&id=' + id,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#id").val(data[1]);
                $("#v").val(data[2]);
                $("#name").val(data[3]);
                $("#status").val(data[4]);
                $("#item").focus();
            } else if (data[0] == 0) {
                alertBHCommerce('Erro: '+data[1]);
            }
        },
        beforeSend: function () {
            $("#id").val('Aguarde... Carregando...');
            $("#v").val('Aguarde... Carregando...');
            $("#name").val('Aguarde... Carregando...');
            $("#imagem").val('');
            $("#status").val('0');
        }
    });
}
function excluirEstoque(id, url, idProduto){
    if (confirm('Tem certeza que deseja excluir esse estoque?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirEstoque&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Estoque excluído com sucesso!');
                    listarEstoque(idProduto, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#itensVendaProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function excluirImagem(id, url, idProduto){
    if (confirm('Tem certeza que deseja excluir essa imagem?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirImagem&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Imagem excluída com sucesso!');
                    listarImagens(idProduto, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#imagensProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function excluirImagemFundo(url){
    if (confirm('Tem certeza que deseja excluir a imagem de fundo padrão do Catálogo?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirImagemFundo',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Imagem excluída com sucesso!');
                    location.href="";
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#conteudo").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function excluirImagemBusca(url){
    if (confirm('Tem certeza que deseja excluir a imagem de fundo da busca?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirImagemBusca',
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Imagem excluída com sucesso!');
                    location.href="";
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#conteudo").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function excluirVideos(id, url, idProduto){
    if (confirm('Tem certeza que deseja excluir esse vídeo?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluirVideos&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Video excluída com sucesso!');
                    listarVideos(idProduto, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#videosProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function replicarTodas(product, product_item, url){
    if (confirm('Tem certeza que deseja replicar as fotos por todos os itens de estoque?')){
        $.ajax({
            url: url+'ajax.php?&acao=replicarTodas&product=' + product+"&product_item="+product_item,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Imagem replicada com sucesso!');
                    listarImagens(product, url);
                } else if (data[0] == 0) {
                    alertBHCommerce('Erro: '+data[1]);
                }
            },
            beforeSend: function () {
                $("#imagensProduto").html('<img src="'+url+'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
}
function excluirTipoModulo(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse Tipo de Módulo?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=type_modules&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tiposModulo', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirModulo(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse Módulo?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=modules&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('modulos', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirNewsletter(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse email da newsletter?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=newsletters&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('newsletter', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirStatusOrcamento(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse status de orçamento?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=requests_statuses&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('statusOrcamento', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTipoDocumento(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse tipo de documento?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=type_documents&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tiposDocumento', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirClientes(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse cliente?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=clients&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('clientes', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirParametroSite(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse parâmetro do site?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=param_sites&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('paramSite', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirParametroAdmin(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse parâmetro do admin?')) {
        $.ajax({
            url: url + 'ajax.php?&acao=excluir&table=param_admins&id=' + id + "&artigo=" + artigo + "&idUser=" + idUser + "&tabela=" + table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('paramAdmin', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirStatusOrcamento(id, url, idUser, artigo, table) {
    if (confirm('Tem certeza que deseja excluir esse status de orçamento?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=requests_statuses&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('statusOrcamento', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirFormaPagamento(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa forma de pagamento?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=payment_methods&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('formasPagamento', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirFormaFrete(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa forma de frete?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=shipping_methods&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('formasFrete', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPosicao(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir essa posição?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=positions&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('posicoes', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTempoBanner(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse tempo do banner?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=time_banners&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tempoBanner', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTarget(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse target?')){
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=targets&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('target', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirProdutos(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse produto?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=products&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('produto', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function  excluirComentarioProduto(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse comentário de produto?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=products_reviews&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('comentariosProduto', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirPedido(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse orçamento?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=requests&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('pedido', url, idUser);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirTiposProduto(id, url, idUser, artigo, table){
    if (confirm('Tem certeza que deseja excluir esse tipo de produto?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluir&table=types_products&id=' + id+"&artigo="+artigo+"&idUser="+idUser+"&tabela="+table,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    verificaNovamente('tiposProduto', url);
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function excluirImg(table, id, url, idUser, artigo){
    if (confirm('Tem certeza que deseja excluir essa imagem?')) {
        $.ajax({
            url: url+'ajax.php?&acao=excluirImg&table='+table+'&id=' + id+"&idUser="+idUser+"&artigo="+artigo,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    if (table == 'usuarios') {
                        visualizarUsuarios(id, url, idUser);
                    }
                    else if (table == 'produto'){
                        visualizarProdutos(id, url, idUser);
                    }
                    else if (table == 'formaPagamento'){
                        visualizarFormaPagamento(id, url, idUser);
                    }
                    else if (table == 'banner'){
                        visualizarBanner(id, url, idUser);
                    }
                    else if (table == 'pagina'){
                        visualizarPagina(id, url, idUser);
                    }
                    else if (table == 'subitem'){
                        visualizarSubitem(id, url, idUser);
                    }
                    else if (table == 'versao'){
                        visualizarVersao(id, url, idUser);
                    }
                    else if (table == 'selo'){
                        visualizarSelos(id, url, idUser);
                    }
                    else if (table == 'social_network'){
                        visualizarRedesSociais(id, url, idUser);
                    }
                    else if (table == 'usuario'){
                        visualizarUsuarios(id, url, idUser);
                        if (data[1] == id && data[2]){
                            $('#imgUser').html('<img src="'+data[2]+'" onclick="abreFecha(\'saiUsuarios\')" style="cursor:pointer" class="img-circle elevation-2" alt="User Image">');
                        }
                    }
                    $('#registroExcluidoComSucesso').show('slow');
                    window.setInterval('$("#registroExcluidoComSucesso").hide("fast")', 15000);
                }
            }
        });
    }
}
function selecionaCliente(id, url){
    if(id) {
        $.ajax({
            url: url + 'ajax.php?&acao=selecionaCliente&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#dadosCliente").html(data[1]);
                    $("#enderecos").html(data[2]);
                }
            },
            beforeSend: function () {
                $("#dadosCliente").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
                $("#enderecos").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#dadosCliente").html('Selecione o cliente acima corretamente!');
        $("#enderecos").html('');
    }
}
function selecionaEndereco(id, url){
    if (id) {
        $.ajax({
            url: url + 'ajax.php?&acao=selecionaEndereco&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#dadosEndereco").html(data[1]);
                }
            },
            beforeSend: function () {
                $("#dadosEndereco").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#dadosEndereco").html('Selecione o endereço acima corretamente!');
    }
}
function addProdutoPedido(id, url, idUser){
    $("#addProdutoPedido").show('slow');
    $.ajax({
        url: url + 'ajax.php?&acao=adicionaProdutoPedido&id=' + id+"&idUser="+idUser,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#adicionaProdutoPedido").html(data[1]);
            }
        },
        beforeSend: function () {
            $("#adicionaProdutoPedido").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
        }
    });
}
function selecionaProdutoPedido(id, url){
    if (id) {
        $.ajax({
            url: url + 'ajax.php?&acao=selecionaProdutoPedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#itensProdutoPedido").html(data[1]);
                }
            },
            beforeSend: function () {
                $("#itensProdutoPedido").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#itensProdutoPedido").html('Selecione o produto acima corretamente!');
    }
}
function selecionaEstoquePedido(id, idProduto, url){
    if(id){
        $.ajax({
            url: url + 'ajax.php?&acao=selecionaEstoquePedido&id=' + id+"&idProduto="+idProduto,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    $("#itensVendaPedidoProduto").html(data[1]);
                }
            },
            beforeSend: function () {
                $("#itensVendaPedidoProduto").html('<img src="' + url + 'img/loader.gif" width="20"> Aguarde... Carregando...');
            }
        });
    }
    else{
        $("#itensVendaPedidoProduto").html('Selecione o item de venda acima corretamente!');
    }
}
function adicionarProdutoPedido(idProduto, idItVenda, dominio, url){
    if(idProduto != 3 && idProduto != 4){
        if ($("#dominioAdd").val() == ""){
            alertBHCommerce('Informe o domínio corretamente');
            $("#dominioAdd").focus();
        }
        else{
            $.ajax({
                url: url + 'ajax.php?&acao=adicionarProdutoPedido&idPedido=' + $("#pedidoAdd").val() + '&idProduto=' + idProduto + '&idItVenda=' + idItVenda + '&dominio=' + dominio + "&idUser",
                success: function (data) {
                    var data = data.split('|-|');
                    if (data[0] == 1) {
                        alertBHCommerce('Produto Inserido com sucesso!');
                        $('#produtoAdd').val('');
                        editarPedido($("#pedidoAdd").val(), url, $("#idUserAdd").val());
                    }
                },
                beforeSend: function () {
                }
            });
        }
    }
    else{
        if (idProduto == 3) {
            var cep = $("#cepAdd").val();
            if ($("#razaoSocialAdd").val() == "") {
                alertBHCommerce('Informe a razão social da empresa corretamente!');
                $("#razaoSocialAdd").focus();
            } else if ($("#nomeFantasiaAdd").val() == "") {
                alertBHCommerce('Informe o nome fantasia da empresa corretamente!');
                $("#nomeFantasiaAdd").focus();
            } else if ($("#cnpjAdd").val() == "" || !valida_cnpj($("#cnpjAdd").val())) {
                alertBHCommerce('Informe o cnpj da empresa corretamente!');
                $("#cnpjAdd").focus();
            } else if ($("cemailAdd").val() == "" || !validateEmail($("#emailAdd").val())) {
                alertBHCommerce('Informe o email da empresa corretamente!');
                $("#emailAdd").focus();
            } else if ($("cepAdd").val() == "" || cep.length < 9) {
                alertBHCommerce('Informe o cep da empresa corretamente!');
                $("#cepAdd").focus();
            } else if ($("#logradouroAdd").val() == "") {
                alertBHCommerce('Informe o logradouro da empresa corretamente!');
                $("#logradouroAdd").focus();
            } else if ($("#numeroAdd").val() == "") {
                alertBHCommerce('Informe o número da empresa corretamente!');
                $("#numeroAdd").focus();
            } else if ($("#bairroAdd").val() == "") {
                alertBHCommerce('Informe o bairro da empresa corretamente!');
                $("#bairroAdd").focus();
            } else if ($("#cidadeAdd").val() == "") {
                alertBHCommerce('Informe a cidade da empresa corretamente!');
                $("#cidadeAdd").focus();
            } else if ($("#estadoAdd").val() == "") {
                alertBHCommerce('Informe o estado da empresa corretamente!');
                $("#estadoAdd").focus();
            } else if ($(       "#tipoEstabelecimentoAdd").val() == ""){
                alertBHCommerce('Selecione o tipo do estabelecimento corretamente...');
                $("#tipoEstabelecimentoAdd").focus();
            }
            else{
                if ($("#tipoEstabelecimentoAdd").val() == 1){
                    if ($("#quantidadeAdd").val() == ""){
                        alertBHCommerce('Informe a quantidade de mesas do estabelecimento corretamente!');
                        $("#quantidadeAdd").focus();
                    }
                    else if ($("#numPessoasAdd").val() == ""){
                        alertBHCommerce('Informe o número de pessoas por mesa corretamente!');
                        $("#numPessoasAdd").focus();
                    }
                    else if ($("#percentualAdd").val() == ""){
                        alertBHCommerce('Informe o percentual do garçom corretamente!');
                        $("#percentualAdd").focus();
                    }
                    else{
                        $.ajax({
                            url: url + 'ajax.php?&acao=adicionarProdutoPedido&idPedido='+$("#pedidoAdd").val()+'&idProduto=' + idProduto + '&idItVenda=' + idItVenda+"&razaoSocial="+$("#razaoSocialAdd").val()+"&nomeFantasia="+$("#nomeFantasiaAdd").val()+"&cnpj="+$("#cnpjAdd").val()+"&email="+$("#emailAdd").val()+"&cep="+$("#cepAdd").val()+"&logradouro="+$("#logradouroAdd").val()+"&numero="+$("#numeroAdd").val()+"&complemento="+$("#complementoAdd").val()+"&bairro="+$("#bairroAdd").val()+"&cidade="+$("#cidadeAdd").val()+"&estado="+$("#estadoAdd").val()+"&tipoEstabelecimento="+$("#tipoEstabelecimentoAdd").val()+"&quantidade="+$("#quantidadeAdd").val()+"&numPessoas="+$("#numPessoasAdd").val()+"&percentual="+$("#percentualAdd").val(),
                            success: function (data) {
                                var data = data.split('|-|');
                                if (data[0] == 1) {
                                    alertBHCommerce('Produto Inserido com sucesso!');
                                    $('#produtoAdd').val('');
                                    editarPedido($("#pedidoAdd").val(), url, $("#idUserAdd").val());
                                }
                            },
                            beforeSend: function () {
                            }
                        });
                    }
                }
                else {
                    if ($("#quantidadeAdd").val() == ""){
                        alertBHCommerce('Informe a quantidade de caixas do estabelecimento corretamente!');
                        $("#quantidadeAdd").focus();
                    }
                    else{
                        $.ajax({
                            url: url + 'ajax.php?&acao=adicionarProdutoPedido&idPedido='+$("#pedidoAdd").val()+'&idProduto=' + idProduto + '&idItVenda=' + idItVenda+"&razaoSocial="+$("#razaoSocialAdd").val()+"&nomeFantasia="+$("#nomeFantasiaAdd").val()+"&cnpj="+$("#cnpjAdd").val()+"&email="+$("#emailAdd").val()+"&cep="+$("#cepAdd").val()+"&logradouro="+$("#logradouroAdd").val()+"&numero="+$("#numeroAdd").val()+"&complemento="+$("#complementoAdd").val()+"&bairro="+$("#bairroAdd").val()+"&cidade="+$("#cidadeAdd").val()+"&estado="+$("#estadoAdd").val()+"&tipoEstabelecimento="+$("#tipoEstabelecimentoAdd").val()+"&quantidade="+$("#quantidadeAdd").val()+"&numPessoas="+$("#numPessoasAdd").val()+"&percentual="+$("#percentualAdd").val(),
                            success: function (data) {
                                var data = data.split('|-|');
                                if (data[0] == 1) {
                                    alertBHCommerce('Produto Inserido com sucesso!');
                                    $('#produtoAdd').val('');
                                    editarPedido($("#pedidoAdd").val(), url, $("#idUserAdd").val());
                                }
                            },
                            beforeSend: function () {
                            }
                        });
                    }
                }
            }
        }
        else if (idProduto == 4) {
            var cep = $("#cepAdd").val();
            if ($("#nomeEscolaAdd").val() == "") {
                alertBHCommerce('Informe o nome da escola corretamente!');
                $("#razaoSocialAdd").focus();
            } else if ($("#emailAdd").val() == "" || !validateEmail($("#emailAdd").val())) {
                alertBHCommerce('Informe o email da escola corretamente!');
                $("#emailAdd").focus();
            }
            else if ($("cepAdd").val() == "" || cep.length < 9) {
                alertBHCommerce('Informe o cep da escola corretamente!');
                $("#cepAdd").focus();
            } else if ($("#logradouroAdd").val() == "") {
                alertBHCommerce('Informe o logradouro da escola corretamente!');
                $("#logradouroAdd").focus();
            } else if ($("#numeroAdd").val() == "") {
                alertBHCommerce('Informe o número da escola corretamente!');
                $("#numeroAdd").focus();
            } else if ($("#bairroAdd").val() == "") {
                alertBHCommerce('Informe o bairro da escola corretamente!');
                $("#bairroAdd").focus();
            } else if ($("#cidadeAdd").val() == "") {
                alertBHCommerce('Informe a cidade da escola corretamente!');
                $("#cidadeAdd").focus();
            } else if ($("#estadoAdd").val() == "") {
                alertBHCommerce('Informe o estado da escola corretamente!');
                $("#estadoAdd").focus();
            } else if ($("#tipoNotaAdd").val() == ""){
                alertBHCommerce('Selecione o tipo do nota da escola corretamente...');
                $("#tipoNotaAdd").focus();
            } else if ($("#turnoAdd").val() == ""){
                alertBHCommerce('Selecione o turno da escola corretamente...');
                $("#turnoAdd").focus();
            } else if ($("#letraAdd").val() == ""){
                alertBHCommerce('Selecione a letra da escola corretamente...');
                $("#letraAdd").focus();
            }
            else{
                $.ajax({
                    url: url + 'ajax.php?&acao=adicionarProdutoPedido&idPedido='+$("#pedidoAdd").val()+'&idProduto=' + idProduto + '&idItVenda=' + idItVenda+"&nome="+$("#nomeEscolaAdd").val()+"&email="+$("#emailAdd").val()+"&cep="+$("#cepAdd").val()+"&logradouro="+$("#logradouroAdd").val()+"&numero="+$("#numeroAdd").val()+"&complemento="+$("#complementoAdd").val()+"&bairro="+$("#bairroAdd").val()+"&cidade="+$("#cidadeAdd").val()+"&estado="+$("#estadoAdd").val()+"&tipoNota="+$("#tipoNotaAdd").val()+"&turno="+$("#turnoAdd").val()+"&letra="+$("#letraAdd").val(),
                    success: function (data) {
                        var data = data.split('|-|');
                        if (data[0] == 1) {
                            alertBHCommerce('Produto Inserido com sucesso!');
                            $('#produtoAdd').val('');
                            editarPedido($("#pedidoAdd").val(), url, $("#idUserAdd").val());
                        }
                    },
                    beforeSend: function () {
                    }
                });
            }
        }
    }
}
function excluirProdutoPedido(id, url, idUser, idPedido){
    if (confirm('Tem certeza que deseja excluir esse produto desse orçamento?')){
        $.ajax({
            url: url + 'ajax.php?&acao=excluirProdutoPedido&id=' + id,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Produto excluído com sucesso!');
                    editarPedido(idPedido, url, idUser);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function selecionaTipoEstabelecimentoAdd(id){
    if (id == 1){
        var html = "<label for='quantidadeAdd'>Quantidade de Mesas: </label><input type='number' name='quantidadeAdd' id='quantidadeAdd' class='form-control'>" +
            "<label for='numPessoasAdd'>Número de Pessoas por Mesa: </label><input type='number' name='numPessoasAdd' id='numPessoasAdd' class='form-control'>" +
            "<label for='percentualAdd'>Percentual do Garçom (em %): </label><input type='number' name='percentualAdd' id='percentualAdd' class='form-control'>";
    }
    else if (id == 2){
        var html = "<label for='quantidadeAdd'>Quantidade de Caixas: </label><input type='number' name='quantidadeAdd' id='quantidadeAdd' class='form-control'>";
    }
    else{
        var html = "";
    }
    $("#outrosItensAdd").html(html);
}
function mudaImgProdutoPedido(qual, id, url, nome){
    if (qual == 'close') {
        var img = "<img src='" + url + "img/" + qual + ".png' width='20' style='cursor:pointer' title='Fechar Informações do "+nome+"' onclick=mudaImgProdutoPedido('plus','"+id+"','"+url+"','"+nome+"')>";
    }
    else{
        var img = "<img src='" + url + "img/" + qual + ".png' width='20' style='cursor:pointer' title='Informações do "+nome+"' onclick=mudaImgProdutoPedido('close','"+id+"','"+url+"','"+nome+"')>";
    }
    $("#imgProdutoPedido"+id).html(img);
}
function aprovaUsuario(id, url, idUser){
    if (confirm('Tem certeza que deseja aprovar esse usuário?')){
        $.ajax({
            url: url + 'ajax.php?&acao=aprovarUsuario&id=' + id+"&idUser="+idUser,
            success: function (data) {
                var data = data.split('|-|');
                if (data[0] == 1) {
                    alertBHCommerce('Usuário aprovado com sucesso!');
                    verificaNovamente('usuarios-pre', url, idUser);
                }
            },
            beforeSend: function () {
            }
        });
    }
}
function abreFoto(){
    var qualFotoEsta = $("#qualFotoEsta").val();
    qualFotoEsta = parseInt(qualFotoEsta) + 1;
    qualVai = parseInt(qualFotoEsta) + 1;
    $("#qualFotoEsta").val(qualFotoEsta);
    var html = "<label for='imagemCadastro"+qualFotoEsta+"'>Imagem "+qualFotoEsta+"</label><input type='file' name='imagemCadastro"+qualFotoEsta+"' class='form-control' id='imagemCadastro"+qualFotoEsta+"'><div id='maisFotos"+qualVai+"'></div>";
    $('#maisFotos'+qualFotoEsta).html(html);
}
function verificaDepto(url, apagarTodos){
    var depto = "";
    for (j = 1; j <= 999; j++){
        if (document.getElementById("deptoEditar"+j)){
            depto += j+"*|*"+document.getElementById('deptoEditar'+j).checked+"|-|";
        }
    }
    $.ajax({
        url: url + 'ajax.php?acao=pegaSubs&product='+$("#idEdicao").val()+"&depto="+depto,
        success: function (data) {
            var data = data.split('|-|');
            if (data[0] == 1) {
                $("#subcategorias").html(data[1]);
            }
        },
        beforeSend: function () {
            $("#subcategorias").html("<img src='"+url+"img/loader.gif' width='20'> Aguarde... Carregando...");
        }
    });
}
function mudaAvaliacao(qual, url){
    var html = "<input type='hidden' value='"+qual+"' name='avaliacaoEditar' id='avaliacaoEditar'>";
    for (i = 1; i <= qual; i++){
        html += "<img src='"+url+"img/star.png' title='Nota "+i+"' style='cursor:pointer' onclick=mudaAvaliacao('"+i+"','"+url+"')>";
    }
    if (qual < 5) {
        for (i = i; i <= 5; i++) {
            html += "<img src='" + url + "img/starApagada.png' title='Nota " + i + "' style='cursor:pointer' onclick=mudaAvaliacao('" + i + "','" + url + "')>";
        }
    }
    $('#avaliacaoEdicao').html(html);
}
function selecionaComMsgCad(comMsg){
    if (comMsg == '1'){
        $("#msgCadastroAparece").show('slow');
    }
    else{
        $("#msgCadastroAparece").hide('fast');
    }
}
function selecionaComMsgEdi(comMsg){
    if (comMsg == '1'){
        $("#msgEdicaoAparece").show('slow');
    }
    else{
        $("#msgEdicaoAparece").hide('fast');
    }
}
function alertBHCommerce(msg){
    $("#msgAlert").html(msg);
    $("#alert-box").show('slow');
}
function valida_cnpj(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;


    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;


    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

function formataCampo(campo, Mascara, evento) {



    var boleanoMascara;







    var Digitato = evento.keyCode;



    exp = /\-|\.|\/|\(|\)| /g



    campoSoNumeros = campo.value.toString().replace( exp, "" );







    var posicaoCampo = 0;



    var NovoValorCampo="";



    var TamanhoMascara = campoSoNumeros.length;;







    if (Digitato != 8) { // backspace



        for(i=0; i<= TamanhoMascara; i++) {



            boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")



                || (Mascara.charAt(i) == "/"))



            boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(")



                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))



            if (boleanoMascara) {



                NovoValorCampo += Mascara.charAt(i);



                TamanhoMascara++;



            }else {



                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);



                posicaoCampo++;



            }



        }



        campo.value = NovoValorCampo;



        return true;



    }else {



        return true;



    }



}
