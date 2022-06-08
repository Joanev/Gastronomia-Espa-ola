<?php
$indicador2 = $_POST["dadesComentarios"];
$json=json_encode($indicador2);
$handler=fopen("../JSON/comentario.json","w+");
fwrite($handler, $json);
fclose($handler);
echo "hola";




?>