import 'package:flutter/material.dart';

// Global ValueNorifier to track the number of active loading requests.
/// This allows us to show or hide the loading overlay based on network activity.
final ValueNotifier<int> loadingRequestCount = ValueNotifier(0);

/// A widget that wraps the application and shows a loading overlay
/// when there are active network requests.
class LoadingOverlay extends StatelessWidget {
  final Widget child;

  const LoadingOverlay({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    // ValueListenableBuilder rebuilds every time loadingRequestCount changes.
    return ValueListenableBuilder<int>(
      valueListenable: loadingRequestCount,
      builder: (context, count, _) {
        // We use a Stack to overlay the loading indicator on top of the app content.
        return Stack(
          children: [
            // The main content of the app.
            child,
            // Show the overlay only if there is at least one active request.
            if (count > 0)
              Container(
                color: Colors.black.withOpacity(0.35),
                child: const Center(
                  child: CircularProgressIndicator(color: Colors.white),
                ),
              ),
          ],
        );
      },
    );
  }
}
