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

var _pokemans = {1: "Bulbasaur", 2: "Ivysaur", 3: "Venusaur", 4: "Charmander", 5: "Charmeleon", 6: "Charizard", 7: "Squirtle", 8: "Wartortle", 9: "Blastoise", 10: "Caterpie", 11: "Metapod", 12: "Butterfree", 13: "Weedle", 14: "Kakuna", 15: "Beedrill", 16: "Pidgey", 17: "Pidgeotto", 18: "Pidgeot", 19: "Rattata", 20: "Raticate", 21: "Spearow", 22: "Fearow", 23: "Ekans", 24: "Arbok", 25: "Pikachu", 26: "Raichu", 27: "Sandshrew", 28: "Sandslash", 29: "Nidoran♀", 30: "Nidorina", 31: "Nidoqueen", 32: "Nidoran♂", 33: "Nidorino", 34: "Nidoking", 35: "Clefairy", 36: "Clefable", 37: "Vulpix", 38: "Ninetales", 39: "Jigglypuff", 40: "Wigglytuff", 41: "Zubat", 42: "Golbat", 43: "Oddish", 44: "Gloom", 45: "Vileplume", 46: "Paras", 47: "Parasect", 48: "Venonat", 49: "Venomoth", 50: "Diglett", 51: "Dugtrio", 52: "Meowth", 53: "Persian", 54: "Psyduck", 55: "Golduck", 56: "Mankey", 57: "Primeape", 58: "Growlithe", 59: "Arcanine", 60: "Poliwag", 61: "Poliwhirl", 62: "Poliwrath", 63: "Abra", 64: "Kadabra", 65: "Alakazam", 66: "Machop", 67: "Machoke", 68: "Machamp", 69: "Bellsprout", 70: "Weepinbell", 71: "Victreebel", 72: "Tentacool", 73: "Tentacruel", 74: "Geodude", 75: "Graveler", 76: "Golem", 77: "Ponyta", 78: "Rapidash", 79: "Slowpoke", 80: "Slowbro", 81: "Magnemite", 82: "Magneton", 83: "Farfetch'd", 84: "Doduo", 85: "Dodrio", 86: "Seel", 87: "Dewgong", 88: "Grimer", 89: "Muk", 90: "Shellder", 91: "Cloyster", 92: "Gastly", 93: "Haunter", 94: "Gengar", 95: "Onix", 96: "Drowzee", 97: "Hypno", 98: "Krabby", 99: "Kingler", 100: "Voltorb", 101: "Electrode", 102: "Exeggcute", 103: "Exeggutor", 104: "Cubone", 105: "Marowak", 106: "Hitmonlee", 107: "Hitmonchan", 108: "Lickitung", 109: "Koffing", 110: "Weezing", 111: "Rhyhorn", 112: "Rhydon", 113: "Chansey", 114: "Tangela", 115: "Kangaskhan", 116: "Horsea", 117: "Seadra", 118: "Goldeen", 119: "Seaking", 120: "Staryu", 121: "Starmie", 122: "Mr.", 123: "Scyther", 124: "Jynx", 125: "Electabuzz", 126: "Magmar", 127: "Pinsir", 128: "Tauros", 129: "Magikarp", 130: "Gyarados", 131: "Lapras", 132: "Ditto", 133: "Eevee", 134: "Vaporeon", 135: "Jolteon", 136: "Flareon", 137: "Porygon", 138: "Omanyte", 139: "Omastar", 140: "Kabuto", 141: "Kabutops", 142: "Aerodactyl", 143: "Snorlax", 144: "Articuno", 145: "Zapdos", 146: "Moltres", 147: "Dratini", 148: "Dragonair", 149: "Dragonite", 150: "Mewtwo", 151: "Mew"};

var _reversed_pokemans = {'pikachu': 25, 'bulbasaur': 1, 'charmander': 4, 'squirtle': 7}

var main = {
    _session_data: {},
    _pokemon: [],
    
    __init__: function() {
        params = get_url_parameters()
        this._session_data['scanned_pokemon'] = params['scanned_pokemon'];
        this._session_data['scanned_pokemon_id'] = _reversed_pokemans[params['scanned_pokemon']];
        
        token = cookie.get('poke_token')
        //user_data = backend.call('start_session', {'token': token});
        
        //cookie.set('poke_token', user_data['token']);
        
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
        //backend.call('create_pokemon', {
         //   'token':this._session_data['token'],
          //  'pokemon_name': name
        //});
        
        //pokemon_list = backend.call('session_start', {'token': this._session_data['token']});
        
        this._session_data['selected_pokemon'] = name;
        this._session_data['selected_pokemon_id'] = _reversed_pokemans[name];
        
        html = this.load_template('pokemon_selected');
        html = html.replace('{{pokemon_name}}', name);
        $('#main_body').html(html);
    },
    
    start_battle: function() {
        html = this.load_template('battle_stage');
        
        enemy_image_path = 'img/pokemans/0' + this._session_data['scanned_pokemon_id'] + '.gif';
        html = html.replace('{{enemy_pokemon_image}}', enemy_image_path);
        
        bla_id = 'b00'+this._session_data['selected_pokemon_id'];
        friendly_image_path = 'img/pokemans/'+ bla_id + '.gif';
        html = html.replace('{{friendly_pokemon_image}}', friendly_image_path);
        
        $('#main_body').html(html);
    },
    
    battle_attack_pokemon: function() {
        $("#friendly_pokemon").animate({ marginLeft: "+=170px", marginTop: "-=100px"}, {
            duration: 500,
            complete: function () {
                $("#friendly_pokemon").animate({ marginLeft: "-=170px", marginTop: "+=100px" },
                {
                    duration: 500,
                    complete: function ()
                    {
                        //animatethis(targetElement, speed);
                    }
                });
            }
        });
    },
    
    load_template: function(name) {
        return _ajax_get('templates/' + name + '.html');
    }
}