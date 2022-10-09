import { FC } from "react";
interface SignProps {
    handleSubmit: (data: any) => void;
    clearAfter: boolean;
    className?: string;
}
declare const SignForm: FC<SignProps>;
export default SignForm;
