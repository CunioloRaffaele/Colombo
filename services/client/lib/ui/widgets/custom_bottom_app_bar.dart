/// CREDITS TO: Glow Bottom App Bar - https://pub.dev/packages/glow_bottom_app_bar
/// Customized version of the GlowBottomAppBar widget

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';

///
/// [GlowBottomAppBar] is a simple Bottom App Bar with Glowing transition
/// effect to provide a beautiful effect for navigation
///
class GlowBottomAppBar extends StatefulWidget {
  /// This is a constructor to initialize the [GlowBottomAppBar]
  const GlowBottomAppBar({
    super.key,
    required this.onChange,
    required this.children,
    required this.selectedChildren,
    this.height = 60.0,
    this.iconSize = 40.0,
    this.duration = const Duration(milliseconds: 1000),
    this.glowColor = Colors.blueAccent,
    this.shadowColor = Colors.black26,
    this.initialIndex = 0,
    this.background,
    this.width,
  });

  /// [GlowBottomAppBar.children] is a list of widgets used to render widgets
  /// to be shown in the bottom app bar
  final List<Widget> children;

  /// [GlowBottomAppBar.selectedChildren] is a list of widgets used to denote
  /// the selected child  when an element from [GlowBottomAppBar.children] list is selected
  final List<Widget> selectedChildren;

  /// [GlowBottomAppBar.initialIndex] is the index of
  /// [GlowBottomAppBar.children]'s widget to be rendered when instantiated
  final int initialIndex;

  /// Callback function [GlowBottomAppBar.onChange] is used to fetch the index
  /// of selected [GlowBottomAppBar.children]
  final Function(int) onChange;

  /// [GlowBottomAppBar.height] overrides the default height of the
  /// [GlowBottomAppBar]
  final double height;

  /// [GlowBottomAppBar.width] overrides the default width of the
  /// [GlowBottomAppBar]
  final double? width;

  /// [GlowBottomAppBar.iconSize] overrides the default size of the
  /// [GlowBottomAppBar.children] and [GlowBottomAppBar.selectedChildren]
  final double iconSize;

  /// [GlowBottomAppBar.duration] overrides the default duration of the
  /// [GlowBottomAppBar]
  /// animation
  final Duration duration;

  /// [GlowBottomAppBar.glowColor] overrides the default glow color of the
  /// [GlowBottomAppBar]
  final Color glowColor;

  /// [GlowBottomAppBar.background] overrides the default background color of
  /// the [GlowBottomAppBar]
  final Color? background;

  /// [GlowBottomAppBar.shadowColor] overrides the default shadow color of
  /// the [GlowBottomAppBar]
  final Color shadowColor;

  @override
  State<GlowBottomAppBar> createState() => _GlowBottomAppBarState();
}

