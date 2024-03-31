const prompt = require('prompt-sync')();

class Student {
    constructor(question) {
        this.question = question
        this.chosenCategory = []
        this.chosenQuestion = []
        this.score = 0
    }

    chooseCategory() {
        let flag = true
        let validChoice = ['ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION']
        console.log('---------------------------------------------------')
        console.log('Choose from the options below:\nPress F to quit choosing\n')
        for (let i = 0; i < validChoice.length; i++) {
            console.log(`${validChoice[i].substring(0, 1)}${validChoice[i].substring(1).toLowerCase()}`)
        }
        console.log('---------------------------------------------------')
        do {
            let categoryChoice = prompt('Choose a category:').toUpperCase()

            if (categoryChoice == 'F') {
                return;
            }

            if (this.chosenCategory.includes(categoryChoice)) {
                console.log(`${categoryChoice.substring(0, 1)}${categoryChoice.substring(1).toLowerCase()} was already added.`)
                return;
            }


            if (!validChoice.includes(categoryChoice)) {
                console.log('Invalid response, please only choose from the choices')
            }


            this.chosenCategory.push(categoryChoice)


            let filteredQuestion
            this.chosenCategory.forEach(chosenCategoryEl => {
                filteredQuestion = this.question.questionBank.filter(questionEl => questionEl.category == chosenCategoryEl)
            })
            this.chosenQuestion.push(filteredQuestion.slice(0, 5))

            this.chosenQuestion = this.chosenQuestion.flat(1)


        } while (flag == true);
        this.checkCategory()

    }

    removeCategory() {
        if (this.chosenCategory.length > 0) {
            this.checkCategory()
            let removeCategory = prompt('Choose the category that you want to remove:').toUpperCase()

            if (!this.chosenCategory.includes(removeCategory)) {
                console.log(`${removeCategory} is not included in your chosen category`)
                return;
            }

            let categoryIndex = this.chosenCategory.findIndex(chosenCategoryEl => chosenCategoryEl == removeCategory)
            this.chosenCategory.splice(categoryIndex, 1)
            console.log(`${removeCategory} was removed`)

            for (let i = 0; i < this.chosenQuestion.length; i++) {
                let itemIndex = this.chosenQuestion.findIndex(itemIndexEl => itemIndexEl == removeCategory)
                if (itemIndex != 0) {
                    this.chosenQuestion.splice(itemIndex, 1)
                }
            }


        } else {
            console.log('You have no chosen category')
            return;
        }

    }

    checkCategory() {
        if (this.chosenCategory.length > 0) {
            console.log('---------------------------------------------------')
            console.log('Categories you have chosen:')
            for (let i = 0; i < this.chosenCategory.length; i++) {
                console.log(`${this.chosenCategory[i].substring(0, 1).toUpperCase()}${this.chosenCategory[i].substring(1).toLowerCase()}`)
            }
        }

    }

    answerQuestion() {
        let j = 1
        let start = prompt('Start the quiz?[Y/N]').toUpperCase()
        if (start == 'NO') {
            return;
        }
        let time = new Date()

        for (let i = 0; i < this.chosenQuestion.length; i++) {
            if (start == 'YES' || start == 'Y') {
                console.log(`Question ${[j]}: ${this.chosenQuestion[i].firstNumber} ${this.chosenQuestion[i].categorySymbol} ${this.chosenQuestion[i].secondNumber}`)
                let answer = parseInt(prompt('Your Answer:'))
                if (answer == this.chosenQuestion[i].calculate()) {
                    this.score += 1
                }
                if (i == this.chosenQuestion.length - 1) {
                    console.log(`Your Score: ${this.score} Time Finished:${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
                }
            }
            j++
        }
    }
}


class Question {
    constructor() {
        this.questionBank = []
    }

    generateQuestion() {
        let category = ''
        let categorySymbol = ''
        for (let i = 0; i < 80; i++) {
            let firstNumber = Math.floor(Math.random() * 100) + 10
            let secondNumber = Math.floor(Math.random() * 100) + 1


            if (i >= 0) {
                category = 'ADDITION'
                categorySymbol = '+'
            }

            if (i >= 20) {
                category = 'SUBTRACTION'
                categorySymbol = '-'
            }

            if (i >= 40) {
                category = 'MULTIPLICATION'
                categorySymbol = '*'
            }

            if (i >= 60) {
                category = 'DIVISION'
                categorySymbol = '/'
            }

            let question = {
                firstNumber: firstNumber,
                secondNumber: secondNumber,
                category: category,
                categorySymbol: categorySymbol,
                calculate: function () {
                    if (this.category == 'ADDITION') {
                        return this.firstNumber + this.secondNumber
                    }

                    if (this.category == 'SUBTRACTION') {
                        return this.firstNumber - this.secondNumber
                    }

                    if (this.category == 'MULTIPLICATION') {
                        return this.firstNumber * this.secondNumber
                    }

                    if (this.category == 'DIVISION') {
                        return this.firstNumber / this.secondNumber
                    }
                }
            }
            this.questionBank.push(question)
        }
    }

    getAnswers() {
        let questionBankAnswer = []
        for (let i = 0; i < this.questionBank.length; i++) {
            questionBankAnswer.push(this.questionBank[i].calculate())
        }
        return questionBankAnswer
    }
}

let question = new Question()
question.generateQuestion()

let student = new Student(question)

let flag = true
do {
    console.log('---------------------------------------------------')
    console.log('To get started, please choose the number of your action:\n1.Choose a Category\n2.Remove a Category\n3.Start Quiz')
    student.checkCategory()
    console.log('---------------------------------------------------')
    let userChoice = parseInt(prompt('Choose an option:'))
    console.log('---------------------------------------------------')

    switch (userChoice) {
        case 1:
            student.chooseCategory()
            break;
        case 2:
            student.removeCategory()
            break;
        case 3:
            student.answerQuestion()
            break
        default:
            break;
    }

} while (flag == true);

