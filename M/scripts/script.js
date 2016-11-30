<script type="text/javascript">
var cli=1;
var carta1;
var carta2;
var cartas =[];
var volteadas=[];
var jugando=0;
var imagenes=new Array(36);
var cont=0;
var intentos=0;
var pares=0;
var errores=0;
var j=0;
var i=0;
var x;
var existe=0;
function buscar(id){
    existe=0;
    for(i=0;i<volteadas.length;i++)
    {
        if(volteadas[i]==id)
        {
            existe=1;
        }
    }}
function cartaclic(id){
    if(jugando)
    {
        buscar(id);
        if(existe==0)
        {
            if (cartas.length<2 ) {
                document.getElementById("carta"+id).style.backgroundImage="url("+imagenes[id]+")";
                if(cartas.length==0)
                {
                    cartas.push(id);
                }
                else if(cartas.length==1)
                {
                    cartas.push(id);
                    if(imagenes[cartas[0]]==imagenes[cartas[1]] )
                    {
                        //if(cartas[0]!=cartas[1])
                        {
                            intentos++;
                            pares++;
                            volteadas.push(cartas[0]);
                            volteadas.push(cartas[1]);
                            cartas=[];
                            if(pares==18)
                            {
                                alert("Has ganado. Fin del juego.")
                                volteadas=[];
                                chronometer.stop();
                            }
                        }
                    }
                    else
                    {
                        intentos++;
                        errores++;
                        function voltear()
                        {
                            document.getElementById("carta"+cartas[0]).style.backgroundImage="url(imagenes/0.png)";
                            document.getElementById("carta"+cartas[1]).style.backgroundImage="url(imagenes/0.png)";
                            cartas=[];
                        }
                        setTimeout(voltear,500);
                    }
                    

                }
            }
        }
        actualizardatos();
    }}
function creararreglo() {
for(cont=0;cont<imagenes.length;cont+=2)
{   if(cont>=18)
    {
        imagenes[cont]="imagenes/"+(cont+1-18)+".png";
        imagenes[cont+1]="imagenes/"+(cont+2-18)+".png";
        
    }
    else
    {
        imagenes[cont]="imagenes/"+(cont+1)+".png";
        imagenes[cont+1]="imagenes/"+(cont+2)+".png";
    }
}
revolver();}
function revolver() {
for (i=0;i<imagenes.length;i++) 
{
    j=Math.floor(Math.random()*35)
    x=imagenes[j];
    imagenes[j]=imagenes[i];
    imagenes[i]=x;
}}
function comenzar(){

if(jugando==0)
{

    creararreglo();
    tablero();
    i=0;    
    jugando=1;
    chronometer.reset();
    chronometer.start();
    intentos=0;
    pares=0;
    errores=0;
    actualizardatos();
}
else
{
    alert("Finalizar primero el juego en curso.");
}}
function tablero(){
    var ht="";
    for(i=0;i<imagenes.length;i++)
    {
        ht+="<div class = 'carta' id='carta"+i+"' onclick='cartaclic("+i+")'></div>";
    }
    document.getElementById('tablero').innerHTML=ht;}
function finalizar(){

if(jugando==1)
{
    tablero();
    chronometer.stop();
    jugando=0;
    var car=document.getElementByClassName('carta');

    //for(i=0;i<car.length-1;i++)
    {
    //  car[i].style.backgroundImage="url(imagenes/0.png)";
    }

    volteadas=[];
    cartas=[];
}
else
{
    alert("No se esta jugando.");
}}
function actualizardatos(){
var intent=document.getElementById('intentos');
var par=document.getElementById('paresconseguidos');
var resta=document.getElementById('paresrestantes');
var err= document.getElementById('errores');

intent.innerHTML="Conteo: "+intentos;
par.innerHTML="Conseguidos: "+ pares;
resta.innerHTML="Restantes: "+ (18-pares);
err.innerHTML="Conteo: "+ errores;}
var chronometerInterval = null;
var chronometer = {
seconds: 0,
active: false,
start: function() {
    if(!this.active) {
        chronometerInterval = setInterval(this.update, 1000);
        this.active = true;
    }
},
stop: function() {
    if(chronometerInterval != null && this.active) {
        clearInterval(chronometerInterval);
        this.active = false;
    }
},
reset: function() {
    if(this.active) {
        chronometer.stop();
    }
    chronometer.seconds = 0;
    this.active = false;
    var d = new Date(chronometer.seconds * 1000);
    document.getElementById("crono").innerHTML = "Tiempo: "+ d.getMinutes() + ":" + d.getSeconds();
},
update: function() {
    chronometer.seconds++;
    var date = new Date(chronometer.seconds * 1000);
    document.getElementById("crono").innerHTML = "Tiempo: "+ date.getMinutes() + ":" + date.getSeconds();
}};

</script>