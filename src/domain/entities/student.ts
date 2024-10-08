import { randomUUID } from "node:crypto"

class Student {
    public id: string
    public name: string
    

    constructor(title: string, id?: string) {
        this.name = title
        this.id = id ?? randomUUID()
    }
}