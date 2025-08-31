import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useNavigation } from "./NavigationContext"
import { CalendarIcon } from "lucide-react"
// Using basic date formatting instead of date-fns for simplicity
const format = (date: Date, formatStr: string) => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  
  if (formatStr === "LLL dd, y") {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[date.getMonth()]} ${day.toString().padStart(2, '0')}, ${year}`
  }
  return `${month}/${day}/${year}`
}

export function DateRangePicker() {
  const { dateRange, setDateRange } = useNavigation()
  const [open, setOpen] = useState(false)

  const handleSelect = (range: { from: Date; to: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDateRange(range)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-auto justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelect({
                from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                to: new Date()
              })}
            >
              This Month
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelect({
                from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                to: new Date(new Date().getFullYear(), new Date().getMonth(), 0)
              })}
            >
              Last Month
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelect({
                from: new Date(new Date().getFullYear(), 0, 1),
                to: new Date()
              })}
            >
              This Year
            </Button>
          </div>
          <Calendar
            mode="range"
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range) => range && handleSelect(range)}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}