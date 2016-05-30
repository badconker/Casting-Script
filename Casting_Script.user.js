// ==UserScript==
// @name        Casting Script
// @namespace   Script Mush pour les Castings
// @description Script Mush pour les Castings
// @downloadURL https://github.com/badconker/Casting-Script/raw/master/Casting_Script.user.js
// @include     http://mush.vg/g/*
// @include     http://mush.vg/group/*
// @include     http://mush.twinoid.*/g/*
// @include     http://mush.twinoid.*/group/*
// @grant       GM_getResourceText
// @require     http://code.jquery.com/jquery-latest.js
// @require     https://github.com/Javiernh/Casting-Script/raw/master/lib/i18next.js
// @resource    translation:es https://raw.githubusercontent.com/Javiernh/Casting-Script/master/locales/es/translation.json
// @resource    translation:fr https://raw.githubusercontent.com/Javiernh/Casting-Script/master/locales/fr/translation.json
// @resource    translation:en https://raw.githubusercontent.com/Javiernh/Casting-Script/master/locales/en/translation.json
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
Casting.mm.membersorted = [];

Casting.mm.initLang = function() {
	switch (document.domain) {
		case 'mush.twinoid.es': // Spanish
			Casting.mm.lang = 'es';
			break;
		case 'mush.twinoid.com': // English
			Casting.mm.lang = 'en';
			break;
		default: // French
			Casting.mm.lang = 'fr';
	}
	try {
		var translationText = GM_getResourceText('translation:'+ Casting.mm.lang);
		if (typeof translationText === 'undefined') {
			console.warn("No translations for '" + Casting.mm.lang + "' languaje.");
			return;
		}
		var translationData = JSON.parse(translationText);
		i18next.init(translationData);
		i18next.changeLanguage(Casting.mm.lang);
	} catch(err) {
		console.error("Error getting translation data:", err);
	}
};	// END FUNCTION - Casting.mm.initLang

Casting.mm.init = function() {
	var url = Casting.mm.window.location.href;
	if(url.split("/")[3] == "group") {
		if(isNaN(url.split("/")[4])) Casting.mm.location = url.split("/")[4];
		else Casting.mm.location = "center";
	}
	else Casting.mm.location = url.split("/")[5] || "center";

	switch(Casting.mm.location) {
		case "center":
			Casting.mm.center.init();
		break;

		case "members":
			Casting.mm.SortTableMembers();
		break;

		default:
	}
}

Casting.mm.SortTableMembers = function () {
	$members = $('.members > .table:eq(0) > tbody');
	$members_sorted = $members.find('tr');
	$members_sorted.sort(function(a, b){
		return $(a).find('.name').text().toLowerCase().localeCompare( $(b).find('.name').text().toLowerCase() );
	});
	$members_sorted.detach().appendTo($members);
}

