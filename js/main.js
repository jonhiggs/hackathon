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
    _session_data: {},
    _pokemon: [],
    
    __init__: function() {
        params = get_url_parameters()
        this._session_data['scanned_pokemon'] = params['scanned_pokemon'];
        
        token = cookie.get('poke_token')
        user_data = backend.call('start_session', {'token': token});
        
        cookie.set('poke_token', user_data['token']);
        
        /*if(user_data['pokemon'].length == 0) {
            this.phase_select_pokemon();
        } else {
            this.start_battle();
        }*/
        
        this.phase_select_pokemon();
        //this.start_battle();
    },
    
    phase_select_pokemon: function() {
        html = this.load_template('select_pokemon');
        
        $('#main_body').html(html);
    },
    
    select_pokemon: function(name) {
        backend.call('create_pokemen', {
            'token':this._session_data['token'],
            'pokemon_name': name
        })
        
        html = this.load_template('pokemon_selected');
        html = html.replace('{{pokemon_name}}', name);
        $('#main_body').html(html);
    },
    
    start_battle: function() {
        html = this.load_template('battle_stage');
        
        $('#main_body').html(html);
    },
    
    load_template: function(name) {
        return _ajax_get('templates/' + name + '.html');
    }
}