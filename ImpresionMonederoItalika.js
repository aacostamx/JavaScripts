//Declaracion de variables para la impresion del monedero Italika
var xmlDocMonedero   = new ActiveXObject("Microsoft.XMLDOM");	
var objPreview = new ActiveXObject("ADNPrintPreview.ADNPPreview");

var eCentrado= 2;
var eDerecha = 1;
var eIzquierda = 0;
var TraceMonedero;
var DatosMonedero;
xmlDocMonedero.async = 'false';	

function ImpresionMonederoItalika(strXML){
	try{
		
		xmlDocMonedero.loadXML(strXML);
		DatosMonedero = xmlDocMonedero.getElementsByTagName("Tarjeta")[0];

		objPreview.Inicializar();
		objPreview.EstablecerImpresoraDefault("TCK");

		imprimirEncabezado();
		imprimirEmision();
		imprimirDatosCliente();
		imprimirMonto();
		imprimirVigencia();
		imprimirPieMonedero();
		
		objPreview.Imprimir();

	}catch(e){
		alert("Error al imprimir el Monedero Italika.\n" + TraceMonedero + "\n" + e.message);
	}
}

function ValidaTag(valor){
	var retorno = "";
	if(valor.length == 0 || valor[0].firstChild == null){
		retorno = " ";
	}else{
		retorno = valor[0].firstChild.data
	}
	return retorno;
}

function imprimirEncabezado(){
	TraceMonedero=" Inicia la Impresion del Encabezado";
	objPreview.setFont('Tahoma',11,true);
	var titulo = ValidaTag(DatosMonedero.getElementsByTagName('Titulo'));
	objPreview.PrintLine(' '+titulo,objPreview.CurrentY ,-1,eCentrado);
	objPreview.PrintPict('K:\\Bmp\\LogoMonedero.JPG', 400, objPreview.CurrentY+2, 5.0, 3.3);
	TraceMonedero+=" Termina de imprimir encabezado \n";
}

function imprimirEmision(){
	var pos;
	TraceMonedero+=" Inicia imprimir encabezado \n";
	objPreview.SetFont('Verdana',7,true);
	var fechaEmision = ValidaTag(DatosMonedero.getElementsByTagName('FechaEmision'));
	pos=objPreview.CurrentY;
	objPreview.PrintLine(' Fecha Emision:  ');
	objPreview.SetFont('Verdana',7,false);
	objPreview.PrintLine(' '+fechaEmision,pos,1300);
	var noPedido = ValidaTag(DatosMonedero.getElementsByTagName('Pedido'));
	pos=objPreview.CurrentY;
	objPreview.SetFont('Verdana',7,true);
	objPreview.PrintLine(' Pedido:  ');
	objPreview.SetFont('Verdana',7,false);
	objPreview.PrintLine(' '+noPedido,pos,1300);
	objPreview.PrintLine(' ');
	objPreview.PrintBox(objPreview.CurrentY, 1, 250, 0, 2);
	TraceMonedero+=" Termina de imprimir Emision \n";
}

function imprimirDatosCliente(){
	var pos;
	TraceMonedero+=" Inicia la impresion de los datos del cliente \n";
	var cliente = ValidaTag(DatosMonedero.getElementsByTagName('Nombre'));
	objPreview.PrintLine(' ');
	objPreview.setFont('Verdana',7,true);
	pos=objPreview.CurrentY;
	objPreview.PrintLine(' Cliente:');
	objPreview.setFont('Verdana',7,false);
	objPreview.PrintLine(' '+cliente,pos,1300);
	var producto = ValidaTag(DatosMonedero.getElementsByTagName('Sku'));
	var descripcion = ValidaTag(DatosMonedero.getElementsByTagName('Descripcion'));
	objPreview.setFont('Verdana',7,true);
	pos=objPreview.CurrentY;
	objPreview.PrintLine(' SKU: '+producto);
	objPreview.PrintLine(' '+descripcion,pos,1300);
	objPreview.PrintLine(' ');
	objPreview.PrintBox(objPreview.CurrentY, 1, 250, 0, 2);
	TraceMonedero+=" Fin de la impresion de los datos del cliente \n";
}

function imprimirMonto(){
	TraceMonedero+=" Inicia la impresion del Monto \n";
	objPreview.setFont('Verdana',12,true);
	var monto = ValidaTag(DatosMonedero.getElementsByTagName('Monto'));
	objPreview.PrintLine(' ');
	objPreview.PrintLine(' Monto:   '+monto+'   ');
	objPreview.PrintLine(' ');
	objPreview.PrintBox(objPreview.CurrentY, 1, 250, 0, 2);
	TraceMonedero+=" Fin de la impresion del Monto \n";
}

function imprimirVigencia(){
	var pos;
	TraceMonedero+=" Inicia la impresion de la Vigencia \n";
	objPreview.setFont('Verdana',7,true);
	objPreview.PrintLine(' ');
	var fechaActivacion = ValidaTag(DatosMonedero.getElementsByTagName('FechaActivacion'));
	pos=objPreview.CurrentY;
	objPreview.PrintLine(' Activar Antes de: ');
	objPreview.setFont('Verdana',7,false);
	objPreview.PrintLine(' '+fechaActivacion,pos,1400);
	objPreview.PrintLine(' ');
	TraceMonedero+=" Fin de la impresion de la Vigencia \n";
}

function imprimirPieMonedero(){
	TraceMonedero+=" Inicia la impresion del Pie del monedero \n";
	objPreview.setFont('Verdana',6,false);
	objPreview.PrintLine(' *No hay cancelaciones de una venta por lo que no aplica ');
	objPreview.PrintLine('  devolucion de dinero. ');
	objPreview.PrintLine(' *VALIDO POR LAS SIGUIENTES 48 HORAS. ');
	objPreview.PrintLine(' *Cancelacion o cambio siempre y cuando no se haya ');
	objPreview.PrintLine('  realizado la activacion del monedero.');
	TraceMonedero+=" Fin de la impresion del Pie del monedero \n";
}
