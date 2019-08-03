var objPeople = [
	{ // Object @ 0 index
		email: "buyer@gmail.com",
		pass: "ashraf"
	},
	{ // Object @ 1 index
		email: "seller@gmail.com",
		pass: "ali"
	},
	{ // Object @ 2 index
		email: "validator@gmail.com",
		pass: "patel"
	}

]

function buyer(form) {
			if (form.email.value=="buyer@gmail.com") { 
			if (form.pass.value=="buyer") {              
			location="buyertransaction.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}
function seller(form) {
			if (form.email.value=="seller@gmail.com") { 
			if (form.pass.value=="seller") {              
			location="sellertransaction.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}
function validator(form) {
			if (form.email.value=="KDA@gmail.com") { 
			if (form.pass.value=="kda") {              
			location="validatortransaction.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}