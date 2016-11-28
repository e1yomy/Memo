<script type="text/javascript">
	  
    var arregloL = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];
    var valor_memoria = [];
    var memoria_carta_ids = [];
    var virada_carta = 0;
    var cont1 = 0;
    var cont = document.getElementById("contador");
    var f1=0;
    var fails = document.getElementById("fallas")
    var startTime = 0
    var start = 0
    var end = 0
    var diff = 0
    var timerID = 0
    Array.prototype.revolverCartas = function(){
        var i = this.length, j, temp;
        while(--i > 0){
            j = Math.floor(Math.random() * (i+1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }
    var jugando=0;
    function comenzar(){
        if(jugando==0)
        {

            nuevaTabla();
            cronometroStart();
            jugando=1;
            
        }
        else
        {
            alert("Juego en progreso.");
        }

    }
    function finalizar(){
        if(jugando==1)
        {
            detener();
            jugando=0;
        }
        else
        {
            alert("No se está jugando.");
        }

    }
    function nuevaTabla(){

        document.getElementById('tablero').innerHTML = "";
        virada_carta = 0;
        var output = '';
        var cont1 = 0;
        arregloL.revolverCartas();
        for(var i = 0; i < arregloL.length; i++){
            output += '<div class="carta" id="carta_'+i+'"onclick="mostrarCarta(this,\''+arregloL[i]+'\',cont1)"></div>';

            //for(var i = 0; i < arregloL.length; i++){
            //output += '<div onclick="mostrarCarta(this,\''+arregloL[i]+'\',cont1)"><p class="carta" id="carta_'+i+'">Z</p></div>';
        }
        document.getElementById('tablero').innerHTML = output;
    } 

    function continuar(){
        start = new Date()-diff
        start = new Date(start)
        cronometro();
    }


    function cronometro(){
        end = new Date();
        diff = end - start;
        diff = new Date(diff);
        var msec = diff.getMilliseconds();
        var sec = diff.getSeconds();
        var min = diff.getMinutes();
        if (min < 10){
            min = "0" + min;
        }
        if (sec < 10){
            sec = "0" + sec;
        }
        if(msec < 10){
            msec = "00" +msec;
        }
        else if(msec < 100){
            msec = "0" +msec;
        }
        document.getElementById("time").innerHTML = min + ":" + sec + ":" + msec;
        timerID = setTimeout("cronometro()", 10);

    }

    function cronometroStart(){
        start = new Date();
        cronometro()
    }

    function detener(){
        clearTimeout(timerID)
    }

    function resetear(){
        document.getElementById("time").innerHTML = "00:000"
    }


    function mostrarCarta(carta,valor,cont){ 
        if(jugando)
        {
            var cont = document.getElementById("contador"); 
             var fails = document.getElementById("fallas");
            if(carta.innerHTML == "" && valor_memoria.length < 2){
                //carta.style.background = '#fff';
                carta.style.background = '#fff';
                carta.innerHTML = valor;
                ////aqui
                carta.style.padding=0 ;
                ///////////
                if(valor_memoria.length == 0){
                    valor_memoria.push(valor);
                    memoria_carta_ids.push(carta.id);
                } 
                else if(valor_memoria.length == 1)
                {  
                    valor_memoria.push(valor);
                    memoria_carta_ids.push(carta.id);
                    if(valor_memoria[0] == valor_memoria[1]){
                        virada_carta += 2;
                        cont1 ++; //CONTADOR PARES
                        cont.innerHTML=cont1;
                        //limpia los 2 arreglos
                        valor_memoria = [];
                        memoria_carta_ids = [];
                        //chekea si la mesa entera esta despedida
                        if( virada_carta == arregloL.length){
                            alert("Juego finalidado.");
                            finalizar();
                        }
                    } 
                    else
                    { 
                        function virarAtras(){
                            //las dos cartas se van a virar
                            f1 ++; //CONTADOR ERRORES
                            fails.innerHTML=f1; 
                            var carta_1 = document.getElementById(memoria_carta_ids[0]);
                            var carta_2 = document.getElementById(memoria_carta_ids[1]);
                            ///Aquí
                            carta_1.style.background = 'url(b1.jpg)  repeat ';
                            carta_1.innerHTML = "";
                            carta_2.style.background = 'url(b1.jpg)  repeat ';
                            carta_2.innerHTML = "";
                            //////////////////
                            //despejando los 2 arrays
                            valor_memoria = [];
                            memoria_carta_ids = []; 
                        }
                        setTimeout(virarAtras, 700);
                    }
                }
            } 
        }
    }

</script>