@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-4">
            <h1>Versões</h1>
            </div>
            <div class="col-sm-4">
              @if ($permissao[0]->edit)
              <button class="btn btn-primary" onclick="location.href='{{env('APP_URL')}}versao/add'">Criar Novo</button>
              @endif
            </div>
            <div class="col-sm-4">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}versao">Versões</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
        <div class="card-header" style="cursor:pointer" onclick="abreFecha('filtro')">
        <h3 class="card-title">Filtro</h3>
        </div>
        <!-- /.card-header -->
    </div>
    <div id="filtro" style="display:none">
      <form method="get" action="">
        <label for="nomeFiltro">Por Nome:</label>
        <input type="text" class="form-control" name="nomeFiltro" id="nomeFiltro" value="{{(isset($_REQUEST['nomeFiltro'])) ? $_REQUEST['nomeFiltro'] : ''}}">
        <div style="text-align:center"><button type="submit" class="btn btn-primary">Filtrar</button></div>
      </form>
    </div>
    <div class="card card-success">
        <div class="card-header" style="cursor:pointer" onclick="abreFecha('registros')">
        <h3 class="card-title">Registros</h3>
        </div>
        <!-- /.card-header -->
    </div>
    <div id="registros" class="card-body table-responsive p-0">
      @if (count($versions))
      <table class="table table-hover text-nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($versions as $key => $value)
          <tr>
            <td>{{$value->id}}</td>
            <td>{{$value->name}}</td>
            <td>
              <img src="{{env('APP_URL')}}dist/img/visualizar.svg" style="cursor:pointer" onclick="location.href='{{env('APP_URL')}}versao/visualizar/{{$value->id}}'" width="18">
              @if ($permissao[0]->edit)
              <img src="{{env('APP_URL')}}dist/img/editar.svg" style="cursor:pointer" onclick="location.href='{{env('APP_URL')}}versao/editar/{{$value->id}}'" width="18">
              @endif
              @if ($permissao[0]->delete)
              <img src="{{env('APP_URL')}}dist/img/excluir.svg" style="cursor:pointer" onclick="if (confirm('Tem certeza que deseja excluir essa versão?')){ location.href='{{env('APP_URL')}}versao/excluir/{{$value->id}}'; }" width="18">
              @endif
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
      @else
      <div class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}versao/add'">Sem nenhum registro encontrado! Cadastre um agora mesmo!</div>
      @endif
    </div>
  @endsection