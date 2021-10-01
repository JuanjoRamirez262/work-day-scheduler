var rootEl = $('#root');
var day = document.querySelector("#currentDay");
var saveBtns = document.querySelector(".time-block")

var currentTime = moment().format("MMM Do, YYYY, hh:mm AA");
var todayHour = moment().format("H");
var todayDay = moment().format("MMDDYYYY");

// CURTOMIZE YOUR CALENDAR :)
// ----------------------------------------------------
var firstOfficeHour = 8; //Set starting calendar hour
var lastOfficeHour = 17; //Set last calendar hour
// ---------------------------------------------------

saveBtns.addEventListener("click", function (event) {
    event.preventDefault();
    element = event.target;

    if (element.matches(".saveBtn")) {
        var hour = element.getAttribute("id");
        var text = document.getElementById('text' + hour).value
        saveTask(todayDay, hour, text);
    }
})
setInterval(function () {
    day.textContent = currentTime;
}, 1000);
function timeBlockConstructor(hours) {
    var newRow = $('<div>');
    newRow.attr('class', 'row');

    newHour = $('<h6>');
    newHour.attr('class', 'hour col-xl-1');
    newHour.text(moment(hours, 'H').format('h A'));
    newRow.append(newHour);

    newTextarea = $('<input>');
    newTextarea.attr('class', 'textarea col-xl-10 ' + calculateTense(hours, todayHour)); //present, past, future
    if (getSavedTasks(todayDay, hours) != null) {
        newTextarea.attr('value', getSavedTasks(todayDay, hours))//add content

    }
    newTextarea.attr('id', 'text' + hours)
    newRow.append(newTextarea);

    newSaveBtn = $('<button>');
    newSaveBtn.attr('class', 'saveBtn col-xl-1');
    newSaveBtn.text('Save');
    newSaveBtn.attr('id', hours)
    newRow.append(newSaveBtn);
    rootEl.append(newRow);
}
function calculateTense(current, today) {
    if (today > current) {
        return 'past'
    } else if (today == current) {
        return 'present'
    } else { return 'future' }
}
for (let i = firstOfficeHour; i <= lastOfficeHour; i++) {
    timeBlockConstructor(i);
}
function getSavedTasks(date, hour) {
    var text = localStorage.getItem(date + hour);
    if (text == null) {
        return '';
    } else {
        return text
    }
}
function saveTask(date, hour, text) {
    localStorage.setItem(date + hour, text)
}