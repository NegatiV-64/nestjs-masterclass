import { Fragment, ReactNode } from "react";
import { Toaster } from "sonner";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Fragment>
            {children}
            <Toaster />
        </Fragment>
    )
}