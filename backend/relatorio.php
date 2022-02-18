<?php
require_once './vendor/autoload.php';
require_once './ControllerDB.php';
use Dompdf\Dompdf;

//primeiro contato com PDO

$db = new ControllerDB();
$conn = $db->getConn();

$result = mysqli_query($conn, 'select tag.id as tagId, tag.name as tagName, product_tag.product_id, product.id as productId, product.name as productName from `tag` inner join `product_tag` ON tag.id=product_tag.tag_id INNER JOIN `product` ON product.id=product_tag.product_id order by product.id asc');

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

while($linha = mysqli_fetch_assoc($result)){
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