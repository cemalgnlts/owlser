import { useEffect, useRef } from "react";

function useDebounceCallback(callback, timeout) {
	const timeoutRef = useRef(null);

	const cancelDebounce = () => {
		if(timeoutRef.current !== null) clearTimeout(timeoutRef.current);
	};

	const debouncedCallback = (...args) => {
		cancelDebounce();
		timeoutRef.current = setTimeout(callback.bind(null, ...args), timeout);
	}

	useEffect(() => {
		return () => cancelDebounce();
	}, []);

	return [
		debouncedCallback
	];
}

export default useDebounceCallback;
