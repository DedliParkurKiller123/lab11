const initialDictionary = {
    "car": "автомобіль",
    "confidential":"конфіденційно",
    "job":"робота",
    "sofa":"диван",
    "picture":"зображення",
    "almost":"майже",
    "dectec":"детектор",
    "developer":"розробник",
    "newspaper":"газета",
    "question":"запитання"
};

let dictionary = Object.assign({}, initialDictionary);

$(document).ready(function() {

    const windowForm = $('#window-form');
    const winWin = $('#window-win');
    const resultGameWindow = $('#result-game');

    let arrayWord = Object.keys(dictionary);

    function getRandomWord() {
        const index = Math.floor(Math.random() * arrayWord.length);
        const word = arrayWord[index];
        arrayWord.splice(index, 1); 
        return {
            word: word,
            translation: dictionary[word]
        };
    }

    let selectedWordObj = getRandomWord();
    $("#window-form").text(selectedWordObj.word); 
    
    function displayNextWord() {
        if (arrayWord.length > 0) {
            selectedWordObj = getRandomWord();
            $("#window-form").text(selectedWordObj.word);
        } else {
            $("#window-form").text("");
            $("#text").off('keydown');
        }
    }
    let count = 0;
    $("#text").on('keydown', function(event) {
        if (event.key === "Enter") {
            if(count < 10){
                count++;
                let bool = false;
                let enteredText = $("#text").val().trim().toLowerCase();
                if (enteredText === selectedWordObj.translation.toLowerCase()){
                    changeWindowForm(!bool);
                    incrementForScoce(!bool);
                    $("#text").val(""); 
                    incrementForStep();
                    displayNextWord();
                } else {
                    changeWindowForm(bool);
                    incrementForScoce(bool);
                    $("#text").val("");
                    incrementForStep();
                    displayNextWord();
                }
            }
            if(count === 10){
                showWindowWin();
            }
        }
    });

    function shakeElement() {
        windowForm.css({
            'animation': 'shake 0.3s infinite',
        });
        setTimeout(() => {
            windowForm.css('animation', '');
        }, 2000);
    }

    function expansionElement() {
        windowForm.css({
            'animation': 'expansion 0.3s infinite',
        });
        setTimeout(() => {
            windowForm.css('animation', '');
        }, 2000);
    }

    let previousColor = windowForm.css('background-color');
    function changeWindowForm(item){
        if(item === true){
            windowForm.css({
                'background-color':'rgba(164, 255, 136, 0.69)'
            });
            expansionElement() 
            setTimeout(() => {
                windowForm.css({
                    'background-color':previousColor
                });
            }, 2000);
        } else {
            windowForm.css({
                'background-color':'rgba(255, 78, 78, 0.473)'
            });
            shakeElement();
            setTimeout(() => {
                windowForm.css({
                    'background-color':previousColor
                });
            }, 2000);
        }
    }
    let correct = 0;
    let uncorrect = 0;
    function incrementForScoce(item){
        if(item === true){
            correct++;
            $("#count-correct").text(correct);
        } else {
            uncorrect++;
            $("#count-uncorrect").text(uncorrect);
        }
    }
    function showWindowWin(){
        let correctForWin = correct.toString(); 
        let uncorrectForWin = uncorrect.toString(); 
    
        $("#count-correct-window").text(correctForWin);
        $("#count-uncorrect-window").text(uncorrectForWin);
        winWin.css({
            'z-index': '2',
            'opacity': '1'
        });
        setTimeout(() => {
            winWin.css({
                'z-index': '-1',
                'opacity': '0'
            });
            $("#count-correct").text('');
            $("#count-uncorrect").text('');
            $('#step').text('');
            showResultGameWindow();
        }, 2000);
    }

    let step = 0;
    function incrementForStep(){
        step++;
        $('#step').text(step + '/10');
    }

    function showResultGameWindow(){
        if(correct === 10){
            resultGameWindow.text('Ваш рівень знань чудовий!!!');
        } else if(correct >= 6){
            resultGameWindow.text('Ваш рівень знань чудовий!');
        } else if (correct === uncorrect) {
            resultGameWindow.text('Ваш рівень знань середній.');
        } else if (correct < 1){
            resultGameWindow.text('Вам є куди рухатись.');
        }
        resultGameWindow.css({
            'z-index': '2',
            'opacity': '1'
        });
        setTimeout(() => {
            location.reload();
        },4000);
    }
});
