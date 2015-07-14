function MostrarActivadorArmados(empleado, estaciontrabajo, pais, tienda) 
{
    $(document).ready(function () {
        $('#__PageaplicarSurtimiento_aplicar').click(function (event) {

            var waitDialog0 = new WaitDialog('dialogContainer0', 'imgSlides0', 'waitDialog0', theImages0, 50);
            waitDialog0.Show();

            var elementos = document.forms[0].elements;
            var serie;

            for (var i = 0; i < elementos.length; i++) {
                if (elementos[i].type == 'select-one') {
                    serie = elementos[i].value;
                    break;
                }
            }
            if (serie.length != 17)
                return;

            $.ajax({
                type: "POST",
                cache: false,
                contentType: "application/json; charset=utf-8",
                url: "CtrlpSurtimiento.aspx/VentanaArmadosActivados",
                data: "{serie: '" + serie + "', empleado: '" + empleado + "', estaciontrabajo: '" + estaciontrabajo + "', pais: '" + pais + "', tienda: '" + tienda + "'}",
                dataType: "json",
                async: false,
                success: function (data) {
                    var server_response = data.d;
                    if (!server_response) {
                        window.showModalDialog('/ElektraFront/ActivadosArmados/ActivadosArmados.aspx?serie=' + serie, window, 'status:no;dialogWidth:950px;dialogHeight:625px;dialogHide:false;help:no;scroll:no;');
                    }
                },
                error: function (result) {
                    alert("ERROR " + result.status + ' ' + result.statusText);
                }
            });
        });
    });
}

function BorrarCombo(combo){
    if(combo.options.length != 0){
		if (combo.options.selectedIndex == IndiceaEditar){
			combo.options[combo.options.selectedIndex].text = '';
			combo.options[combo.options.selectedIndex].value = '';
		}
    }
  }

  function CaracterPresionado(e){
    keycode = e.keyCode;
    if((keycode==8)||(keycode==127)){
		caracter="backspace"
    }else if((keycode==46)){
		caracter="delete"
    }else{
		caracter=String.fromCharCode(keycode);
    }
    return caracter;
  }

  function TieneOpciones(combo){
    if(IndiceaEditar>(combo.options.length-1)){
	    alert("No se puede convertir editable el ComboBox");
    	return false;
    }
  }

  var IndiceaEditar = 0;
  var TextoaMostrar = "--- INGRESAR N° DE SERIE ---";
  var IndiceAnterior = 0;
  // Contiene el indice anterior seleccionado, el default es 0
  var IndiceAnterior = 0;
  // Contiene el indice seleccionado actualmente
  var TipoEdicion = 'AUTO_SYSTEM';
 
  /*Funciones para editar el combobox*/
  function CambiarManejador(combo){
    TieneOpciones(combo);

    IndiceAnterior = IndiceAnterior;
    // Contiene el indice seleccionado anteriormente

    IndiceAnterior = combo.options.selectedIndex;
    // Contiene el indice actual

    if ((IndiceAnterior == (IndiceaEditar)) && (IndiceAnterior != (IndiceaEditar))&&(TipoEdicion != 'MANUAL_CLICK')){
      combo[(IndiceaEditar)].selected=true;
      IndiceAnterior = IndiceAnterior;
      IndiceAnterior = combo.options.selectedIndex;
      TipoEdicion = 'MANUAL_CLICK';
    }
  }

  function KeyUpManejador(combo, e){
    TieneOpciones(combo);
  }