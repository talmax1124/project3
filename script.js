// !!! DO NOT MODIFY THE ENUM OF SEARCH TYPES !!!
const SortType = Object.freeze({ NUMBER: 0,FIRST_NAME: 1,LAST_AND_FIRST_NAME: 2,STATE: 3,MAJOR: 4,TEST_SCORE: 5,TEST_DATE: 6 });

// !!! DO NOT MODIFY THE STUDENT CLASS !!!
class Student {
        static array = [];
        constructor(number, firstName, lastName, state, major, testScore, testDate) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.major = major;
                this.number = number;
                this.state = state;
                this.testDate = testDate;               
                this.testScore = parseInt(testScore);
        }
}

// !!! DO NOT MODIFY THE EVENT LISTENER FUNCTIONS !!!
document.getElementById("ArrowDown0").addEventListener("click", (event) => { sortArray(SortType.NUMBER, true); displayDataTable(); });
document.getElementById("ArrowDown1").addEventListener("click", (event) => { sortArray(SortType.FIRST_NAME, true); displayDataTable(); });
document.getElementById("ArrowDown2").addEventListener("click", (event) => { sortArray(SortType.LAST_AND_FIRST_NAME, true); displayDataTable(); });
document.getElementById("ArrowDown3").addEventListener("click", (event) => { sortArray(SortType.STATE, true); displayDataTable(); });
document.getElementById("ArrowDown4").addEventListener("click", (event) => { sortArray(SortType.MAJOR, true); displayDataTable(); });
document.getElementById("ArrowDown5").addEventListener("click", (event) => { sortArray(SortType.TEST_SCORE, true); displayDataTable(); });
document.getElementById("ArrowDown6").addEventListener("click", (event) => { sortArray(SortType.TEST_DATE, true); displayDataTable(); });
document.getElementById("ArrowUp0").addEventListener("click", (event) => { sortArray(SortType.NUMBER, false); displayDataTable(); });
document.getElementById("ArrowUp1").addEventListener("click", (event) => { sortArray(SortType.FIRST_NAME, false); displayDataTable(); });
document.getElementById("ArrowUp2").addEventListener("click", (event) => { sortArray(SortType.LAST_AND_FIRST_NAME, false); displayDataTable(); });
document.getElementById("ArrowUp3").addEventListener("click", (event) => { sortArray(SortType.STATE, false); displayDataTable(); });
document.getElementById("ArrowUp4").addEventListener("click", (event) => { sortArray(SortType.MAJOR, false); displayDataTable(); });
document.getElementById("ArrowUp5").addEventListener("click", (event) => { sortArray(SortType.TEST_SCORE, false); displayDataTable(); });
document.getElementById("ArrowUp6").addEventListener("click", (event) => { sortArray(SortType.TEST_DATE, false); displayDataTable(); });

document.getElementById("fileButton").addEventListener("click", (event) => { document.getElementById("inputFile").click(); });
document.getElementById("inputFile").addEventListener("change", (event) => { readInputFile(event.target.files[0]); });

document.getElementById("searchButton").addEventListener("click", (event) => { performSearch(); });
document.getElementById("searchType").addEventListener("change", (event) => { updateCondition(); });
document.getElementById("statisticsButton").addEventListener("click", (event) => { performStatistics(); });

// !!! DO NOT MODIFY THE clearDataTable() FUNCTION !!!
function clearDataTable() {
        let table = document.getElementById("dataTable");
        
        while(table.rows.length > 1) {
                table.deleteRow(-1);
        }
}

// !!! DO NOT MODIFY THE displayDataTable() FUNCTION !!!
function displayDataTable() {
        let table = document.getElementById("dataTable");
        
        clearDataTable();
        Student.array.forEach((student) => {
                insertRow(table, student);
        });
}

