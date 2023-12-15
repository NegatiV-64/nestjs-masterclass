import { useCallback, useState } from "react";

export const useModal = (intialVisible = false) => {
    const [visible, setVisible] = useState(intialVisible);

    const open = useCallback(() => setVisible(true), []);
    const close = useCallback(() => setVisible(false), []);


    return {
        visible,
        open,
        close
    }
}