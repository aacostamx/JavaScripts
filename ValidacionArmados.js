//Variables utilizadas
var xmlDoc   = new ActiveXObject("Microsoft.XMLDOM");
var objPreview = new ActiveXObject("ADNPrintPreview.ADNPPreview");

xmlDoc.async = 'false';	
var eCentrado= 2;
var eDerecha = 3;
var eIzquierda = 0;
var posicion;

function AsignaTaller(serie, noTaller, id, sku) {
	var btn = "btn".concat(serie.toString());
    var cmb = "Combo" + serie;

    try {
        var obj = document.getElementById(cmb);

        if (obj.selectedIndex == -1) {
            alert("Favor de seleccionar un Taller");
        }
        var NuevoTaller = document.getElementById(cmb)[obj.selectedIndex].title;
        document.getElementById("Combo" + serie).disabled = true;

		$.ajax({
			type: "POST",
			cache: false,
			contentType: "application/json; charset=utf-8",
			url: "ActivadosArmados.aspx/AsignaTaller",
			data: "{noSerie: '" + serie + "', noTaller: '" + NuevoTaller + "', id: '" + id +  "', sku: '" + sku +  "'}",
			dataType: "json",
			async: false,
			success: function (data) {
				var server_response = data.d;
				if (server_response) {
					alert("Se ha asignado el taller: " + NuevoTaller);
				}
				else {
					alert("No fue posible asignar el taller, favor de intentarlo de nuevo");
				}
			},
			error: function (result) {
				alert("ERROR " + result.status + ' ' + result.statusText);
			}
		});

        document.getElementById(btn).style.visibility = "hidden";
        window.location.reload();
    }
    catch (e) {
        alert(e.message);
    }
}

function CerrarTaller(serie, noTaller, sku, consecutivo, nCheckBox, nomEncargado, fSolicitud, noTienda, tiempoRes, estatusITK, modelo) 
{
	var arr = [];
	var comentario;
	var subItemsPV = ""; //subItemId Puntos Verificacion
	var checkbox;
	var txtArea = "txtarea" + serie;
	var btn = "btn".concat(serie.toString());
	var cmb = "Combo" + serie;
	var obj = document.getElementById(cmb);
	
	try {
		//obtiene el valor de los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			arr[i] = "ckbox"+ serie + "_" + i
			
			checkbox = document.getElementById(arr[i]).checked;
			
			if(checkbox)
			{
				if(subItemsPV === "")
					subItemsPV = subItemsPV + document.getElementById(arr[i]).getAttribute('name');
				else
					subItemsPV = subItemsPV + '-' +document.getElementById(arr[i]).getAttribute('name');
			}
			else
			{
				alert("Favor de seleccionar todos los puntos de verificación");
				return;
			}
		}
		
		//obtieen el valor del text arae
		comentario = document.getElementById(txtArea).value;
		
		//revisa si el string tiene algun valor, si no se le asinga un comentario default
		if (!comentario) {
			comentario = "";
		}

        var tmpTaller = document.getElementById(cmb)[obj.selectedIndex].title;

		$.ajax({
			type: "POST",
			cache: false,
			contentType: "application/json; charset=utf-8",
			url: "ActivadosArmados.aspx/CerrarTaller",
			data: "{noSerie: '" + serie + "', noTaller: '" + tmpTaller + "', sku: '" + sku + "', consecutivo: '" + consecutivo + "', subItemId: '" + subItemsPV + "', comentario: '" + comentario  + "'}",
			dataType: "json",
			async: false,
			success: function (data) {
				var server_response = data.d;
				if (server_response) {
					alert("Se ha cerrado la orden de armado con el taller: " + tmpTaller);
				}
				else {
					alert("No fue posible cerrar la orden de armado con el taller: " + tmpTaller + ", favor de intentarlo de nuevo");
				}
			},
			error: function (result) {
				alert("ERROR " + result.status + ' ' + result.statusText);
			}
		});

		//deshabilita los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			document.getElementById(arr[i]).disabled = true;
		}
		
		if (confirm('¿Desea imprimir el ticket del armado?'))
			ImprimeTicket(tmpTaller,nomEncargado,fSolicitud,consecutivo,noTienda,tiempoRes,estatusITK,sku,modelo,serie);
	
		//deshabilita el textarea y el boton
		document.getElementById(txtArea).disabled = true;
		document.getElementById(btn).style.visibility = "hidden";
		location.reload();
	}
	catch (e) {
        alert(e.message);
    }	
}

