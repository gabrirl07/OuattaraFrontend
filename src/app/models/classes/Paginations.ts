import {Pagination} from '../interfaces/global';

export class Paginations {

    private links: Pagination;

    constructor(links: any) {
        this.links = links;
    }

    extractFromUrl(url: any) {
        return new URLSearchParams(url);
    }

    get nextPage() {
        return this.extractFromUrl(this.links.next).get('page');
    }

    get hasNextPage() {
        return !!this.links.next;
    }

    get hasPrevPage() {
        return !!this.links.prev;
    }

    get prevPage() {
        return this.extractFromUrl(this.links.prev).get('page');
    }

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

}