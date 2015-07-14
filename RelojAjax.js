 
function MostrarRelojEspera()
{
alert("Entro");
	divRelojEspera.style.display='';
}
function OcultarRelojEspera()
{
alert("Salio");
	divRelojEspera.style.display='none';
}
//Script para el manejo del reloj en la barra de estado
function Reloj() {									
	var tiempo = new Date()
	var hora = tiempo.getHours()
	var minuto = tiempo.getMinutes()
	var segundo = tiempo.getSeconds()
	var temp = "   " + ((hora > 12) ? hora - 12 : hora)
	temp += ((minuto < 10) ? ":0" : ":") + minuto
	temp += ((segundo < 10) ? ":0" : ":") + segundo
	temp += (hora >= 12) ? " PM" : " AM"									
	window.setTimeout("Reloj();",1000);
	var mensajeTemporal = window.status;
	var longitudTiempo = temp.length;
	var mensajeFinal = "";
			
	var mensajeValidacion = mensajeTemporal.substr(mensajeTemporal.length - 5);
	if (mensajeValidacion.substr(0,1) == '/') mensajeFinal = mensajeTemporal;
	else mensajeFinal = mensajeTemporal.substr(0, (mensajeTemporal.length - longitudTiempo) - 1);
	window.status = mensajeFinal + " " + temp;
}
				
//window.onload = Reloj;
