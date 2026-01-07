const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    try {
      // Handle empty or undefined content
      if (!content || content.trim() === '') {
        console.warn('Warning: hugo_stats.json is empty, skipping CSS purging');
        return [];
      }
      
      // Parse JSON safely
      const parsed = JSON.parse(content);
      
      // Ensure htmlElements exists and has expected structure
      if (!parsed || !parsed.htmlElements) {
        console.warn('Warning: hugo_stats.json has invalid structure, skipping CSS purging');
        return [];
      }
      
      const els = parsed.htmlElements;
      return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
      
    } catch (error) {
      console.warn('Warning: Failed to parse hugo_stats.json, skipping CSS purging:', error.message);
      // Return empty array to avoid breaking the build
      return [];
    }
  },
  safelist: [
    /dark/,
    /^swiper-/,
    /collapsing/,
    /show/,
    /[aria-expanded=true]/,
    /[aria-expanded=false]/,
    /^lb-/,
    /^gl/,
    /^go/,
    /^gc/,
    /^gs/,
    /^gi/,
    /^desc/,
    /^zoom/,
    /dragging/,
    /fullscreen/,
    /loaded/,
    /visible/,
    /current/,
    /active/,
    /w-100/,
  ],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
