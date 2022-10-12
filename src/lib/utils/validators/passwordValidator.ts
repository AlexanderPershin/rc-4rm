const passwordValidator = (password: string) => {
    const pattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,.[\]<>;:{}+\-=_~`|]).{6,50}$/g;
    const isValid = password.match(pattern);

    return isValid ? true : false;
};

export default passwordValidator;
