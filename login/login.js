var Form = document.getElementById('form');
var Campo = document.getElementById('senha');

const Senhas = {
    "gerente": 444,
    "motorista": 555,
    "granja": 666,
    "apanha": 777,
    "recepção": 888,
    "sif": 999,
};

function Validar(Tipo, Senha){
    console.log(Tipo, Senha)
    if(Senhas[Tipo] == Senha){       
        window.location = ".././main/main.html";
    }else{
        alert("Senha incorreta! Tente novamente");
        document.getElementById("senha").value = "";
        return 0;
    }
}
