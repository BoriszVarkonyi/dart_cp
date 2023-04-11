function translateWeaponType(type) {
    switch (type) {
        case 'E':
            return 'Epee';
        case 'F':
            return 'Foil';
        default:
            return 'Sabre';
    }
}

function translateCompType(type) {
    return type === 'I' ? 'Individual' : 'Team';
}

function translateSex(sex) {
    switch (sex) {
        case 'F':
            return 'Female';
        case 'M':
            return 'Male';
        default:
            return 'Mix';
    }
}

//TODO
function translateStatus(status) {
    return status;
}

function translateLateralite(lateralite) {
    return lateralite === 'D' ? 'Droit' : 'Gauche';
}

export { 
    translateCompType,
    translateWeaponType,
    translateSex,
    translateStatus,
    translateLateralite,
};