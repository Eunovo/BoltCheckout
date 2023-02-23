import { useState, useCallback, useMemo } from "react";

export const useCopyToClipboard = () => {
    const [isCopying, setIsCopying] = useState(false);

    const copyToClipboard = useCallback(async (text: string, onSuccess: () => void, onError: (err: unknown) => void) => {
        try {
            setIsCopying(true);
            await copyTextToClipboard(text);
            onSuccess();
        } catch (err) {
            onError(err);
        } finally {
            setIsCopying(false);
        }
    }, []);

    return useMemo(() => ({ isCopying, copyToClipboard }), [isCopying, copyToClipboard]);
}

function fallbackCopyTextToClipboard(text: string) {
    return new Promise<void>((resolve, reject) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) resolve();
            reject(new Error("Failed to copy to clipboard"));
        } catch (err) {
            reject(err);
        } finally {
            document.body.removeChild(textArea);
        }
    });
}

function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text);
}

