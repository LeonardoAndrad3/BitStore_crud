<?php
    include_once("./ControllerDB.php");


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $db = new ControllerDB();

    $responseUpdate = file_get_contents("php://input");
    $dados = json_decode($responseUpdate, true);
    $response = [];

    if($dados["nameUp"] !== ""){   
        $db->connect();
        $conn=$db->getConn();
        $query = sprintf("update `%s` set `name`='%s' where `id`= %d", $dados['type'],$dados['nameUp'], $dados['idProduct']);
    if(mysqli_query($conn, $query)){

        switch(mysqli_affected_rows($conn)){
            case 0:
                $response[] = [
                    "mensagem"=> $dados["type"]." não cadastrado!",
                    "rows"=> mysqli_affected_rows($conn),
                    "status"=> "?"
                ];
            break;

            case 1:
                $response[] = [
                    "mensagem"=> $dados["type"]." alterado!",
                    "rows"=> mysqli_affected_rows($conn),
                    "status"=> "sucesso"
                    ];
            break;

            case -1:
                $response[] = [
                    "mensagem"=>$dados["type"]." não encontrados!",
                    "rows"=> mysqli_affected_rows($conn),
                    "status"=> "Erro"
                ];
            break;
             
        }
    } elseif ($dados['nameUp']){
        $response[] = [
            "mensagem"=> $dados["type"]." já existe",
            "rows"=> mysqli_affected_rows($conn),
            "statu"=> "erro"
        ];
    }
} elseif($dados["idTag"] !=="" && $dados["tagUp"] == ""){

} else{
    $response[] = [
        "mensagem"=> "Dados não encontrados",
        "rows"=> mysqli_affected_rows($db->getConn()),
        "statu"=> "erro"
    ];
}

//Alterar e adicionar tag 

    if($dados["idTag"] != ""){ 
        $conn = $db->getConn();
        $query = sprintf("update `product_tag` set  `tag_id`=%d where product_id=%d and tag_id=%d",  $dados['tagUp'],$dados["idProduct"],$dados["idTag"]);

        //Adicionar tag ao produto
        if($dados["tagUp"] == ""){
            $query = sprintf("insert into `product_tag` (`tag_id`,`product_id`) values(%d,%d)", $dados["idTag"], $dados["idProduct"]);
        }

        if(mysqli_query($conn, $query)){

        switch(mysqli_affected_rows($conn)){
                case 0:
                    $response[] = [
                        "mensagem"=> "Não foi possível associar outra tag ao produto! Por favor, verifique a consulta!",
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "?"
                    ];

                break;

                case 1:

                    $response[] = $dados["tagUp"] !== "" ? [
                        "mensagem"=>"Tag associada com id ".$dados['idTag'].", alterado para id ".$dados['tagUp'],
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "sucess",
                    ]: [
                        "mensagem"=>"Tag associada com id ".$dados['idTag'],
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "sucess",
                    ];

                break;

                case -1:
                    $response[] = [
                        "mensagem"=> "Erro ao associar a tag!",
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "erro"
                    ];
            }

        } else {
            $response[] = [
                "mensagem"=> "Falha ao associar",
                "rows"=> mysqli_affected_rows($conn),
                "statu"=> "erro"
            ];
        }
    }

    http_response_code(200);
    echo json_encode($response);
    
?>  
