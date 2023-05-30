<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sistema de Teste da Gosat | Alteração de Senha</title>
  <link rel="icon" href="{{env('APP_URL')}}dist/img/favicon.png">

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{{env('APP_URL')}}plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{env('APP_URL')}}dist/css/adminlte.min.css">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="index2.html"><b>Gosat</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Formulário de Alteração de Senha:</p>

      <form action="" method="post" id="formAlterarSenha">
        <input type="hidden" name="urlAlterarSenha" id="urlAlterarSenha" value="{{env('APP_URL')}}">
        <input type="hidden" name="idUsuario" id="idUsuario" value="{{$usuario[0]->id}}">
        Nome: <b>{{$usuario[0]->name}}</b><br>
        Email: <b>{{$usuario[0]->email}}</b><br><br>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Informe a sua senha..." name="password" id="password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Redigite a sua senha..." name="password2" id="password2">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Alterar</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <p class="mb-1">
        <a href="{{env('APP_URL')}}login?pagina=">Login</a>
      </p>
      <p class="mb-1">
        <a href="{{env('APP_URL')}}esqueci-minha-senha">Esqueci minha senha</a>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="{{env('APP_URL')}}plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="{{env('APP_URL')}}plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="{{env('APP_URL')}}dist/js/adminlte.min.js"></script>
<script src="{{env('APP_URL')}}dist/js/scripts.js"></script>
</body>
</html>
