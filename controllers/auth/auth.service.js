import db from '../../utils/db.js';
import { hashToken } from '../../utils/hashToken.js';

export const addRefreshTokenToWhitelist = ({jti, refreshToken, userId}) => {
    return db.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        }
    })
};

export const findRefreshTokenById = (id) => {
    return db.refreshToken.findUnique({
        where: {
            id
        }
    })
};

export const deleteRefreshToken = (id) => {
    return db.refreshToken.update({
        where: {id},
        data:{revoked: true}
    })
};

export const revokedTokens = (userId) => {
    return db.refreshToken.updateMany({
        where:{userId},
        data:{revoked: true}
    })
};

