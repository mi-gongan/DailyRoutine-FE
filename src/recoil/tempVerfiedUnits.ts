import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tempVerfiedUnitsState = atom({
  key: 'tempVerfiedUnitsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
