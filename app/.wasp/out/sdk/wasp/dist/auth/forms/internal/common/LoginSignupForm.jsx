import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth';
import { Form, FormInput, FormItemGroup, FormLabel, FormError, FormTextarea, SubmitButton, } from '../Form';
import { useHistory } from 'react-router-dom';
import { useUsernameAndPassword } from '../usernameAndPassword/useUsernameAndPassword';
// PRIVATE API
export const LoginSignupForm = ({ state, socialButtonsDirection = 'horizontal', additionalSignupFields, }) => {
    const { isLoading, setErrorMessage, setSuccessMessage, setIsLoading, } = useContext(AuthContext);
    const isLogin = state === 'login';
    const cta = isLogin ? 'Log in' : 'Sign up';
    const history = useHistory();
    const onErrorHandler = (error) => {
        var _a, _b;
        setErrorMessage({ title: error.message, description: (_b = (_a = error.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message });
    };
    const hookForm = useForm();
    const { register, formState: { errors }, handleSubmit: hookFormHandleSubmit } = hookForm;
    const { handleSubmit } = useUsernameAndPassword({
        isLogin,
        onError: onErrorHandler,
        onSuccess() {
            history.push('/demo-app');
        },
    });
    async function onSubmit(data) {
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            await handleSubmit(data);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (<>
        <Form onSubmit={hookFormHandleSubmit(onSubmit)}>
          <FormItemGroup>
            <FormLabel>Username</FormLabel>
            <FormInput {...register('username', {
        required: 'Username is required',
    })} type="text" disabled={isLoading}/>
            {errors.username && <FormError>{errors.username.message}</FormError>}
          </FormItemGroup>
          <FormItemGroup>
            <FormLabel>Password</FormLabel>
            <FormInput {...register('password', {
        required: 'Password is required',
    })} type="password" disabled={isLoading}/>
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </FormItemGroup>
          <AdditionalFormFields hookForm={hookForm} formState={{ isLoading }} additionalSignupFields={additionalSignupFields}/>
          <FormItemGroup>
            <SubmitButton type="submit" disabled={isLoading}>{cta}</SubmitButton>
          </FormItemGroup>
        </Form>
  </>);
};
function AdditionalFormFields({ hookForm, formState: { isLoading }, additionalSignupFields, }) {
    const { register, formState: { errors }, } = hookForm;
    function renderField(field, 
    // Ideally we would use ComponentType here, but it doesn't work with react-hook-form
    Component, props) {
        return (<FormItemGroup key={field.name}>
        <FormLabel>{field.label}</FormLabel>
        <Component {...register(field.name, field.validations)} {...props} disabled={isLoading}/>
        {errors[field.name] && (<FormError>{errors[field.name].message}</FormError>)}
      </FormItemGroup>);
    }
    if (areAdditionalFieldsRenderFn(additionalSignupFields)) {
        return additionalSignupFields(hookForm, { isLoading });
    }
    return (additionalSignupFields &&
        additionalSignupFields.map((field) => {
            if (isFieldRenderFn(field)) {
                return field(hookForm, { isLoading });
            }
            switch (field.type) {
                case 'input':
                    return renderField(field, FormInput, {
                        type: 'text',
                    });
                case 'textarea':
                    return renderField(field, FormTextarea);
                default:
                    throw new Error(`Unsupported additional signup field type: ${field.type}`);
            }
        }));
}
function isFieldRenderFn(additionalSignupField) {
    return typeof additionalSignupField === 'function';
}
function areAdditionalFieldsRenderFn(additionalSignupFields) {
    return typeof additionalSignupFields === 'function';
}
//# sourceMappingURL=LoginSignupForm.jsx.map