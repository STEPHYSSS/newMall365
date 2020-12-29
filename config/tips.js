import { Toast } from 'vant';

export const errorNotice = (message) => {
	Toast.fail({
		message: message
	})
}
export const successNotice = (message) => {
	Toast.success({
		message: message
	})
}