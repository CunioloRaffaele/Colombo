import 'package:json_annotation/json_annotation.dart';

part 'user_dto.g.dart';

@JsonSerializable()
class UserDto {
  final String nome;
  final String cognome;
  final String email;
  final int residenza;

  UserDto({
    required this.nome,
    required this.cognome,
    required this.email,
    required this.residenza,
  });

  factory UserDto.fromJson(Map<String, dynamic> json) =>
      _$UserDtoFromJson(json);
  Map<String, dynamic> toJson() => _$UserDtoToJson(this);
}
