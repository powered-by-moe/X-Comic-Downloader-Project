
// Offline Browsing Theme
const offline_theme_var = ['--obr-tmenu-bgc','--obr-con-bgc','--obr-tmenu-btn-bgc','--obr-tmenu-btn-color','--obr-tmenu-btn-bd-color','--obr-tmenu-btn-hover-bgc','--obr-tmenu-btn-hover-color','--obr-tmenu-btn-hover-bd-color','--obr-tmenu-s-input-bgc','--obr-tmenu-s-input-color','--obr-tmenu-s-input-bd-color','--obr-tmenu-s-input-focus-bd-color','--obr-tmenu-jp-btn-bgc','--obr-tmenu-jp-btn-color','--obr-tmenu-jp-btn-bd-color','--obr-tmenu-jp-btn-hover-bgc','--obr-tmenu-jp-btn-hover-color','--obr-tmenu-jp-btn-hover-bd-color','--obr-comic-bgc','--obr-comic-uo-bd-color','--obr-comic-uo-shadow','--obr-comic-num-bgc','--obr-comic-num-color','--obr-comic-text-bgc','--obr-comic-text-color','--obr-comic-hover-bgc','--obr-comic-counter-color','--st-bgc','--st-color','--st-rtitle-bgc','--st-rtitle-color','--st-rselect-bgc','--st-rselect-bd-color','--st-rselect-of-bgc','--st-rselect-of-bd-color','--st-rselect-of-btn-bgc','--st-rselect-of-btn-color','--st-rselect-of-btn-hover-bgc','--st-rselect-of-btn-hover-color','--st-rselect-of-btn-sl-bgc','--st-rselect-of-btn-sl-color','--st-rselect-aw-bgc','--st-rselect-aw-color','--st-rselect-aw-hover-bgc','--st-rselect-aw-hover-color','--st-rinput-bgc','--st-rinput-color','--st-rinput-bd-color','--st-rinput-hover-bd-color','--st-rhelper-color','--st-rfile-bgc','--st-rfile-color','--st-rfile-hover-bgc','--st-rfile-hover-color','--st-cselect-bgc','--st-cselect-bd-color','--st-cselect-btn-bgc','--st-cselect-btn-color','--st-cselect-btn-shadow','--st-cselect-btn-hover-bgc','--st-cselect-btn-hover-color','--st-cselect-btn-hover-shadow','--st-cselect-btn-at-bgc','--st-cselect-btn-at-color','--st-cselect-btn-at-shadow','--ccp-box-shadow','--ccp-btn-bgc','--ccp-btn-color','--ccp-btn-bd-color','--ccp-btn-hover-bgc','--ccp-btn-hover-color','--ccp-btn-hover-bd-color','--ccp-btn-sc-bgc','--ccp-btn-sc-color','--ccp-btn-sc-bd-color','--ccp-btn-sc-hover-bgc','--ccp-btn-sc-hover-color','--ccp-btn-sc-hover-bd-color','--ccp-btn-wn-bgc','--ccp-btn-wn-color','--ccp-btn-wn-bd-color','--ccp-btn-wn-hover-bgc','--ccp-btn-wn-hover-color','--ccp-btn-wn-hover-bd-color','--ccp-btn-dg-bgc','--ccp-btn-dg-color','--ccp-btn-dg-bd-color','--ccp-btn-dg-hover-bgc','--ccp-btn-dg-hover-color','--ccp-btn-dg-hover-bd-color','--obr-pgnt-bgc','--cp-info-btns-hover-bshadow']
const offline_theme_themes = [
	[
		'#ddd','#fff','#eee','#000','transparent','#eee','#000','#0af','#fff','#222','#eee','#3498DB','#5DADE2','#fff','#3498DB','#3498DB','#fff','#2488cb','#111','#f00','0 0 6px 0 rgba(222,50,50.4)','#222b','#fff','#666','#fff','#025ba7','#111','#fff','#333','#eee','#222','#fff','#eee','#fff','#eee','#fff','#111','#eee','#111','#666','#fff','#eee','#222','#0af','#fff','#fff','#111','#eee','#0af','#888','#3498DB','#fff','#2E86C1','#fff','#eeeb','#dddc','#fff','#222','0 0 10px 0 rgba(150,150,150,.2)','#eee','#222','0 4px 6px 0 rgba(120,120,120,.3)','#229954','#fff','0 0 10px 0 rgba(30,132,73,.5)',
		'9px 7px 40px -6px rgba(0,0,0,.25)','#eee','#000','transparent','#3498DB','#fff','#2E86C1','#208f4e','#fff','#229954','#1E8449','#fff','#196F3D','#ff7b00','#fff','#E67E22','#D68910','#fff','#CA6F1E','#C0392B','#fff','#A93226','#A93226','#fff','#C0392B','#fff','0 0 5px 0 #0009'
	],
	[
		'#333','#222','#444','#fff','#111','#1e1e1e','#fff','#0af','#222','#fff','#111','#3498DB','#5DADE2','#fff','#3498DB','#3498DB','#fff','#2488cb','#333','#009657','0 0 12px 0 rgb(0,150,87,.5)','#222b','#fff','#666','#fff','#025ba7','#fff','#333','#eee','#444','#eee','#444','#555','#444','#777','#333','#fff','#222','#fff','#666','#fff','#222','#eee','#0af','#fff','#444','#ee','#555','#0af','#888','#3498DB','#fff','#2E86C1','#fff','#222b','#111c','#fff','#222','0 0 10px 0 rgba(150,150,150,.2)','#eee','#222','0 4px 6px 0 rgba(120,120,120,.3)','#229954','#fff','0 0 10px 0 rgba(30,132,73,.5)',
		'9px 7px 40px -6px rgba(0,0,0,.25)','#eee','#000','transparent','#3498DB','#fff','#2E86C1','#208f4e','#fff','#229954','#1E8449','#fff','#196F3D','#ff7b00','#fff','#E67E22','#D68910','#fff','#CA6F1E','#C0392B','#fff','#A93226','#A93226','#fff','#C0392B','#333','0 0 5px 0 #0009'
	]
]

