import { browser } from '$app/environment';

export let urlState = $state('localhost');

export function setUrl() {
    if(browser){
        const url = window.location.pathname;  
        urlState = url.endsWith('/') ? url.slice(0, -1) : url;
    }
}