// !!! DO NOT MODIFY THE insertRow() FUNCTION !!!
function insertRow(table, student) {
        let row = table.insertRow(-1);

        (row.insertCell(-1)).innerHTML = student.number;
        (row.insertCell(-1)).innerHTML = student.firstName;
        (row.insertCell(-1)).innerHTML = student.lastName;
        (row.insertCell(-1)).innerHTML = student.state;
        (row.insertCell(-1)).innerHTML = student.major;
        (row.insertCell(-1)).innerHTML = student.testScore;
        (row.insertCell(-1)).innerHTML = student.testDate;
        row.cells[0].classList.add('center');
        row.cells[1].classList.add('left');
        row.cells[2].classList.add('left');
        row.cells[3].classList.add('center');
        row.cells[4].classList.add('center');
        row.cells[5].classList.add('center');
        row.cells[6].classList.add('center');
}

// !!! DO NOT MODIFY THE loadStudentData() FUNCTION !!!
function loadStudentData(content) {
        Student.array = [];
        const records = content.split("\r\n");
        
        records.forEach((record) => {
                const values = record.split(',');
                Student.array.push(new Student(...values));
        });
}

// !!! DO NOT MODIFY THE readInputFile() FUNCTION !!!
function readInputFile(file) {
        const reader = new FileReader();
        let contents;
        reader.addEventListener("load", () => {
                loadStudentData(reader.result);
                displayDataTable();
                resetForm();
        });

        reader.readAsText(file);
}

// !!! DO NOT MODIFY THE enableForm() FUNCTION !!!
function resetForm() {
        let elements = document.querySelectorAll("*");
        
        elements.forEach(element => {
                element.disabled = false;
        });
        
        elements = document.querySelectorAll("input[type='text']");
        elements.forEach(element => {
                element.value = "";
        });
        
        elements = document.querySelectorAll("select");
        elements.forEach(element => {
                element.selectedIndex = 0;
        });
}

/************************************************************************
 *                                                                      *
 * DO NOT MODIFY ANY OF THE JAVASCRIPT CODE PROVIDED ABOVE THIS MESSAGE *
 *                                                                      *
 ************************************************************************/ 

function calcMean(array) {
    return calcSum(array) / array.length;
}

function calcMedian(array) {
    const scores = array.map(student => student.testScore).sort((a, b) => a - b);
    const length = scores.length;
    
    if (length % 2 === 0) {
        return (scores[Math.floor(length / 2) - 1] + scores[Math.floor(length / 2)]) / 2;
    } else {
        return scores[Math.floor(length / 2)];
    }
}

