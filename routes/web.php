<?php

date_default_timezone_set('America/Sao_Paulo');

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controller\ApiController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=";</script><?php
    }
    else{
        $apiRequest = "";
        $param = "index";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            if ($param == $value->slug){
                $moduloE = $value;
            }
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $acao = "Visualizou a Página Inicial";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        return view('home', 
        [
            'apiRequest' => $apiRequest,
            'versoes' => $versoes,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE
        ]);
    }
});

Route::get('/index', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=";</script><?php
    }
    else{
        $apiRequest = "";
        $param = "index";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            if ($param == $value->slug){
                $moduloE = $value;
            }
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $acao = "Visualizou a Página Inicial";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        return view('home', 
        [
            'apiRequest' => $apiRequest,
            'versoes' => $versoes,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE
        ]);
    }
});

Route::get('/principal', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=";</script><?php
    }
    else{
        $apiRequest = "";
        $param = "index";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            if ($param == $value->slug){
                $moduloE = $value;
            }
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $acao = "Visualizou a Página Inicial";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        return view('home', 
        [
            'apiRequest' => $apiRequest,
            'versoes' => $versoes,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE
        ]);
    }
});
Route::get('/usuario', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario";</script><?php
    }
    else{
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $vet2 = explode('?', $vet[0]);
        $vet[0] = $vet2[0];
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "usuario";
        if ($permissao[0]->view){
            $sql = "SELECT * FROM users";
            if (isset($_REQUEST['nomeFiltro']) && $_REQUEST['nomeFiltro']){
                $sql .= " WHERE name LIKE '%".$_REQUEST['nomeFiltro']."%'";
                $where = 1;
            }
            if (isset($_REQUEST['emailFiltro']) && $_REQUEST['emailFiltro']){
                $sql .= " WHERE email LIKE '%".$_REQUEST['emailFiltro']."%'";
                $where = 1;
            }
            $usuarios = DB::select($sql);
            $acao = "Visualizou os usuários do sistema!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return view('user', 
            [
                'versoes' => $versoes,
                'usuarios' => $usuarios,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});
Route::get('/modulos', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos";</script><?php
    }
    else{
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $vet2 = explode('?', $vet[0]);
        $vet[0] = $vet2[0];
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "modulos";
        if ($permissao[0]->view){
            $sql = "SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id)";
            if (isset($_REQUEST['paiFiltro']) && $_REQUEST['paiFiltro']){
                $sql .= " WHERE a.module = '".$_REQUEST['paiFiltro']."'";
                $where = 1;
            }
            if (isset($_REQUEST['nomeFiltro']) && $_REQUEST['nomeFiltro']){
                if (isset($where)){
                    $sql .= " AND";
                }
                else{
                    $sql .= "WHERE";
                }
                $sql .= " a.name LIKE '%".$_REQUEST['nomeFiltro']."%'";
            }
            $modules = DB::select($sql);
            $acao = "Visualizou os módulos do sistema!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return view('module', 
            [
                'versoes' => $versoes,
                'modules' => $modules,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});
Route::get('/permissao', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=permissao";</script><?php
    }
    else{
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $vet2 = explode('?', $vet[0]);
        $vet[0] = $vet2[0];
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = :id', ['id' => $value->id]);
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "permissao";
        if ($permissao[0]->view){
            $sql = "SELECT * FROM users";
            $users = DB::select($sql);
            $acao = "Visualizou as permissões do sistema!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return view('permission', 
            [
                'versoes' => $versoes,
                'users' => $users,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});
Route::get('/logs', function () {
        if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
            ?><script>location.href="<?=env('APP_URL')?>login?pagina=logs";</script><?php
        }
        else{
            $url = $_SERVER['REQUEST_URI'];
            $vet = explode('/', $url);
            array_shift($vet);
            array_shift($vet);
            array_shift($vet);
            $vet2 = explode('?', $vet[0]);
            $vet[0] = $vet2[0];
            $modulePai = DB::select('select * from modules where module = 0');
            foreach ($modulePai as $key => $value){
                $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
                foreach ($modulePai[$key]->modules as $chave => $valor){
                    $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                    if ($vet[0] == $valor->slug){
                        $moduloE = $valor;
                        $permissao = $modulePai[$key]->modules[$chave]->permissao;
                    }
                }
            }
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $param = "logs";
            if ($permissao[0]->view){
                $sql = "SELECT * FROM users";
                $users = DB::select($sql);
                $acao = "Visualizou os logs de acesso ao sistema!";
                $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
                $logs =DB::select("SELECT * FROM logs WHERE user = '".$_SESSION['user']['id']."' ORDER BY created_at DESC");
                $param = "logs";
                return view('logs', 
                [
                    'versoes' => $versoes,
                    'users' => $users,
                    'modulePai' => $modulePai,
                    'param' => $param,
                    'logs' => $logs,
                    'moduloE' => $moduloE,
                    'permissao' => $permissao
                ]);
            }
            else{
                return view('noPermission', 
                [
                    'versoes' => $versoes,
                    'modulePai' => $modulePai,
                    'param' => $param,
                    'moduloE' => $moduloE,
                    'permissao' => $permissao
                ]);
            }
        }
});
Route::get('/versao', function () {
        if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
            ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao";</script><?php
        }
        else{
            $url = $_SERVER['REQUEST_URI'];
            $vet = explode('/', $url);
            array_shift($vet);
            array_shift($vet);
            array_shift($vet);
            $vet2 = explode('?', $vet[0]);
            $vet[0] = $vet2[0];
            $modulePai = DB::select('select * from modules where module = 0');
            foreach ($modulePai as $key => $value){
                $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
                foreach ($modulePai[$key]->modules as $chave => $valor){
                    $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                    if ($vet[0] == $valor->slug){
                        $moduloE = $valor;
                        $permissao = $modulePai[$key]->modules[$chave]->permissao;
                    }
                }
            }
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $param = "versao";
            if ($permissao[0]->view){
                $sql = "SELECT * FROM users";
                $users = DB::select($sql);
                $acao = "Visualizou as versões do sistema!";
                $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
                $sql = "SELECT * FROM versions ";
                if (isset($_REQUEST['nomeFiltro']) && $_REQUEST['nomeFiltro']){
                    $sql .= "WHERE name LIKE '%".$_REQUEST['nomeFiltro']."%' ";
                }
                $sql .= "ORDER BY created_at DESC";
                $versions = DB::select($sql);
                return view('versions', 
                [
                    'versoes' => $versoes,
                    'users' => $users,
                    'modulePai' => $modulePai,
                    'param' => $param,
                    'versions' => $versions,
                    'moduloE' => $moduloE,
                    'permissao' => $permissao
                ]);
            }
            else{
                return view('noPermission', 
                [
                    'versoes' => $versoes,
                    'modulePai' => $modulePai,
                    'param' => $param,
                    'moduloE' => $moduloE,
                    'permissao' => $permissao
                ]);
            }
        }
});
Route::post('/usuario/cadastrar', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario";</script><?php
    }
    else{
        if ($_REQUEST['nome'] && $_REQUEST['email'] && $_REQUEST['password']){
            $sql = "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ('".$_REQUEST['nome']."', '".$_REQUEST['email']."', '".md5($_REQUEST['password'])."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
            $result = DB::select($sql);
            $sql = "SELECT * FROM users WHERE email = '".$_REQUEST['email']."'";
            $result = DB::select($sql);
            $acao = "Cadastrou o usuário do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            if (count($_FILES) && $_FILES['img']['error'] == 0){     
                if (preg_match('/.jpg/', $_FILES['img']['name'])){
                    $extensao = "jpg";
                }
                elseif (preg_match('/.jpeg/', $_FILES['img']['name'])){
                    $extensao = "jpeg";
                }
                elseif (preg_match('/.gif/', $_FILES['img']['name'])){
                    $extensao = "gif";
                }
                elseif (preg_match('/.png/', $_FILES['img']['name'])){
                    $extensao = "png";
                }
                elseif (preg_match('/.bmp/', $_FILES['img']['name'])){
                    $extensao = "bmp";
                }
                elseif (preg_match('/.svg/', $_FILES['img']['name'])){
                    $extensao = "svg";
                }
                elseif (preg_match('/.webp/', $_FILES['img']['name'])){
                    $extensao = "webp";
                }
                if ($extensao){
                    copy($_FILES['img']['tmp_name'], env('APP_DIR')."dist/img/fotos/usuario".$result[0]->id.".".$extensao);
                    $sql = "UPDATE users SET img = 'usuario".$result[0]->id.".".$extensao."' WHERE id = '".$result[0]->id."'";
                    $result2 = DB::select($sql);
                }
            }
            ?>
            <script>
                alert('Registro inserido com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});
Route::post('/modulos/cadastrar', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos";</script><?php
    }
    else{
        if ($_REQUEST['nome']){
            $sql = "INSERT INTO modules (module, name, slug, created_at, updated_at) VALUES ('".$_REQUEST['moduloPai']."', '".$_REQUEST['nome']."', '".$_REQUEST['slug']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
            $result = DB::select($sql);
            $sql = "SELECT LAST_INSERT_ID() as last_insert_id;";
            $idModulo = DB::select($sql);
            $sql = "SELECT * FROM modules WHERE id = '".$idModulo[0]->last_insert_id."'";
            $result = DB::select($sql);
            $acao = "Cadastrou o módulo do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            ?>
            <script>
                alert('Registro inserido com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});
Route::post('/versao/cadastrar', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao";</script><?php
    }
    else{
        if ($_REQUEST['nome'] && $_REQUEST['descricao']){
            $sql = "INSERT INTO versions (name, description, img, created_at, updated_at) VALUES ('".$_REQUEST['nome']."', '".$_REQUEST['descricao']."', '', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
            $result = DB::select($sql);
            $sql = "SELECT LAST_INSERT_ID() as last_insert_id;";
            $idVersao = DB::select($sql);
            $sql = "SELECT * FROM versions WHERE id = '".$idVersao[0]->last_insert_id."'";
            $result = DB::select($sql);
            if (count($_FILES) && $_FILES['img']['error'] == 0){     
                if (preg_match('/.jpg/', $_FILES['img']['name'])){
                    $extensao = "jpg";
                }
                elseif (preg_match('/.jpeg/', $_FILES['img']['name'])){
                    $extensao = "jpeg";
                }
                elseif (preg_match('/.gif/', $_FILES['img']['name'])){
                    $extensao = "gif";
                }
                elseif (preg_match('/.png/', $_FILES['img']['name'])){
                    $extensao = "png";
                }
                elseif (preg_match('/.bmp/', $_FILES['img']['name'])){
                    $extensao = "bmp";
                }
                elseif (preg_match('/.svg/', $_FILES['img']['name'])){
                    $extensao = "svg";
                }
                elseif (preg_match('/.webp/', $_FILES['img']['name'])){
                    $extensao = "webp";
                }
                if ($extensao){
                    copy($_FILES['img']['tmp_name'], env('APP_DIR')."dist/img/fotos/versao".$result[0]->id.".".$extensao);
                    $sql = "UPDATE versions SET img = 'versao".$result[0]->id.".".$extensao."' WHERE id = '".$result[0]->id."'";
                    $result2 = DB::select($sql);
                }
            }
            $acao = "Cadastrou a versão do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            ?>
            <script>
                alert('Registro inserido com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});
Route::get('/usuario/editar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario/editar/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->edit){
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $sql = "SELECT * FROM users WHERE id = '".$vet[2]."'";
            $usuario = DB::select($sql);
            $param = "usuario";
            return view('editUser', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'usuario' => $usuario,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para acessar essa página!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
    }
});
Route::get('/modulos/editar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos/editar/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->edit){
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $sql = "SELECT * FROM modules WHERE id = '".$vet[2]."'";
            $modulo = DB::select($sql);
            $param = "modulos";
            return view('editModule', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'modulo' => $modulo,
                'moduloE' => $moduloE
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para acessar essa página!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php
        }
    }
});
Route::get('/versao/editar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario/versao/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $sql = "SELECT * FROM versions WHERE id = '".$vet[2]."'";
        $versao = DB::select($sql);
        $param = "versao";
        if ($permissao[0]->edit){
            return view('editVersions', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'versao' => $versao,
                'moduloE' => $moduloE
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para acessar essa página!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php
        }
    }
});

Route::post('/usuario/edita', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=<?=$vet[0]?>/<?=$vet[1]?>";</script><?php
    }
    else{
        if ($_REQUEST['nome'] && $_REQUEST['email'] && $_REQUEST['id']){
            $sql = "UPDATE users SET name = '".$_REQUEST['nome']."', email = '".$_REQUEST['email']."', ";
            if ($_REQUEST['password']){
                $sql .= "password = '".md5($_REQUEST['password'])."', ";
            }
            $sql .= "updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$_REQUEST['id']."'";            
            $result = DB::select($sql);
            $sql = "SELECT * FROM users WHERE email = '".$_REQUEST['email']."'";
            $result = DB::select($sql);
            if (count($_FILES) && $_FILES['img']['error'] == 0){     
                if (preg_match('/.jpg/', $_FILES['img']['name'])){
                    $extensao = "jpg";
                }
                elseif (preg_match('/.jpeg/', $_FILES['img']['name'])){
                    $extensao = "jpeg";
                }
                elseif (preg_match('/.gif/', $_FILES['img']['name'])){
                    $extensao = "gif";
                }
                elseif (preg_match('/.png/', $_FILES['img']['name'])){
                    $extensao = "png";
                }
                elseif (preg_match('/.bmp/', $_FILES['img']['name'])){
                    $extensao = "bmp";
                }
                elseif (preg_match('/.svg/', $_FILES['img']['name'])){
                    $extensao = "svg";
                }
                elseif (preg_match('/.webp/', $_FILES['img']['name'])){
                    $extensao = "webp";
                }
                if (isset($extensao)){
                    copy($_FILES['img']['tmp_name'], env('APP_DIR')."dist/img/fotos/usuario".$_REQUEST['id'].".".$extensao);
                    $sql = "UPDATE users SET img = 'usuario".$_REQUEST['id'].".".$extensao."' WHERE id = '".$_REQUEST['id']."'";
                    $result2 = DB::select($sql);
                    if ($_REQUEST['id'] == $_SESSION['user']['id']){
                        $_SESSION['user']['img'] = "usuario".$_REQUEST['id'].".".$extensao;
                    }
                }
            }
            $acao = "Atualizou o usuário do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            ?>
            <script>
                alert('Registro atualizado com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});
Route::post('/modulos/edita', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=<?=$vet[0]?>/<?=$vet[1]?>";</script><?php
    }
    else{
        if ($_REQUEST['nome']){
            $sql = "UPDATE modules SET `module` = '".$_REQUEST['moduloPai']."', name = '".$_REQUEST['nome']."', slug = '".$_REQUEST['slug']."', ";
            $sql .= "updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$_REQUEST['id']."'";            
            $result = DB::select($sql);
            $sql = "SELECT * FROM modules WHERE id = '".$_REQUEST['id']."'";
            $result = DB::select($sql);
            $acao = "Atualizou o módulo do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            ?>
            <script>
                alert('Registro atualizado com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});
Route::post('/versao/edita', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=<?=$vet[0]?>/<?=$vet[1]?>";</script><?php
    }
    else{
        if ($_REQUEST['nome'] && $_REQUEST['descricao']){
            $sql = "UPDATE versions SET name = '".$_REQUEST['nome']."', description = '".$_REQUEST['descricao']."', ";
            $sql .= "updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$_REQUEST['id']."'";            
            $result = DB::select($sql);
            if (count($_FILES) && $_FILES['img']['error'] == 0){     
                if (preg_match('/.jpg/', $_FILES['img']['name'])){
                    $extensao = "jpg";
                }
                elseif (preg_match('/.jpeg/', $_FILES['img']['name'])){
                    $extensao = "jpeg";
                }
                elseif (preg_match('/.gif/', $_FILES['img']['name'])){
                    $extensao = "gif";
                }
                elseif (preg_match('/.png/', $_FILES['img']['name'])){
                    $extensao = "png";
                }
                elseif (preg_match('/.bmp/', $_FILES['img']['name'])){
                    $extensao = "bmp";
                }
                elseif (preg_match('/.svg/', $_FILES['img']['name'])){
                    $extensao = "svg";
                }
                elseif (preg_match('/.webp/', $_FILES['img']['name'])){
                    $extensao = "webp";
                }
                if ($extensao){
                    copy($_FILES['img']['tmp_name'], env('APP_DIR')."dist/img/fotos/versao".$_REQUEST['id'].".".$extensao);
                    $sql = "UPDATE versions SET img = 'versao".$_REQUEST['id'].".".$extensao."' WHERE id = '".$_REQUEST['id']."'";
                    $result = DB::select($sql);
                }
            }
            $sql = "SELECT * FROM versions WHERE id = '".$_REQUEST['id']."'";
            $result = DB::select($sql);
            $acao = "Atualizou a versão do sistema ".$result[0]->id."!";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            ?>
            <script>
                alert('Registro atualizado com sucesso! Aguarde o refresh da página!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Todos os campos obrigatórios devem estar preenchidos!');
                history.go(-1);
            </script>
            <?php
        }
    }
});

Route::get('/usuario/add', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->edit){
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $param = "usuario";
            return view('newUser', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para ver essa página!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
    }
});

Route::get('/versao/add', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao";</script><?php
    }
    else{
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->edit){
            $apiRequest = "";
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $param = "versao";
            return view('newVersions', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para ver essa página!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php
        }
    }
});

Route::get('/modulos/add', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos";</script><?php
    }
    else{
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->edit){
            $versoes = DB::select('select * from versions ORDER BY created_at DESC');
            $param = "modules";
            return view('newModule', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE
            ]);
        }
        else{
            ?>
            <script>
                alert('Sem permissão para ver essa página!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php
        }
    }
});

Route::get('/usuario/visualizar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario/visualizar/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $sql = "SELECT * FROM users WHERE id = '".$vet[2]."'";
        $result = DB::select($sql);
        $acao = "Visualizou o usuário do sistema ".$result[0]->id."!";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        $param = "usuario";
        return view('viewUser', 
        [
            'versoes' => $versoes,
            'apiRequest' => $apiRequest,
            'result' => $result,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE,
            'permissao' => $permissao
        ]);
    }
});
Route::get('/modulos/visualizar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos/visualizar/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $sql = "SELECT a.*, b.name AS nomeTipoModulo FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.id = '".$vet[2]."'";
        $result = DB::select($sql);
        $acao = "Visualizou o usuário do sistema ".$result[0]->id."!";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        $param = "modulos";
        return view('viewModule', 
        [
            'versoes' => $versoes,
            'apiRequest' => $apiRequest,
            'result' => $result,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE
        ]);
    }
});

