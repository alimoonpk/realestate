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
			location="buyerindex.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}
function seller(form) {
			if (form.email.value=="seller@gmail.com") { 
			if (form.pass.value=="seller") {              
			location="sellerindex.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}
function validator(form) {
			if (form.email.value=="validator@gmail.com") { 
			if (form.pass.value=="validator") {              
			location="validatorindex.html" 
			} else {
			alert("Invalid Password")
			}
			} else {  alert("Invalid UserID")
			}
			}