/**
 * Check if the window object is available.
 *
 * This function is used to verify if the code is running in a browser environment
 * where the window object is accessible. It can be helpful in scenarios where
 * the app uses server-side rendering (SSR) and certain code should only run
 * on the client-side.
 *
 * @throws {Error} Will throw an error if the window object is not available, likely due to server-side rendering (SSR).
 */
export function checkIfWindowIsAvailable() {
  const isNotAvailable: boolean = typeof window === 'undefined';
  if (isNotAvailable) {
    throw new Error(
      `Window object is not available, this is probably due to the fact that the app uses server-side rendering (SSR).`
    );
  }
}

/**
 * Check if the viewport matches a media query for a maximum width of 768 pixels (mobile viewport).
 *
 * @returns {boolean} - True if the viewport matches the mobile media query, false otherwise.
 */
export function isMobileViewport(): boolean {
  checkIfWindowIsAvailable();

  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Check if the user's preferred color scheme is set to dark mode.
 *
 * @returns {boolean} - True if the user's preferred color scheme is dark, false otherwise.
 */
export function isDarkMode(): boolean {
  checkIfWindowIsAvailable();

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get the dimensions of the window viewport.
 *
 * @throws {Error} Will throw an error if the window object is not available, likely due to server-side rendering (SSR).
 *
 *
 * @returns {{width, height}} - An object containing the width and height of the window viewport in pixels.
 */
export function getWindowDimensions(): { width: number; height: number } {
  checkIfWindowIsAvailable();

  const { innerWidth, innerHeight } = window;

  return {
    width: innerWidth,
    height: innerHeight,
  };
}

/**
 * Scroll the window to the top.
 */
export function scrollWindowTo(x: number = 0, y: number = 0): void {
  checkIfWindowIsAvailable();

  window.scrollTo(x, y);
}
