export class ProductEntity{
    //ces variables auront une valeur à l'exécution
    id!: number;
    name!: string;
	image!: string;
    description!: string;
    statusCode!: number;
    categoryCode!: number;
    availability!: number;
    idUser! : number;
    price : number;
    startDate : Date ;

}
