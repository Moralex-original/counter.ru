function changeColor() {
   document.getElementById("pip").style.color = "red";
}

// переменная, в которой хранится выбранное математическое действие
  var op; 

  // функция расчёта
  function func() {
 
  	// переменная для результата
    var result;
    // получаем первое и второе число
    var number_1 = Number(document.getElementById("number_1").value);
    var number_2 = Number(document.getElementById("number_2").value);
    // смотрим, что было в переменной с действием, и действуем исходя из этого
    switch (op) {
      case '+':
        result = number_1 + number_2;
        break;
      case '-':
        result = number_1 - number_2;
        break;
      case '*':
        result = number_1 * number_2;
        break;
      case '/':
        result = number_1 / number_2;
        break;
    }
    documented.getElementById("result").innerHTML = result;
  

  }
