<?php

// Conexão com o banco de dados
class ControllerDB{

    private $user = "id18441845_mysql_bitstore_teste";
    private $host = "localhost";
    private $password = "";
    private $database = "id18441845_bitstore";
    private $conn;

    function __construct(){
        $this->conn = $this->connect();
    }

    function connect(){
        try{
            $this->conn = mysqli_connect($this->host, $this->user, $this->password, $this->database); 
            if(!$this->conn){
                printf("Not connect. Error: %s\n", mysqli_connect_error());
            }
            return $this->conn;
        }catch(Exception $e){
            return $e . mysql_error();
        }
    }
    function getConn(){
        return $this->conn;
    } 
}
?>