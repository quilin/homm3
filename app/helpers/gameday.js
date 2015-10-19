import E from 'ember';

export default E.Helper.helper(function (number) {
	var day = number % 7;
	var week = ((number - day) / 7) % 4;
	var month = Math.floor((number - week * 7 - day) / 28);

	day++; week++; month++;

	return month + ' month, ' + week + ' week, ' + day + ' day';
});