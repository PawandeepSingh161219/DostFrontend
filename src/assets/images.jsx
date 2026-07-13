const modules = import.meta.glob('./images/**/*.{png,jpg,jpeg,svg}', { eager: true });

export const IMAGES = Object.fromEntries(
  Object.entries(modules).map(([path, value]) => {
    const key = path
      .replace('./images/', '')      // remove images/
      .replace(/\.\w+$/, '')         // remove extension
      .replace(/\//g, '_');          // replace folder with underscore

    return [key, value.default];
  })
);
