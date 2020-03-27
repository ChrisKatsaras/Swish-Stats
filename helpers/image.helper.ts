export function importTeamLogos(r: any) {
    const images: { [key: string]: string } = {};
    r.keys().map((item: any) => {
        images[item.replace(".svg", "").replace("./", "")] = r(item);
    });

    return images;
}
