export const now = () => {
  const date = new Date();
  return date.getTime();
};

export const dateStringToTimestamp = (str: string) => {
  const date = new Date(str);
  return date.getTime();
};

export const isOver18 = (birthDateTimestamp: number) => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 18); // Subtract 18 years from the current date
  const eighteenYearsAgoTimestamp = currentDate.getTime();

  return birthDateTimestamp <= eighteenYearsAgoTimestamp;
};

export const getAge = (birthDateTimestamp: number) => {
  const currentDate = new Date();
  const date = new Date(birthDateTimestamp);
  return currentDate.getFullYear() - date.getFullYear();
};

export const getBaseUrl = (url: string) => {
  try {
    const { protocol, hostname } = new URL(url);
    return `${protocol}//${hostname}`;
  } catch (e) {
    return null;
  }
};

export function truncateEthereumAddress(address: string): string {
  const prefixLength = 4; // Number of characters to keep after "0x" at the start
  const suffixLength = 4; // Number of characters to keep at the end

  if (address.length <= 2 + prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.substr(0, 2 + prefixLength);
  const suffix = address.substr(-suffixLength);
  return `${prefix}...${suffix}`;
}
