import { informationForm } from "@/entities/checkout-info-form/model/information-form";

type InformationForm = typeof informationForm.value;

export const EDITABLE_ADDRESS: (keyof InformationForm)[] = [
    "addressName",
    "country",
    "stateRegion",
    "address",
    "city",
    "postalCode",
];