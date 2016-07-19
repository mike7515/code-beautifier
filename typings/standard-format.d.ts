declare module "standard-format" {
	interface IStandardFormat {
		(file:string): string;
	}
	
	export var transform:IStandardFormat;	
}