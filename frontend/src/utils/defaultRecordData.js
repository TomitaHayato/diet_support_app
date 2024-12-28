const week  = ["日", "月", "火", "水", "木", "金", "土"];

export const dowIndex = {
  "日": 0,
  "月": 1,
  "火": 2,
  "水": 3,
  "木": 4,
  "金": 5,
  "土": 6
}

export const defaultWeeklyData = new Array(7).fill(null).map((_, index) => {
  return {
    dow: week[index],
    totalTime: 0,
    totalBurnedCalories: 0,
    totalUnburnedCalories: 0,
    totalIntakedCalories: 0
  }
});

const now      = new Date;
const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

export const defaultMonthlyData = new Array(lastDate.getDate()).fill(null).map((_, index) => {
  return {
    date: index + 1,
    totalTime: 0,
    totalBurnedCalories: 0,
    totalUnburnedCalories: 0,
    totalIntakedCalories: 0
  }
}) 

export const defaultYearlyData = new Array(12).fill(null).map((_, index) => {
  return {
    month: index + 1,
    totalTime: 0,
    totalBurnedCalories: 0,
    totalUnburnedCalories: 0,
    totalIntakedCalories: 0
  }
});

export const defaultTodayData = {
  totalTime: 0,
  totalBurnedCalories: 0,
  totalUnburnedCalories: 0,
  totalIntakedCalories: 0
}
