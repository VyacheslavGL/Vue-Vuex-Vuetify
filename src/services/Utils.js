export async function saveDrawerState(status){
    localStorage.setItem('DOGS_MENU_STATUS', status);
}

export async function getDrawerState(){
    return localStorage.getItem('DOGS_MENU_STATUS') === 'true';
}