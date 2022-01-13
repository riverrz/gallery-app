export function getValidFilters(filters) {
  return Object.entries(filters).reduce((acc, [option, value]) => {
    if (value !== "*") {
      acc[option] = value;
    }
    return acc;
  }, {});
}
