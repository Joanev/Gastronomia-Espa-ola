<?php
$indicador = $_POST["num"];
$nombre;
$jsonString = file_get_contents("../JSON/gastronomia.json");
$data2 = json_decode($jsonString, true);
$data = $data2['gastronomia'];

foreach ($data as $key => $entry) {
    if ($entry['identifier'] == $indicador) {
        $nombre = $data[$key]['interactionStatistic']["userInteractionCount"];
        $data[$key]['interactionStatistic']["userInteractionCount"]++;
        //$data[$key]['interactionStatistic']["userInteractionCount"] = "TENNIS";
    }
}
$data2['gastronomia']=$data;
$newJsonString = json_encode($data2);
file_put_contents("../JSON/gastronomia.json", $newJsonString);


echo "hola";




?>