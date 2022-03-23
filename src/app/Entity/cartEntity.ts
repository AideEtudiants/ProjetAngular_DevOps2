export class Cart{
    id: number ; 
    idProduct: number ; 
    idUser: number  = 4;
    quantity : number;
    constructor(idPrduct : number ,idUser:number){
        this.idProduct =idPrduct ;
        this.idUser=idUser;   
    }
   

}
