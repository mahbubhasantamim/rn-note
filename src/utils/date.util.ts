import { format } from "date-fns"

export const DateUtil = {
    format: (date: string) => {
        return format(new Date(date), "dd MMM yyyy")
    },
    getYear: (date: string) => {
        return format(new Date(date), "yyyy")
    },
}
