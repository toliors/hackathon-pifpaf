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
        "Horario de retirada da ração": this.HorarioDeRetiradaDaRacao,
        "Horário": this.Horario,
        "Turma de apanha": this.TurmaDeApanha,
        "Idade": this.Idade,
        "Horario previsto chegada frigorifico": this.HorarioPrevistoChegadaFrigorifico,
        "Horario ṕrevisto início do abate": this.HorarioPrevistoInicioDoAbate,
        "Ordem do caminhao": this.OrdemDoCaminhao,
        "Placa": this.Placa,
        "Nota fiscal": this.NotaFiscal,
        "Horario de chegada": this.HorarioDeChegada,
        "Tempo de jejum previsto": this.HorarioPrevistoInicioDoAbate - this.HorarioDeRetiradaDaRacao,
        "Tempo de jejum usado": this.HorarioAtual - this.HorarioDeRetiradaDaRacao,
        "Tempo de jejum restante": 12 - (this.HorarioAtual - this.HorarioDeRetiradaDaRacao)  
    }
    }
    constructor(){
         Vagas.forEach(Tipo => {
            Tipo.forEach(Vaga =>{
                if(Vaga.Ocupada == false && this.Vaga == null){
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
        },
    },
    "Externa": {
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
        },
        "5": {
            Ocupada: false 
        },
        "6": {
            Ocupada: false
        }
    }
}

function Remover(Placa, Justificativa){
    CaminhoesAtivos.forEach(Carga => {
        if(Carga.Placa == Placa){
            // Justificativa
            Carga.Vaga.Ocupada = false;
            delete Carga;
        }else{
            Carga.OrdemDoCaminhao--;
            if(Carga.Vaga == null){
                // mensagem
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
  
    var Resultado = Horas + " horas " + MinutosRestantes + " minutos";
  
    return Resultado;
}


