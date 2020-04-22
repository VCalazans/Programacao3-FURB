

const carros = ['gol', 'polo', 'palio', 'peugeout', 'santana', 'fox', 'prisma', 'corsa', 'saveiro']

function generateList(){
    var lista  = document.getElementById("lista").innerHTML;
    
    for(var i=0;i<carros.length;i++)
    {
        lista = lista +"<li>"+carros[i]+"</li>";
        document.getElementById("lista").innerHTML = lista;
    }
    
} 