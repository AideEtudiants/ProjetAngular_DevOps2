export class ForumEntity{
    //ces variables auront une valeur à l'exécution
    id: number;
    title: string;
    description: string;
    idUser: number;
    startDate : Date;

     constructor(id: number,title: string,
        description: string,
        idUser: number,
        startDate: Date){
                this.description=description;
                this.idUser=idUser;
                this.title=title;
                this.startDate=startDate;
        }

}