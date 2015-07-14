var esDobleClick = false;
			
function deshabilitarDobleClick() {
	if(!esDobleClick) {
		esDobleClick = true;
		return true;
	}
	else {
		event.returnValue = false;
		form.onSubmit = false;
		return false;
	}
}

