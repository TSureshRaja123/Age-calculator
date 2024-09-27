function ageCalculator(){
    const today = new Date()
    const inputDate= new Date(document.getElementById("date-input").value)

    const birthDetails ={
        date : inputDate.getDate(),
        year : inputDate.getFullYear(),
        month : inputDate.getMonth()+1,
    }

    const currentYear = today.getFullYear()
    const currentMonth =today.getMonth()+1
    const currentDate = today.getDate()

    if(isFutureDays(birthDetails,currentYear,currentMonth,currentDate)){
        alert("Not Born Yet...")
        displayResult("-","-","-")
        return
    }

    const {years, months,dates}= caculateAge(birthDetails,currentYear,currentMonth,currentDate)

    displayResult(years,months,dates)
}

const caculateAge = (birthDetails,currentYear,currentMonth,currentDate)=>{
    let years = currentYear-birthDetails.year;
    let months, dates;

    if(currentMonth < birthDetails.month){
        years--;
        months=12-(birthDetails.month-currentMonth);

    }else{
        months=currentMonth-birthDetails.month
    }

    if(currentDate < birthDetails.date){
        months--;
        let lastMonth = currentMonth===1 ? 12 : currentMonth-1;
        let daysInLastMonth = getDaysInLastMonth(lastMonth,currentYear);
        dates=daysInLastMonth - (birthDetails.date-currentDate);
    }else{
        dates=currentDate-birthDetails.date;
    }

    return {years,months,dates}   
}

const isFutureDays = (birthDetails,currentYear,currentMonth,currentDate)=>{
    return (
        currentYear < birthDetails.year || 
        (currentYear === birthDetails.year &&
            (birthDetails.month > currentMonth || 
                (birthDetails.month === currentMonth &&
                    birthDetails.date > currentDate
                )
            )
         )
    )
}

const getDaysInLastMonth = (month,year)=>{
    const isLeapYear = year%4===0 && (year%100 !=0 || year%400===0)
    const getDaysInLastMonth=[31,isLeapYear ? 29:28,31,30,31,30,31,31,30,31,30,31]
    return getDaysInLastMonth[month-1]
}

const displayResult =(byear,bmonth,bdate)=>{
    document.getElementById("year").textContent=byear
    document.getElementById("month").textContent=bmonth
   document.getElementById("days").textContent= bdate
}