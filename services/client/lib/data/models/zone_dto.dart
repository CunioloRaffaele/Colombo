import 'package:json_annotation/json_annotation.dart';

part 'zone_dto.g.dart';

@JsonSerializable()
class ZoneDto {
  final int id;
  final Map<String, dynamic> geometry;
  final String tipologia;

  ZoneDto({
    required this.id,
    required this.geometry,
    required this.tipologia,
  });

  factory ZoneDto.fromJson(Map<String, dynamic> json) =>
      _$ZoneDtoFromJson(json);

  Map<String, dynamic> toJson() => _$ZoneDtoToJson(this);
}

@JsonSerializable()
class ZoneResponseDto {
  final List<ZoneDto> zones;

  ZoneResponseDto({required this.zones});

  factory ZoneResponseDto.fromJson(Map<String, dynamic> json) =>
      _$ZoneResponseDtoFromJson(json);

  Map<String, dynamic> toJson() => _$ZoneResponseDtoToJson(this);
}
