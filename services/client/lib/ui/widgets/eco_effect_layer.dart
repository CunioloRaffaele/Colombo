import 'dart:math';
import 'package:flutter/material.dart';

class EcoEffectLayer extends StatefulWidget {
  final double score;

  const EcoEffectLayer({super.key, required this.score});

  @override
  State<EcoEffectLayer> createState() => _EcoEffectLayerState();
}

class _EcoEffectLayerState extends State<EcoEffectLayer>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<_Particle> _particles = [];
  final Random _random = Random();

  // Stato target (dove vogliamo arrivare)
  _ParticleType? _targetType;

  // Timer per evitare flickering se lo score cambia velocemente
  int _framesSinceLastStateChange = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat();
    _controller.addListener(_updateParticles);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _updateParticles() {
    _framesSinceLastStateChange++;

    // 1. DETERMINA IL TARGET TYPE (con un po' di isteresi)
    // Cambiamo target solo se lo score è stabile per qualche frame o se è molto netto
    _ParticleType? newTarget;
    if (widget.score >= 75) {
      newTarget = _ParticleType.leaf;
    } else if (widget.score <= 50) {
      newTarget = _ParticleType.smog;
    } else {
      newTarget = null; // Neutro
    }

    // Aggiorna il target solo se è diverso
    if (newTarget != _targetType) {
      _targetType = newTarget;
      _framesSinceLastStateChange = 0;
    }

    // 2. GESTIONE SPAWN (Transizione Lenta)
    // Invece di cancellare le particelle vecchie, smettiamo solo di crearne di quel tipo
    // e iniziamo a creare quelle nuove.

    int maxParticles = (_targetType == null)
        ? 0
        : (_targetType == _ParticleType.smog ? 40 : 20);

    // Contiamo quante particelle del TIPO CORRETTO abbiamo
    int currentCorrectParticles = _particles
        .where((p) => p.type == _targetType)
        .length;

    if (currentCorrectParticles < maxParticles && _targetType != null) {
      // Spawn rate leggermente più basso per rendere l'entrata graduale
      if (_random.nextDouble() < 0.03) {
        _particles.add(_createParticle(_targetType!));
      }
    }

    // 3. UPDATE PHYSICS
    for (var i = _particles.length - 1; i >= 0; i--) {
      final p = _particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Se la particella è del tipo "sbagliato" (vecchio stato), muore più in fretta
      if (p.type != _targetType) {
        p.life -= 0.01; // Fade out veloce per le vecchie
      } else {
        p.life -= 0.005; // Fade out normale
      }

      // Rimuovi se morta o fuori schermo
      if (p.life <= 0 || p.y < -0.2 || p.y > 1.2 || p.x < -0.2 || p.x > 1.2) {
        _particles.removeAt(i);
      }
    }

    setState(() {});
  }

  _Particle _createParticle(_ParticleType type) {
    if (type == _ParticleType.smog) {
      // SMOG: Nasce in basso, sale piano
      return _Particle(
        x: _random.nextDouble(),
        y: 1.1,
        speedX: (_random.nextDouble() - 0.5) * 0.002,
        speedY: -0.001 - (_random.nextDouble() * 0.002),
        size: 0.1 + _random.nextDouble() * 0.2,
        color: const Color.fromARGB(255, 178, 153, 153).withOpacity(0.3),
        rotation: 0,
        rotationSpeed: 0,
        type: _ParticleType.smog,
      );
    } else {
      // FOGLIE: Nascono a lato/alto
      return _Particle(
        x: -0.1,
        y: _random.nextDouble() * 0.8,
        speedX: 0.005 + _random.nextDouble() * 0.005,
        speedY: 0.002 + (_random.nextDouble() * 0.002),
        size: 0.02 + _random.nextDouble() * 0.02,
        color: const Color(0xFF4CAF50),
        rotation: _random.nextDouble() * pi,
        rotationSpeed: (_random.nextDouble() - 0.5) * 0.1,
        type: _ParticleType.leaf,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: CustomPaint(
        painter: _EcoEffectPainter(_particles),
        size: Size.infinite,
      ),
    );
  }
}

enum _ParticleType { smog, leaf }

class _Particle {
  double x, y;
  double speedX, speedY;
  double size;
  double rotation;
  double rotationSpeed;
  Color color;
  double life = 1.0;
  _ParticleType type;

  _Particle({
    required this.x,
    required this.y,
    required this.speedX,
    required this.speedY,
    required this.size,
    required this.color,
    required this.rotation,
    required this.rotationSpeed,
    required this.type,
  });
}

class _EcoEffectPainter extends CustomPainter {
  final List<_Particle> particles;

  _EcoEffectPainter(this.particles);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();

    for (final p in particles) {
      final dx = p.x * size.width;
      final dy = p.y * size.height;
      final radius = p.size * size.width;

      if (p.type == _ParticleType.smog) {
        paint.color = p.color.withOpacity(p.life * 0.4);
        paint.maskFilter = const MaskFilter.blur(BlurStyle.normal, 20);
        canvas.drawCircle(Offset(dx, dy), radius, paint);
      } else {
        paint.color = p.color.withOpacity(p.life);
        paint.maskFilter = null;
        canvas.save();
        canvas.translate(dx, dy);
        canvas.rotate(p.rotation);

        final path = Path();
        path.moveTo(0, -radius);
        path.quadraticBezierTo(radius, 0, 0, radius);
        path.quadraticBezierTo(-radius, 0, 0, -radius);
        path.close();

        canvas.drawPath(path, paint);
        canvas.restore();
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
