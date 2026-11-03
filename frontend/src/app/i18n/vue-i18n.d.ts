import type { MessageSchema } from "@/app/i18n";

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}
