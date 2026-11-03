import type { MessageSchema } from "@/shared/i18n/index";

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}
