<template>
    <Loading v-if="isPending" />
    <div class="flex flex-col lg:w-100 xl:w-125">
        <SavedCheckoutInfo v-if="isSavedAddress" />
        <form v-else class="mt-5 flex flex-col gap-5" @submit.prevent="createInformation()">
            <div v-if="userAddresses.length > 0 && !isSavedAddress" class="flex justify-between">
                <label class="text-xs font-medium md:text-sm"> CONTACT INFO </label>
                <span
                    @click="toggleShowContact"
                    class="cursor-pointer text-xs text-indigo-600 hover:text-violet-600"
                >
                    Show saved contact
                </span>
            </div>
            <ContactForm />
            <AddressForm />
            <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
                <UiButton v-if="!isSavedAddress" type="submit" name="Shipping" variant="checkOut" />
                <img
                    :src="arrow"
                    alt=""
                    class="absolute top-1/2 left-70 h-13 -translate-y-1/2 sm:left-60 md:left-75 lg:left-34 xl:left-46"
                />
            </div>
        </form>
        <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
            <UiButton
                v-if="isSavedAddress"
                type="submit"
                name="Shipping"
                variant="checkOut"
                @click="addInformation()"
            />
            <img
                :src="arrow"
                alt=""
                class="absolute top-1/2 left-70 h-13 -translate-y-1/2 sm:left-60 md:left-75 lg:left-34 xl:left-46"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    useCreateInformation,
    useAddInformation,
} from "@/features/checkout-contact-info/api/add-address";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { toggleInformation } from "@/features/checkout-contact-info/lib/toggle-contact-info";
import { useSavedAddressesData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import {
    informationForm,
    informationFormErrorMessages,
} from "@/entities/checkout-info-form/model/information-form";
import { isSavedAddress } from "@/entities/checkout-info-item/model/information.refs";
import { UiButton } from "@/shared/ui/button";
import { ContactForm } from "@/entities/checkout-info-form";
import { AddressForm } from "@/entities/checkout-info-form";
import { SavedCheckoutInfo } from "@/features/checkout-contact-info";
import { Loading } from "@/widgets/state";

import arrow from "@/assets/icons/arrows/right-shop.svg";

const { userAddresses } = useSavedAddressesData();
const { toggleShowContact } = toggleInformation();
const { addInformation } = useAddInformation();
const { createInformation, isPending } = useCreateInformation();

refClearErrorsOnChange(informationForm, informationFormErrorMessages);
</script>