function calcMode(array) {
    const scores = array.map(student => student.testScore);
    const frequency = {};
    
    scores.forEach(score => {
        frequency[score] = (frequency[score] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(score => frequency[score] === maxFreq);
    
    if (modes.length === scores.length) {
        return "No mode";
    }
    
    return modes.join(" ");
}

function calcStdDev(array) {
    const mean = calcMean(array);
    const variance = calcVariance(array);
    return Math.sqrt(variance);
}

function calcSum(array) {
    return array.reduce((sum, student) => sum + student.testScore, 0);
}

function calcVariance(array) {
    const mean = calcMean(array);
    const squaredDiffs = array.map(student => Math.pow(student.testScore - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / array.length;
}

function findMax(array) {
    let max = array[0].testScore;
    for (let i = 1; i < array.length; i++) {
        if (array[i].testScore > max) {
            max = array[i].testScore;
        }
    }
    return max;
}

function findMin(array) {
    let min = array[0].testScore;
    for (let i = 1; i < array.length; i++) {
        if (array[i].testScore < min) {
            min = array[i].testScore;
        }
    }
    return min;
}

function performSearch() {
    const searchType = document.getElementById("searchType").value;
    const searchCondition = document.getElementById("searchCondition").value;
    const searchString = document.getElementById("searchString").value.trim();
    
    if (searchType === "" || document.getElementById("searchType").selectedIndex === 0) {
        alert("Please select a Search Type");
        return;
    }
    
    if (searchCondition === "" || document.getElementById("searchCondition").selectedIndex === 0) {
        alert("Please select a Search Condition");
        return;
    }
    
    if (searchString === "") {
        alert("Please enter a Search String");
        return;
    }
    
    clearDataTable();
    
    const table = document.getElementById("dataTable");
    
    Student.array.forEach(student => {
        let fieldValue = student[searchType];
        let matches = false;
        
        if (searchType === "testScore") {
            const searchNum = parseFloat(searchString);
            const studentScore = student.testScore;
            
            switch(searchCondition) {
                case "equal":
                    matches = studentScore === searchNum;
                    break;
                case "less":
                    matches = studentScore < searchNum;
                    break;
                case "greater":
                    matches = studentScore > searchNum;
                    break;
            }
        } else {
            const fieldStr = fieldValue.toString().toLowerCase();
            const searchStr = searchString.toLowerCase();
            
            switch(searchCondition) {
                case "exact":
                    matches = fieldStr === searchStr;
                    break;
                case "contains":
                    matches = fieldStr.includes(searchStr);
                    break;
            }
        }
        
        if (matches) {
            insertRow(table, student);
        }
    });
}

function performStatistics() {
    if (Student.array.length === 0) {
        alert("Please load data first");
        return;
    }
    
    const max = findMax(Student.array);
    const min = findMin(Student.array);
    const sum = calcSum(Student.array);
    const mean = calcMean(Student.array);
    const median = calcMedian(Student.array);
    const variance = calcVariance(Student.array);
    const stdDev = calcStdDev(Student.array);
    const mode = calcMode(Student.array);
    
    document.getElementById("max").value = max.toFixed(2);
    document.getElementById("min").value = min.toFixed(2);
    document.getElementById("sum").value = sum.toFixed(2);
    document.getElementById("mean").value = mean.toFixed(2);
    document.getElementById("median").value = median.toFixed(2);
    document.getElementById("variance").value = variance.toFixed(2);
    document.getElementById("stdDev").value = stdDev.toFixed(2);
    document.getElementById("mode").value = mode;
}

function sortArray(sortType, ascending = true) {
    Student.array.sort((a, b) => {
        let valueA, valueB;
        
        switch(sortType) {
            case SortType.NUMBER:
                valueA = parseInt(a.number);
                valueB = parseInt(b.number);
                break;
            case SortType.FIRST_NAME:
                valueA = a.firstName.toLowerCase();
                valueB = b.firstName.toLowerCase();
                break;
            case SortType.LAST_AND_FIRST_NAME:
                valueA = a.lastName.toLowerCase() + a.firstName.toLowerCase();
                valueB = b.lastName.toLowerCase() + b.firstName.toLowerCase();
                break;
            case SortType.STATE:
                valueA = a.state.toLowerCase();
                valueB = b.state.toLowerCase();
                break;
            case SortType.MAJOR:
                valueA = a.major.toLowerCase();
                valueB = b.major.toLowerCase();
                break;
            case SortType.TEST_SCORE:
                valueA = a.testScore;
                valueB = b.testScore;
                break;
            case SortType.TEST_DATE:
                valueA = new Date(a.testDate);
                valueB = new Date(b.testDate);
                break;
            default:
                return 0;
        }
        
        if (valueA < valueB) {
            return ascending ? -1 : 1;
        }
        if (valueA > valueB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}

function updateCondition() {
    const searchType = document.getElementById("searchType").value;
    const searchCondition = document.getElementById("searchCondition");
    const options = searchCondition.options;
    
    if (searchType === "testScore") {
        options[1].disabled = true;
        options[2].disabled = true;
        options[3].disabled = false;
        options[4].disabled = false;
        options[5].disabled = false;
    } else {
        options[1].disabled = false;
        options[2].disabled = false;
        options[3].disabled = true;
        options[4].disabled = true;
        options[5].disabled = true;
    }
    
    searchCondition.selectedIndex = 0;
}