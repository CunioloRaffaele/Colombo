var vinDecoder = require('universal-vin-decoder');

// Mappa base degli anni (Ciclo ISO 3779 standard 1980-2009)
// Escludiamo I, O, Q, U, Z (che non sono usati per gli anni)
exports.BASE_YEAR_MAP = {
  'A': 1980, 'B': 1981, 'C': 1982, 'D': 1983, 'E': 1984, 'F': 1985, 'G': 1986,
  'H': 1987, 'J': 1988, 'K': 1989, 'L': 1990, 'M': 1991, 'N': 1992, 'P': 1993,
  'R': 1994, 'S': 1995, 'T': 1996, 'V': 1997, 'W': 1998, 'X': 1999, 'Y': 2000,
  '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005, '6': 2006, '7': 2007,
  '8': 2008, '9': 2009
};

/**
 * Funzione Sliding Window
 * Calcola l'anno corretto basandosi sulla data corrente.
 * Se "G" (1986) + 30 anni è ancora nel passato/presente, lo aggiorna a 2016.
 */
exports.getSmartYear = function(yearChar) {
    if (!exports.BASE_YEAR_MAP[yearChar]) return null;

    let calculatedYear = exports.BASE_YEAR_MAP[yearChar];
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1; // Permettiamo modelli dell'anno prossimo

    // Finché aggiungere 30 anni non supera l'anno prossimo, aggiorna l'anno.
    // Esempio: 1986 + 30 = 2016. (2016 <= 2026? Sì -> Nuovo anno = 2016)
    //          2016 + 30 = 2046. (2046 <= 2026? No -> Stop)
    while ((calculatedYear + 30) <= nextYear) {
        calculatedYear += 30;
    }

    return calculatedYear;
}

exports.getVIN = function(vin) {
  const inputVin = vin.toUpperCase();
  
  // 1. Decodifica base con la libreria
  let decodedData = vinDecoder.decodeVIN(inputVin);
  
  // 2. Logica correttiva (Patch)
  // La 10^ cifra (indice 9) è l'anno nello standard ISO e NHTSA
  const yearChar = inputVin.charAt(9); 
  const smartYear = exports.getSmartYear(yearChar);

  // 3. Sovrascriviamo l'anno se la nostra logica ha trovato un risultato migliore
  if (smartYear) {
      // Aggiorniamo l'oggetto ritornato dalla libreria
      // Nota: universal-vin-decoder potrebbe non avere "modelYear" se il VIN è confuso dai ZZZ,
      // quindi lo forziamo noi.
      decodedData = decodedData || {}; // Safety check
      decodedData.modelYear = smartYear;
  }

return decodedData 
};