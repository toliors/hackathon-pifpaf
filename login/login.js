var Form = document.getElementById('form');
var Campo = document.getElementById('senha');

const Senhas = {
    "Gerente": 444,
    "Motorista": 555,
    "Granja": 666,
    "Apanha": 777,
    "Recepção": 888,
    "SIF": 999,
};

function Validar(Tipo, Senha){
    console.log(Tipo, Senha)
    if(Senhas[Tipo] == Senha){
        return 1;
    }else{
        return 0;
    }
}


function ale(){
    alert("anidwnuidawnuaidwnuidnuiwnadnuwanudnu")
}