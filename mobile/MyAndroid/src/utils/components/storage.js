/**
 * 原生的方法能力，后续页可以封装为一个npm包，让它人调用来进行使用
 *
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// 设置 Storage 的值
export async function setStorage(key, value) {
  console.log('内容', key, value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('存储报错了', e);
  }
}

// 获取 Storage 的值
export async function getStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.log('获取报错了', e);
  }
}

export async function removeStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log('移除报错了');
  }
}

// 获取所有 Storage 的值
export async function getAllKeysStorage() {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.log('获取所有的storage报错了');
  }
}

// 清除所有的 Storage 的值
export async function clearStorage() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log('清除失败');
  }
}
