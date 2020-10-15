const sum = function(a,b){
    return parseInt(a) + parseInt(b)
}
const subtract = function(a,b){
    return parseInt(a) - parseInt(b)
}
const multiply = function(a,b){
    return parseInt(a) * parseInt(b)
}
const divide = function(a,b){
    return parseInt(a) / parseInt(b)
}

// 只有这些方法可以被调用
module.exports = {
    sum: sum,
    subtract: subtract,
    multiply: multiply,
    //divide: divide
}