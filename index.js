// Your code here

let createEmployeeRecord = function(row) {
	return {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: []	
	}
}

let createEmployeeRecords = function(employeeData) {
	return employeeData.map(function(row){
		return createEmployeeRecord(row)
	})
}

let createTimeInEvent = function(employee, dateStamp) {
	let dateTime = dateStamp.split(' ')

	employee.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(dateTime[1]),
		date: dateTime[0]
	})
	return employee
}

let createTimeOutEvent = function (employee, dateStamp) {
	let dateTime = dateStamp.split(' ')

	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(dateTime[1]),
		date: dateTime[0]
	})
	return employee
}

let hoursWorkedOnDate = function(employee, dateWorked) {
	let inTime = employee.timeInEvents.find(function(e){
		return e.date == dateWorked
	})
	let outTime = employee.timeOutEvents.find(function(e){
		return e.date == dateWorked
	})
	return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function (employee, dateWorked) {
	let wage = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
	return wage
}

let allWagesFor = function(employee) {
	let days = employee.timeInEvents.map(element => element.date)
	let wages = days.map(element => wagesEarnedOnDate(employee, element))
	return wages.reduce(function(total, element){return element + total}, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
	function match(element) {
		return (element.firstName == firstName)
	}
	return srcArray.find(match)
}

let calculatePayroll = function(arr) {
	return arr.reduce(function(total, element){return allWagesFor(element) + total}, 0);
}