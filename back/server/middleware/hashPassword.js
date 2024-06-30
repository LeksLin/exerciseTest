const bcrypt = require('bcrypt');
// Функция для хэширования пароля
module.exports.hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  
// Функция для проверки пароля
module.exports.comparePasswords = async (password, hashedPassword) => {
    console.log(password, hashedPassword)
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Ошибка проверки пароля:', error);
        throw error; // Можно обработать ошибку или пробросить её выше
    }
}