function RangoSolicitudes() {
    var inputFrom = document.getElementById("from").value;
    var inputTo = document.getElementById("to").value;

    try {
        if (inputFrom == "" || inputTo == "") {
            alert("Por favor no olvides seleccionar la fecha");
        }
        else {
            Anthem_InvokePageMethod('RangoSolicitudes', [inputFrom, inputTo], function (result) {
                window.location.reload();  
            });
        }
    }
    catch (e) {
        alert(e.toString());
    }
}

function CerrarOrdenBodega(serie, noTaller, sku, consecutivo, nCheckBox) {
	var obj;
	var arr = [];
	var comentario;
	var NuevoTaller;
	var subItemsPV = ""; //subItemId Puntos Verificacion
	var checkbox;
    var cmb = "Combo" + serie;	
	var txtArea = "txtarea" + serie;
	var btn = "btn".concat(serie.toString());
	
	try {
		//objecto combobox
		obj = document.getElementById(cmb);

		//valdia que se haya seleccionado un taller
        if (obj.selectedIndex == -1) {
            alert("Favor de seleccionar un Taller");
        }
        
		//Obtiene el numero del taller y deshabilita el combobox  y el textarea
		NuevoTaller = document.getElementById(cmb)[obj.selectedIndex].title;
		
		//obtiene el valor de los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			arr[i] = "ckbox"+ serie + "_" + i
			
			checkbox = document.getElementById(arr[i]).checked;
			
			if(checkbox)
			{
				if(subItemsPV === "")
					subItemsPV = subItemsPV + document.getElementById(arr[i]).getAttribute('name');
				else
					subItemsPV = subItemsPV + '-' +document.getElementById(arr[i]).getAttribute('name');
			}
			else
			{
				alert("Favor de seleccionar todos los puntos de verificación");
				return;
			}
			
		}
		
		//obtieen el valor del text area
		comentario = document.getElementById(txtArea).value;
		
		//revisa si el string tiene algun valor, si no se le asinga un comentario default
		if (!comentario) {
			comentario = "";
		}
		
		$.ajax({
			type: "POST",
			cache: false,
			contentType: "application/json; charset=utf-8",
			url: "ActivadosArmados.aspx/CerrarTallerBodega",
			data: "{noSerie: '" + serie + "', noTaller: '" + NuevoTaller + "', sku: '" + sku + "', consecutivo: '" + consecutivo + "', subItemId: '" + subItemsPV + "', comentario: '" + comentario  + "'}",
			dataType: "json",
			async: false,
			success: function (data) {
				var server_response = data.d;
				if (server_response) {
					alert("Se ha cerrado la orden de armado con el taller: " + NuevoTaller);
				}
				else {
					alert("No fue posible cerrar la orden de armado con el taller: " + NuevoTaller + ", favor de intentarlo de nuevo");
				}
			},
			error: function (result) {
				alert("ERROR " + result.status + ' ' + result.statusText);
			}
		});	
		
		//deshabilita los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			document.getElementById(arr[i]).disabled = true;
		}
			
		//deshabilita el combobox, el textarea y el boton
		document.getElementById("Combo" + serie).disabled = true;	
		document.getElementById(txtArea).disabled = true; 
		document.getElementById(btn).style.visibility = "hidden";
		
		window.close();
	}    
	catch (e) {
        alert(e.message);
    }
}

