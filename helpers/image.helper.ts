export function importTeamLogos(r) {
    const images: { [key: string]: string } = {};
    r.keys().map(item => {
        images[item.replace(".svg", "").replace("./", "")] = r(item);
    });

    return images;
}
