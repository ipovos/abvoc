const LOCALSTORAGE_KEY = 'abvoc/state';

/**
 *
 * @param {string} data
 */
export const exportData = (data) => {
  const dataString =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(data);

  const downloadAnchorElem = document.createElement('a');
  downloadAnchorElem.setAttribute('href', dataString);
  downloadAnchorElem.setAttribute(
    'download',
    `vocabulary-${new Date()
      .toISOString()
      .replace(/:/g, '_')}.json`,
  );
  downloadAnchorElem.click();
};

/**
 *
 * @param {string} data
 */
export const persistData = (data) => {
  localStorage.setItem(LOCALSTORAGE_KEY, data);
};

export const restoreData = () => {
  return new Promise((resolve, reject) => {
    const persistedString = localStorage.getItem(
      LOCALSTORAGE_KEY,
    );

    if (!persistedString) {
      reject();
    }

    resolve(persistedString);
  });
};