// Pagination Themes
const pagination_theme_var = ['--pgnt-btn-bgc','--pgnt-btn-color','--pgnt-btn-bd-color','--pgnt-btn-hover-bgc','--pgnt-btn-hover-color','--pgnt-btn-hover-bd-color','--pgnt-btn-disable-bd-color']
const pagination_theme_themes = [
	[ // Blue
		'#EBF5FB','#222','#D6EAF8','#3498DB','#fff','#D6EAF8','#2E86C1'
	],
	[ // Green
		'#E9F7EF','#222','#D4EFDF','#229954','#fff','#D4EFDF','#1E8449'
	],
	[ // Red
		'#FDEDEC','#222','#FADBD8','#E74C3C','#fff','#FADBD8','#C0392B'
	],
	[ // Orange
		'#FBEEE6','#222','#F6DDCC','#E67E22','#fff','#F6DDCC','#D35400'
	],
	[ // Purple
		'#F4ECF7','#222','#E8DAEF','#9B59B6','#fff','#E8DAEF','#8E44AD'
	],
	[ // Yellow
		'#FEF9E7','#222','#FCF3CF','#F1C40F','#222','#FCF3CF','#F39C12'
	],
	[ // Gray
		'#F2F4F4','#222','#E5E8E8','#95A5A6','#fff','#E5E8E8','#707B7C'
	]
]


// Comic Panel Theme
const comic_panel_theme_var = ['--cp-bgc','--cp-btns-bgc','--cp-btns-color','--cp-btns-bd-color','--cp-btns-hover-bgc','--cp-btns-hover-color','--cp-btns-hover-bd-color','--cp-title-bgc','--cp-title-color','--cp-info-color','--cp-info-btns-bgc','--cp-info-btns-color','--cp-info-btns-hover-bgc','--cp-info-btns-hover-color','--cp-img-con-bgc','--cp-img-repair-con-bgc','--cp-img-repair-con-bd-color','--cp-img-repair-color','--cp-img-repair-btn-bgc','--cp-img-repair-btn-color','--cp-img-repair-btn-hover-bgc','--cp-img-repair-btn-hover-color','--cp-is-bgc','--cp-is-bdr','--cp-is-select-bgc','--cp-is-select-color','--cp-is-select-bd-color','--cp-is-select-hover-bd-color','--cp-is-select-focus-bgc','--cp-is-select-focus-color','--cp-is-select-focus-bd-color']

const comic_panel_theme_themes = [
	[
		'#fff','transparent','#3334','#3334','#111','#fff','#222','#eee','#222','#111','#eee','#333','#eee','#d20068','#e8e8e8','#fff','#ddd','#e00','#eee','#222','#d20068','#fff','#ccc','4px 4px 0 0','#fff','#222','#333','#555','#eee','#222','#666'
	],
	[
		'#333','transparent','#eee6','#eee6','#fff','#222','#222','#282828','#fff','#fff','#222','#ccc','#222','#d20068','#282828','#333','#282828','#ff7b00','#eee','#222','#d20068','#fff','#000','4px 4px 0 0','transparent','#fff','#333','#555','#222','#fff','#666'
	]
]

