/**
 * @param {*} type type of image (users/sets/items)
 * @param {*} filename name of file including extension
 * @returns server path of file
 */
export function getImagePath(type, filename) {

    let str = window.location.hostname + '/storage';

    switch (type) {
        case 'user':
            str += '/users/' + filename;
            break;
        case 'set':
            str += '/sets/' + filename;
            break;
        case 'item':
            str += '/items/' + filename;
            break;
        default:
            console.error('Error');
            break;
    }
    return str;
}