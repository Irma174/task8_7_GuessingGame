let minValue;
let maxValue;

let but1 = document.querySelector('.start1');
let container1 = document.querySelector('.container');

but1.hidden = false;
container1.hidden = true;

but1.addEventListener('click', function() {
  Swal.fire({
    title: 'Привет!',
    text: 'Хочешь поиграть в числовую угадайку?',
    imageUrl: '../images/smiley_smart.jpg',
    imageWidth: 400,
    imageHeight: 350, 
    showCancelButton: true,
    cancelButtonText: 'Нет, спасибо',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Да, давай играть!' 
  }). then((result) => {
    if (result.isConfirmed) {     
        but1.hidden = true,
        startGame();
    }else{
        container1.hidden = true,
        but1.hidden = false
    }
  })
});

function startGame(){
    gameRun = true;
    container1.hidden = false;
    const elemModalMaxMin = document.querySelector('#numberModal');
    const modalMaxMin = new bootstrap.Modal(elemModalMaxMin);
    modalMaxMin.show();


    document.querySelector('#btnOk').addEventListener('click',()=> {

        minValue = parseInt(document.querySelector('#numberMin').value);
        (minValue == "") ? minValue = 0 : minValue;
    
        maxValue = parseInt(document.querySelector('#numberMax').value);
        (maxValue == "") ? maxValue = 100 : maxValue; 
    
        limitMinMaxNumber();

        isNaN(minValue) ? minValue = 0 : minValue;
        isNaN(maxValue) ? maxValue = 100 : maxValue;
        
        Swal.fire({
            text: 'Я работаю только с числами от -999 до 999! \n\u{1F913}',
            title:`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`           
        })

        orderNumber = 1;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        orderNumberField.innerText = orderNumber; 
        (answerNumber == 0) ? ansverNumberResult = answerNumber : ansverNumberResult = numberWords(answerNumber);
        ((ansverNumberResult.length > 20)) ? ansverNumberResult = answerNumber : ansverNumberResult;
        answerField.innerText = `Вы загадали число ${ansverNumberResult}?`;
    
    });

}


//Заново
document.querySelector('#btnRetry').addEventListener('click', startGame);


// "Больше"
document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()); 
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase; 
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            (answerNumber == 0) ? ansverNumberResult = answerNumber : ansverNumberResult = numberWords(answerNumber);
            ((ansverNumberResult.length > 20)) ? ansverNumberResult = answerNumber : ansverNumberResult;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandomQuesOver = Math.round( Math.random()*3);
            const questionPhraseOver = (phraseRandomQuesOver === 3) ? `Точно больше? \n\u{1F609} Тогда наверное вы загадали число ${ansverNumberResult}?`:
            ((phraseRandomQuesOver < 3)&&(phraseRandomQuesOver >= 2)) ? `Вы загадали число ${ansverNumberResult}?`:
            ((phraseRandomQuesOver < 2)&&(phraseRandomQuesOver >= 1)) ? `Таак \n\u{1F914}... Я думаю, что Вы загадали число ${ansverNumberResult}?`: 
            `Вы загадали число ${ansverNumberResult}? Я угадал?`;
            
            answerField.innerText = questionPhraseOver;
        }
    }
})

// "Меньше"
document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ? 
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1; 
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            (answerNumber == 0) ? ansverNumberResult = answerNumber : ansverNumberResult = numberWords(answerNumber);
            ((ansverNumberResult.length > 20)) ? ansverNumberResult = answerNumber : ansverNumberResult;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandomQuesLess = Math.round( Math.random()*3);
            const questionPhraseLess = (phraseRandomQuesLess === 3) ? `Наверное, вы загадали число ${ansverNumberResult}?`:
            ((phraseRandomQuesLess < 3)&&(phraseRandomQuesLess >= 2)) ? `Вы загадали число ${ansverNumberResult}?`:
            ((phraseRandomQuesLess < 2)&&(phraseRandomQuesLess >= 1)) ? `Я думаю, что Вы загадали число ${ansverNumberResult}?`: 
            `Вы загадали число ${ansverNumberResult}? Я угадал?`;

            answerField.innerText = questionPhraseLess;
        }
    }
})

//Результат = ответ
document.querySelector('#btnEqual').addEventListener('click', function () {
        if (gameRun&&orderNumber<2){
            answerField.innerText = `Да это легко! Я очень быстро угадал! \n\u{1F61C}`
            gameRun = false; 
        }else if(gameRun&&orderNumber >= 5){
            answerField.innerText = `Пришлось мне потрудится! Но я угадал! \n\u{1F913}`
            gameRun = false; 
        }else if(gameRun&&orderNumber>=2&&orderNumber<5){
            answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
            gameRun = false;
        }
    })


