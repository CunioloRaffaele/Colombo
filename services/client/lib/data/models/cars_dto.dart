import 'package:json_annotation/json_annotation.dart';

part 'cars_dto.g.dart';

@JsonSerializable()
class CarDto {
  final String proprietario;
  final String vin;

  CarDto({required this.proprietario, required this.vin});

  factory CarDto.fromJson(Map<String, dynamic> json) => _$CarDtoFromJson(json);
  Map<String, dynamic> toJson() => _$CarDtoToJson(this);
}

@JsonSerializable()
class CarResponseDto {
  final String message;
  final List<CarDto> cars;

  CarResponseDto({required this.message, required this.cars});

  factory CarResponseDto.fromJson(Map<String, dynamic> json) =>
      _$CarResponseDtoFromJson(json);
  Map<String, dynamic> toJson() => _$CarResponseDtoToJson(this);
}

@JsonSerializable()
class CarDetailsResponseDto {
  final String message;
  final CarDetailsResultDto result;

  CarDetailsResponseDto({required this.message, required this.result});

  factory CarDetailsResponseDto.fromJson(Map<String, dynamic> json) =>
      _$CarDetailsResponseDtoFromJson(json);
  Map<String, dynamic> toJson() => _$CarDetailsResponseDtoToJson(this);
}

@JsonSerializable()
class CarDetailsResultDto {
  final String vin;
  final bool isValid;
  final CarDetailsInfoDto info;
  final int? modelYear;
  final double co2Perkm;
  final double pmPerkm;

  CarDetailsResultDto({
    required this.vin,
    required this.isValid,
    required this.info,
    this.modelYear,
    required this.co2Perkm,
    required this.pmPerkm,
  });

  factory CarDetailsResultDto.fromJson(Map<String, dynamic> json) =>
      _$CarDetailsResultDtoFromJson(json);
  Map<String, dynamic> toJson() => _$CarDetailsResultDtoToJson(this);
}

@JsonSerializable()
class CarDetailsInfoDto {
  final String? region;
  final String? country;
  final String? modelYear;
  final String? manufacturer;

  CarDetailsInfoDto({
    this.region,
    this.country,
    this.modelYear,
    this.manufacturer,
  });

  factory CarDetailsInfoDto.fromJson(Map<String, dynamic> json) =>
      _$CarDetailsInfoDtoFromJson(json);
  Map<String, dynamic> toJson() => _$CarDetailsInfoDtoToJson(this);
}
