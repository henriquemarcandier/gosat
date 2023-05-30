<?php
ini_set('display_errors', 'on');
@session_start();
date_default_timezone_set("America/Sao_Paulo");
setlocale(LC_ALL, 'pt_BR');
if ($_SERVER['HTTP_HOST'] == 'localhost'){
    $url = "https://localhost/gosat/public/";
    $url_site = "https://localhost/gosat/public/";
    $diretorio_site = "C:/xampp2/htdocs/gosat/public/";
    $diretorio = "C:/xampp2/htdocs/gosat/public/";
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "gosat";
}
else{
    $url = "https://gosat.bhcommerce.com.br/";
    $url_site = "https://gosat.bhcommerce.com.br/";
    $diretorio_site = "/home/bhcommer/public_html/gosat/public/";
    $diretorio = "/home/bhcommer/public_html/gosat/public/";
    $dbhost = "localhost";
    $dbuser = "bhcommer_todas";
    $dbpass = "BHC2021todas";
    $dbname = "bhcommer_gosat";
}
$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die(mysqli_error());
define("URL", $url);
define("URL_SITE", $url_site);
define("DIRETORIO_SITE", $diretorio_site);
define("DIRETORIO", $diretorio);
?>
