const DateRange = 14
const web = 7
const DataTimeStamp = 86400000
const day = ['周日','周一','周二','周三','周四','周五','周六']

// 根据事件返回以 时间对象
export function calenddarFn(calenddar,num=0) {
	let nowData = calenddar.getTime() + DataTimeStamp * num * web
	let oTimes = [];

	for(let i=0; i< DateRange; i++){
		oTimes.push(updata(nowData + DataTimeStamp * i))
	}

	return {
		oTimes:oTimes,
		dates:new Date(nowData)
	}
}

// 两个时间戳相差的天数
export function difference(start,end){
	let dif = end.getTime() - start.getTime()
	let num =  dif / DataTimeStamp< 0? 0 :  dif / DataTimeStamp + 1
	let arr = []
	for(let i=0;i<num;i++){
		arr.push(updata(start.getTime() + DataTimeStamp*i))
	}
	console.log(arr)
	return arr
}


// 返回 y-m-d
export function ymd(times){
	times = new Date(parseInt(times))
	return `${times.getFullYear()}-${times.getMonth()+1}-${times.getDate()}`
}

// 返回 y-m-d
export function ymdFromat(times){
  times = new Date(parseInt(times));
	let _month = parseInt(times.getMonth()) < 10 ? `0${times.getMonth()+1}` : times.getMonth()+1
	let _date = parseInt(times.getDate()) < 10 ? `0${times.getDate()}` : times.getDate()
	return `${times.getFullYear()}-${_month}-${_date}`
}

// 传入时间 y-m-d h:m
export function ymdhm(times){
	times = new Date(parseInt(times))
	let _month = parseInt(times.getMonth()) < 10 ? `0${times.getMonth()+1}` : times.getMonth() + 1
	let _date = parseInt(times.getDate()) < 10 ? `0${times.getDate()}` : times.getDate()
	let _hours = parseInt(times.getHours()) < 10 ? `0${times.getHours()}` : times.getHours()
	let _minutes = parseInt(times.getMinutes()) < 10 ? `0${times.getMinutes()}` : times.getMinutes()
	let _seconds = parseInt(times.getSeconds()) < 10 ? `0${times.getSeconds()}` : times.getSeconds()
	return `${times.getFullYear()}-${_month}-${_date} ${_hours}:${_minutes}:${_seconds}`
}

// 传入时间 返回 h:m
export function hm(times){
	console.log(times)
	times = new Date(parseInt(times))
	let _hours = parseInt(times.getHours()) < 10 ? `0${times.getHours()}` : times.getHours()
	let _minutes = parseInt(times.getMinutes()) < 10 ? `0${times.getMinutes()}` : times.getMinutes()
	return `${_hours}:${_minutes}:${_minutes}`
}


// 根据传入的星期 返回 这个月是这个星期的所有的数组 参数数组
export function weebMonth(nowDate,arrays){
	let year = nowDate.getFullYear()
	let month = nowDate.getMonth()
	let addDates =  new Date(year,month+1,0)
	addDates = addDates.getDate()
	let weebMonth = []
	let arrs = []
	let hashMonth = month
	hashMonth = parseInt(hashMonth+1) < 10 ? `0${hashMonth+1}`:hashMonth+1
	for(let i = 1; i<=addDates;i++){
		let weebDate = new Date(year,month,i)
		let getDay = weebDate.getDay()
		let toDay = i < 10 ? `0${i}`:i

		arrs.push({
			times:`${year}-${hashMonth}-${toDay}`,
			weeb:day[getDay]
		})
	}
	arrays.forEach(item => {
		let weeb =  arrs.filter(yee => {
			return yee.weeb === item
		})
		weebMonth = [...weeb,...weebMonth]
	})
	return weebMonth
}

// 返回这个月的数组天数
export function monthDay(nowDate){
	let year = nowDate.getFullYear()
	let month = parseInt(nowDate.getMonth()) < 10 ? `0${nowDate.getMonth()+1}` : nowDate.getMonth() + 1
	let addDates =  new Date(year,month+1,0)
	addDates = addDates.getDate()
	let arrs = []
	for(let i = 1; i<=addDates;i++){
		let day = i < 10 ? `0${i}`:i
		arrs.push({
			times:`${year}-${month}-${day}`,
			date: day
		})
	}
	return arrs
}

// 根据传入的星期 开始日期 结束日期 返回 这个月是这个星期的所有的数组 参数数组
export function weebMonthDay(arrays,stateDate,endDate){
	let dateMonth = difference(stateDate,endDate)
	let arr = []
	let weebMonthDay = []
	arrays.forEach(item => {
		arr = dateMonth.filter(yee =>{
			return item === yee.getDay
		})
		weebMonthDay = [...arr,...weebMonthDay]
	})

	return weebMonthDay

}

function updata(timeStamp){
	let nowDate = new Date()
	let times = new Date(parseInt(timeStamp))
	let mgg = {}
	mgg.getFullYear = times.getFullYear()
	mgg.getMonth = parseInt(times.getMonth()+1) < 10 ? `0${times.getMonth()+1}` : times.getMonth()+1
	// parseInt(times.getMonth()+1) < 10 ? `0${times.getMonth()+1}` : times.getMonth()+1
	mgg.getDate = parseInt(times.getDate()) <10 ? `0${times.getDate()}` : times.getDate()
	mgg.getDay = day[times.getDay()]
	mgg.times = `${mgg.getFullYear}-${mgg.getMonth}-${mgg.getDate}`
	return mgg
}

