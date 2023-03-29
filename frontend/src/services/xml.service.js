const { XMLParser } = require("fast-xml-parser");

const xmlParserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: '_',
};

function transformData(fencer) {
    return {
        id: fencer._ID,
        nom: fencer._Nom,
        pre_nom: fencer._Prenom,
        sexe: fencer._Sexe,
        lateralite: fencer._Lateralite,
        classement: fencer._Classement,
        date_naissance: fencer._DateNaissance,
        licence: fencer._Licence,
        nation: fencer._Nation ?? "",
        club: fencer._Club ?? "",
        points: fencer._Points,
        statut: fencer._Statut
    }
}

function parseFencers(xmlFile, generateDataGrid, setFencerArray) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const xmlString = e.target.result;

        const parser = new XMLParser(xmlParserOptions);
        const rawData = parser.parse(xmlString);
        let fencers = rawData.BaseCompetitionIndividuelle.Tireurs.Tireur;
        fencers = fencers.map(f => transformData(f));
        generateDataGrid(fencers);
        setFencerArray(fencers);
    };
    reader.readAsText(xmlFile);
}

export {
    parseFencers,
}