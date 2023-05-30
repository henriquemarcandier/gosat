@extends('master.layout')
@section('content')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
            <h1>Sem Permissão</h1>
            </div>
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="{{env('APP_URL')}}">Home</a></li>
                <li class="breadcrumb-item">Sem Permissão</li>
            </ol>
            </div>
        </div>
    </div>
    <div class="card card-primary">
<div class="d-flex align-items-center p-3 my-3 text-white-50 bg-danger rounded shadow-sm">
    <img class="mr-3" src="{{env('APP_URL')}}dist/img/logo.png" alt="" width="48">
    <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Sistema de Teste da Gosat - Sem permissão para visualizar esse módulo!</h6>
        <small>Desde {{date('Y')}}</small>
    </div>
</div>
    </div>
@endsection
