<?php
function enviarEmail($deEmail, $deNome, $paraEmail, $paraNome, $assunto, $mensagem){
    $urlEnvio = URL."enviaremail.php";
    // URL:
    $ch = curl_init($urlEnvio);
    // Obter retorno em $resultado:
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // -F
    // Definir como POST:
    curl_setopt($ch, CURLOPT_POST, true);
    // -F
    // Definir corpo, como multipart/form-data:
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'deEmail' => ($deEmail),
        'deNome' => ($deNome),
        'paraEmail' => ($paraEmail),
        'paraNome' => ($paraNome),
        'assunto' => ($assunto),
        'mensagem' => ($mensagem)
    ]);
    // -u
    $resultado = curl_exec($ch);
    curl_close ($ch);
    return $resultado;
}
?>
