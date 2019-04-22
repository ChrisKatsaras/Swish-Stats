export function importTeamLogos(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('.svg', '').replace('./','')] = r(item); });
    return images;  
}