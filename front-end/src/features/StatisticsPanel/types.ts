export interface Statistics {
  calls: {
    lastMonth: number
    lastWeek: number
    thisMonth: number
    thisWeek: number
    today: number
    yesterday: number
  }
  generalData: { noCall: number; nonExistent: number; totalNumbers: number }
  perDayData: [
    {
      answered: number
      date: string
      different: number
      noCall: number
      nonExistent: number
      totalCalls: number
    },
    {
      answered: number
      date: string
      different: number
      noCall: number
      nonExistent: number
      totalCalls: number
    },
    {
      answered: number
      date: string
      different: number
      noCall: number
      nonExistent: number
      totalCalls: number
    }
  ]
  perMonthData: {
    months: [
      {
        answered: number
        date: string
        different: number
        inexistent: number
        total: number
      }
    ]
    totalValidNumbers: number
  }
}
