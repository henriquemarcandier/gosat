@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
            <h1>Logs de Acesso</h1>
            </div>
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}logs">Logs de Acesso</a></li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-success">
        <div class="card-header" style="cursor:pointer" onclick="abreFecha('registros')">
        <h3 class="card-title">Registros</h3>
        </div>
        <!-- /.card-header -->
    </div>
    <div id="registros" class="card-body table-responsive p-0">
      @if (count($logs))
      <table class="table table-hover text-nowrap">
        <thead>
          <tr>
            <td>Ação</td>
            <td>Data do Registro</td>
          </tr>
        </thead>
        <tbody>
          @foreach ($logs as $key => $value)
          <tr>
            <td>{{$value->action}}</td>
            <td>{{date("d/m/Y H:i:s", strtotime($value->created_at))}}</td>
          </tr>
          @endforeach
        </tbody>
      </table>
      @else
      <div class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}modulos/add'">Sem nenhum registro encontrado! Cadastre um agora mesmo!</div>
      @endif
    </div>
  @endsection