Route::get('/versao/visualizar/{id}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao/visualizar/<?=$vet[2]?>";</script><?php
    }
    else{
        $apiRequest = "";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $sql = "SELECT * FROM versions WHERE id = '".$vet[2]."'";
        $result = DB::select($sql);
        $acao = "Visualizou a versão do sistema ".$result[0]->id."!";
        $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
        $param = "versao";
        return view('viewVersions', 
        [
            'versoes' => $versoes,
            'apiRequest' => $apiRequest,
            'result' => $result,
            'modulePai' => $modulePai,
            'param' => $param,
            'moduloE' => $moduloE,
            'permissao' => $permissao
        ]);
    }
});

Route::get('/usuario/excluir/{id}', function () {
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->delete){
            $dados = DB::select("SELECT * FROM users WHERE id = '".$vet[2]."'");
            if ($dados[0]->img){
                unlink(env('APP_DIR').'dist/img/fotos/'.$dados[0]->img);
            }
            $usuarioDeleta = DB::select("DELETE FROM users WHERE id = :id", ['id' => $vet[2]]);
            $logs = DB::select('INSERT INTO logs (user, action, created_at, updated_at) VALUES ("'.$_SESSION['user']['id'].'", "Deletou o usuário '.$vet[1].'", "'.date('Y-m-d H:i:s').'", "'.date('Y-m-d H:i:s').'")');
            ?>
            <script>
                alert('Registro excluído com sucesso!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Sem permissão para visualizar essa página!');
                location.href="<?=env('APP_URL')?>usuario";
            </script>
            <?php
        }
    }
});
Route::get('/modulos/excluir/{id}', function () {
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=modulos";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->delete){
            $usuarioDeleta = DB::select("DELETE FROM modules WHERE id = :id", ['id' => $vet[2]]);
            $logs = DB::select('INSERT INTO logs (user, action, created_at, updated_at) VALUES ("'.$_SESSION['user']['id'].'", "Deletou o módulo '.$vet[1].'", "'.date('Y-m-d H:i:s').'", "'.date('Y-m-d H:i:s').'")');
            ?>
            <script>
                alert('Registro excluído com sucesso!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Sem permissão para visualizar essa página!');
                location.href="<?=env('APP_URL')?>modulos";
            </script>
            <?php 
        }
    }
});