let inits =  {
    '1' : 'один',
    '2' : 'два',
    '3' : 'три', 
    '4' : 'четыре',
    '5' : 'пять',
    '6' : 'шесть',
    '7' : 'семь',
    '8' : 'восемь',
    '9' : 'девять'
};

let tens = {
    '10' : 'десять',
    '11' : 'одиннадцать',
    '12' : 'двенадцать',
    '13' : 'тринадцать', 
    '14' : 'четырнадцать',
    '15' : 'пятнадцать',
    '16' : 'шестнадцать',
    '17' : 'семнадцать',
    '18' : 'восемнадцать',
    '19' : 'девятнадцать'
};

let dozens = {
    '10' : 'десять',
    '20' : 'двадцать',
    '30' : 'тридцать', 
    '40' : 'сорок',
    '50' : 'пятьдесят',
    '60' : 'шестьдесят',
    '70' : 'семьдесят',
    '80' : 'восемьдесят',
    '90' : 'девяносто'
};

let hundreds = {
    '100' : 'сто',
    '200' : 'двести',
    '300' : 'триста', 
    '400' : 'четыреста',
    '500' : 'пятьсот',
    '600' : 'шестьсот',
    '700' : 'семьсот',
    '800' : 'восемьсот',
    '900' : 'девятьсот'
}

let initsNumber;
let dozensNumber;
let hundredsNumber;
let tensNumber;

function numberWords(numberResult) {

    let ansverNumberEl = Math.abs(numberResult);
    let ansverNumberDividedTen = ansverNumberEl/10;
    
    if (ansverNumberDividedTen < 1){
        ansverNumberEl = inits[String(ansverNumberEl)];
    } else if (ansverNumberDividedTen>1 && ansverNumberDividedTen<10){
        (String(ansverNumberEl) in tens)? ansverNumberEl = tens[String(ansverNumberEl)] :
        (String(ansverNumberEl) in dozens)? ansverNumberEl = dozens[String(ansverNumberEl)] :
        (
            initsNumber = ansverNumberEl%10,
            dozensNumber = ansverNumberEl - initsNumber,
            ansverNumberEl = dozens[String(dozensNumber)] + ' ' +  inits[String(initsNumber)]
            )
    } else if ((ansverNumberDividedTen>10) && ((numberResult/10)<100)){
        hundredsNumber = ansverNumberEl - ansverNumberEl%100;
        dozensNumber = ansverNumberEl%100 -ansverNumberEl%100%10;
        initsNumber = ansverNumberEl%10;
        tensNumber = dozensNumber + initsNumber;
        
        (dozensNumber == 10) ? ansverNumberEl = hundreds[String(hundredsNumber)] + ' ' + tens[String(tensNumber)]:
        ((dozensNumber == initsNumber) && (initsNumber != 0)) ? ansverNumberEl = hundreds[String(hundredsNumber)] + ' ' + inits[String(initsNumber)]:
        ((initsNumber == 0) && (dozensNumber!=0)) ? ansverNumberEl = hundreds[String(hundredsNumber)] + ' ' + dozens[String(dozensNumber)]:
        ((dozensNumber==0)&&(initsNumber==0)) ? ansverNumberEl = hundreds[String(hundredsNumber)] :
        ansverNumberEl = hundreds[String(hundredsNumber)] + ' ' + dozens[String(dozensNumber)] + ' ' + inits[String(initsNumber)];
    }   
    
    ansverNumberEl = String(ansverNumberEl[0]).toUpperCase() + String(ansverNumberEl).substring(1);
    
    (String(numberResult)[0] == '-') ? ansverNumberEl = "минус " + ansverNumberEl : ansverNumberEl;
    
    return ansverNumberEl;
}

function limitMinMaxNumber(){
    (minValue > 999) ? minValue = 999 : minValue;
    (maxValue > 999) ? maxValue = 999 : maxValue;
    (minValue < (-999)) ? minValue = -999 : minValue;
    (maxValue < (-999)) ? maxValue = -999 : maxValue; 
    if (maxValue < minValue) {
        let temporaryVar = maxValue;
        maxValue = minValue;
        minValue = temporaryVar;
    } 
}


/*
// "Заново"
document.querySelector('#btnRetry').addEventListener('click', function () { 
    gameRun = true;
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
    limitMinMaxNumber();
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    orderNumber = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumberField.innerText = orderNumber; 
    (answerNumber == 0) ? ansverNumberResult = answerNumber : ansverNumberResult = numberWords(answerNumber);
    ((ansverNumberResult.length > 20)) ? ansverNumberResult = answerNumber : ansverNumberResult;
    answerField.innerText = `Вы загадали число ${ansverNumberResult}?`;
})

}*/