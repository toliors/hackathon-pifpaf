
const MainButton = document.getElementById("MainButton");
var Template
const MessageButton = document.getElementById("message");
var Botoes = document.getElementsByClassName("block");
window.onload = function(){
    Init();
    Template = document.getElementById("Template")
    console.log(Template)
    DisableButton("Template");
}

let CaminhoesAtivos = {};
let Index = 0;
var Vagas = [
    Interna= [
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false }
    ],
    Externa= [
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false },
        { "Ocupada": false }
    ]
];


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
    Botao;

    GetInfo = function(){
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
    constructor(Destino, AvesPorVeiculo, Produtor, Galpao, Sexo, PesoPrevistoDasAves, AvesPorCaixa, a, Municipio, Data, HorarioDeRetiradaDaRacao, Horario, TurmaDeApanha, Idade, HorarioPrevistoDeChegada, HorarioPrevistoInicioDoAbate, Ordem, Placa, NotaFiscal, HorarioDeChegada){
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
        this.HoMakeButtonrarioDeChegada = HorarioDeChegada;
        this.HorarioPrevistoInicioDoAbate = HorarioPrevistoInicioDoAbate;
        this.OrdemDoCaminhao = Ordem;
        this.Placa = Placa;
        this.NotaFiscal = NotaFiscal;
        this.HorarioDeChegada = HorarioDeChegada;

        this.TempoDeJejumPrevisto = Format(this.HorarioPrevistoInicioDoAbate - this.HorarioDeRetiradaDaRacao);
        this.TempoDeJejumUsado = Format(this.HorarioAtual - this.HorarioDeRetiradaDaRacao);
        this.TempoDeJejumRestante = Format(12 - (this.HorarioAtual - this.HorarioDeRetiradaDaRacao));
        this.Botao = MakeButton(document.getElementById(Index + 1));
        Vagas.forEach(Tipo => {
            Tipo.forEach(Vaga =>{
                if(Vaga.Ocupada == false && this.Vaga == null){
                    for (const child of this.Botao.children) {
                        if(child.className == "status"){
                            child.innerText = "SEXO: " + this.Sexo;
                        }else if(child.tagName == "P"){
                            child.innerText = this.OrdemDoCaminhao + " - " + this.Placa;
                        }else{
                            child.onclick = () => {
                                console.log(this.GetInfo());
                              };
                        }
                      }
                    this.Vaga = Vaga;
                    Vaga.Ocupada = true;
                    CaminhoesAtivos[this.OrdemDoCaminhao] = this;
                }
            })
         });   
    }
}

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

function MakeButton(Index){
        console.log(Template)
        let NewButton = Template.cloneNode(true)
        NewButton.id = Index;
        EnableButton(NewButton.id)
        return NewButton;
}

function GetHour() {
        var Data = new Date();
        var TimeString = Data.toISOString().substring(11, 19);
        console.log(TimeString)
        return TimeString;
};


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

