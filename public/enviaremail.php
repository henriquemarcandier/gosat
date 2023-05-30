<?php

require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try{
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = "mail.bhcommerce.com.br";
    $mail->SMTPAuth = true;
    $mail->Username = "email@bhcommerce.com.br";
    $mail->Password = "123456padrao+";
    $mail->Port = "587";

    $mail->setFrom($_REQUEST['deEmail'], $_REQUEST['deNome']);
    $mail->addAddress($_REQUEST['paraEmail'], $_REQUEST['paraNome']);

    $mail->isHTML(true);
    $mail->Subject = ($_REQUEST['assunto']);
    $mail->Body = ($_REQUEST['mensagem']);
    $mail->AltBody = (strip_tags($_REQUEST['mensagem']));
    $mail->addAttachment(
        "files/logo.png",
        utf8_decode("Catálogo Virtual da BH Commerce")
    );

    if ($mail->send()){
        echo "Email enviado com sucesso!";
    }
    else{
        echo "Não foi possível enviar o email!";
    }
}
catch (Exception $e){
    echo "Erro ao enviar a mensagem: ".$mail->ErrorInfo;
}
