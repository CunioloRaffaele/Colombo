import 'package:json_annotation/json_annotation.dart';

part 'eco_tips_dto.g.dart';

@JsonSerializable()
class EcoTipsDto {
  final List<String> tips;

  EcoTipsDto({required this.tips});

  factory EcoTipsDto.fromJson(Map<String, dynamic> json) =>
      _$EcoTipsDtoFromJson(json);

  Map<String, dynamic> toJson() => _$EcoTipsDtoToJson(this);
}