function CerrarOrdenPorSerie(serie, noTaller, sku, consecutivo, nCheckBox) {
	var obj;
	var arr = [];
	var comentario;
	var NuevoTaller;
	var subItemsPV = ""; //subItemId Puntos Verificacion
	var checkbox;
    var cmb = "Combo" + serie;	
	var txtArea = "txtarea" + serie;
	var btn = "btn".concat(serie.toString());
	
	try {
		//objecto combobox
		obj = document.getElementById(cmb);

		//valdia que se haya seleccionado un taller
        if (obj.selectedIndex == -1) {
            alert("Favor de seleccionar un taller");
        }
        
		//Obtiene el numero del taller y deshabilita el combobox  y el textarea
		NuevoTaller = document.getElementById(cmb)[obj.selectedIndex].title;
		
		//obtiene el valor de los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			arr[i] = "ckbox"+ serie + "_" + i
			
			checkbox = document.getElementById(arr[i]).checked;
			
			if(checkbox)
			{
				if(subItemsPV === "")
					subItemsPV = subItemsPV + document.getElementById(arr[i]).getAttribute('name');
				else
					subItemsPV = subItemsPV + '-' +document.getElementById(arr[i]).getAttribute('name');
			}
			else
			{
				alert("Favor de seleccionar todos los puntos de verificación");
				return;
			}
			
		}
		
		//obtieen el valor del text area
		comentario = document.getElementById(txtArea).value;
		
		//revisa si el string tiene algun valor, si no se le asinga un comentario default
		if (!comentario) {
			comentario = "";
		}
		
		$.ajax({
			type: "POST",
			cache: false,
			contentType: "application/json; charset=utf-8",
			url: "ActivadosArmados.aspx/CerrarTaller",
			data: "{noSerie: '" + serie + "', noTaller: '" + NuevoTaller + "', sku: '" + sku + "', consecutivo: '" + consecutivo + "', subItemId: '" + subItemsPV + "', comentario: '" + comentario  + "'}",
			dataType: "json",
			async: false,
			success: function (data) {
				var server_response = data.d;
				if (server_response) {
					alert("Se ha cerrado la orden de armado con el taller: " + NuevoTaller);
				}
				else {
					alert("No fue posible cerrar la orden de armado con el taller: " + NuevoTaller + ", favor de intentarlo de nuevo");
				}
			},
			error: function (result) {
				alert("ERROR " + result.status + ' ' + result.statusText);
			}
		});	
		
		//deshabilita los checkboxes
		for (var i = 0; i < nCheckBox; i++) {
			document.getElementById(arr[i]).disabled = true;
		}
			
		//deshabilita el combobox, el textarea y el boton
		document.getElementById("Combo" + serie).disabled = true;	
		document.getElementById(txtArea).disabled = true; 
		document.getElementById(btn).style.visibility = "hidden";
		
		window.close();
	}    
	catch (e) {
        alert(e.message);
    }
}

