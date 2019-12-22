const BASE64_MARKER = ';base64,';

export const convertDataUriToBinary = (dataURI: string) => {
  console.log(dataURI);
  try {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  } catch (e) {
    try {
      dataURI = dataURI.replace(/%2/g, '/');
      const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      const base64 = dataURI.substring(base64Index);
      const raw = window.atob(base64);
      const rawLength = raw.length;
      const array2 = new Uint8Array(new ArrayBuffer(rawLength));
      for (let j = 0; j < rawLength; j++) {
        array2[j] = raw.charCodeAt(j);
      }
      return array2;
    } catch (e) {
      console.error(e);
      throw new Error('failed to convertDataUriToBinary');
    }
  }
};
