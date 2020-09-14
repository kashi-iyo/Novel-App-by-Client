export default function validateInfo(values) {
    let errors = {}

    if (!values.email) {
        errors.email = "Emailアドレスを入力してください"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "このメールアドレスは不正です"
    }

    if (!values.password) {
        errors.password = "パスワードを入力してください"
    } else if (values.password.length < 6) {
        errors.password = "パスワードは6文字以上で入力してください"
    }

    return errors
}