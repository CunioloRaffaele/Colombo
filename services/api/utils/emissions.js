const emissioniCO2 = {
    'Euro1': { diesel: 2.72, benzina: 2.72 },
    'Euro2': { diesel: 1.0, benzina: 2.2 },
    'Euro3': { diesel: 0.66, benzina: 2.3 },
    'Euro4': { diesel: 0.50, benzina: 1.0 },
    'Euro5a': { diesel: 0.50, benzina: 1.0 },
    'Euro5b': { diesel: 0.50, benzina: 1.0 },
    'Euro6b': { diesel: 0.50, benzina: 1.0 },
    'Euro6c': { diesel: 0.50, benzina: 1.0 },
    'Euro6d': { diesel: 0.50, benzina: 1.0 },
    'Euro7': { diesel: 0.50, benzina: 1.7 }
};

const emissioniPM = {
    'Euro1': { diesel: 0.14, benzina: 0.0 },
    'Euro2': { diesel: 0.08, benzina: 0.0 },
    'Euro3': { diesel: 0.05, benzina: 0.0 },
    'Euro4': { diesel: 0.025, benzina: 0.0 },
    'Euro5a': { diesel: 0.005, benzina: 0.005 },
    'Euro5b': { diesel: 0.0045, benzina: 0.0045 },
    'Euro6b': { diesel: 0.0045, benzina: 0.0045 },
    'Euro6c': { diesel: 0.0045, benzina: 0.0045 },
    'Euro6d': { diesel: 0.0045, benzina: 0.0045 },
    'Euro6e': { diesel: 0.0045, benzina: 0.0045 },
    'Euro7': { diesel: 0.0045, benzina: 0.0045 }
};

function getEuroCategory(year) {
    if (year >= 1993 && year < 1997) return 'Euro1';
    if (year >= 1997 && year < 2001) return 'Euro2';
    if (year >= 2001 && year < 2006) return 'Euro3';
    if (year >= 2006 && year < 2009) return 'Euro4';
    if (year >= 2009 && year < 2014) return 'Euro5a';
    if (year >= 2014 && year < 2017) return 'Euro5b';
    if (year >= 2017 && year < 2020) return 'Euro6b';
    if (year >= 2020 && year < 2023) return 'Euro6c';
    if (year >= 2023 && year < 2025) return 'Euro6d';
    if (year >= 2025) return 'Euro7';
    return null;
}
exports.pmPerKm = function (year) {
    const categoriaEuro = getEuroCategory(year);

    // Ottieni le emissioni per la categoria Euro
    const emissioni = emissioniCO2[categoriaEuro];
    if (emissioni) {
        const mediaCO2 = (emissioni.diesel + emissioni.benzina) / 2;
        return mediaCO2;
    } else {
        throw new Error("Categoria Euro non trovata.");
    }
}




exports.co2PerKm = function (year) {
    const categoriaEuro = getEuroCategory(year);

    // Ottieni le emissioni per la categoria Euro
    const emissioni = emissioniPM[categoriaEuro];
    if (emissioni) {
        const mediaPM = (emissioni.diesel + emissioni.benzina) / 2;
        return mediaPM;
    } else {
        throw new Error("Categoria Euro non trovata.");
    }
}