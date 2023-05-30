<?php
$url = $_SERVER['REQUEST_URI'];
$vet = explode('/', $url);
array_shift($vet);
array_shift($vet);
array_shift($vet);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sistema de Teste da Gosat @if (isset($moduloE->nomePai)) | {{$moduloE->nomePai}} @endif | {{$moduloE->name}}@if (isset($vet[1]) && $vet[1] == 'visualizar') | Visualizar Registro {{$vet[2]}} @elseif (isset($vet[1]) && $vet[1] == 'editar') | Edição de Registro {{$vet[2]}} @elseif (isset($vet[1]) && $vet[1] == 'add') | Cadastro de Registro @endif</title>
  <link rel="icon" href="{{env('APP_URL')}}dist/img/favicon.png">
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{env('APP_URL')}}dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/summernote/summernote-bs4.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="{{env('APP_URL')}}dist/img/favicon.png" alt="Teste da Gosat - Henrique Marcandier" height="60" width="60">
  </div>

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="{{env('APP_URL')}}" class="nav-link">Home</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{env('APP_URL')}}" class="brand-link">
      <img src="{{env('APP_URL')}}dist/img/favicon.png" alt="Teste da Gosat - Por Henrique Marcandier" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Teste da Gosat</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex" style="cursor:pointer" onclick="abreFecha('menuUsuario')">
        <div class="image">
          <img src="@if ($_SESSION['user']['img']){{env('APP_URL')}}dist/img/fotos/{{$_SESSION['user']['img']}} @else{{env('APP_URL')}}dist/img/noFotoUsuario.png @endif" class="img-circle elevation-2" alt="{{$_SESSION['user']['name']}}">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{$_SESSION['user']['name']}}</a>
        </div>
      </div>
      
      <div class="user-panel mt-3 pb-3 mb-3" style="display:none" id="menuUsuario">
        <div class="info">
          <a href="{{env('APP_URL')}}usuario/editar/{{$_SESSION['user']['id']}}" class="d-block">Editar Usuário</a>
          <hr noshade>          
          <a href="javascript:sairSistema('{{env('APP_URL')}}')" class="d-block" title="Sair do Sistema">Sair do Sistema</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
               @foreach ($modulePai as $key => $value)
          <li class="nav-item @if (($key == 0 && $param == 'index') || ($key == 1 && $param == 'graficos')|| ($key == 2 && $param == 'api') || ($key == 3 && ($param == 'usuario' || $param == 'modulos' || $param == 'permissao' || $param == 'logs' || $param == 'versao')))menu-open @endif">
            <a href="@if ($value->slug){{env('APP_URL')}}{{$value->slug}} @else# @endif" class="nav-link @if ($param == $value->slug) active @endif">
              <i class="nav-icon fas @if ($key == 0)fa-tachometer-alt @elseif ($key == 1)fa-chart-pie @elseif($key == 2)fa-th @elseif($key == 3)fa-user @endif"></i>
              <p>
                {{$value->name}} 
                @if (count($value->modules))
                <i class="right fas fa-angle-left"></i>
                @endif
              </p>
            </a>
            @if (count($value->modules))
            <ul class="nav nav-treeview">
              @foreach ($value->modules as $chave => $valor)
              @foreach ($valor->permissao as $chave2 => $valor2)
              @if ($valor2->view == 1)
              <li class="nav-item"  @if ($valor->slug == $param)style="background-color:#494E54" @endif>
                <a href="{{env('APP_URL')}}{{$valor->slug}}" class="nav-link">
                  <i class="far fa-circle nav-icon @if ($valor->slug == $param)text-info @endif"></i>
                  <p>{{$valor->name}}</p>
                </a>
              </li>
              @endif
              @endforeach
              @endforeach
            </ul>
            @endif
          </li>
          @endforeach
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    @yield('content')
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; {{date('Y')}} <a href="https://www.bhcommerce.com.br/">Henrique Marcandier</a>.</strong>
    Todos os Direitos Reservados.
    <div class="float-right d-none d-sm-inline-block">
      <b>Versão</b> <a href="#" title="Versão {{$versoes[0]->name}}" data-toggle="modal" data-target="#modalVersoes" style="color: #000000; padding7px; text-decoration:none">@if ($versoes[0]->img)<img src="{{env('APP_URL')}}dist/img/fotos/{{$versoes[0]->img}}" width="35">@else {{$versoes[0]->name}}@endif</a>
    </div>
  </footer>

  <div class="modal fade" id="modalVersoes" tabindex="-1" role="dialog" aria-labelledby="modalVersoes" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Versões do Sistema</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="visualizacaoVersoes">
                <h5 class="modal-title">Versão Atual</h5>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="width:200px"><img src="@if ($versoes[0]->img) {{env('APP_URL')}}dist/img/fotos/{{$versoes[0]->img}} @else{{env('APP_URL')}}dist/img/noFoto1.gif @endif " width="200"></td>
                        <td style="vertical-align: top">
                            <h5 class="modal-title">Versão {{$versoes[0]->name}} - {{date("d/m/Y", strtotime($versoes[0]->created_at))}}</h5>
                            <p>{{$versoes[0]->description}}</p>
                        </td>
                    </tr>
                </table>
                @if (count($versoes) >= 2)
                    <h5 class="modal-title">Outras Versões</h5>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        @foreach ($versoes as $key => $value)
                            @if ($versoes[0]->id != $value->id)
                                <tr>
                                    <td style="width:50px" valign="top"><img src="@if ($value->img) {{env('APP_URL')}}dist/img/fotos/{{$value->img}} @else {{env('APP_URL').'dist/img/noFoto1.gif'}}@endif" width="50"></td>
                                    <td style="vertical-align: top"><h5 class="modal-title">Versão {{$value->name}} - {{date("d/m/Y", strtotime($value->created_at))}}</h5><p>{{$value->description}}</p></td>
                                </tr>
                            @endif
                        @endforeach
                    </table>
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="{{env('APP_URL')}}plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="{{env('APP_URL')}}plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="{{env('APP_URL')}}plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- ChartJS -->
<script src="{{env('APP_URL')}}plugins/chart.js/Chart.min.js"></script>
<!-- Sparkline -->
<script src="{{env('APP_URL')}}plugins/sparklines/sparkline.js"></script>
<!-- JQVMap -->
<script src="{{env('APP_URL')}}plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="{{env('APP_URL')}}plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<!-- jQuery Knob Chart -->
<script src="{{env('APP_URL')}}plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="{{env('APP_URL')}}plugins/moment/moment.min.js"></script>
<script src="{{env('APP_URL')}}plugins/daterangepicker/daterangepicker.js"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="{{env('APP_URL')}}plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="{{env('APP_URL')}}plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="{{env('APP_URL')}}plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="{{env('APP_URL')}}dist/js/adminlte.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{env('APP_URL')}}dist/js/demo.js"></script>>
<script src="{{env('APP_URL')}}dist/js/scripts.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="{{env('APP_URL')}}dist/js/pages/dashboard.js"></script>
</body>
</html>
