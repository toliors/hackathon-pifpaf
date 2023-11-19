
const MainButton = document.getElementById("MainButton");
const MessageButton = document.getElementById("message");
var Botoes = document.getElementsByClassName("block");

class Caminhao{
    DestinoAves;
    AvesPorVeiculo;
    Produtor;
    Galpao;
    PesoPrevistoDasAves;
    AvesPorCaixa;
    PesoPrevistoPorCaixa;
    Municipio;
    Data;
    HorarioDeRetiradaDaRacao;
    Horario;
    TurmaDeApanha;
    Idade;
    HorarioPrevistoChegadaFrigorifico;
    HorarioPrevistoInicioDoAbate;
    OrdemDoCaminhao;
    Placa;
    NotaFiscal;
    HorarioDeChegada;

    Vaga = null;
    HorarioAtual;
    TempoDeJejumPrevisto;
    TempoDeJejumUsado;
    TempoDeJejumRestante;

    GetInfo(){
        return {
        "Destino das aves": this.DestinoAves,
        "Aves por veículo": this.AvesPorVeiculo,
        "Produtor": this.Produtor,
        "Galpao": this.Galpao,
        "Peso previsto das aves": this.PesoPrevistoDasAves,
        "Aves por caixa": this.AvesPorCaixa,
        "Peso previsto por caixa": this.PesoPrevistoPorCaixa,
        "Municipio": this.Municipio,
        "Data": this.Data,
        "Horario de retirada da ração": Format(this.HorarioDeRetiradaDaRacao),
        "Horário": Format(this.Horario),
        "Turma de apanhaconfig": this.TurmaDeApanha,
        "Idade": this.Idade,
        "Horario previsto chegada frigorifico": Format(this.HorarioPrevistoChegadaFrigorifico),
        "Horario ṕrevisto início do abate": Format(this.HorarioPrevistoInicioDoAbate),
        "Ordem do caminhao": this.OrdemDoCaminhao,
        "Placa": this.Placa,
        "Nota fiscal": this.NotaFiscal,
        "Horario de chegada": Format(this.HorarioDeChegada),
        "Tempo de jejum previsto": Format(this.TempoDeJejumPrevisto),
        "Tempo de jejum usado": Format(this.HorarioAtual - this.HorarioDeRetiradaDaRacao),
        "Tempo de jejum restante": Format(12 - (this.HorarioAtual - this.HorarioDeRetiradaDaRacao))  
    }
    }
    constructor(Destino, AvesPorVeiculo, Produtor, Galpao, Sexo, PesoPrevistoDasAves, AvesPorCaixa, Municipio, Data, HorarioDeRetiradaDaRacao, Horario, TurmaDeApanha, Idade, HorarioPrevistoDeChegada, HorarioPrevistoInicioDoAbate, Placa, NotaFiscal, HorarioDeChegada){
        this.DestinoAves = Destino;
        this.AvesPorVeiculo = AvesPorVeiculo;
        this.Produtor = Produtor;
        this.Galpao = Galpao;
        this.Sexo = Sexo;
        this.PesoPrevistoDasAves = PesoPrevistoDasAves;
        this.AvesPorCaixa = AvesPorCaixa;
        this.PesoPrevistoPorCaixa = this.AvesPorCaixa * this.PesoPrevistoDasAves;
        this.Municipio = Municipio;
        this.Data = Data;
        this.HorarioDeRetiradaDaRacao =  HorarioDeRetiradaDaRacao;
        this.Horario = Horario;
        this.TurmaDeApanha = TurmaDeApanha;
        this.Idade = Idade;
        this.HorarioDeChegada = HorarioDeChegada;
        this.HorarioPrevistoInicioDoAbate = HorarioPrevistoInicioDoAbate;
        this.Placa = Placa;
        this.NotaFiscal = NotaFiscal;
        this.HorarioDeChegada = HorarioDeChegada;

        this.TempoDeJejumPrevisto = Format(this.HorarioPrevistoInicioDoAbate - this.HorarioDeRetiradaDaRacao),
        this.TempoDeJejumUsado = Format(this.HorarioAtual - this.HorarioDeRetiradaDaRacao),
        this.TempoDeJejumRestante = Format(12 - (this.HorarioAtual - this.HorarioDeRetiradaDaRacao))  

        Vagas.forEach(Tipo => {
            Tipo.forEach(Vaga =>{
                if(Vaga.Ocupada == false && this.Vaga == null){
                    Botoes[CaminhoesAtivos.lenght].innerText = this.Placa;
                    this.Vaga = Vaga;
                    Vaga.Ocupada = true;
                    CaminhoesAtivos[CaminhoesAtivos.lenght + 1] = this;
                }
            })
         });   
    }
}

let CaminhoesAtivos = {};
let Vagas = {
    "Interna": {
        "1": {
            Ocupada: false
        },
        "2": {
            Ocupada: false
        },
        "3": {
            Ocupada: false
        },
        "4": {
            Ocupada: false
        }},
    "Externa":{
        "1":{
            Ocupada: false 
        },
        "2": {
            Ocupada: false 
        },
        "3": {
            Ocupada: false 
        },
        "4": {
            Ocupada: false 
        },
        "5": {
            Ocupada: false 
        },
        "6": {
            Ocupada: false
        }
    }
};    

function Remover(Placa, Justificativa){
    CaminhoesAtivos.forEach(Carga => {
        if(Carga.Placa == Placa){
            MakeMessage(Justificativa, 10);
            Carga.Vaga.Ocupada = false;
            delete Carga;
        }else{
            Carga.OrdemDoCaminhao--;
            if(Carga.Vaga == null){
                MakeMessage("Sua ordem agora é " + Carga.OrdemDoCaminhao + "º", 10);
            }
        }
    });
};

function GetHour() {
        var Data = new Date();
        var TimeString = Data.toISOString().substring(11, 19);
        return TimeString;
}

function Format(Minutos) {
    var Horas = Math.floor(Minutos / 60);
    var MinutosRestantes = Minutos % 60;
  
    var Resultado = Horas + ":" + MinutosRestantes + ":00";
  
    return Resultado;
}

function DisableButton(ButtonId){
    document.getElementById(ButtonId).style = "display: none";
}

function EnableButton(ButtonId){
    document.getElementById(ButtonId).style = "display: inline";
}

function Desocupar(Vaga, Tipo){
    Vagas[Tipo][Vaga].Ocupada = false;
}

function MakeMessage(Text, Timeout){
    EnableButton(MessageButton.id);
    MessageButton.innerText = Text;
    return new Promise(resolve => setTimeout(resolve, Timeout));
    MessageButton.innerText = "";
    DisableButton(MessageButton.id);
}

function Setup(Placa){
    let Selecionado, Info, I = 0;
    CaminhoesAtivos.forEach(Caminhao =>{
        if(Caminhao.Placa == Placa){
            Selecionado = Caminhao;
            Info = Selecionado.GetInfo();
        }
    })
    for (const Index of Info) {
        MainButton.children[I].innerText = Index + Info[Index];
        I++;
    }
}

const Infos = jQuery.getJSON("./info.json", function(Data) {
    jQuery.each(Data, function(Key, Value){
        new Caminhao(Data[0], Data[1], Data[2], Data[3], Data[4], Data[5], Data[6], Data[7], Data[9], Data[10], Data[11], Data[12], Data[13], Data[14], Data[15], Data[16], Data[17], Data[18],Data[19]);
    })
});