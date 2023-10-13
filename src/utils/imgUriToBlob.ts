export const imgUriToBlob = (image: string) => {
  return new Promise<Blob>((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.open('GET', image);
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new Error());
      xhr.send();
    } catch (error) {
      reject(error);
    }
  });
};
