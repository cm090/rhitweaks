import { BannerData } from '../../../types';

type Listener = {
  callback: (oldData: BannerData, newData: BannerData) => void;
};

const getDataObject = (): Promise<BannerData> =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get('bannerData', (data) => {
        if (!data.bannerData) {
          throw new Error('Data not found');
        }
        resolve(data.bannerData);
      });
    } catch (e) {
      reject(e);
    }
  });

const dataListeners: Listener[] = [];

const onDataChanged = (callback: Listener['callback']) =>
  dataListeners.push({ callback });

const removeChangeListeners = () => dataListeners.splice(0);

chrome.storage.local.onChanged.addListener((changes) => {
  for (const listener of dataListeners) {
    if (changes.bannerData) {
      listener.callback(
        changes.bannerData.oldValue,
        changes.bannerData.newValue,
      );
    }
  }
});

export default { getDataObject, onDataChanged, removeChangeListeners };
