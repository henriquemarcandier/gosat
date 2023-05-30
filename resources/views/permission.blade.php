@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
            <h1>Permissão</h1>
            </div>
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Usuários</li>
                <li class="breadcrumb-item active"><a href="{{env('APP_URL')}}permissao">Permissão</a></li>
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
      @if (count($users))
      <table class="table table-hover text-nowrap">
        <tbody>
          @foreach ($users as $key => $value)
          <tr>
            <td style="cursor:pointer" onclick="abrePermissoes('{{$value->id}}', '{{env('APP_URL')}}')">{{$value->name}}</td>
          </tr>
          <tr>
            <td id="permissoes{{$value->id}}" style="display:none"></td>
          </tr>
          @endforeach
        </tbody>
      </table>
      @else
      <div class="btn btn-danger" onclick="location.href='{{env('APP_URL')}}modulos/add'">Sem nenhum registro encontrado! Cadastre um agora mesmo!</div>
      @endif
    </div>
  @endsection