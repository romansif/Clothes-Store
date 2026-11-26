export { default as RegisterForm } from "./ui/RegisterForm.vue";

export type * from "./model/register-from.types";

export { registerForm, registerFormErrorMessages } from "./model/register-from"
export { registerPhoneInputVariants, registerSelectPhoneCode } from "./model/register-phone-input.variants"
export { registerSchema } from "./model/register-schemas"
export { isRole, currentRole } from "./model/register-auth.refs"
export { clearRegisterForm, clearRegisterFormMessages } from "./lib/clear-register-form"
export { toggleSignUp } from "./lib/toggle-role"