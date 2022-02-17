<?php
include_once("ControllerDB.php");

    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:*');

    $db = new ControllerDB();
      
    $responseFront = file_get_contents("php://input");
    $dados = json_decode($responseFront, true);
    $response = [];

//Criando o produto
    if($dados){  
        $db->connect();
        $conn = $db->getConn(); 
        $query = sprintf("insert into `%s`(`name`) values('%s')", $dados['type'], $dados['name']);

        if(mysqli_query($conn, $query)){

            switch(mysqli_affected_rows($conn)){
                case 0:
                    $response[] = [
                        "mensagem"=> $dados['type']." não cadastrado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "?"
                    ];
                break;

                case 1:                  
                    $response[] = [
                        "mensagem"=> $dados['type']." cadastrado! Name: ".$dados['name'],
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "sucess",
                    ];

                break;

                case -1:
                    $response[] = [
                        "mensagem"=> $dados['type']." não cadastrado!",
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "erro"
                    ];
            }
        } else {
            $response[] = [
                "mensagem"=> "Produto já cadastado",
                "rows"=> mysqli_affected_rows($conn),
                "statu"=> "erro"
            ];
        }
    } else{
        $response[] = [
            "mensagem"=> "Dados não encontrados",
            "rows"=> mysqli_affected_rows($conn),
            "statu"=> "erro"
        ];
    }

    //Associando a tag ao produto
    if($dados["idTag"] != ""){
        $query = sprintf("select `id` from `product` where `name`='%s'", $dados['name']);
        $result = mysqli_query($conn, $query);
        $idProduct = mysqli_fetch_assoc($result);

        $query2 = sprintf("insert into `product_tag`(`product_id`,`tag_id`) values(%d, %d)", $idProduct["id"], $dados["idTag"]);

        if(mysqli_query($conn, $query2)){

         switch(mysqli_affected_rows($conn)){
                case 0:
                    $response[] = [
                        "mensagem"=> "Não foi possível associar a tag ao produto!",
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "?"
                    ];
                break;

                case 1:                  
                    $response[] = [
                        "mensagem"=>"id ".$dados['idTag']." associado ao produto ".$dados['name'],
                        "rows"=> mysqli_affected_rows($conn),
                        "statu"=> "sucess",
                    ];

                break;

                case -1:
                    $response[] = [
                        "mensagem"=> "Erro ao associar a  tag!",
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