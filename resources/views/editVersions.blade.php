@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-4">
            <h1>Versão</h1>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}versao'">&laquo; Voltar</button>
            </div>
            <div class="col-sm-4">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}versao">Versão</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Edição de Versão</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{env('APP_URL')}}versao/edita" enctype="multipart/form-data">
                @csrf
                <input type="hidden" id="id" name="id" value="{{$versao[0]->id}}">
                <div class="card-body">
                  <div class="form-group">
                    <label for="nome">Nome: </label>
                    <input type="text" class="form-control" id="nome" name="nome" placeholder="Informe o nome do usuário..." required value="{{$versao[0]->name}}">
                  </div>
                  <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <textarea class="form-control" id="descricao" name="descricao" placeholder="Informe o email do usuário..." required>{{$versao[0]->description}}</textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFile">Imagem</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="form-control" id="img" name="img">
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Atualizar</button>
                  <button type="button" class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}versao'">&laquo; Voltar</button>
                </div>
              </form>
            </div>
  @endsection