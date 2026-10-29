import { toggleInformation } from "@/features/checkout-contact-info/lib/toggle-contact-info";
import { informationForm } from "@/entities/checkout-info-form/model/information-form";
import {
    isChosenAddress,
    isChosenContactInfo,
} from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/user-address";

const { informationId } = toggleInformation();

export const useSavedContactInfo = (info: UserContactInfo) => {
    informationId.value = info.id;
    informationForm.value.email = info.email;
    informationForm.value.phone = info.phone;

    isChosenContactInfo.value = true;
};

export const useSavedAddress = (info: UserContactInfo) => {
    informationForm.value.addressName = info.addressName;
    informationForm.value.firstName = info.firstName;
    informationForm.value.lastName = info.lastName;
    informationForm.value.country = info.country;
    informationForm.value.stateRegion = info.stateRegion;
    informationForm.value.address = info.address;
    informationForm.value.city = info.city;
    informationForm.value.postalCode = String(info.postalCode);

    isChosenAddress.value = true;
};
