<?php
require_once '../../../vendor/autoload.php';
use Dompdf\Dompdf;

$pdo = new PDO('mysql:host=localhost; dbname=test','root','');

$sql = $pdo->query('select tag.id as tagId, tag.name as tagName, product_tag.product_id, product.id as productId, product.name as productName from `tag` inner join `product_tag` ON tag.id=product_tag.tag_id INNER JOIN `product` ON product.id=product_tag.product_id order by product.id asc');
$html ="<h1 style=text-align:center >Relatório de relevância</h1>";
$html .= '<table border=1 width=100%>';
$html .= '<thead>';
$html .= '<tr>';
$html .= "<td> TagId </td>";
$html .= "<td> TagName </td>";
$html .= "<td> ProductId </td>";
$html .= "<td> ProductName </td>";
$html .= "</tr>";
$html .= "</thead>";

while($linha = $sql->fetch(PDO::FETCH_ASSOC)){
    $html .= "<tbody>";
    $html .= "<tr><td>".$linha['tagId']."</td><td> ". $linha['tagName']."</td><td> ". $linha['productId']."</td><td>". $linha['productName']."</td></tr>";

    $html .= "</tbody>";
}

$html .= "</table>";

//dompdf

$dompdf = new Dompdf;

$dompdf->loadHtml($html);

//tamanho

$dompdf->set_paper('A4', 'portrait');

//render

$dompdf->render();

//enviar para o navegador

$dompdf->stream('relatorio.pdf', array('Attachment' => false));

?>