Route::get('/versao/excluir/{id}', function () {
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->delete){
            $dados = DB::select("SELECT * FROM versions WHERE id = '".$vet[2]."'");
            if ($dados[0]->img){
                unlink(env('APP_DIR').'dist/img/fotos/'.$dados[0]->img);
            }
            $usuarioDeleta = DB::select("DELETE FROM versions WHERE id = :id", ['id' => $vet[2]]);
            $logs = DB::select('INSERT INTO logs (user, action, created_at, updated_at) VALUES ("'.$_SESSION['user']['id'].'", "Deletou o usuário '.$vet[2].'", "'.date('Y-m-d H:i:s').'", "'.date('Y-m-d H:i:s').'")');
            ?>
            <script>
                alert('Registro excluído com sucesso!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php
        }
        else{
            ?>
            <script>
                alert('Sem permissão para visualizar essa página!');
                location.href="<?=env('APP_URL')?>versao";
            </script>
            <?php 
        }
    }
});
Route::get('/usuario/excluirImg/{id}', function () {
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=usuario";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $dados = DB::select("SELECT * FROM users WHERE id = '".$vet[1]."'");
        if ($dados[0]->img){
            @unlink(env('APP_DIR').'dist/img/fotos/'.$dados[0]->img);
        }
        
        if ($vet[1] == $_SESSION['user']['id']){
            $_SESSION['user']['img'] = "";
        }
        DB::select("UPDATE users SET img = '' WHERE id = '".$vet[1]."'"); 
        $logs = DB::select('INSERT INTO logs (user, action, created_at, updated_at) VALUES ("'.$_SESSION['user']['id'].'", "Excluiu a imagem do usuário '.$vet[1].'", "'.date('Y-m-d H:i:s').'", "'.date('Y-m-d H:i:s').'")');
        ?>
        <script>
            alert('Imagem excluída com sucesso!');
            location.href="<?=env('APP_URL')?>usuario";
        </script>
        <?php
    }
});
Route::get('/versao/excluirImg/{id}', function () {
    if (!isset($_SESSION) || !$_SESSION['user']){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=versao";</script><?php
    }
    else{
        $apiRequest = "";
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);
        $dados = DB::select("SELECT * FROM versions WHERE id = '".$vet[1]."'");
        if ($dados[0]->img){
            @unlink(env('APP_DIR').'dist/img/fotos/'.$dados[0]->img);
        }
        DB::select("UPDATE versions SET img = '' WHERE id = '".$vet[1]."'"); 
        $logs = DB::select('INSERT INTO logs (user, action, created_at, updated_at) VALUES ("'.$_SESSION['user']['id'].'", "Excluiu a imagem da versão '.$vet[1].'", "'.date('Y-m-d H:i:s').'", "'.date('Y-m-d H:i:s').'")');
        ?>
        <script>
            alert('Imagem excluída com sucesso!');
            location.href="<?=env('APP_URL')?>versao";
        </script>
        <?php
    }
});
Route::get('/api', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=api";</script><?php
    }
    else{ 
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);       
        if (isset($_REQUEST['cpf'])){
            $acao = "Visualizou os dados do CPF: ".$_REQUEST['cpf'];
            $api = Http::post('https://dev.gosat.org/api/v1/simulacao/credito?cpf='.$_REQUEST['cpf']);
            $apiRequest = $api->json();
            $i = 0;
            if ($apiRequest != 'CPF não encontrado.'){
                foreach ($apiRequest as $key => $value){
                    foreach($value as $chave => $valor){
                        foreach ($valor['modalidades'] as $chave2 => $valor2){
                            $api2 = Http::post('https://dev.gosat.org/api/v1/simulacao/oferta?cpf='.$_REQUEST['cpf']."&instituicao_id=".$valor['id']."&codModalidade=".$valor2['cod']);
                            $apiRequest[$key][$chave]['modalidades'][$chave2]['apis'] = $api2->json();
                            $apiRequest[$key][$chave]['modalidades'][$chave2]['i'] = $i;
                            $banks = DB::select('select * from banks where id = "'.$valor['id'].'"');
                            if (count($banks)){
                                $sql = "UPDATE banks SET name = '".$valor['nome']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$valor['id']."'";
                            }
                            else{
                                $sql = "INSERT INTO banks (id, name, created_at, updated_at) VALUES ('".$valor['id']."', '".$valor['nome']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $banks = DB::select($sql);
                            $banks = DB::select('select * from banks where id = "'.$valor['id'].'"');
                            $modalities = DB::select('select * from modalities where cpf = "'.$_REQUEST['cpf'].'" AND name = "'.$valor2['nome'].'"');
                            if (count($modalities)){
                                $sql = "UPDATE modalities SET cpf = '".$_REQUEST['cpf']."', name = '".$valor2['nome']."', cod = '".$valor2['cod']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$modalities[0]->id."'";
                            }
                            else{
                                $sql = "INSERT INTO modalities (cpf, name, cod, created_at, updated_at) VALUES ('".$_REQUEST['cpf']."', '".$valor2['nome']."', '".$valor2['cod']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $modalities = DB::select($sql);
                            $modalities = DB::select('select * from modalities where cpf = "'.$_REQUEST['cpf'].'" AND name = "'.$valor2['nome'].'"');
                            $numbers = DB::select('select * from numbers where bank = "'.$banks[0]->id.'" AND modality = "'.$modalities[0]->id.'"');
                            if (count($numbers)){
                                $sql = "UPDATE numbers SET bank = '".$banks[0]->id."', modality = '".$modalities[0]->id."', qtdeParcMin = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMin']."', qtdeParcMax = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMax']."', valorMin = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMin']."', valorMax = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMax']."', jurosMes = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['jurosMes']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$numbers[0]->id."'";
                            }
                            else{
                                $sql = "INSERT INTO numbers (bank, modality, qtdeParcMin, qtdeParcMax, valorMin, valorMax, jurosMes, created_at, updated_at)
                                VALUES ('".$banks[0]->id."', '".$modalities[0]->id."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMin']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMax']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMin']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMax']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['jurosMes']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $numbers = DB::select($sql);
                            $numbers = DB::select('select * from numbers where bank = "'.$banks[0]->id.'" AND modality = "'.$modalities[0]->id.'"');
                            $i++;
                        }
                    }
                }
            }
            $valores = DB::select("SELECT a.*, b.name AS nomeModalidade, b.cod, c.id AS idBanco, c.name AS nomeBanco FROM numbers a INNER JOIN modalities b ON (a.modality = b.id) INNER JOIN banks c ON (a.bank = c.id) WHERE b.cpf = '".$_REQUEST['cpf']."' ORDER BY a.valorMax DESC");
        }
        else{
            $apiRequest = "";
            $acao = "Visualizou a tela de API";
            $valores = "";
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "api";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($param == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->view){
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return view('api', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'valores' => $valores,
                'moduloE' => $moduloE,
                'permissao' => $permissao 
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});

Route::post('/api', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=api";</script><?php
    }
    else{ 
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);       
        if (isset($_REQUEST['cpf'])){
            $acao = "Visualizou os dados do CPF: ".$_REQUEST['cpf'];
            $api = Http::post('https://dev.gosat.org/api/v1/simulacao/credito?cpf='.$_REQUEST['cpf']);
            $apiRequest = $api->json();
            $i = 0;
            if ($apiRequest != 'CPF não encontrado.'){
                foreach ($apiRequest as $key => $value){
                    foreach($value as $chave => $valor){
                        foreach ($valor['modalidades'] as $chave2 => $valor2){
                            $api2 = Http::post('https://dev.gosat.org/api/v1/simulacao/oferta?cpf='.$_REQUEST['cpf']."&instituicao_id=".$valor['id']."&codModalidade=".$valor2['cod']);
                            $apiRequest[$key][$chave]['modalidades'][$chave2]['apis'] = $api2->json();
                            $apiRequest[$key][$chave]['modalidades'][$chave2]['i'] = $i;
                            $banks = DB::select('select * from banks where id = "'.$valor['id'].'"');
                            if (count($banks)){
                                $sql = "UPDATE banks SET name = '".$valor['nome']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$valor['id']."'";
                            }
                            else{
                                $sql = "INSERT INTO banks (id, name, created_at, updated_at) VALUES ('".$valor['id']."', '".$valor['nome']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $banks = DB::select($sql);
                            $banks = DB::select('select * from banks where id = "'.$valor['id'].'"');
                            $modalities = DB::select('select * from modalities where cpf = "'.$_REQUEST['cpf'].'" AND name = "'.$valor2['nome'].'"');
                            if (count($modalities)){
                                $sql = "UPDATE modalities SET cpf = '".$_REQUEST['cpf']."', name = '".$valor2['nome']."', cod = '".$valor2['cod']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$modalities[0]->id."'";
                            }
                            else{
                                $sql = "INSERT INTO modalities (cpf, name, cod, created_at, updated_at) VALUES ('".$_REQUEST['cpf']."', '".$valor2['nome']."', '".$valor2['cod']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $modalities = DB::select($sql);
                            $modalities = DB::select('select * from modalities where cpf = "'.$_REQUEST['cpf'].'" AND name = "'.$valor2['nome'].'"');
                            $numbers = DB::select('select * from numbers where bank = "'.$banks[0]->id.'" AND modality = "'.$modalities[0]->id.'"');
                            if (count($numbers)){
                                $sql = "UPDATE numbers SET bank = '".$banks[0]->id."', modality = '".$modalities[0]->id."', qtdeParcMin = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMin']."', qtdeParcMax = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMax']."', valorMin = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMin']."', valorMax = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMax']."', jurosMes = '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['jurosMes']."', updated_at = '".date('Y-m-d H:i:s')."' WHERE id = '".$numbers[0]->id."'";
                            }
                            else{
                                $sql = "INSERT INTO numbers (bank, modality, qtdeParcMin, qtdeParcMax, valorMin, valorMax, jurosMes, created_at, updated_at)
                                VALUES ('".$banks[0]->id."', '".$modalities[0]->id."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMin']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['QntParcelaMax']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMin']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['valorMax']."', '".$apiRequest[$key][$chave]['modalidades'][$chave2]['apis']['jurosMes']."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')";
                            }
                            $numbers = DB::select($sql);
                            $numbers = DB::select('select * from numbers where bank = "'.$banks[0]->id.'" AND modality = "'.$modalities[0]->id.'"');
                            $i++;
                        }
                    }
                }
            }
            if (!isset($_REQUEST['ordem'])){
                $ordem = "valorMax";
                $asc = "desc";
            }
            else{
                $vetOrdem = explode('_', $_REQUEST['ordem']);
                $ordem = $vetOrdem[0];
                $asc = $vetOrdem[1];
            }
            $valores = DB::select("SELECT a.*, b.name AS nomeModalidade, b.cod, c.id AS idBanco, c.name AS nomeBanco FROM numbers a INNER JOIN modalities b ON (a.modality = b.id) INNER JOIN banks c ON (a.bank = c.id) WHERE b.cpf = '".$_REQUEST['cpf']."' ORDER BY ".$ordem." ".$asc);
        }
        else{
            $apiRequest = "";
            $acao = "Visualizou a tela de API";
            $valores = "";
        }
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "api";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($param == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->view){
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return view('api', 
            [
                'versoes' => $versoes,
                'apiRequest' => $apiRequest,
                'modulePai' => $modulePai,
                'param' => $param,
                'valores' => $valores,
                'moduloE' => $moduloE,
                'permissao' => $permissao 
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});

Route::get('graficos', function () {
    if (!isset($_SESSION) || !isset($_SESSION['user']['name'])){
        ?><script>location.href="<?=env('APP_URL')?>login?pagina=";</script><?php
    }
    else{
        if (isset($_REQUEST['cpf'])){
            $api = Http::post('https://dev.gosat.org/api/v1/simulacao/credito?cpf='.$_REQUEST['cpf']);
            $apiRequest = $api->json();
        }
        else{
            $apiRequest = "";
        }
        $url = $_SERVER['REQUEST_URI'];
        $vet = explode('/', $url);
        array_shift($vet);
        array_shift($vet);
        array_shift($vet);  
        $versoes = DB::select('select * from versions ORDER BY created_at DESC');
        $param = "graficos";
        $modulePai = DB::select('select * from modules where module = 0');
        foreach ($modulePai as $key => $value){
            $modulePai[$key]->modules = DB::select('SELECT a.*, b.name AS nomePai FROM modules a LEFT JOIN modules b ON (a.module = b.id) WHERE a.module = "'.$value->id.'"');
            foreach ($modulePai[$key]->modules as $chave => $valor){
                $modulePai[$key]->modules[$chave]->permissao = DB::select('select * from permissions where module = :id AND user = :user LIMIT 1', ['id' => $valor->id, 'user' => $_SESSION['user']['id']]);        
                if ($vet[0] == $valor->slug){
                    $moduloE = $valor;
                    $permissao = $modulePai[$key]->modules[$chave]->permissao;
                }
            }
        }
        if ($permissao[0]->view){
            $acao = "Visualizou a Página de Gráficos do Sistema";
            $logs = DB::select("INSERT INTO logs (user, action, created_at, updated_at) VALUES ('".$_SESSION['user']['id']."', '".$acao."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            $param = "graficos";
            return view('graficos', 
            [
                'apiRequest' => $apiRequest,
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
        else{
            return view('noPermission', 
            [
                'versoes' => $versoes,
                'modulePai' => $modulePai,
                'param' => $param,
                'moduloE' => $moduloE,
                'permissao' => $permissao
            ]);
        }
    }
});
Route::get('login', function () {
    return view('login');
});

Route::get('esqueci-minha-senha', function () {
    return view('esqueciMinhaSenha');
});

Route::get('alterar-senha/{codigo}', function () {
    $url = $_SERVER['REQUEST_URI'];
    $vet = explode('/', $url);
    array_shift($vet);
    array_shift($vet);
    array_shift($vet);
    $usuario = DB::select("SELECT * FROM users WHERE remember_token = :codigo", ['codigo' => $vet[1]]);
    if (!count($usuario)){
        ?>
        <script>
            alert('Não foi encontrado o código pesquisado em nossa lista de usuários!');
            location.href="<?=env('APP_URL')?>";
        </script>
        <?php
    }
    else{
        return view('alterarSenha', ['usuario' => $usuario]);
    }
});

