import { BannerData, MoodleData, ScheduleData, StorageData } from '../../types';

export enum DataType {
  MoodleData = 'moodleData',
  ScheduleData = 'scheduleData',
  BannerData = 'bannerData',
}

type DataObject = {
  moodleData: MoodleData;
  scheduleData: ScheduleData;
  bannerData: BannerData;
};

type KeyType = keyof MoodleData | keyof BannerData | keyof ScheduleData;

type ValueType =
  | MoodleData[keyof MoodleData]
  | BannerData[keyof BannerData]
  | ScheduleData[keyof ScheduleData];

type Listener = {
  scope: DataType;
  callback: (oldData: StorageData, newData: StorageData) => void;
};

const getAllData = (): Promise<DataObject> =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(null, (data) => {
        if (!data) {
          throw new Error('Data not found');
        }
        resolve(data as DataObject);
      });
    } catch (e) {
      reject(e);
    }
  });

const getDataObject = (scope: DataType): Promise<StorageData> =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(scope, (data) => {
        if (!data[scope]) {
          throw new Error('Data not found');
        }
        resolve(data[scope]);
      });
    } catch (e) {
      reject(e);
    }
  });

const getDataItem = (scope: DataType, key: KeyType): Promise<ValueType> =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(scope, (data) => {
        if (!data[scope] || !data[scope][key]) {
          throw new Error('Data not found');
        }
        resolve(data[scope][key]);
      });
    } catch (e) {
      reject(e);
    }
  });

const setAllData = (data: DataObject) => chrome.storage.local.set(data);

const setDataObject = (scope: DataType, key: KeyType, value: ValueType) =>
  getDataObject(scope).then((data) =>
    chrome.storage.local.set({
      [scope]: {
        ...data,
        [key]: value,
      },
    }),
  );

const dataListeners: Listener[] = [];

const onDataChanged = (scope: DataType, callback: Listener['callback']) =>
  dataListeners.push({ scope, callback });

chrome.storage.local.onChanged.addListener((changes) => {
  for (const listener of dataListeners) {
    if (changes[listener.scope]) {
      listener.callback(
        changes[listener.scope].oldValue,
        changes[listener.scope].newValue,
      );
    }
  }
});

export {
  getAllData,
  getDataItem,
  getDataObject,
  onDataChanged,
  setAllData,
  setDataObject,
};
