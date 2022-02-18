<?php
include_once("ControllerDB.php");

    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:*');

    $db = new ControllerDB();
    
    $resultFront = file_get_contents("php://input");
    $dados = json_decode($resultFront,true);
    $response = [];

    if($dados["deleteProduct"] !== ""){
        $db->connect();
        $conn = $db->getConn();
        $query= sprintf("delete from `%s` where id=%d", $dados['type'], $dados['id']);
        if(mysqli_query($conn, $query)){

            switch(mysqli_affected_rows($conn)){
                case 0:
                    $response[] = [
                        "mensagem"=>$dados["type"]." não encontrado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "status" => "?"
                    ]; 
                break;

                case 1:
                    $response[] = [
                        "mensagem"=>$dados["type"]." vinculado com id = ". $dados['id'].", deletado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "status" => "Sucesso"
                    ]; 
                break;

                case -1:
                    $response[] = [
                        "mensagem"=>$dados["type"]. " não foi possível deletar!",
                        "rows"=> mysqli_error($conn),
                        "status" => "Erro"
                    ]; 
                break;
                        
            }
        } else { 
            $conn = $db->getConn();
            $response[] = [
                "mensagem"=> "Falha na conexão",
                "rows"=> mysqli_affected_rows($conn),
                "statu"=> "erro"
            ];
        }
    } 

// desassociar tag
    if($dados["idTag"] !== ""){
        $conn = $db->getConn();
        $query = sprintf("delete from `product_tag` where tag_id=%d and product_id=%d", $dados["idTag"], $dados["id"]);

        if(mysqli_query($conn, $query)){
            switch(mysqli_affected_rows($conn)){
                case 0:
                    $response[] = [
                        "mensagem"=>$dados["type"]." não encontrado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "status" => "?"
                    ]; 
                break;

                case 1:
                    $response[] = [
                        "mensagem"=>$dados["type"]." associado com id = ". $dados['id'].", deletado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "status" => "Sucesso"
                    ]; 
                break;

                case -1:
                    $response[] = [
                        "mensagem"=>$dados["type"]. " não foi possível desassociar a ".$dados["type"]."!",
                        "rows"=> mysqli_error($conn),
                        "status" => "Erro"
                    ]; 
                break;
            }
        } else {
            $response[] = [
                "mensagem"=> "Falha na conexão",
                "rows"=> mysqli_affected_rows($conn),
                "statu"=> "erro"
            ];
        }
    }

http_response_code(200);
echo json_encode($response);
?>