Casting.mm.addSlashes = function (text) {
	text = text.replace(/\\/g, "\\\\");
	text = text.replace(/'/g, "\\'");
	return text;
}

Casting.mm.initLang();
Casting.mm.xp_for_shooting = 25;
Casting.mm.center = {};
Casting.mm.center.info = {};
Casting.mm.center.INFO_RANGS = [];
	Casting.mm.center.INFO_RANGS[i18next.t("rank0")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['rang'] = 0;
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['before'] = "";
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['next'] = i18next.t("rank1");
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['max'] = 32;
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['need'] = 32;
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['lvlup'] = 50;
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['img'] = "no_mush_bar";
		Casting.mm.center.INFO_RANGS[i18next.t("rank0")]['infotext'] = "";
	Casting.mm.center.INFO_RANGS[i18next.t("rank1")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['rang'] = 1;
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['before'] = "";
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['next'] = i18next.t("rank2");
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['max'] = 48;
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['need'] = 32;
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['lvlup'] = 25;
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['img'] = "no_mush_bar";
		Casting.mm.center.INFO_RANGS[i18next.t("rank1")]['infotext'] = i18next.t("infoRank1");
	Casting.mm.center.INFO_RANGS[i18next.t("rank2")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['rang'] = 2;
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['before'] = i18next.t("rank1");
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['next'] = i18next.t("rank3");
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['max'] = 64;
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['need'] = 32;
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['lvlup'] = 125;
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['img'] = "too_slow";
		Casting.mm.center.INFO_RANGS[i18next.t("rank2")]['infotext'] = i18next.t("infoRank2");
	Casting.mm.center.INFO_RANGS[i18next.t("rank3")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['rang'] = 3;
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['before'] = i18next.t("rank2");
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['next'] = i18next.t("rank4");
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['max'] = 80;
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['need'] = 32;
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['lvlup'] = 250;
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['img'] = "troopers";
		Casting.mm.center.INFO_RANGS[i18next.t("rank3")]['infotext'] = i18next.t("infoRank3");
	Casting.mm.center.INFO_RANGS[i18next.t("rank4")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['rang'] = 4;
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['before'] = i18next.t("rank3");
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['next'] = i18next.t("rank5");
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['max'] = 88;
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['lvlup'] = 400;
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['img'] = "mushruvery";
		Casting.mm.center.INFO_RANGS[i18next.t("rank4")]['infotext'] = i18next.t("infoRank4");
	Casting.mm.center.INFO_RANGS[i18next.t("rank5")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['rang'] = 5;
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['before'] = i18next.t("rank4");
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['next'] = i18next.t(i18next.t("rank6"));
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['max'] = 104;
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['lvlup'] = 600;
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['img'] = "triple_play";
		Casting.mm.center.INFO_RANGS[i18next.t("rank5")]['infotext'] = i18next.t("infoRank5");
	Casting.mm.center.INFO_RANGS[i18next.t("rank6")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['rang'] = 6;
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['before'] = i18next.t("rank5");
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['next'] = i18next.t("rank7");
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['max'] = 112;
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['lvlup'] = 850;
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['img'] = "page";
		Casting.mm.center.INFO_RANGS[i18next.t("rank6")]['infotext'] = i18next.t("infoRank6");
	Casting.mm.center.INFO_RANGS[i18next.t("rank7")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['rang'] = 7;
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['before'] = i18next.t("rank6");
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['next'] = i18next.t("rank8");
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['max'] = 128;
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['lvlup'] = 1100;
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['img'] = "swift_fungus";
		Casting.mm.center.INFO_RANGS[i18next.t("rank7")]['infotext'] = i18next.t("infoRank7");
	Casting.mm.center.INFO_RANGS[i18next.t("rank8")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['rang'] = 8;
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['before'] = i18next.t("rank7");
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['next'] = i18next.t("rank9");
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['max'] = 144;
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['lvlup'] = 1400;
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['img'] = "dream_theater";
		Casting.mm.center.INFO_RANGS[i18next.t("rank8")]['infotext'] = i18next.t("infoRank8");
	Casting.mm.center.INFO_RANGS[i18next.t("rank9")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['rang'] = 9;
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['before'] = i18next.t("rank8");
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['next'] = i18next.t("rank10");
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['max'] = 160;
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['lvlup'] = 1700;
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['img'] = "beta_phases";
		Casting.mm.center.INFO_RANGS[i18next.t("rank9")]['infotext'] = i18next.t("infoRank9");
	Casting.mm.center.INFO_RANGS[i18next.t("rank10")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['rang'] = 10;
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['before'] = i18next.t("rank9");
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['next'] = i18next.t("rank11");
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['max'] = 176;
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['need'] = 24;
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['lvlup'] = 2050;
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['img'] = "sleeping_beauty";
		Casting.mm.center.INFO_RANGS[i18next.t("rank10")]['infotext'] = i18next.t("infoRank10");
	Casting.mm.center.INFO_RANGS[i18next.t("rank11")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['rang'] = 11;
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['before'] = i18next.t("rank10");
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['next'] = i18next.t("rank12");
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['max'] = 192;
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['need'] = 16;
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['lvlup'] = 2400;
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['img'] = "whos_ugly";
		Casting.mm.center.INFO_RANGS[i18next.t("rank11")]['infotext'] = i18next.t("infoRank11");
	Casting.mm.center.INFO_RANGS[i18next.t("rank12")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['rang'] = 12;
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['before'] = i18next.t("rank11");
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['next'] = i18next.t("rank13");
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['max'] = 208;
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['need'] = 16;
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['lvlup'] = 2800;
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['img'] = "fight";
		Casting.mm.center.INFO_RANGS[i18next.t("rank12")]['infotext'] = i18next.t("infoRank12");
	Casting.mm.center.INFO_RANGS[i18next.t("rank13")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['rang'] = 13;
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['before'] = i18next.t("rank12");
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['next'] = i18next.t("rank14");
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['max'] = 224;
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['need'] = 16;
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['lvlup'] = 3200;
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['img'] = "blitz";
		Casting.mm.center.INFO_RANGS[i18next.t("rank13")]['infotext'] = i18next.t("infoRank13");
	Casting.mm.center.INFO_RANGS[i18next.t("rank14")] = [];
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['rang'] = 14;
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['before'] = i18next.t("rank13");
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['next'] = "";
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['max'] = 256;
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['need'] = 16;
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['lvlup'] = 0;
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['img'] = "legend";
		Casting.mm.center.INFO_RANGS[i18next.t("rank14")]['infotext'] = i18next.t("infoRank14");
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
		.nameUnit {\
			min-width: 144px !important;\
		}\
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

	Casting.mm.center.info.username = $("a[href^=\"http://" + document.domain + "/u/profile/\"] span").text();
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
	Casting.mm.center.info.userInCast = $(".twinstyle[name=\"" + i18next.t("investment") + "\"]").find(".boxContent").children().length > 0;

	Casting.mm.center.info.btnInvest = (Casting.mm.center.info.userInCast) ? $(".twinstyle[name=\"" + i18next.t("investment") + "\"]").find(".boxContent > div").html() : false;
	Casting.mm.center.info.btnRejPret = $(".twinstyle[name=\"" + i18next.t("myactions") + "\"]").find(".boxContent").html();
	$(".twinstyle").each(function() {
		var name = $(this).find(".cornerright").text().replace(/\t/g, '').replace(/\n/g, '');
		switch(name) {
			case i18next.t("stats") :
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
						case 3 : // XP ou Inverstit
							Casting.mm.center.info.stats.xp = text.split(" / ")[0];
						break;
						case 6 : // Status
							Casting.mm.center.info.stats.statut = (text == i18next.t("castingOn")) ? true : false;
							if(!Casting.mm.center.info.stats.statut) Casting.mm.center.info.stats.rang = i18next.t("rank0");
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
	if(Casting.mm.center.INFO_RANGS[rangname]['before'] !== ''){
		levelup_before = Casting.mm.center.INFO_RANGS[Casting.mm.center.INFO_RANGS[rangname]['before']]['lvlup'];
	}
//	console.log('Math.floor(( '+xp+' - '+levelup_before+') / ('+lvlup+' - '+levelup_before+') * 100)');
	var pourcent = Math.floor(( xp - levelup_before) / (lvlup - levelup_before) * 100);

	var div = $("<div>").attr("id", "castingScript").appendTo(".groups");

	var divRangBloc = $("<div>").addClass("boxMargin boxTwoWidth").appendTo(div);
	var divRang = $("<div><h3><div class=\"cornerright\">" + i18next.t("castingInfo") + "</div></h3></div>").addClass("twinstyle").appendTo(divRangBloc);
	var infobulleXPText = i18next.t("castingBarTip", {castXP: Casting.mm.center.info.stats.xp, castXPnext: Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['lvlup'], castXPneed: (Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['lvlup'] - Casting.mm.center.info.stats.xp)});
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
			"<div class=\"fill\" style=\"width: " + pourcent + "%;\"></div><div class=\"compText\">" + i18next.t("castingBarText") + "</div>" +
			"</div></div>" +
			"<div class=\"floatText\">" + ((rang > 0) ? i18next.t("castOnProgTxt1", {count: nb_shooting}) + (nb_tickets_remaining > 0 ? i18next.t("castOnProgTxt2", {count: nb_tickets_remaining}) : '') + i18next.t("castOnProgTxt3", {count: (lvlup - xp)}) : i18next.t("castOffProgTxt", {count: (lvlup - xp)})) + "</div>" +
			"</div>";
	}
	divRangHTML += "<span class=\"spanBox\">" + i18next.t("castingCreator") + "</span> " + Casting.mm.center.info.stats.realisateur + "<br>" +
		Casting.mm.center.info.stats.optionsunlock.html().replace('desbloqueadas', 'desbloq.') + "<br>" +
		"<span class=\"spanBox\">" + i18next.t("rankTxt") + "</span> <img onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rangname + " <span style='font-size: 7pt; font-style: italic;'>" + i18next.t("lvlRankTxt", {rang: Casting.mm.center.INFO_RANGS[rangname]['rang']}) + "</span></h1>" + Casting.mm.center.INFO_RANGS[rangname]['infotext'] + "</div></div></div></div>") + "')\" src=\"/img/icons/ui/" + img + ".png\"> " + rangname + " <span style=\"font-size: 7pt; font-style: italic;\">" + i18next.t("lvlRankTxt", {rang: rang}) + "</span><br>";
	if(typeof(Casting.mm.center.INFO_RANGS[next]) != 'undefined') {
		divRangHTML += "<span class=\"spanBox\">" + i18next.t("nextRankTxt") + "</span> <img onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + next + " <span style='font-size: 7pt; font-style: italic;'>" + i18next.t("lvlRankTxt", {rang: Casting.mm.center.INFO_RANGS[next]['rang']}) + "</span></h1>" + Casting.mm.center.INFO_RANGS[next]['infotext'] + "</div></div></div></div>") + "')\" src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[next]['img'] + ".png\"> " + next + " <span style=\"font-size: 7pt; font-style: italic;\">" + i18next.t("lvlRankTxt", {rang: rang+1}) + "</span><br>";
	}

	divRangHTML += i18next.t("maxPlayers", {maxplayers: max}) +
	i18next.t("needPlayers", {needplayers: need}) +
	i18next.t("numberPlayers", {numberplayers: Casting.mm.center.info.effect.length}) +
		((Casting.mm.center.info.userInCast) ? "<div class=\"floatRejPret\">" + Casting.mm.center.info.btnInvest + "</div>" : "") +
	"<div class=\"floatRejPret\">" + Casting.mm.center.info.btnRejPret + "</div>" +
	"<span class=\"spanBox\">" + i18next.t("numberGamesTxt") + "</span> " + Casting.mm.center.info.partieEnd + "<br>" +
	"<span class=\"spanBox\">" + i18next.t("investorsTxt") + "</span> " + investHTML.html(); +
	"";
	var divRangContent = $("<div>").addClass("boxContent").html(divRangHTML).appendTo(divRang);

	var divOthInfoBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);

	var divOthInfo = $("<div><h3><div class=\"cornerright\">" + i18next.t("genProgTxt") + "</div></h3></div>").addClass("twinstyle boxMargin").appendTo(divOthInfoBloc);
	var divOthInfoHTML = "<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank1")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank2")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank3")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank4")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank5")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank6")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank7")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank8")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank9")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank10")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank11")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank12")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank13")) + "</span> " +
	"<span>" + Casting.mm.center.ScenarHTML(i18next.t("rank14")) + "</span>" +
	"";
	var divOthInfoContent = $("<div>").addClass("boxContent").css({"padding-left": 0, "text-align": "center"}).html(divOthInfoHTML).appendTo(divOthInfo);

	var divOthInfo2 = $("<div><h3><div class=\"cornerright\">" + i18next.t("launchShipAltTxt") + "</div></h3></div>").addClass("twinstyle").appendTo(divOthInfoBloc);
	var divOthInfo2HTML = $(".twinstyle[name=\"" + i18next.t("launchShipTxt") + "\"] .boxContent").html();
	var divOthInfo2Content = $("<div>").addClass("boxContent").html(divOthInfo2HTML).appendTo(divOthInfo2);

	var divOthInfo3HTML = $("a[href*=\"quit\"]").parent().parent().html();
	var divOthInfo3Content = $("<div>").addClass("boxContent").html(divOthInfo3HTML).appendTo(divOthInfoBloc);

	$("<div>").addClass("clear").appendTo(div);

	var divEffectIGBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectIG = $("<div><h3><div class=\"cornerright\">" + i18next.t("playerIG", {ingame: Casting.mm.center.info.effectIG.length}) + "</div></h3></div>").addClass("twinstyle").appendTo(divEffectIGBloc);
	var divEffectIGHTML = "";
	$.each(Casting.mm.center.info.effectIG, function(index, data) { divEffectIGHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectIGContent = $("<div>").addClass("boxContent").html(divEffectIGHTML).appendTo(divEffectIG);

	var divEffectWaitBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectWait = $("<div><h3><div class=\"cornerright\">" + i18next.t("playerWait", {wait: Casting.mm.center.info.effectWait.length}) + "</div></h3></div>").addClass("twinstyle").appendTo(divEffectWaitBloc);
	var divEffectWaitHTML = "";
	$.each(Casting.mm.center.info.effectWait, function(index, data) { divEffectWaitHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectWaitContent = $("<div>").addClass("boxContent").html(divEffectWaitHTML).appendTo(divEffectWait);

	var divEffectPretBloc = $("<div>").addClass("boxMargin boxWidth").appendTo(div);
	var divEffectPret = $("<div><h3><div class=\"cornerright\">" + i18next.t("playerReady", {ready: Casting.mm.center.info.effectPret.length}) + "</div></h3></div>").addClass("twinstyle").appendTo(divEffectPretBloc);
	var divEffectPretHTML = "";
	$.each(Casting.mm.center.info.effectPret, function(index, data) { divEffectPretHTML += "<li class=\"nameUnit inl-blck\">" + data + "</li>"});
	var divEffectPretContent = $("<div>").addClass("boxContent").html(divEffectPretHTML).appendTo(divEffectPret);

	$("<div>").addClass("clear").appendTo(div);
}

Casting.mm.center.ScenarHTML = function(rang) {
	if(Casting.mm.center.INFO_RANGS[rang]['rang'] <= Casting.mm.center.INFO_RANGS[Casting.mm.center.info.stats.rang]['rang']) {
		return "<img src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[rang]['img'] +".png\" onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rang + " <span style='font-size: 7pt; font-style: italic;'>" + i18next.t("lvlRankTxt", {rang: Casting.mm.center.INFO_RANGS[rang]['rang']}) + "</span></h1>" + Casting.mm.center.INFO_RANGS[rang]['infotext'] + "</div></div></div></div>") + "')\">";
	} else {
		return "<img src=\"/img/icons/ui/" + Casting.mm.center.INFO_RANGS[rang]['img'] +"_grey.png\" onmouseout=\"Main.hideTip()\" onmouseover=\"Main.showTip(this,'" + Casting.mm.addSlashes("<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + rang + " <span style='font-size: 7pt; font-style: italic;'>" + i18next.t("lvlRankTxt", {rang: Casting.mm.center.INFO_RANGS[rang]['rang']}) + "</span></h1>" + i18next.t("optionBlock") + "</div></div></div></div>") + "')\">";
	}
}

Casting.mm.init();
