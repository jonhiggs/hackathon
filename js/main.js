var _ajax_get = function(url) {
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",url,false);
		xmlhttp.send(null);
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open("GET",url,false);
		// Do not send null for ActiveX
		xmlhttp.send();
	}
	
	return xmlhttp.responseText;
}

function get_url_parameters() {
    params = window.location.search;
    parts1 = params.split('?')
    parts2 = parts1[1].split('&');
    
    fdsa = {}
    for(el in parts2) {
        wut = parts2[el].split('=');
        fdsa[wut[0]] = wut[1];
    }
    
    return fdsa
}

var backend = {
    call: function(method, args) {
        return _ajax_get('lib/'+method+'.php?' + $.param(args));
    }
}

String.prototype.pad = function(len, pad_char) {
	diff = len - this.length;
	if(diff > 0) { for(i=0;i<diff;i++) { this.concat(pad_char); } }
	return this.toString();
}

var main = {
    __init__: function() {
        result = backend.call('test', get_url_parameters())
        $('#main_body').html(result);
    }
}