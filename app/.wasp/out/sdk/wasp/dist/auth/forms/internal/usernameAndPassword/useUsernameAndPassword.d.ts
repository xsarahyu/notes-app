export declare function useUsernameAndPassword({ onError, onSuccess, isLogin, }: {
    onError: (error: Error) => void;
    onSuccess: () => void;
    isLogin: boolean;
}): {
    handleSubmit: (data: any) => Promise<void>;
};
