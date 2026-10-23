import router from "@/app/router";
import { handler} from "@/shared/api/http";
import { registerSchema } from "@/entities/auth/model/auth-schemas";
import { useBaseModals } from "@/shared/lib/use-notify";
import { userStore } from "@/shared/model/user.store";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { clearRegisterForm, clearRegisterFormMessages } from "@/features/register-auth/lib/clear-register-form";
import { registerForm, registerFormErrorMessages } from "@/entities/auth/model/auth-form";

const { userData } = userStore();
const { loading, openNotify } = useBaseModals();

export const signUp = async (role: string) => {
    clearRegisterFormMessages();

    const result = registerSchema.safeParse(registerForm.value)
    if(!result.success){
        applyZodErrors(
            result.error,

            registerFormErrorMessages
        )
        return
    }

    loading.value = true;

    try{
        const date = new Date();

        const requestBody = {
            role,
            name: registerForm.value.name,
            surName: registerForm.value.surName,
            phone: registerForm.value.phone,
            email: registerForm.value.email,
            password: registerForm.value.password,
            created_at: date,
        };

        const authData = await handler('/auth/signUp', {
            method: "POST",
            body: JSON.stringify(requestBody),
        });

        if(authData.accessToken){
            localStorage.setItem("user", JSON.stringify(authData));
            console.log("auth data:", authData.accessToken);
        }else{
            console.log('Access token is not found');
            return;
        }
        userData.value = authData;

        await openNotify('You have successfully sign up',
            'You will now be taken to your profile page');
        await router.push({name: 'profile'})

        clearRegisterForm()
    }catch(err){
        applyErrors(
            err,
            registerFormErrorMessages
        )
        console.log(`Failed to register new user:`, err);
    }finally {
        loading.value = false;
    }
};