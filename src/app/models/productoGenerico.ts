export class ProductoGenerico{
    constructor(
        public id_producto_generico:number,
        public codigo_sociedad:string,
        public cod_linea: string,
        public linea:string,
        public cod_sublinea: string,
        public sublinea:string,
        public codigo_material: string,
        public material:string,
        public creado_por: string,
        public fecha_creacion:string,
        public estado: string,
        public unimed:string){

    }
}