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

    Vaga;

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
        "Horario de chegada": this.HorarioDeChegada
        }
    }
    constructor(){
         Vagas.forEach(Vaga => {
            if(Vaga.Ocupada == false){
                this.Vaga = Vaga;
                Vaga.Ocupada = true;
                CaminhoesAtivos[CaminhoesAtivos.lenght + 1] = this;
            }
         });   
    }
}

let CaminhoesAtivos = {};

function Remover(Placa, Justificativa){
    CaminhoesAtivos.forEach(Carga => {
        if(Carga.Placa == Placa){
            delete Carga;
        }else{
            Carga.OrdemDoCaminhao--;
        }
    });
};
 
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

