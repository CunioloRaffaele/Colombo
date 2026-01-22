import 'package:json_annotation/json_annotation.dart';

part 'reports_dto.g.dart';

@JsonSerializable()
class SessionsCounterDto {
  final int numeroSessioni;

  SessionsCounterDto({required this.numeroSessioni});

  factory SessionsCounterDto.fromJson(Map<String, dynamic> json) =>
      _$SessionsCounterDtoFromJson(json);
}

@JsonSerializable()
class GlobalEcoStatsDto {
  final double ecoscore;
  final int numeroSessioni;

  GlobalEcoStatsDto({required this.ecoscore, required this.numeroSessioni});

  factory GlobalEcoStatsDto.fromJson(Map<String, dynamic> json) =>
      _$GlobalEcoStatsDtoFromJson(json);
}

@JsonSerializable()
class MonthlyEcoStatsDto {
  final String message;
  final List<MonthlyEcoStatsSessionsDto>? sessioni;
  MonthlyEcoStatsDto({required this.message, this.sessioni});

  factory MonthlyEcoStatsDto.fromJson(Map<String, dynamic> json) =>
      _$MonthlyEcoStatsDtoFromJson(json);
}

@JsonSerializable()
class MonthlyEcoStatsSessionsDto {
  final int id;
  final String vettura;
  final String inizio;
  final double? km;
  final double? co2;
  final double? pm;
  final double? ecoscore;

  MonthlyEcoStatsSessionsDto({
    required this.id,
    required this.vettura,
    required this.inizio,
    this.km,
    this.co2,
    this.pm,
    this.ecoscore,
  });

  factory MonthlyEcoStatsSessionsDto.fromJson(Map<String, dynamic> json) =>
      _$MonthlyEcoStatsSessionsDtoFromJson(json);
}

@JsonSerializable()
class SessionDetailsDto {
  final String message;
  final int sessionId;
  final List<RilevazioneDto> rilevazioni;

  SessionDetailsDto({
    required this.message,
    required this.sessionId,
    required this.rilevazioni,
  });

  factory SessionDetailsDto.fromJson(Map<String, dynamic> json) =>
      _$SessionDetailsDtoFromJson(json);
}

@JsonSerializable()
class RilevazioneDto {
  final PuntoDto punto;
  final int punteggio;

  RilevazioneDto({required this.punto, required this.punteggio});

  factory RilevazioneDto.fromJson(Map<String, dynamic> json) =>
      _$RilevazioneDtoFromJson(json);
}

@JsonSerializable()
class PuntoDto {
  final String type;
  final List<double> coordinates;

  PuntoDto({required this.type, required this.coordinates});

  factory PuntoDto.fromJson(Map<String, dynamic> json) =>
      _$PuntoDtoFromJson(json);
}

@JsonSerializable()
class SessionSummaryDto {
  final String message;
  final double ecoscore;
  final double km;
  final String vin;
  final double pm;
  final double co2;
  @JsonKey(name: 'comuni_attraversati')
  final List<ComuneAttraversatoDto> comuniAttraversati;

  SessionSummaryDto({
    required this.message,
    required this.ecoscore,
    required this.km,
    required this.vin,
    required this.pm,
    required this.co2,
    required this.comuniAttraversati,
  });

  factory SessionSummaryDto.fromJson(Map<String, dynamic> json) =>
      _$SessionSummaryDtoFromJson(json);
}

@JsonSerializable()
class ComuneAttraversatoDto {
  final int istat;
  final String citta;
  final String regione;
  @JsonKey(name: 'zone_attraversate')
  final List<ZonaAttraversataDto> zoneAttraversate;

  ComuneAttraversatoDto({
    required this.istat,
    required this.citta,
    required this.regione,
    required this.zoneAttraversate,
  });
  factory ComuneAttraversatoDto.fromJson(Map<String, dynamic> json) =>
      _$ComuneAttraversatoDtoFromJson(json);
}

@JsonSerializable()
class ZonaAttraversataDto {
  @JsonKey(name: 'zona_id')
  final int zonaId;
  final double ecoscore;

  ZonaAttraversataDto({required this.zonaId, required this.ecoscore});

  factory ZonaAttraversataDto.fromJson(Map<String, dynamic> json) =>
      _$ZonaAttraversataDtoFromJson(json);
}
