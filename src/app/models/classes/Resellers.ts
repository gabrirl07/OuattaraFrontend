import {Agent} from '../interfaces/agent';
import {ClassUtils} from './ClassUtils';

export class Resellers extends ClassUtils {

    instance: Agent;

    constructor(data: Agent) {
        super();
        this.instance = data;
    }

    get fullName() {
        return this.instance.firstname + ' ' + this.instance.lastname;
    }

}