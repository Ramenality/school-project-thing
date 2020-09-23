const themes = ["Dark", "Light", "Inverted"];
const fonts = ["Monospace", "Serif", "Sans"]
function theme() {
	if (themes.indexOf(player.option.theme)+1 >= 4) {
		player.option.theme = "Dark";
		return;
	}
	player.option.theme = themes[themes.indexOf(player.option.theme)+1];
}
function font() {
	if (fonts.indexOf(player.option.font)+1 >= 3) {
		player.option.font = "Monospace";
		return;
	}
	player.option.font = fonts[fonts.indexOf(player.option.font)+1];
}