// Browser Theme
const browser_theme_var = ['--br-tab-con-bgc','--br-tab-bgc','--br-tab-color', '--br-tab-bd-color','--br-tab-btn-color', '--br-tab-btn-hover-bgc','--br-tab-active-bgc', '--br-tab-active-color','--br-tab-active-bd-color','--br-tool-con-bgc','--br-tool-btn-bgc','--br-tool-btn-bd-color','--br-tool-btn-hover-bgc','--br-tool-btn-hover-bd-color','--br-tool-btn-color','--br-tool-btn-hover-color','--br-tool-s-input-bgc','--br-tool-s-input-color','--br-tool-s-input-bd-color','--br-tool-s-btn-bgc','--br-tool-s-btn-color','--br-tool-s-btn-bd-color','--br-tool-s-btn-hover-bgc','--br-tool-s-btn-hover-color','--br-tool-s-btn-hover-bd-color','--br-tool-s-input-focus-bd-color','--br-page-con-bgc','--br-h-panel-bgc','--br-h-con-bgc','--br-h-con-title-bd-color','--br-h-con-history-hover-bgc','--br-h-con-option-btn-color','--br-h-con-option-hover-btn-bgc','--br-h-con-option-hover-btn-color','--br-h-con-option-menu-btn-bgc','--br-h-con-option-menu-btn-color','--br-h-con-option-menu-btn-bd-color','--br-h-con-option-menu-hover-btn-bgc','--br-h-con-option-menu-hover-btn-bd-color','--br-h-con-menu-bgc','--br-h-con-menu-bd-color','--br-h-con-menu-btn-bgc','--br-h-con-menu-btn-hover-bgc','--br-h-con-menu-btn-color','--br-h-con-color','--br-h-bm-bgc','--br-h-bm-bd-color','--br-h-bm-btn-bgc','--br-h-bm-btn-color','--br-h-bm-btn-bd-color','--br-h-bm-btn-hover-bgc','--br-h-bm-btn-hover-color','--br-h-bm-btn-hover-bd-color','--br-h-row-img-bgc','--br-s-bgc','--br-s-input-bgc','--br-s-input-bd-color','--br-s-input-box-shadow','--br-s-input-ph-color','--br-s-input-hover-bd-color','--br-s-input-focus-bd-color','--br-s-input-focus-box-shadow','--br-s-input-color','--br-s-s-bgc','--br-s-s-color','--br-s-s-bd-color','--br-s-s-hover-bgc','--br-s-s-hover-color','--br-s-s-hover-bd-color','--br-s-s-box-shadow','--br-s-s-img-bgc','--br-s-s-img-box-shadow','--br-pg-ld-color','--br-jp-bgc','--br-jp-bd-color','--br-jp-input-color']
const browser_theme_themes = [
	[
		'#fff','#eee','#000','#ddd','#fff','#fff2','#111','#fff','#000','#fff','#fff','#ddd','#eee','#0af','#000','#000','#fff','#222','#eee','#eee','#222','#ddd','#ddd','#3498DB','#ddd','#3498DB','#fff','#eee','#fff','#ddd','#eee','#3334','#111','#fff','#fff','#111','#eee','#eee','#0af','#fff','#eee','transparent','#eee','#111','#222','#fff','#eee','transparent','#2488cb','#ddd','#2488cb10','#2488cb','#ddd','#fff', '#eee','#fff','#eee','0 3px 3px 0 rgba(0,0,0,.4)','#999','#0af','#b700ff','0 10px 10px 0 rgba(0,0,0,.3)','#222','transparent','#222','#ddd','#fff','#222','#ddd','0 1px 3px 0 rgba(0,0,0,.1)','#fff','0 1px 5px 0 rgba(0,0,0,.3)','#222','#fff','#eee','#222'
	],
	[
		'#000','#000','#fff','#000','#fff','#fff2','#333','#fff','#444','#333','transparent','transparent','transparent','transparent','#fff','#fff','#555','#fff','#444','#444','#fff','#333','#333','#3498DB','#222','#3498DB','#000','#222','#444','#333','#333','#eee6','#fff','#111','#333','#fff','#222','#444','#0af','#333','#222','transparent','#444','#fff','#fff','#222','#111','#333','#fff','#444','#2488cb10','#2488cb','#444','#fff', '#222','#111','#000','0 1px 7px 0 rgba(50,100,150,.4)','#999','#0af','#b700ff','0 10px 10px 0 rgba(0,0,0,.3)','#fff','transparent','#fff','#333','#444','#fff','#333','0 1px 4px 0 rgba(0,0,0,.1)','#fff','0 1px 6px 0 rgba(0,0,0,.3)','#fff','#222','#111','#fff'
	]
]