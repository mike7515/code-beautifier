declare module "js-beautify" {
	
	interface options {
		indent_size?: number;
	}
	
	interface css {
		(value:string, options:options): string;
	}
	
    interface js {
		(value:string, options:options): string;
	}
    
    interface html {
		(value:string, options:options): string;
	}
    
	export var css:css;
    export var js:js;
    export var html:html;
    
}