import 'package:json_annotation/json_annotation.dart';

part 'registration_request_dto.g.dart';

@JsonSerializable()
class RegistrationRequestDto {
  final String nome;
  final String cognome;
  final String email;
  final String password;
  final int residenza;

  RegistrationRequestDto({
    required this.nome,
    required this.cognome,
    required this.email,
    required this.password,
    required this.residenza,
  });

  Map<String, dynamic> toJson() => _$RegistrationRequestDtoToJson(this);
}
