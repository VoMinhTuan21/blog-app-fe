import { ref, shallowRef, watch, watchEffect } from "vue";

type ApiFunction<T> = (...args: any[]) => Promise<T>;

const useApi = <T>(dependencies: any[], apiFunction: ApiFunction<T>, ...args: any[]) => {
	const data = shallowRef<T | null>(null);
	const loading = ref(true);
	const error = ref<string | null>(null);

	const fetchData = async () => {
		try {
			loading.value = true;
			const response = await apiFunction(...args);
			data.value = response;
		} catch (err: any) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	};

	if (dependencies.length > 0) {
		watch(dependencies, () => {
			console.log("re-fetch");
			fetchData();
		});
	}

	fetchData(); // Call the API on hook call

	return { data, loading, error };
};

export default useApi;