function ImprimeTicket(nomTaller, nomEncargado, fecha, noFolio, noTienda, tiempoRespuesta, estatusITK, modelo, descripcion, serie) {
	objPreview.Inicializar();
    objPreview.EstablecerImpresoraDefault("TCK");
	ImprimeTicketArmado(nomTaller, nomEncargado, fecha, noFolio, noTienda, tiempoRespuesta, estatusITK, modelo, descripcion, serie);
	objPreview.Imprimir(); 
}
function ImprimeTicketArmado(nomTaller, nomEncargado, fecha, noFolio, noTienda, tiempoRespuesta, estatusITK, modelo, descripcion, serie)
{  
	posicion=17;
	objPreview.PrintPict('K:\\Bmp\\logoItalika.jpg', 1200, posicion, 3.2, 0.8);
	posicion = posicion + 50;
		
	objPreview.SetFont('Arial',9,true);
	objPreview.PrintLine('Comprobante de Armado de Italika'+ '  ',posicion,500,eCentrado);
	posicion = posicion + 23;
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Centro de Servicio Italika'+ '  ',posicion,500,eCentrado);	
	posicion = posicion + 17;	
		
	objPreview.SetFont('Arial',5,true);	
	objPreview.PrintLine('' + nomTaller +'   ',posicion,500,eCentrado);	
	posicion = posicion + 17;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine(''+ nomEncargado + '  ',posicion,500,eCentrado);	
	posicion = posicion + 29;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Fecha:		' + fecha+ '  ',posicion,500,eIzquierda);	
	posicion = posicion + 14;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Folio:		'+ noFolio+'   '+ '    ',posicion,500,eIzquierda);	
	posicion = posicion + 14;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Tienda:		'+ noTienda+'  '+ '    ',posicion,500,eIzquierda);	
	posicion = posicion + 29;
	
	objPreview.SetFont('Arial',9,false);
	objPreview.PrintLine('Tiempo de Respuesta',posicion,500,eCentrado);
	posicion = posicion + 17;	
	
	objPreview.SetFont('Arial',7,true);
	objPreview.PrintLine(tiempoRespuesta + ' Horas'+'        ',posicion,500,eCentrado);
	posicion = posicion + 17;
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine(estatusITK +'  ',posicion,500,eIzquierda);
	posicion = posicion + 29;
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Modelo:	'+ modelo + '  ',posicion,500,eIzquierda);	
	posicion = posicion + 14;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Descripción:	'+ descripcion + '  ',posicion,500,eIzquierda);	
	posicion = posicion + 14;	
	
	objPreview.SetFont('Arial',7,false);
	objPreview.PrintLine('Serie:		'+ serie +'  ',posicion,500,eIzquierda);	
	posicion = posicion + 43;

	posicion = posicion - 14;
	objPreview.PrintLine('_____________________',posicion,500,eCentrado);
	posicion = posicion + 14;
	
	objPreview.SetFont('Arial',8,false);
	objPreview.PrintLine('Firma del responsable',posicion,500,eCentrado);	
	posicion = posicion + 29;

	objPreview.SetFont('Arial',5,false);
	objPreview.PrintLine('Nota: Tienes 24 horas para cualquier aclaración.',posicion,500,eIzquierda);
}

function validarMaxLengthAlfanumerico(e, Control, maxlength) {
    Mayusculas();
    if (Control.value.length > maxlength) {
        Control.value = Control.value.substring(0, maxlength);
    }
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[a-zA-Z0-9Ã±Ã‘Ã¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ¼Ãœ ]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function Mayusculas() {
    var serie = document.getElementById("txtNoSerie");
    serie.value = serie.value.toUpperCase();

    return true;
}

function reemplazarCaracteresInvalidos(e, control, tipo) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    switch (tipo) {
        case 'alfanumerico':
            patron = /[^a-zA-Z0-9Ã±Ã‘ ]/g;
            break;
        case 'alfabetico':
            patron = /[^a-zA-ZÃ±Ã‘ ]/g;
            break;
        case 'numerico':
            patron = /[^0-9]/g;
            break;
    }
    valor = control.value.replace(patron, '');
    control.value = valor;
}

function validarNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[0-9]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function validarMaxLengthNumerico(e, Control, maxlength) 
{
    if (Control.value.length > maxlength) {
        Control.value = Control.value.substring(0, maxlength);
    }
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[0-9]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function buscaSerie() {
    var serie;
    serie = document.getElementById('txtNoSerie').value;

    try {

        if (serie.length === 17) {
            $.ajax({
                type: "POST",
                cache: false,
                contentType: "application/json; charset=utf-8",
                url: "ActivadosArmados.aspx/BuscaSerieArmado",
                data: "{noSerie: '" + serie + "'}",
                dataType: "json",
                async: false,
                success: function (data) {
                    var server_response = data.d;
                    if (server_response) {
                       window.showModalDialog('/ElektraFront/ActivadosArmados/ActivadosArmados.aspx?serie=' + serie + '&eliminar=1' , window, 'status:no;dialogWidth:950px;dialogHeight:625px;dialogHide:false;help:no;scroll:no;'); 
                    }
                    else {
                        alert("La serie: " + serie + " no se encuentra en el sistema, favor de generar armado");
                    }
                },
                error: function (result) {
                    alert("ERROR " + result.status + ' ' + result.statusText);
                }
            });
        }
        else {
            alert("Número de serie no válido");
        }
    }
    catch (e) {
        alert(e.message);
    }
}

function generaArmado() {
    var serie, SKU;
    serie = document.getElementById('txtNoSerie').value;
    SKU = document.getElementById('txtSKU').value;

    if (serie.length === 17 && SKU.length > 0) {
        $.ajax({
            type: "POST",
            cache: false,
            contentType: "application/json; charset=utf-8",
            url: "ActivadosArmados.aspx/InsertaArmado",
            data: "{serie: '" + serie + "', sku: '" + SKU + "'}",
            dataType: "json",
            async: false,
            success: function (data) {
                var server_response = data.d;
                if (server_response) {
                    window.showModalDialog('/ElektraFront/ActivadosArmados/ActivadosArmados.aspx?serie=' + serie, window, 'status:no;dialogWidth:950px;dialogHeight:625px;dialogHide:false;help:no;scroll:no;');
                }
                else {
                    alert("La orden de armado no ha sido generada favor de intentarlo de nuevo");
                }
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
    }
    else {
        alert("Favor de ingresar la serie y el SKU");
    }
}

function generaArmado(sku, serie) {

    if (confirm('¿Desea generar la solicitud?')) {
        
        var serie, SKU;
        serie = document.getElementById('txtNoSerie').value;
        SKU = document.getElementById('txtSKU').value;

        if (serie.length === 17 && SKU.length > 0) {
            $.ajax({
                type: "POST",
                cache: false,
                contentType: "application/json; charset=utf-8",
                url: "ActivadosArmados.aspx/InsertaArmado",
                data: "{serie: '" + serie + "', sku: '" + SKU + "'}",
                dataType: "json",
                async: false,
                success: function (data) {
                    var server_response = data.d;
                    if (server_response) {
                        window.showModalDialog('/ElektraFront/ActivadosArmados/ActivadosArmados.aspx?serie=' + serie, window, 'status:no;dialogWidth:950px;dialogHeight:625px;dialogHide:false;help:no;scroll:no;');
                    }
                    else {
                        alert("La orden de armado no ha sido generada favor de intentarlo de nuevo");
                    }
                },
                error: function (result) {
                    alert("ERROR " + result.status + ' ' + result.statusText);
                }
            });
        }
        else {
            alert("Favor de ingresar la serie y el SKU");
        }
    }

    
}

function eliminaSolicitud(serie, sku,taller,momento)
{
	   if (confirm('¿Estás seguro que deseas eliminar la orden de armado?')) 
	    {
	        try {
	            $.ajax({
	                type: "POST",
	                cache: false,
	                contentType: "application/json; charset=utf-8",
	                url: "ActivadosArmados.aspx/QuitarSolicitud",
	                data: "{serie: '" + serie + "', taller: '" + taller + "', sku: '"+sku+"'}",
	                dataType: "json",
	                async: false,
	                success: function (data) {
	                    var server_response = data.d;
	                    if (server_response) {
	                        alert("La orden de armado ha sido eliminada");
	                    }
	                    else {
	                        alert("La orden de armado no ha sido eliminada favor de intentarlo de nuevo");
	                    }
	                },
	                error: function (result) {
	                    alert("ERROR " + result.status + ' ' + result.statusText);
	                }
	            });
		    }
		    catch (e)
            {
			    alert(e);
			}
			if (momento == 1) {
			    location.reload();
            }
			if (momento == 0) {
			    window.close();
			}

	    }
}

function RegresaHome()
{
	 window.location.href = '/ElektraFront/aspx/ComercializarProductoServicio/Home/CtrlpHomeProductos_ant.aspx';
}

function PortalITK() { }