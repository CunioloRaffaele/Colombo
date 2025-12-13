import 'package:flutter/material.dart';

class UserInfoPage extends StatelessWidget {
  final String nome;
  final String cognome;
  final String email;
  final String codiceIstat;
  final String comune;
  final bool comuneRegistrato;
  final int veicoliRegistrati;
  final int sessioniGuida;
  final String serverInfo;

  const UserInfoPage({
    super.key,
    required this.nome,
    required this.cognome,
    required this.email,
    required this.codiceIstat,
    required this.comune,
    required this.comuneRegistrato,
    required this.veicoliRegistrati,
    required this.sessioniGuida,
    required this.serverInfo,
  });

  static const _accent = Color(0xFF1EAE98);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        backgroundColor: Colors.black.withOpacity(0.25),
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        foregroundColor: Colors.white,
        title: const Text('Informazioni account'),
      ),
      body: DecoratedBox(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF0E1116), Color(0xFF1E2A38)],
          ),
        ),
        child: SafeArea(
          child: SizedBox.expand(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    children: [
                      _infoRow('Nome', nome.toUpperCase()),
                      _infoRow('Cognome', cognome.toUpperCase()),
                      _infoRow('Email', email),
                      _infoRow('Codice ISTAT residenza', codiceIstat),
                      _infoRow('Comune di residenza', comune),
                      _infoRow(
                        'Stato comune',
                        comuneRegistrato
                            ? 'Registrato al servizio Colombo'
                            : 'Non registrato al servizio Colombo',
                        highlight: true,
                        highlightColor: comuneRegistrato
                            ? _accent
                            : Colors.amber,
                      ),
                      _infoRow(
                        'Veicoli registrati',
                        veicoliRegistrati.toString(),
                      ),
                      _infoRow(
                        'Sessioni di guida effettuate',
                        sessioniGuida.toString(),
                      ),
                      _infoRow('Istanza server Colombo', serverInfo),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _infoRow(
    String label,
    String value, {
    bool highlight = false,
    Color? highlightColor,
  }) {
    final textColor = Colors.white.withOpacity(0.9);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 5,
            child: Text(
              label,
              style: TextStyle(
                color: Colors.white.withOpacity(0.7),
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Expanded(
            flex: 7,
            child: Text(
              value,
              style: TextStyle(
                color: highlight ? (highlightColor ?? _accent) : textColor,
                fontSize: 14,
                fontWeight: highlight ? FontWeight.w700 : FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
