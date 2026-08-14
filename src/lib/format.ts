const CO = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

export const money = (n: number): string => "$" + CO.format(Math.round(n));

export const percent = (n: number, digits = 1): string =>
  (n * 100).toFixed(digits).replace(".", ",") + "%";
