export const appCheck = (): unknown => ({
  verifyToken: (): unknown => {
    return {
      email: 'test',
      isEmailVerified: 'test',
      authUserId: 'test',
      tokenIat: 'test',
      tokenExp: 'test',
    }
  },
  createToken: (): unknown => {
    return {
      token: 'SESSION_1',
    }
  },
})
