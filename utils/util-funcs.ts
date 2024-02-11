export const calculateTemp = (temp: number, unit: string) => {
  const tempC = temp - 273;
  let tempFinal;
  if (unit === "far") {
    tempFinal = `${(tempC * (9 / 5) + 32).toFixed(1)} °F`;
  } else tempFinal = `${tempC.toFixed(1)} °C`;
  return tempFinal;
};

export const calculateAccent = (temp: number) => {
  const tempC = temp - 273;
  if (tempC < 10) return "bg-[#83a598]";
  else if (10 <= tempC && tempC < 20) return "bg-[#8ec07c]";
  else if (20 <= tempC && tempC < 30) return "bg-[#b8bb26]";
  else if (30 <= tempC && tempC < 40) return "bg-[#fabd2f]";
  else if (40 <= tempC && tempC < 50) return "bg-[#fe8019]";
  else return "bg-[#fb4934]";
};

export const toTitleCase = (val: string) => {
  return val[0].toLocaleUpperCase() + val.substring(1);
};
