import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";
import {
    isChosenAddress,
    isChosenContactInfo,
} from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/user-address";

export const useSavedContactInfo = (info: UserContactInfo) => {
    checkoutSession.contactId = info.id;
    isChosenContactInfo.value = true;
};

export const useSavedAddress = (info: UserContactInfo) => {
    checkoutSession.addressId = info.id;
    isChosenAddress.value = true;
};
