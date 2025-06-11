export enum Priority{
    HIGH="alta", MEDIUM="media", LOW="baja"
}

export interface TaskUser{
    id:number,
    name:string,
    priority:Priority,
    description:string,
    done:boolean
}

