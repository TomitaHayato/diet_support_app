// Todo: 各デフォルトデータを指定した期間のデフォルトデータに動的に対応させる

// 曜日と0~6を対応させるオブジェクトを作成
export function getDowIndex() {
  return  {
            "日": 0,
            "月": 1,
            "火": 2,
            "水": 3,
            "木": 4,
            "金": 5,
            "土": 6
          }
}

export function getDefaultWeeklyData() {
  const defaultWeeklyData = new Array(7).fill(null).map((_, index) => {
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    return {
      dow: week[index],
      totalTime: 0,
      totalBurnedCalories: 0,
      totalUnburnedCalories: 0,
      totalIntakedCalories: 0,
    }
  })
  return defaultWeeklyData;
}

export function getDefaultMonthlyData() {
  const now      = new Date;
  const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 今月末の日にち


  const defaultMonthlyData = new Array(lastDate.getDate())
                              .fill(null)
                                .map((_, index) => {
                                  return {
                                    date: index + 1,
                                    totalTime: 0,
                                    totalBurnedCalories: 0,
                                    totalUnburnedCalories: 0,
                                    totalIntakedCalories: 0,
                                  }})
  return defaultMonthlyData;
}

export function getDefaultYearlyData() {
  return(
    new Array(12).fill(null).map((_, index) => {
      return {
        month: index + 1,
        totalTime: 0,
        totalBurnedCalories: 0,
        totalUnburnedCalories: 0,
        totalIntakedCalories: 0
      }
    })
  )
}

export function getDefaultTodayData() {
  return({
    totalTime: 0,
    totalBurnedCalories: 0,
    totalUnburnedCalories: 0,
    totalIntakedCalories: 0
  })
}
