/*

// TUTTO RUNNATO IN THRED SEPARATO (che viene creato da fuori)

// 1 Accumula dati per i pid supportati (usa dirive elm327)
// 1.1 a inizio sessione salva odometro
// 1.2 Associa posizione geografica alla lettura (loaction_service determinePosition)

// 2 Creare un mock ecoscore locale

// 3 Fare encode dei dati in protobuf

// 4 Invia i dati al server ogni tot minuti (dico io?) in un thread separato (crei una funzione per l'upload separata e la chiami in un isolate)

// 5 A fine sessione fai odometro finale - odometro iniziale = distanza percorsa e la invii
// 5 Crea funzione per stop per ????????????

 */
