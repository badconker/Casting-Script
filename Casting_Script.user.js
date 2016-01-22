// ==UserScript==
// @name        Casting Script
// @namespace   Script Mush para los Realities
// @description Script Mush para los Realities (traducido por Javiernh)
// @downloadURL https://github.com/Javiernh/Casting-Script/raw/master/Casting_Script.user.js
// @include	http://mush.twinoid.es/group/*
// @include	http://mush.twinoid.es/g/*
// @version     1.11
// ==/UserScript==

Casting = function() {}
Casting.mm = function() {}
Casting.mm.version = 1.0;
Casting.mm.group = "Les Maîtres Mushiens";
Casting.mm.urlgroup = "http://mush.vg/g/les-maitres-mushiens";
Casting.mm.author = "BSimo (remis au goût du jour par badconker)";
Casting.mm.urlautor = "http://twinoid.com/user/3138322";
Casting.mm.window = window;
Casting.mm.location = "";

Casting.mm.init = function() {
	var url = Casting.mm.window.location.href;
	if(url.split("/").length > 5) Casting.mm.location = url.split("/")[5];
	else Casting.mm.location = "center";

	switch(Casting.mm.location) {
		case "center":
			Casting.mm.center.init();
		break;

		default:
	}
}

Casting.mm.addSlashes = function (text) {
	text = text.replace(/\\/g, "\\\\");
	text = text.replace(/'/g, "\\'");
	return text;
}

Casting.mm.xp_for_shooting = 25;
Casting.mm.center = {};
Casting.mm.center.info = {};
Casting.mm.center.INFO_RANGS = [];
	Casting.mm.center.INFO_RANGS['No operativo'] = [];
		Casting.mm.center.INFO_RANGS['No operativo']['rang'] = 0;
		Casting.mm.center.INFO_RANGS['No operativo']['before'] = "";
		Casting.mm.center.INFO_RANGS['No operativo']['next'] = "Principiante";
		Casting.mm.center.INFO_RANGS['No operativo']['max'] = 32;
		Casting.mm.center.INFO_RANGS['No operativo']['need'] = 32;
		Casting.mm.center.INFO_RANGS['No operativo']['lvlup'] = 50;
		Casting.mm.center.INFO_RANGS['No operativo']['img'] = "no_mush_bar";
		Casting.mm.center.INFO_RANGS['No operativo']['infotext'] = "";
	Casting.mm.center.INFO_RANGS['Principiante'] = [];
		Casting.mm.center.INFO_RANGS['Principiante']['rang'] = 1;
		Casting.mm.center.INFO_RANGS['Principiante']['before'] = "";
		Casting.mm.center.INFO_RANGS['Principiante']['next'] = "Café teatro";
		Casting.mm.center.INFO_RANGS['Principiante']['max'] = 48;
		Casting.mm.center.INFO_RANGS['Principiante']['need'] = 32;
		Casting.mm.center.INFO_RANGS['Principiante']['lvlup'] = 25;
		Casting.mm.center.INFO_RANGS['Principiante']['img'] = "no_mush_bar";
		Casting.mm.center.INFO_RANGS['Principiante']['infotext'] = "Da la opción: Mush escondidos<br/>La capacidad máxima del reality pasa a 48 jugadores.<br/><em>Junto a tu grupo has iniciado una vida de artista. Pero para empezar deberás tocar y pasar tu sombrero en el metro de Pyong Yang.</em>";
	Casting.mm.center.INFO_RANGS['Café teatro'] = [];
		Casting.mm.center.INFO_RANGS['Café teatro']['rang'] = 2;
		Casting.mm.center.INFO_RANGS['Café teatro']['before'] = "Principiante";
		Casting.mm.center.INFO_RANGS['Café teatro']['next'] = "Soldado de fortuna";
		Casting.mm.center.INFO_RANGS['Café teatro']['max'] = 64;
		Casting.mm.center.INFO_RANGS['Café teatro']['need'] = 32;
		Casting.mm.center.INFO_RANGS['Café teatro']['lvlup'] = 125;
		Casting.mm.center.INFO_RANGS['Café teatro']['img'] = "too_slow";
		Casting.mm.center.INFO_RANGS['Café teatro']['infotext'] = "Desbloquea la opción de Ciclo Lento con ciclos de 4h.<br/>La capacidad máxima del reality pasa a 64 jugadores.<br/><em>Ya nadie se duerme en tus películas... porque nadie las ve.</em>";
	Casting.mm.center.INFO_RANGS['Soldado de fortuna'] = [];
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['rang'] = 3;
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['before'] = "Café teatro";
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['next'] = "Grupillo de provincia";
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['max'] = 80;
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['need'] = 32;
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['lvlup'] = 250;
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['img'] = "troopers";
		Casting.mm.center.INFO_RANGS['Soldado de fortuna']['infotext'] = "Desbloquea los guiones del reality<br/>La capacidad máxima del reality pasa a 80 jugadores.<br/><em>¿Ya has convencido a alguien? Es muy difícil, aunque...</em>";
	Casting.mm.center.INFO_RANGS['Grupillo de provincia'] = [];
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['rang'] = 4;
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['before'] = "Soldado de fortuna";
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['next'] = "Bar lounge";
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['max'] = 88;
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['lvlup'] = 400;
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['img'] = "mushruvery";
		Casting.mm.center.INFO_RANGS['Grupillo de provincia']['infotext'] = "¡Desbloquea a Andie y Dereck!<br/>La capacidad máxima del reality pasa a 88 jugadores.<br/><em>Sabes hacer vibrar a la gente en las playas de Neptuno.</em>";
	Casting.mm.center.INFO_RANGS['Bar lounge'] = [];
		Casting.mm.center.INFO_RANGS['Bar lounge']['rang'] = 5;
		Casting.mm.center.INFO_RANGS['Bar lounge']['before'] = "Grupillo de provincia";
		Casting.mm.center.INFO_RANGS['Bar lounge']['next'] = "Pegador de carteles";
		Casting.mm.center.INFO_RANGS['Bar lounge']['max'] = 104;
		Casting.mm.center.INFO_RANGS['Bar lounge']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Bar lounge']['lvlup'] = 600;
		Casting.mm.center.INFO_RANGS['Bar lounge']['img'] = "triple_play";
		Casting.mm.center.INFO_RANGS['Bar lounge']['infotext'] = "Desbloquea la opción Triple Mush<br/>La capacidad máxima del reality pasa a 104 jugadores.<br/><em>Eres capaz de hacer una película sin guión.</em>";
	Casting.mm.center.INFO_RANGS['Pegador de carteles'] = [];
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['rang'] = 6;
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['before'] = "Bar lounge";
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['next'] = "Opera Bufet";
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['max'] = 112;
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['lvlup'] = 850;
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['img'] = "page";
		Casting.mm.center.INFO_RANGS['Pegador de carteles']['infotext'] = "Desbloquea la opción Juego Beta<br/>La capacidad máxima del reality pasa a 112 jugadores.<br/><em>Has comprendido que la publicidad sirve de algo.</em>";
	Casting.mm.center.INFO_RANGS['Opera Bufet'] = [];
		Casting.mm.center.INFO_RANGS['Opera Bufet']['rang'] = 7;
		Casting.mm.center.INFO_RANGS['Opera Bufet']['before'] = "Pegador de carteles";
		Casting.mm.center.INFO_RANGS['Opera Bufet']['next'] = "Duendes de jardín";
		Casting.mm.center.INFO_RANGS['Opera Bufet']['max'] = 128;
		Casting.mm.center.INFO_RANGS['Opera Bufet']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Opera Bufet']['lvlup'] = 1100;
		Casting.mm.center.INFO_RANGS['Opera Bufet']['img'] = "swift_fungus";
		Casting.mm.center.INFO_RANGS['Opera Bufet']['infotext'] = "Desbloquea la opción de Ciclo Rápido con ciclos de 2h.<br/>La capacidad máxima del reality pasa a 128 jugadores.<br/><em>Sabes llevar un espectáculo sin siquiera respirar.</em>";
	Casting.mm.center.INFO_RANGS['Duendes de jardín'] = [];
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['rang'] = 8;
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['before'] = "Opera Bufet";
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['next'] = "Orquesta";
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['max'] = 144;
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['lvlup'] = 1400;
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['img'] = "dream_theater";
		Casting.mm.center.INFO_RANGS['Duendes de jardín']['infotext'] = "Desbloquea la salida manual de las naves para este grupo.<br/>La capacidad máxima del reality pasa a 144 jugadores.<br/><em>Animas muy bien las barbacoas marcianas.</em>";
	Casting.mm.center.INFO_RANGS['Orquesta'] = [];
		Casting.mm.center.INFO_RANGS['Orquesta']['rang'] = 9;
		Casting.mm.center.INFO_RANGS['Orquesta']['before'] = "Duendes de jardín";
		Casting.mm.center.INFO_RANGS['Orquesta']['next'] = "Ballet nacional";
		Casting.mm.center.INFO_RANGS['Orquesta']['max'] = 160;
		Casting.mm.center.INFO_RANGS['Orquesta']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Orquesta']['lvlup'] = 1700;
		Casting.mm.center.INFO_RANGS['Orquesta']['img'] = "beta_phases";
		Casting.mm.center.INFO_RANGS['Orquesta']['infotext'] = "La capacidad máxima del reality pasa a 160 jugadores.<br/><em>Podrías animar las fiestas de amebas en Plutón.</em>";
	Casting.mm.center.INFO_RANGS['Ballet nacional'] = [];
		Casting.mm.center.INFO_RANGS['Ballet nacional']['rang'] = 10;
		Casting.mm.center.INFO_RANGS['Ballet nacional']['before'] = "Orquesta";
		Casting.mm.center.INFO_RANGS['Ballet nacional']['next'] = "Opera";
		Casting.mm.center.INFO_RANGS['Ballet nacional']['max'] = 176;
		Casting.mm.center.INFO_RANGS['Ballet nacional']['need'] = 24;
		Casting.mm.center.INFO_RANGS['Ballet nacional']['lvlup'] = 2050;
		Casting.mm.center.INFO_RANGS['Ballet nacional']['img'] = "sleeping_beauty";
		Casting.mm.center.INFO_RANGS['Ballet nacional']['infotext'] = "Desbloquea la opción Mush Despertando<br/>La capacidad máxima del reality pasa a 176 jugadores.<br/><em>Ya has tenido que rechazar varias giras interplanetarias.</em>";
	Casting.mm.center.INFO_RANGS['Opera'] = [];
		Casting.mm.center.INFO_RANGS['Opera']['rang'] = 11;
		Casting.mm.center.INFO_RANGS['Opera']['before'] = "Ballet nacional";
		Casting.mm.center.INFO_RANGS['Opera']['next'] = "Casa productora";
		Casting.mm.center.INFO_RANGS['Opera']['max'] = 192;
		Casting.mm.center.INFO_RANGS['Opera']['need'] = 16;
		Casting.mm.center.INFO_RANGS['Opera']['lvlup'] = 2400;
		Casting.mm.center.INFO_RANGS['Opera']['img'] = "whos_ugly";
		Casting.mm.center.INFO_RANGS['Opera']['infotext'] = "Desbloquea la opción Juego sin Mush<br/>La capacidad máxima del reality pasa a 192 jugadores.<br/><em>Un show interplanetario en una luna provinciana.</em>";
	Casting.mm.center.INFO_RANGS['Casa productora'] = [];
		Casting.mm.center.INFO_RANGS['Casa productora']['rang'] = 12;
		Casting.mm.center.INFO_RANGS['Casa productora']['before'] = "Opera";
		Casting.mm.center.INFO_RANGS['Casa productora']['next'] = "Agencia de organización de eventos";
		Casting.mm.center.INFO_RANGS['Casa productora']['max'] = 208;
		Casting.mm.center.INFO_RANGS['Casa productora']['need'] = 16;
		Casting.mm.center.INFO_RANGS['Casa productora']['lvlup'] = 2800;
		Casting.mm.center.INFO_RANGS['Casa productora']['img'] = "fight";
		Casting.mm.center.INFO_RANGS['Casa productora']['infotext'] = "La capacidad máxima del reality pasa a 208 jugadores.<br/><em>El gran espectáculo de luz y sonido en preestreno de un rockero milenario excéntrico.</em>";
	Casting.mm.center.INFO_RANGS['Agencia de organización de eventos'] = [];
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['rang'] = 13;
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['before'] = "Casa productora";
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['next'] = "Leyenda";
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['max'] = 224;
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['need'] = 16;
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['lvlup'] = 3200;
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['img'] = "blitz";
		Casting.mm.center.INFO_RANGS['Agencia de organización de eventos']['infotext'] = "Desbloquea la opción de Juego Blitz con ciclos de 1h.<br/>La capacidad máxima del reality pasa a 224 jugadores.<br/><em>¡Actuación en directo, eso es lo que te hace vibrar!</em>";
	Casting.mm.center.INFO_RANGS['Leyenda'] = [];
		Casting.mm.center.INFO_RANGS['Leyenda']['rang'] = 14;
		Casting.mm.center.INFO_RANGS['Leyenda']['before'] = "Agencia de organización de eventos";
		Casting.mm.center.INFO_RANGS['Leyenda']['next'] = "";
		Casting.mm.center.INFO_RANGS['Leyenda']['max'] = 256;
		Casting.mm.center.INFO_RANGS['Leyenda']['need'] = 16;
		Casting.mm.center.INFO_RANGS['Leyenda']['lvlup'] = 0;
		Casting.mm.center.INFO_RANGS['Leyenda']['img'] = "legend";
		Casting.mm.center.INFO_RANGS['Leyenda']['infotext'] = "La capacidad máxima del reality pasa a 256 jugadores.<br/><em>Vuestro espectáculo es excepcional.</em>";
Casting.mm.center.init = function() {
	Casting.mm.center.css();
	Casting.mm.center.recupInfo();
	Casting.mm.center.dispNewInfo();
}

Casting.mm.center.css = function() {
	$("<style>").attr("type", "text/css").html("\
		.floatInfo {\
			float: right;\
			margin: 15px 15px 0px 0px;\
		}\
		.floatText {\
			margin-bottom: 5px;\
		}\
		.floatRejPret {\
			float: right;\
			margin: 0px 15px 15px 0px;\
			position:relative;\
			top:-20px;\
		}\
		.xpcompletion .compframe {\
			width : 280px;\
			height : 33px;\
			background : transparent url(\"/img/design/xp_completion.png\") no-repeat left top;\
			padding-left : 10px;\
			padding-top : 1px;\
			display : inline-block;\
			zoom : 1;\
			*display : inline;\
			vertical-align : top;\
		}\
		.xpcompletion .compText {\
			position: relative;\
			top: -17px;\
			text-align: center;\
			font-size: 8pt;\
		}\
		.xpcompletion .fill {\
			background : transparent url(\"/img/design/xp_completion_fill.png\") no-repeat left top;\
			width : 262px;\
			height : 17px;\
			margin-left : 3px;\
			margin-top : 3px;\
		}\
		.xpcompletion .numb {\
			display : inline-block;\
			zoom : 1;\
			*display : inline;\
			vertical-align : top;\
			font-family : \"Days One\", \"Segoe UI\", \"Lucida Grande\", \"Trebuchet MS\", Arial, \"lucida sans unicode\", sans-serif;\
			font-weight : normal;\
			font-size : 13pt;\
		}\
		.butWidth {\
			margin: auto !important;\
			float: none !important;\
		}\
		.boxTwoWidth {\
			float: left;\
			margin-right: 10px;\
			width: 65%;\
		}\
		.CSnameUnit {\
//			display: inline-block;\
//			zoom: 1;\
//			padding: 4px;\
			min-width: 144px;\
		}\
//		.overContent {\
//    		height: 450px;\
//			overflow-y: scroll;\
//			overflow-x: hidden;\
//		}\
	").appendTo("head");
	$("<link href=\"http://fonts.googleapis.com/css?family=Days+One\" rel=\"stylesheet\" type=\"text/css\">").appendTo("head");
}

Casting.mm.center.recupInfo = function() {
	$("#castingFeed").css({display: "none"});
	$(".twinstyle").each(function(index, data) {
		$(this).attr("name", $(this).find(".cornerright").text().replace(/\t/g, '').replace(/\n/g, ''));
	});
	$bgtablesummar = $('.bgtablesummar');
	$actors = $bgtablesummar.find('.nameUnit');
	$actors.sort(function(a, b){
		return $(a).find('.tid_user').text().toLowerCase().localeCompare( $(b).find('.tid_user').text().toLowerCase() );
	})
	$actors.detach().appendTo($bgtablesummar);

	Casting.mm.center.info.username = $("a[href^=\"http://mush.twinoid.es/u/profile/\"] span").text();
	Casting.mm.center.info.nameGroup = $(".glow").text();
	Casting.mm.center.info.idGroup = $(".groups").attr("data-gid");
	Casting.mm.center.info.effect = $(".nameUnit .tid_user");
	$.each(Casting.mm.center.info.effect, function(index, data) { Casting.mm.center.info.effect[index] = $(this).text().replace(/\t/g, '').replace(/\n/g, ''); });
	Casting.mm.center.info.effectIG = $("img[src=\"/img/icons/ui/in_game.png\"]");
	$.each(Casting.mm.center.info.effectIG, function(index, data) { Casting.mm.center.info.effectIG[index] = $(this).parent().html()});
	Casting.mm.center.info.effectWait = $("img[src=\"/img/icons/ui/not_ready.png\"]");
	$.each(Casting.mm.center.info.effectWait, function(index, data) { Casting.mm.center.info.effectWait[index] = $(this).parent().html()});
	Casting.mm.center.info.effectPret = $("img[src=\"/img/icons/ui/ready.png\"]");
	$.each(Casting.mm.center.info.effectPret, function(index, data) { Casting.mm.center.info.effectPret[index] = $(this).parent().html()});
	Casting.mm.center.info.userInCast = $(".twinstyle[name=\"Inversión\"]").find(".boxContent").children().length > 0;

	Casting.mm.center.info.btnInvest = (Casting.mm.center.info.userInCast) ? $(".twinstyle[name=\"Inversión\"]").find(".boxContent > div").html() : false;
	Casting.mm.center.info.btnRejPret = $(".twinstyle[name=\"Mis acciones\"]").find(".boxContent").html();
	$(".twinstyle").each(function() {
		var name = $(this).find(".cornerright").text().replace(/\t/g, '').replace(/\n/g, '');
		switch(name) {
			case "Estadísticas" :
				Casting.mm.center.info.stats = {};
				$(this).find("li").each(function(index) {
					var text = $(this).text().replace(/\t/g, '').replace(/\n/g, '').split(":")[1];
					switch(index) {
						case 0 : // Rang
							Casting.mm.center.info.stats.rang = text;
						break;
						case 1 : // Réalisateur
							Casting.mm.center.info.stats.realisateur = $(this).html().replace(/\t/g, '').replace(/\n/g, '').split("</span>")[1];
						break;
						case 2 : // Options
							Casting.mm.center.info.stats.optionsunlock = $(this);
							Casting.mm.center.info.stats.optionsunlock.find('img[src$="use_andrek_grey.png"]').attr('src','http://imgup.motion-twin.com/twinoid/8/7/2a755b31_6238137.jpg');
							//Casting.mm.center.info.stats.optionsunlock.replace('desbloqueadas', 'disponibles');
						case 3 : // XP ou Inverstit
							Casting.mm.center.info.stats.xp = text.split(" / ")[0];
						break;
						case 6 : // Status
							Casting.mm.center.info.stats.statut = (text == "  operacional") ? true : false;
							if(!Casting.mm.center.info.stats.statut) Casting.mm.center.info.stats.rang = "No operativo";
						break;
						case 7 : // Nb de parties achevées
							Casting.mm.center.info.partieEnd = text;
						break;
						case 10 :
						case 11 : // Investisseurs
							Casting.mm.center.info.invest = $(this).html();
						break;	
						default:
					}
				});
			break;

			default:
		}
	});
}

Casting.mm.center.dispNewInfo = function() {
	var xp = Casting.mm.center.info.stats.xp;
	var rangname = Casting.mm.center.info.stats.rang;
	var lvlup = Casting.mm.center.INFO_RANGS[rangname]['lvlup'];
	var rang = Casting.mm.center.INFO_RANGS[rangname]['rang'];
	var img = Casting.mm.center.INFO_RANGS[rangname]['img'];
	var next = Casting.mm.center.INFO_RANGS[rangname]['next'];

	var max = Casting.mm.center.INFO_RANGS[rangname]['max'];
	var need = Casting.mm.center.INFO_RANGS[rangname]['need'];

	var levelup_before = 0;
	if(Casting.mm.center.INFO_RANGS[rangname]['before'] != ''){
		levelup_before = Casting.mm.center.INFO_RANGS[Casting.mm.center.INFO_RANGS[rangname]['before']]['lvlup'];
	}
	//console.log('Math.floor(( '+xp+' - '+levelup_before+') / ('+lvlup+' - '+levelup_before+') * 100)');
	var pourcent = Math.floor(( xp - levelup_before) / (lvlup - levelup_before) * 100);

	var div = $("<div>").attr("id", "castingScript").appendTo(".groups");

	var divRangBloc = $("<div>").addClass("boxMargin boxTwoWidth").appendTo(div);
	var divRang = $("<div><h3><div class=\"cornerright\">Información del Reality</div></h3></div>").addClass("twinstyle").appendTo(divRangBloc);
	var infobulleXPText = "'<div class=\\\'tiptop\\\'><div class=\\\'tipbottom\\\'><div class=\\\'tipbg\\\'><div class=\\\'tipcontent\\\'><h1>Experiencia</h1>El Reality tiene " + Casting.mm.center.info.stats.xp + " puntos de experiencia. Se necesitan " + Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['lvlup'] + " para subir al siguiente rango. Es decir, faltan " + (Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['lvlup'] - Casting.mm.center.info.stats.xp) + ".<br><em>Recuerda, se ganan 25 por nave lanzada y 1 por <img src=&quot;/img/icons/ui/ticket_any.png&quot; style=&quot;display:inline-block; vertical-align:text-bottom;&quot;/> invertido.</em></div></div></div></div>'";
	var investHTML = $("<div>").html(Casting.mm.center.info.invest);
	investHTML.find(".spanBox").remove();
	investHTML.html(investHTML.html().split("</div><div").join("</div>, <div"));
	var divRangHTML = '';

	var nb_shooting = Math.floor((lvlup - xp) / Casting.mm.xp_for_shooting);
	var nb_tickets_remaining = 0;
	if(nb_shooting > 0){
		nb_tickets_remaining = (lvlup - xp) % Casting.mm.xp_for_shooting;
	}else{
		nb_shooting = 1;
	}


	if(typeof(Casting.mm.center.INFO_RANGS[next]) != 'undefined') {
		divRangHTML = "<div class=\"floatInfo\" style=\"text-align: center;\"><div class=\"xpcompletion\" onmouseout=\"Main.hideTip();\" onmouseover=\"Main.showTip(this, " + infobulleXPText + ")\">" +
			"<div class=\"numb\">" + pourcent + "%</div><div class=\"compframe\">" +
			"<div class=\"fill\" style=\"width: " + pourcent + "%;\"></div><div class=\"compText\">Progreso hasta el siguiente nivel</div>" +
			"</div></div>" +
			"<div class=\"floatText\">" + ((rang > 0) ? "Falta(n) " + nb_shooting + " nave(s)" + (nb_tickets_remaining > 0 ? " y "+nb_tickets_remaining + " ticket(s)" : '') +" o " + (lvlup - xp) + " ticket(s)." : "Falta(n) " + (lvlup - xp) + " tickets por invertir.") + "</div>" +
			"</div>";
	}
	divRangHTML += "<span class=\"spanBox\">Creador:</span> " + Casting.mm.center.info.stats.realisateur + "<br>" +
		Casting.mm.center.info.stats.optionsunlock.html().replace('desbloqueadas', 'disponibles') + "<br>" +
		"<span class=\"spanBox\">Rango:</span> <img onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rangname + " <span style='font-size: 7pt; font-style: italic;'>(Niv. " + Casting.mm.center.INFO_RANGS[rangname]['rang'] + ")</span></h1>" + Casting.mm.center.INFO_RANGS[rangname]['infotext'] + "</div></div></div></div>") + "')\" src=\"/img/icons/ui/" + img + ".png\"> " + rangname + " <span style=\"font-size: 7pt; font-style: italic;\">(Niv. " + rang + ")</span><br>";
	if(typeof(Casting.mm.center.INFO_RANGS[next]) != 'undefined') {
		divRangHTML += "<span class=\"spanBox\">Próximo rango:</span> <img onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + next + " <span style='font-size: 7pt; font-style: italic;'>(Niv. " + Casting.mm.center.INFO_RANGS[next]['rang'] + ")</span></h1>" + Casting.mm.center.INFO_RANGS[next]['infotext'] + "</div></div></div></div>") + "')\" src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[next]['img'] + ".png\"> " + next + " <span style=\"font-size: 7pt; font-style: italic;\">(Niv. " + (rang + 1)+ ")</span><br>";
	}

	divRangHTML += "<span class=\"spanBox\">Número máximo de jugadores:</span> " + max + " personas<br>" +
	"<span class=\"spanBox\">Jugadores necesarios para despegar:</span> " + need + " personas<br>" +
	"<span class=\"spanBox\">Número actual de jugadores:</span> " + Casting.mm.center.info.effect.length + " personas<br>" +
		((Casting.mm.center.info.userInCast) ? "<div class=\"floatRejPret\">" + Casting.mm.center.info.btnInvest + "</div>" : "") +
	"<div class=\"floatRejPret\">" + Casting.mm.center.info.btnRejPret + "</div>" +
	"<span class=\"spanBox\">Cantidad de partidas acabadas:</span> " + Casting.mm.center.info.partieEnd + "<br>" +
	"<span class=\"spanBox\">Inversores:</span> " + investHTML.html(); +
	"";
	var divRangContent = $("<div>").addClass("boxContent").html(divRangHTML).appendTo(divRang);

	var divOthInfoBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);

	var divOthInfo = $("<div><h3><div class=\"cornerright\">Progreso General</div></h3></div>").addClass("twinstyle boxMargin").appendTo(divOthInfoBloc);
	var divOthInfoHTML = "<span>" + Casting.mm.center.ScenarHTML("Principiante") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Café teatro") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Soldado de fortuna") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Grupillo de provincia") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Bar lounge") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Pegador de carteles") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Opera Bufet") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Duendes de jardín") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Orquesta") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Ballet nacional") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Opera") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Casa productora") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Agencia de organización de eventos") + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML("Leyenda") + "</span>" +
	"";
	var divOthInfoContent = $("<div>").addClass("boxContent").css({"padding-left": 0, "text-align": "center"}).html(divOthInfoHTML).appendTo(divOthInfo);

	var divOthInfo2 = $("<div><h3><div class=\"cornerright\">Despegue de la nave</div></h3></div>").addClass("twinstyle").appendTo(divOthInfoBloc);
	var divOthInfo2HTML = $(".twinstyle[name=\"Despegue de la nave\"] .boxContent").html();
	var divOthInfo2Content = $("<div>").addClass("boxContent").html(divOthInfo2HTML).appendTo(divOthInfo2);

	var divOthInfo3HTML = $("a[href*=\"quit\"]").parent().parent().html();
	var divOthInfo3Content = $("<div>").addClass("boxContent").html(divOthInfo3HTML).appendTo(divOthInfoBloc);

	$("<div>").addClass("clear").appendTo(div);

	var divEffectIGBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectIG = $("<div><h3><div class=\"cornerright\">Jugadores viajando (" + Casting.mm.center.info.effectIG.length + ")</div></h3></div>").addClass("twinstyle").appendTo(divEffectIGBloc);
	var divEffectIGHTML = "";
	$.each(Casting.mm.center.info.effectIG, function(index, data) { divEffectIGHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectIGContent = $("<div>").addClass("boxContent overContent").html(divEffectIGHTML).appendTo(divEffectIG);

	var divEffectWaitBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectWait = $("<div><h3><div class=\"cornerright\">Jugadores en espera (" + Casting.mm.center.info.effectWait.length + ")</div></h3></div>").addClass("twinstyle").appendTo(divEffectWaitBloc);
	var divEffectWaitHTML = "";
	$.each(Casting.mm.center.info.effectWait, function(index, data) { divEffectWaitHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectWaitContent = $("<div>").addClass("boxContent overContent").html(divEffectWaitHTML).appendTo(divEffectWait);

	var divEffectPretBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectPret = $("<div><h3><div class=\"cornerright\">Jugadores listos (" + Casting.mm.center.info.effectPret.length + ")</div></h3></div>").addClass("twinstyle").appendTo(divEffectPretBloc);
	var divEffectPretHTML = "";
	$.each(Casting.mm.center.info.effectPret, function(index, data) { divEffectPretHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectPretContent = $("<div>").addClass("boxContent overContent").html(divEffectPretHTML).appendTo(divEffectPret);

	$("<div>").addClass("clear").appendTo(div);
	$("li.nameUnit.inl-blck").css("min-width", "144px");
}

Casting.mm.center.ScenarHTML = function(rang) {
	if(Casting.mm.center.INFO_RANGS[rang]['rang'] <= Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['rang']) {
		return "<img src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[rang]['img'] +".png\" onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rang + " <span style='font-size: 7pt; font-style: italic;'>(Niv. " + Casting.mm.center.INFO_RANGS[rang]['rang'] + ")</span></h1>" + Casting.mm.center.INFO_RANGS[rang]['infotext'] + "</div></div></div></div>") + "')\">";
	} else {
		return "<img src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[rang]['img'] +"_grey.png\" onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rang + " <span style='font-size: 7pt; font-style: italic;'>(Niv. " + Casting.mm.center.INFO_RANGS[rang]['rang'] + ")</span></h1>Este realtity aún no ha desbloqueado esta opción.</div></div></div></div>") + "')\">";
	}
}

Casting.mm.init();
