// Your JavaScript goes here...
function parse() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			var text = JSON.parse(request.responseText);
	      	document.getElementById("messages").innerHTML = text[0]['content'] + " " + 
	        text[0]['username'] + "<br />" +  "<br />" + text[1]['content'] + " " + 
	        text[1]['username'];
			}	
	};
	request.open("GET", "data.json", true);
	//request.open("GET", "https://messagehub.herokuapp.com/messages.json", true);
	request.send();
};