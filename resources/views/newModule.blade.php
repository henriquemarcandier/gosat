@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-4">
            <h1>Módulos</h1>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}modulos'">&laquo; Voltar</button>
            </div>
            <div class="col-sm-4">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}modulos">Módulos</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Cadastro de Módulo</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" action="{{env('APP_URL')}}modulos/cadastrar">
                @csrf
                <div class="card-body">
                  <div class="form-group">
                    <label for="moduloPai">Módulo Pai:</label>
                    <select class="form-control" id="moduloPai" name="moduloPai">
                      <option value="0">Selecione o pai abaixo se for o caso...</option>
                      @foreach ($modulePai as $key => $value)
                      <option value="{{$value->id}}">{{$value->name}}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="nome">Nome: </label>
                    <input type="text" class="form-control" id="nome" name="nome" placeholder="Informe o nome do módulo..." required>
                  </div>
                  <div class="form-group">
                    <label for="slug">URL Amigável: </label>
                    <input type="text" class="form-control" id="slug" name="slug" placeholder="Informe a url amigável do módulo...">
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
                  <button type="button" class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}modulos'">&laquo; Voltar</button>
                </div>
              </form>
            </div>
  @endsection