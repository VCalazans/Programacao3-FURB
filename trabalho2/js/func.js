

var conteudo = new Array();

function criarTabela(conteudo) {

  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var header = document.createElement("tr");
  var tbody = document.createElement("tbody");

  table.setAttribute("class", "table table-striped table-hover table-responsive");
  thead.setAttribute("class", "thead-dark");

  var id = document.createElement("th");
  var nome = document.createElement("th");
  var salario = document.createElement("th");
  var idade = document.createElement("th");
  var avatar = document.createElement("th");
  var acoes = document.createElement("th");
  acoes.style = "width:25%;";

  id.innerHTML = "ID";
  nome.innerHTML = "Nome";
  salario.innerHTML = "Salário";
  idade.innerHTML = "Idade";
  avatar.innerHTML = "Avatar";
  acoes.innerHTML = "Ações";

  header.appendChild(id);
  header.appendChild(nome);
  header.appendChild(salario);
  header.appendChild(idade);
  header.appendChild(avatar);
  header.appendChild(acoes);

  thead.appendChild(header);
  table.appendChild(thead);

  for (var i = 0; i < conteudo.length; i++) {
    var linha = document.createElement("tr");
    for (var x = 0; x < 6; x++) {
      if (x == 5) {
        var campo = document.createElement("td");
        var editar = document.createElement("button");
        editar.innerHTML = "Editar";
        editar.setAttribute("onclick", "carregarRegistro('" + conteudo[i][0] + "','" + conteudo[i][1] + "','" + conteudo[i][2] + "','" + conteudo[i][3] + "','" + conteudo[i][4] + "')");
        editar.style = "margin-left:10px;"
        campo.appendChild(editar);
        var deletar = document.createElement("button");
        deletar.innerHTML = "Deletar";
        deletar.style = "margin-left:10px;"
        deletar.setAttribute("onclick", "deletarRegistro('" + conteudo[i][0] + "', '" +conteudo[i][1]+"' )");
        campo.appendChild(editar);
        campo.appendChild(deletar);
        linha.appendChild(campo);
      } else {
        var campo = document.createElement("td");
        campo.innerHTML = conteudo[i][x];
        linha.appendChild(campo);
      }

    }



    tbody.appendChild(linha);
  }

  table.appendChild(tbody);
  table.setAttribute("id", "tabelaEmpregados");

  return table;
}


function carregarRegistro(id, employee_name, employee_salary, employee_age, profile_imagem){
  document.getElementById("id").value      = id;
  document.getElementById("nome").value    = employee_name;
  document.getElementById("salario").value = employee_salary;
  document.getElementById("idade").value   = employee_age;
  document.getElementById("Avatar").value  = profile_imagem;
}

function deletarRegistro(id, nome){

  if(confirm("Deseja realmente remover o empregado "+ nome +"?")){

    sendAPI("DELETE",
            "http://rest-api-employees.jmborges.site/api/v1/delete/"+ id,
            false,
            ""
            );

    limparForm();
    loadDoc();
}

}

function salvaContato(){

      var employee             = new Object(); 
      employee.nome            = document.getElementById("nome").value;
      employee.salario         = document.getElementById("salario").value;
      employee.idade           = document.getElementById("idade").value;
      employee.imagem_perfil   = document.getElementById("avatar").value;    
      json                   = JSON.stringify( employee ); 
  
      sendAPI("POST", 
              "http://rest-api-employees.jmborges.site/api/v1/create", 
              false,
              json);
      
}

function limparForm(){
  document.getElementById("id").value    = "";
  document.getElementById("nome").value    = "";
  document.getElementById("salario").value = "";
  document.getElementById("idade").value   = "";
  document.getElementById("avatar").value  = ""; 
}



function loadDoc() {
  var employees = sendAPI("GET", "http://rest-api-employees.jmborges.site/api/v1/employees", false, null); // Solicita a requisição
  for (var i = 0; i < employees.length; i++) {
    conteudo.push([employees[i].id, employees[i].employee_name, employees[i].employee_salary, employees[i].employee_age, employees[i].profile_imagem]);
  }

  document.getElementById("tabela").appendChild(criarTabela(conteudo));
}

//@Creditos William Mello
function sendAPI(method, // Método de submissão
  url,    // Endereço da API + Recurso da API
  assync, // Síncrono ou Assincrono
  body    // Corpo da solicitação
) {

  var result; // Retorno, caso exista...

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4
      && this.status == 200) {
      result = JSON.parse(this.responseText); // JSON to Object
      result = result.data; //Retorna os dados dos empregados
    }
  }
  xhttp.open(method, url, assync);
  xhttp.setRequestHeader("Content-Type", "application/json");
  if (method == "POST"
    || method == "PUT") {
    xhttp.send(body);
  } else {// Esperado que seja o GET
    xhttp.send();
    return result; //Retorna o(s) dado(s) do(s) empregado(s)
  }
}