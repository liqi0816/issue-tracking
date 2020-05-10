interface User {
    user_id: number,
    user_email: string,
    user_name: string,
    user_alias: string,
    create_date: number,
}

interface UserLoginRequest {
    user_account: User['user_email'] | User['user_name'],
    user_password: string,
}
