// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const barChartFormat = (data: any[] | undefined) => {
  if (!data) return;
  return data.map((obj) => {
    const claves = Object.keys(obj);
    const dataFormated: { name: string; data: number } = {
      name: obj[claves[0]],
      data: obj[claves[1]],
    };
    return dataFormated;
  });
};