const Infos = [
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "4560",
        "Produtor": "JOSE CELSO DA SILVA LESSA(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "2800",
        "Aves por caixa": "8",
        "Peso previsto por caixa": "22400",
        "Município": "Coimbra",
        "Data": "15/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "22:00",
        "Turma de apanha": "SINHORINHO",
        "Idade": "47",
        "Horário previsto chegada frigorífico": "23:40",
        "Horário previsto início do abate": "03:30",
        "Ordem dos caminhões p/ abate": "1",
        "Placa": "BRA2E19",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "23:40"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "4560",
        "Produtor": "JOSE CELSO DA SILVA LESSA(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "2800",
        "Aves por caixa": "8",
        "Peso previsto por caixa": "22400",
        "Município": "Coimbra",
        "Data": "15/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "23:00",
        "Turma de apanha": "SINHORINHO",
        "Idade": "47",
        "Horário previsto chegada frigorífico": "00:40",
        "Horário previsto início do abate": "03:59",
        "Ordem dos caminhões p/ abate": "2",
        "Placa": "RIO2A19",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "00:40"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "4560",
        "Produtor": "JOSE CELSO DA SILVA LESSA(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "2800",
        "Aves por caixa": "8",
        "Peso previsto por caixa": "22400",
        "Município": "Coimbra",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "00:00",
        "Turma de apanha": "SINHORINHO",
        "Idade": "47",
        "Horário previsto chegada frigorífico": "01:40",
        "Horário previsto início do abate": "04:46",
        "Ordem dos caminhões p/ abate": "4",
        "Placa": "UAI2A20",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "01:40"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "4560",
        "Produtor": "JOSE CELSO DA SILVA LESSA(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "2800",
        "Aves por caixa": "8",
        "Peso previsto por caixa": "22400",
        "Município": "Coimbra",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "01:00",
        "Turma de apanha": "SINHORINHO",
        "Idade": "47",
        "Horário previsto chegada frigorífico": "02:40",
        "Horário previsto início do abate": "05:53",
        "Ordem dos caminhões p/ abate": "6",
        "Placa": "LSU3J43",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "02:40"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "3171",
        "Produtor": "JOSE CELSO DA SILVA LESSA(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "2800",
        "Aves por caixa": "8",
        "Peso previsto por caixa": "15,577",
        "Município": "Coimbra",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "02:00",
        "Turma de apanha": "SINHORINHO",
        "Idade": "47",
        "Horário previsto chegada frigorífico": "03:40",
        "Horário previsto início do abate": "06:40",
        "Ordem dos caminhões p/ abate": "8",
        "Placa": "VAS0C10",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "03:40"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "2850",
        "Produtor": "JOSE VICENTE TOLEDO(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "3840",
        "Aves por caixa": "5",
        "Peso previsto por caixa": "19,200",
        "Município": "Ervália",
        "Data": "15/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "22:00",
        "Turma de apanha": "FÁBIO",
        "Idade": "57",
        "Horário previsto chegada frigorífico": "01:00",
        "Horário previsto início do abate": "04:28",
        "Ordem dos caminhões p/ abate": "3",
        "Placa": "SAN1O55",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "01:00"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "2850",
        "Produtor": "JOSE VICENTE TOLEDO(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "3840",
        "Aves por caixa": "5",
        "Peso previsto por caixa": "19,200",
        "Município": "Ervália",
        "Data": "15/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "23:00",
        "Turma de apanha": "FÁBIO",
        "Idade": "57",
        "Horário previsto chegada frigorífico": "02:00",
        "Horário previsto início do abate": "05:38",
        "Ordem dos caminhões p/ abate": "5",
        "Placa": "PXL9D49",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "02:00"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "2850",
        "Produtor": "JOSE VICENTE TOLEDO(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "3840",
        "Aves por caixa": "5",
        "Peso previsto por caixa": "19,200",
        "Município": "Ervália",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "00:00",
        "Turma de apanha": "FÁBIO",
        "Idade": "57",
        "Horário previsto chegada frigorífico": "03:00",
        "Horário previsto início do abate": "06:48",
        "Ordem dos caminhões p/ abate": "7",
        "Placa": "PLL6F50",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "03:00"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "2850",
        "Produtor": "JOSE VICENTE TOLEDO(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "3840",
        "Aves por caixa": "5",
        "Peso previsto por caixa": "19,200",
        "Município": "Ervália",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "01:00",
        "Turma de apanha": "FÁBIO",
        "Idade": "57",
        "Horário previsto chegada frigorífico": "04:00",
        "Horário previsto início do abate": "07:58",
        "Ordem dos caminhões p/ abate": "9",
        "Placa": "PLQ8F28",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "04:00"
    },
    {
        "Destino": "SIF - 926 (FABRIL)",
        "Aves por veículo": "2850",
        "Produtor": "JOSE VICENTE TOLEDO(POSITIVO)",
        "Galpão": "1",
        "Sexo": "FEMEA",
        "Peso previsto das aves": "3840",
        "Aves por caixa": "5",
        "Peso previsto por caixa": "19,200",
        "Município": "Ervália",
        "Data": "16/11/2023",
        "Horário de retirada da ração": "19:00",
        "Horário": "02:00",
        "Turma de apanha": "FÁBIO",
        "Idade": "57",
        "Horário previsto chegada frigorífico": "05:00",
        "Horário previsto início do abate": "08:57",
        "Ordem dos caminhões p/ abate": "11",
        "Placa": "PYM7D25",
        "Nota fiscal": "FDIONU123",
        "Horário de chegada": "05:00"
    }
]

function Init(){
Infos.forEach(element => {
    const Keys = Object.keys(element);
     new Caminhao(element[Keys[0]], element[Keys[1]], element[Keys[2]], element[Keys[3]], element[Keys[4]], element[Keys[5]], element[Keys[6]], element[Keys[7]], element[Keys[8]],element[Keys[9]], element[Keys[10]], element[Keys[11]], element[Keys[12]], element[Keys[13]], element[Keys[14]], element[Keys[15]], element[Keys[16]], element[Keys[17]], element[Keys[18]], element[Keys[19]]);
    Index++;
})}