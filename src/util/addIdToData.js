/**
 * Created by Anoxic on 1/14/2018.
 */

export function addIdToImmutable(immutable, idKey = "id") {
  let ids = Object.keys(immutable);

  for (let id of ids) {
    immutable[id] = immutable[id].set(idKey, id);
  }

  return immutable;
}

export function addIdToObject(obj, idKey = "id") {
  let ids = Object.keys(obj);

  for (let id of ids) {
    obj[id][idKey] = id;
  }

  return obj;
}

export default {
  addIdToObject,
  addIdToImmutable,
};