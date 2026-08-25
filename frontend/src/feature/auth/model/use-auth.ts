import { type ComponentPublicInstance, computed } from "vue";
import { authStore } from "@/entities/auth/auth.store.ts";
import { clearAuthForms } from "@/feature/auth/lib/clear.auth.ts";
import { authForms } from "@/feature/auth/model/auth.forms.ts";

const { showPassword, showSignSection } = authStore();
const { CODE_LENGTH, codeDigits, inputRefs, timeLeft, timerInterval } = authForms();
const { clearRegisterForm, clearLoginForm } = clearAuthForms();

export const useAuth = () => {
    const togglePassword = () => {
        showPassword.value.password = !showPassword.value.password;
    };

    const toggleSignIn = () => {
        showSignSection.value.signIn = !showSignSection.value.signIn;

        clearLoginForm();
    };

    const toggleSignUp = () => {
        showSignSection.value.signUp = !showSignSection.value.signUp;

        clearRegisterForm();
    };

    const setInputRef = (
        el: Element | ComponentPublicInstance | null,
        index: number
    ) => {
        if (el) {
            inputRefs.value[index] = el as HTMLInputElement;
        }
    };

    const handleInput = (index: number, event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        const digit = value.replace(/\D/g, "").slice(-1);
        codeDigits.value[index] = value;
        target.value = digit;

        if(digit && index < CODE_LENGTH - 1) {
            inputRefs.value[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: KeyboardEvent) => {
        if(event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
            inputRefs.value[index - 1]?.focus();
        }
    }

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const pastedData = event.clipboardData?.getData("text").trim() || '';

        if(/^\d+$/.test(pastedData)) {
            const digits = pastedData.slice(0, CODE_LENGTH).split('');
            digits.forEach((digit, idx) => {
                codeDigits.value[idx] = digit;
                if(inputRefs.value[idx]){
                    inputRefs.value[idx].value = digit;
                }
            });

            const focusIndex = Math.min(digits.length, CODE_LENGTH - 1);
            inputRefs.value[focusIndex]?.focus();
        }
    };

    const formattedTimer = computed(() => {
        const seconds = String(timeLeft.value).padStart(2, "0");
        return `(00:${seconds})`
    });

    const startTimer = () => {
        if(timerInterval) clearInterval(timerInterval.value)

        // @ts-ignore
        timerInterval.value = setInterval(() => {
            if(timeLeft.value > 0) {
                timeLeft.value--
            }else{
                stopTimer()
            }
        }, 1000)
    };

    const stopTimer = () => {
        if(timerInterval) {
            clearInterval(timerInterval.value);
        }
    };

    return {
        togglePassword,
        toggleSignUp,
        toggleSignIn,

        setInputRef,
        handleInput,
        handleKeyDown,
        handlePaste,

        formattedTimer,

        startTimer,
        stopTimer,
    }
}