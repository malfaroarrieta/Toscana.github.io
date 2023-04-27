/*
	Survey Form Validation
	04/26/2023
	Michael Alfaro
 */

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear survey?')) {
		// Ensure all error fields are hidden
		hideAllErrors();

		// Set focus to the first text field on the page
		document.getElementById("fname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}


/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {

	let errorFlag = false;

	let requiredFields = ["fname", "phonenum", "email"];

	for (let i = 0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i]+"_error").style.display = "block";
			if(!errorFlag){
				textField.focus();
				textField.select();
			}
			errorFlag = true;
		}

		let regex = new RegExp(/^\d{10}$/);
		let phonenumValue = document.getElementById("phonenum").value;

		if(!regex.test(phonenumValue)){
			document.getElementById("phonenum_error").style.display = "block";
			if(!errorFlag){
				document.getElementById("phonenum").focus();
				document.getElementById("phonenum").select();
				errorFlag = true;
			}
		}

		let emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
		let emailValue = document.getElementById("email").value;

		if(!emailRegex.test(emailValue)){
			document.getElementById("email_error").style.display = "block";
			if(!errorFlag){
				document.getElementById("email").focus();
				document.getElementById("email").select();
				errorFlag = true;
			}
		}


	}

	// Code above here
	return errorFlag;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() {
	/*
	// Get an array of the error fields
	let errorFields = document.getElementsByClassName("error");
	for(let i=0; i<errorFields.length; i++){
		errorFields[i].style.display = "none";
	}
	*/

	let errTags = document.getElementsByClassName("error");
	for(let i = 0; i < errTags.length; i++){
		errTags[i].style.display = "none";
	}
}



/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/** 
 * Removes white space from a string value.
 * 
 * Return A string with leading and triling white-space removed.
 * */

function trim(str){
	    return str.replace(/^\s+|\s+$/g, "");
	}


/**
 * Handles the load event of the document.
 */
function load() {
	// Add event listener for the form submit
	document.getElementById("survey_form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	// This is done to ensure the radio buttons are unchecked when the page is refreshed
	// This line of code must be done before attaching the event listener for the customer reset
	document.getElementById("survey_form").reset();

	// Add event listener for our custom form submit function
	document.getElementById("survey_form").addEventListener("reset", resetForm);

	// Add event listeners for the radio buttons

}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);