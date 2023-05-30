@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-4">
            <h1>Usuário</h1>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}usuario'">&laquo; Voltar</button>
            </div>
            <div class="col-sm-4">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}usuario">Usuário</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Visualização de Usuário</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
                <div class="card-body">
                  <div class="form-group">
                    <label for="nome">Nome: </label> {{$result[0]->name}}
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label> {{$result[0]->email}}
                  </div>
                  <div class="form-group">
                    <label for="email">Imagem:</label> <img src="@if ($result[0]->img){{env('APP_URL')}}dist/img/fotos/{{$result[0]->img}} @else{{env('APP_URL')}}dist/img/noFotoUsuario.png @endif" width="50"> @if ($permissao[0]->delete) @if ($result[0]->img) <button class="btn btn-warning" onclick="if (confirm('Tem certeza que deseja excluir essa imagem?')){ location.href='{{env('APP_URL')}}usuario/excluirImg/{{$result[0]->id}}';}">Excluir Imagem</button> @endif @endif
                  </div>
                  <div class="form-group">
                    <label for="email">Data de Inserção:</label> {{date('d/m/Y à\s H:i:s\h', strtotime($result[0]->created_at))}}
                  </div>
                  <div class="form-group">
                    <label for="email">Data de Atualização:</label> {{date('d/m/Y à\s H:i:s\h', strtotime($result[0]->updated_at))}}
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="button" class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}usuario'">&laquo; Voltar</button>
                </div>
            </div>
  @endsection