import { post } from './backend.service';

async function verifyHash(jsonObject) {
  try {
    const response = await post('verifyhash/', jsonObject);
    return JSON.parse(response);
  } catch (e) {
    return false;
  }
}

export default verifyHash;

