export function getValidFilters(filters) {
  return Object.entries(filters).reduce((acc, [option, value]) => {
    if (value !== "*") {
      acc[option] = value;
    }
    return acc;
  }, {});
}

export function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
