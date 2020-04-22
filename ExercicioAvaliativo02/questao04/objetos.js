

class Filme {
 
    constructor(titulo, ano, genero){
        this.titulo = titulo
        this.ano = ano
        this.genero = genero
    }
}

var filme1 = new Filme('Exterminador do futuro', '2019', 'acao')
var filme2 = new Filme('A vaca foi pro brejo', '2019', 'animacao')
var filme3 = new Filme('As branquelas', '2020', 'comédia')

var arr = [filme1, filme2, filme3]

function insereInformacoes(){

    var p = document.getElementById('info').innerHTML
    for(var i = 0; i < arr.length; i++){
        p = p + "Filme :"+ arr[i].titulo +  "</br>" + " Ano :" +arr[i].ano + "</br>" + " Genero :" + arr[i].genero + "</br></br>"
        document.getElementById("info").innerHTML = p;
    }
}