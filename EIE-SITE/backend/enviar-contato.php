<?php
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim(strip_tags($_POST['nome'] ?? ''));
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $mensagem = trim(strip_tags($_POST['mensagem'] ?? ''));
    if ($nome && $email && $mensagem) {
        // Envia e-mail (ajuste $to para o seu e-mail real)
        $to = "info@seudominio.com";
        $subject = "Mensagem do site";
        $body = "Nome: $nome\nEmail: $email\nMensagem:\n$mensagem";
        $headers = "From: $email\r\nReply-To: $email\r\n";
        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["success" => true]);
            exit;
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Falha ao enviar."]);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Campos inválidos."]);
        exit;
    }
}
http_response_code(405);
echo json_encode(["success" => false, "error" => "Método não permitido."]);