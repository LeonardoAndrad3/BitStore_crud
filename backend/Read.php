<?php
include_once("ControllerDB.php");

    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers: *');

    $db = new ControllerDB();
    $db->connect();
    $conn = $db->getConn();
    $read = [];

    $responseType = file_get_contents("php://input");
    $dados = json_decode($responseType, true);  
    $query= sprintf("select * from `%s` order by id asc", $dados['type']);
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_array($result)){
        $read[] = ["id"=>$row['id'], "name"=>$row["name"], "data"=>$row["insertData"]];
    }

    if($dados["type"] != "tag"){
        $query= sprintf("select product.id as productId, product.name, product_tag.product_id, product_tag.tag_id, tag.id as tagId, tag.name AS nameTag from `product` inner join `product_tag` ON product.id=product_tag.product_id inner join `tag` ON tag.id=product_tag.tag_id order by product.id asc");

        $result = mysqli_query($conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $readAssoc[] = ["id"=>$row["productId"],"name"=>$row["name"],"tag"=>$row["tag_id"],"nameTag"=>$row["nameTag"]];
        }
        $read[] = ["assoc"=>$readAssoc];
    }
   
    http_response_code(200);
    echo json_encode($read);

?>