import 'package:json_annotation/json_annotation.dart';

part 'reports_dto.g.dart';

@JsonSerializable()
class SessionsCounterDto {
  final int numeroSessioni;

  SessionsCounterDto({required this.numeroSessioni});

  factory SessionsCounterDto.fromJson(Map<String, dynamic> json) =>
      _$SessionsCounterDtoFromJson(json);
}
