export const getLines = async (filePath: string) => {
  const text = await Deno.readTextFile(filePath);
  return text.split("\n");
};

export const getLinesAsNumbers = async (filePath: string) => {
  const text = await getLines(filePath);
  return text.map((x) => +x);
};
