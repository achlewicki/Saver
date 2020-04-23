import { IconPack, IconDefinition } from '@fortawesome/fontawesome-svg-core';

import {
    faHome,
    faWallet
} from '@fortawesome/free-solid-svg-icons';


export const accountIconsPack: IconPack = {
    faHome,
    faWallet
};

export const accountIconsArray: IconDefinition[] = Object.values(accountIconsPack);
