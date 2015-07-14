var ventana_monitor;

//Función que reemplaza los datos nulos por espacio en blanco
function ValidaTag(valor)
{
	var retorno = "";
	if(valor.length == 0 || valor[0].firstChild == null){
		retorno = " ";
	}
	else{
		retorno = valor[0].firstChild.data
	}
	return retorno;	
}

//Función que corta la cadena para que no se desborde al imprimir en el ticket
function subStrArr(s,tam){
	var strTemp = s;
	var cad1="";
	var iMenos=0;
	var i;
	var index=0;
	var lngArr=parseInt(strTemp.length/tam)+1;
	var arr=new Array(lngArr);
	if(strTemp.length>tam){
		while(strTemp.length>tam){
			iMenos=0;
			for(i=tam;i>0;i--){
				if(strTemp.charAt(i)==' ')
					break;
				iMenos++;
			}
			cad1=strTemp.substring(0,tam-iMenos);
			strTemp=strTemp.substring(tam-iMenos,strTemp.length);
			arr[index++]=cad1;
		}
		arr[index]=strTemp;
	}else{
		arr[index]=s;
	}		
	return arr;
}				


function CerrarIE()
{
	CerrarMonitor();
	window.close();
}


//Funcion que inicializa la variable del Monitor
function AbrirMonitor()
{	    
    //Monitor de impresiones
    if(ventana_monitor== null)			
       ventana_monitor="VentanaMonitor";
}

//Funcion que abre la ventana del Monitor
function MonitorImpresiones()
{
	//Monitor de impresiones	
		if(ventana_monitor=="VentanaMonitor")			
	  {
			ventana_monitor= window.open('/ElektraFront/Surtimiento/Impresion/Monitor.aspx','','scrollbars=no,resizable=no,width=520,height=300'); 
			if(ventana_monitor.error_impresion == 1)			
	    {	     	     
		 		throw new Error(ventana_monitor.vError);	      
	    }
	  }
}

//Elimina una subcadena
function eliminaString(cadena,strElimar)
{
	var pos=cadena.indexOf(strElimar);
	if(pos>0)
	{
		var cArticuloTemp=cadena.substring(0,pos-1);
		cArticuloTemp+=cadena.substring(pos+strElimar.length,cadena.length);
		cadena=cArticuloTemp;
	}
	return cadena
}

function CerrarMonitor()
{
	ventana_monitor.close();
}

function logText(texto, mensaje) {
try{
        Anthem_InvokePageMethod(
            'RegistraErrores',
            [texto, mensaje],
            function(result) {
                
            }
        );
	}
	catch(e){var x='';}
   }
   
   
//REQ67795 – México Campaña de Aniversario Credimax   
function ImprimirLeyendaCredimax(metodoImpresion, fecha, montoTotal){

	var cadenaLeyendaCredimax = SeleccionarLeyendaCredimax(metodoImpresion, fecha, montoTotal);
    objPreview.setFont('Verdana',12, true);
	
	if (cadenaLeyendaCredimax != false){
		 miArr = subStrArr(cadenaLeyendaCredimax, 25);
		 for(i=0;miArr.length>i;i++){	
				objPreview.PrintLine(' ' + miArr[i], objPreview.CurrentY, -1, eCentrado);
		}
	}
}			
   
//REQ67795 – México Campaña de Aniversario Credimax  
function SeleccionarLeyendaCredimax(metodoImpresion, fecha, monto) {
  var respuesta = false;
  var cantidadMonto = monto.replace("$", "").replace(",", "");
  cantidadMonto = parseInt(cantidadMonto);
  var fechaValidacion = fecha.substr(0, 10).split("/");
  if (fechaValidacion.length === 3) {
    fechaValidacion = new Date(fechaValidacion[2], fechaValidacion[1] - 1, fechaValidacion[0]);
    
    if (fechaValidacion.getFullYear() == 2014) {
      //Javascript inica los meses en 0 8 para Septiembre, 9 octubre
      if (fechaValidacion.getMonth()== 8 && fechaValidacion.getDate() >= 22){
        if (fechaValidacion.getDate() <= 29) {
          respuesta = '"Tus compras con CREDIMAX en Octubre te pueden hacer GANAR UN AUTO ¡Prepárate!"';

        } else if (fechaValidacion.getDate() == 30) {
          if (metodoImpresion == "ImprimirPagoContado") {
            respuesta = '"Tus compras con CREDIMAX Del 30Sep’14-27Oct’14 te pueden hacer GANAR UN AUTO ¡Apresúrate!"';

          } else if (metodoImpresion == "ImprimirPagareCredito" && cantidadMonto >=  5000) {
            respuesta = '"FELICIDADES" Tu compra participa En el próximo concurso 15-OCT-14 Para GANAR UN AUTO';
          }
        }
      } else if (fechaValidacion.getMonth() == 9 && fechaValidacion.getDate() <= 27) {
        if (metodoImpresion == "ImprimirPagoContado") {
          respuesta = '"Tus compras con CREDIMAX Del 30Sep’14-27Oct’14 te pueden hacer GANAR UN AUTO ¡Apresúrate!"';
        } else if (metodoImpresion == "ImprimirPagareCredito" && cantidadMonto >=  5000) {
          if (fechaValidacion.getDate() <= 13) {
            respuesta = '"FELICIDADES" Tu compra participa En el próximo concurso 15-OCT-14 Para GANAR UN AUTO';
          } else {
            respuesta = '"FELICIDADES" Tu compra participa En el próximo concurso 29-OCT-14 Para GANAR UN AUTO';
          }
        }
      }
    }
  }
  return respuesta;
}