import bcrypt from "bcryptjs";


const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword;
}

export default HashPassword;