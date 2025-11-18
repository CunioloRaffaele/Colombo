import 'package:json_annotation/json_annotation.dart';

part 'registration_request_dto.g.dart';

@JsonSerializable()
class RegistrationRequestDto {
  final String email;
  final String password;
  final String nome;
  final DateTime data_nascita;
  //final String municipality;

  RegistrationRequestDto({required this.email, required this.password, required this.nome, required this.data_nascita, /*required this.municipality*/});

  Map<String, dynamic> toJson() => _$RegistrationRequestDtoToJson(this);
}