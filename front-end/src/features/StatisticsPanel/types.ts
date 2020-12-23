export interface Statistics {
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
