var objPeople = [
	{ // Object @ 0 index
		email: "abtahajashraf@gmail.com",
		pwd: "ashraf"
	},
	{ // Object @ 1 index
		email: "alimoon@gmail.com",
		pwd: "ali"
	},
	{ // Object @ 2 index
		email: "patel@gmail.com",
		pwd: "patel"
	}

]

function buyerlogin() {
	var email = document.getElementById('email').value;
	var pwd = document.getElementById('pwd').value;

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches email and pwd of a current index of the objPeople array
		if(email == objPeople[i].email && pwd == objPeople[i].pwd) {
            
            window.location = "userindex.html";
            // stop the function if this is found to be true
			return
		}
    }
    alert("Incorrect Email or Password!");
}

function sellerlogin() {
	var email = document.getElementById('email').value;
	var pwd = document.getElementById('pwd').value;

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches email and pwd of a current index of the objPeople array
		if(email == objPeople[i].email && pwd == objPeople[i].pwd) {
            
            window.location = "userindex.html";
            // stop the function if this is found to be true
			return
		}
    }
    alert("Incorrect Email or Password!");
}

function validatorlogin() {
	var email = document.getElementById('email').value;
	var pwd = document.getElementById('pwd').value;

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches email and pwd of a current index of the objPeople array
		if(email == objPeople[i].email && pwd == objPeople[i].pwd) {
            
            window.location = "userindex.html";
            // stop the function if this is found to be true
			return
		}
    }
    alert("Incorrect Email or Password!");
}