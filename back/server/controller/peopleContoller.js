const mongodb = require('../query/mongodb');

module.exports.Controller = async (req, res) => {
    const result = await mongodb.people(req.cookies.rt);
    res.status(200).json(result);
}

module.exports.ControllerUser = async (req, res) => {
    const result = await mongodb.userInf(req.cookies.rt);
    res.status(200).json(result);
}

module.exports.ControllerPeopleCard = async (req, res) => {
    const {id} = req.body;
    const result = await mongodb.peopleCard(id);
    result.age = calculateAge(result.date)
    console.log(result)
    res.status(200).json(result);
}

function calculateAge(birthDateString) {
    // Преобразуем строку с датой рождения в объект Date
    let birthDate = new Date(birthDateString);
    
    // Получаем сегодняшнюю дату
    let today = new Date();
    
    // Вычисляем разницу в годах между сегодняшним днем и датой рождения
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // Проверяем, если день рождения ещё не был в этом году
    let monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}