class _GlowBottomAppBarState extends State<GlowBottomAppBar>
    with SingleTickerProviderStateMixin {
  final Map<GlobalKey, Widget> list = {};
  final List<GlobalKey> keys = [];
  int oldIndex = 0;
  double? from;
  double? to;
  late Animation<double> scaleAnim;
  late Animation<double> slideAnim;
  late AnimationController animationController;
  Color? background;
  double? width;
  double? margin;

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant GlowBottomAppBar oldWidget) {
    if (oldIndex != widget.initialIndex) {
      if (widget.initialIndex < keys.length) {
        setState(() {
          to = getXOffset(widget.initialIndex);
          createSlideAnim(from!, to!);
          oldIndex = widget.initialIndex;
          buildChildren();
        });
      } else {
        setState(() {
          to = 0;
          createSlideAnim(from!, to!);
          oldIndex = -1;
          buildChildren();
        });
      }
      oldIndex = widget.initialIndex;
      animationController.forward();
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  void initState() {
    oldIndex = widget.initialIndex;
    generateKeys();
    buildChildren();

    background = widget.background;
    width = widget.width;

    animationController = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    scaleAnim =
        TweenSequence<double>([
          TweenSequenceItem(
            tween: Tween<double>(begin: 0, end: 1),
            weight: 0.5,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 1),
            weight: 0.5,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 1),
            weight: 0.5,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 0.5),
            weight: 1,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 0.5, end: 1),
            weight: 1,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 1),
            weight: 0.5,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 1),
            weight: 0.5,
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: 1, end: 0),
            weight: 0.5,
          ),
        ]).animate(
          CurvedAnimation(parent: animationController, curve: Curves.linear),
        );

    createSlideAnim(0, 0);

    animationController.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() {
          from = to!;
          to = null;
          buildChildren();
          createSlideAnim(from!, 0);
        });
        animationController.reset();
      }
    });

    super.initState();
  }

  void createSlideAnim(double begin, double end) {
    slideAnim = Tween<double>(begin: begin, end: end).animate(
      CurvedAnimation(
        parent: animationController,
        curve: const Interval(0.375, 0.625, curve: Curves.linear),
      ),
    );
  }

  double getXOffset(index) {
    final GlobalKey iconKey = list.keys.toList()[index];
    RenderBox box = iconKey.currentContext?.findRenderObject() as RenderBox;
    Offset offset = box.localToGlobal(Offset.zero);
    return offset.dx - margin!;
  }

  void startAnimation(int index) {
    if (index != oldIndex) {
      setState(() {
        to = getXOffset(index);
        createSlideAnim(from!, to!);
        oldIndex = -1;
        buildChildren();
      });
      oldIndex = index;
      animationController.forward();
      widget.onChange(index);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    background ??= Theme.of(context).scaffoldBackgroundColor;
    width ??= screenSize.width / 1.3;
    margin ??= (screenSize.width - width!) / 2;

    SchedulerBinding.instance.addPostFrameCallback((_) {
      if (from == null) {
        setState(() {
          from = getXOffset(widget.initialIndex);
          createSlideAnim(from!, 0);
        });
      }
    });

    return Padding(
      padding: EdgeInsets.only(bottom: 20, right: margin!, left: margin!),
      child: LiquidGlassLayer(
        child: LiquidStretch(
          stretch: 0.5,
          interactionScale: 0.90,
          child: LiquidGlass(
            shape: LiquidRoundedSuperellipse(borderRadius: widget.height / 2),
            child: Container(
              height: widget.height,
              clipBehavior: Clip.hardEdge,
              decoration: BoxDecoration(
                color: background,
                borderRadius: BorderRadius.circular(widget.height / 2),
                boxShadow: [
                  BoxShadow(blurRadius: 10, color: widget.shadowColor),
                ],
              ),
              child: Stack(
                children: [
                  AnimatedBuilder(
                    animation: animationController,
                    builder: (context, _) {
                      return Container(
                        transform: Matrix4.translationValues(
                          slideAnim.value,
                          ((widget.height / 2) - (widget.iconSize / 2)),
                          0,
                        ),
                        height: widget.iconSize,
                        width: widget.iconSize,
                        alignment: Alignment.center,
                        child: Container(
                          height: 0.0001,
                          width: 0.0001,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: widget.glowColor,
                            boxShadow: [
                              BoxShadow(
                                color: widget.glowColor,
                                blurRadius:
                                    widget.iconSize * 1.5 * scaleAnim.value,
                                spreadRadius:
                                    widget.iconSize * 1.5 * scaleAnim.value,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: getChildren(),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> getChildren() {
    final List<Widget> widgets = [];
    for (var i in list.keys) {
      widgets.add(list[i]!);
    }
    return widgets;
  }

  void generateKeys() {
    for (var index = 0; index < widget.children.length; index++) {
      final key = GlobalKey();
      keys.add(key);
    }
  }

  void buildChildren() {
    list.clear();
    for (var index = 0; index < widget.children.length; index++) {
      list[keys[index]] = GestureDetector(
        onTap: () => startAnimation(index),
        child: SizedBox(
          key: keys[index],
          height: widget.iconSize,
          width: widget.iconSize,
          child: oldIndex == index
              ? widget.selectedChildren[index]
              : widget.children[index],
        ),
      );
    }
  }
}
