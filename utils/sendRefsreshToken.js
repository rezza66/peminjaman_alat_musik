export const sendRefreshToken = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        sameSite: true,
        // path: '/login'
    })
}