@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
            <h1>API</h1>
            </div>
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Integrações</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}api">API</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
        <div class="card-header">
        <h3 class="card-title">Pesquisar</h3>
        </div>
        <!-- /.card-header -->
    </div>
    <h3><label for="cpf">Informe o CPF abaixo:</label></h3>
    <form method="post" action="" name="verificaApi" id="verificaApi">
        @csrf
        <input type="text" class="form-control" name="cpf" id="cpf" placeholder="Informe o cpf aqui corretamente" required maxlength="14" onkeyup="mascara(this, '###.###.###-##', event)" onkeypress="mascara(this, '###.###.###-##', event)" onkeydown="mascara(this, '###.###.###-##', event)" onclick="mascara(this, '###.###.###-##', event)" value="{{(isset($_REQUEST['cpf'])) ? $_REQUEST['cpf'] : ''}}">
        <button type="submit" class="btn btn-primary">Consultar</button>
    </form>
    <div id="resultado" style="@if (!isset($_REQUEST['cpf'])) display:none; @endif">
    @if (isset($_REQUEST['cpf']))
        <h3 style="width:100%">Resultados para o CPF: {{$_REQUEST['cpf']}}</h3>
        @if ($apiRequest == 'CPF não encontrado.')
        <div class="btn btn-danger">CPF não localizado em nosso sistema!</div>
        @else
        <h3>Ordenação</h3>
        <form name="ordenacao" id="ordenacao" method="post">
            @csrf
            <input type="hidden" name="cpf" id="cpf" value="{{$_REQUEST['cpf']}}">
            <select name="ordem" id="ordem" class="form-control" onchange="$('#ordenacao').submit();">
                <option value="valorMax_desc" @if (!isset($_REQUEST['ordem']) || $_REQUEST['ordem'] == 'valorMax_desc') selected @endif>Por valor máximo descendente</option>
                <option value="valorMax_asc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'valorMax_asc') selected @endif>Por valor máximo ascendente</option>
                <option value="valorMin_desc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'valorMin_desc') selected @endif>Por valor mínimo descendente</option>
                <option value="valorMin_asc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'valorMin_asc') selected @endif>Por valor mínimo ascendente</option>
                <option value="qtdeParcMin_desc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'qtdeParcMin_desc') selected @endif>Por quantidade de parcelas mínima descendente</option>
                <option value="qtdeParcMin_asc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'qtdeParcMin_asc') selected @endif>Por quantidade de parcelas mínima ascendente</option>
                <option value="qtdeParcMax_desc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'qtdeParcMax_desc') selected @endif>Por quantidade de parcelas máxima descendente</option>
                <option value="qtdeParcMax_asc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'qtdeParcMax_asc') selected @endif>Por quantidade de parcelas máxima ascendente</option>
                <option value="jurosMes_desc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'jurosMes_desc') selected @endif>Por juros no mês descendente</option>
                <option value="jurosMes_asc" @if (isset($_REQUEST['ordem']) && $_REQUEST['ordem'] == 'jurosMes_asc') selected @endif>Por juros no mês ascendente</option>
            </select>
        </form>
            @foreach ($valores as $key => $value)
                    <div class="col-4 btn @if ($key % 3 == 0) btn-primary @elseif ($key % 3 == 1) btn-success @elseif ($key % 3 == 2) btn-warning @endif" style="float:left">
                        <h4 style="text-align:center">{{$value->nomeBanco}}</h4>
                        <p>
                            ID: <b>{{$value->idBanco}}</b><br>
                            Nome: <b>{{$value->nomeBanco}}</b>
                            <h5>Modalidade</h5>
                            Nome: <b>{{$value->nomeModalidade}}</b><br>
                            Código: <b>{{$value->cod}}</b><br>
                            <h5>Valores</h5>
                            Quantidade de Parcela Mínima: <b>{{$value->qtdeParcMin}}</b><br>
                            Quantidade de Parcela Máxima: <b>{{$value->qtdeParcMax}}</b><br>
                            Valor Mínimo: <b>R${{number_format($value->valorMin,2,',','.')}}</b><br>
                            Valor Máximo: <b>R${{number_format($value->valorMax,2,',','.')}}</b><br>
                            Juros Mes: <b>{{$value->jurosMes}}</b><br>
                        </p>
                    </div>
            @endforeach
        @endif
    @endif
    </div>
  @endsection