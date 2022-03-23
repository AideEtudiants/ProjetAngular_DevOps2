export class AnswerEntity{
    id: number;
    idForum : number;
    idUser: number;
    answer: string;
    startDate : Date;

    constructor(id: number, idForum: number,
        idUser: number,
        answer: string,
        startDate: Date){
                this.idForum=idForum;
                this.idUser=idUser;
                this.answer=answer;
                this.startDate=startDate;
        }
}