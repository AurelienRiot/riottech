"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  type DropdownProps,
  labelNext,
  labelPrevious,
  useDayPicker,
  type DayPickerProps,
} from "react-day-picker";
import { ScrollArea } from "./scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 12,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<"days" | "years">("days");
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        // from: currentYear - Math.floor(yearRange / 2 - 1),
        from: props.startMonth ? props.startMonth.getFullYear() : currentYear - Math.floor(yearRange / 2 - 1),
        to: props.endMonth ? props.endMonth.getFullYear() : currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange]),
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 w-full", className)}
      // style={{
      //   width: 248.8 * (columnsDisplayed ?? 1) + "px",
      // }}
      classNames={{
        months: "flex flex-col md:flex-row md:gap-4 relative justify-center",
        month_caption: "flex justify-center h-7 mx-10 relative items-center",
        weekdays: "flex flex-row",
        weekday: "text-muted-foreground w-8 font-normal text-[0.8rem]",
        month: "gap-y-4 w-full md:odd:mt-0 odd:mt-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium truncate",
        button_next: cn(
          buttonVariants({
            variant: "outline",
            className: "absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          }),
        ),
        button_previous: cn(
          buttonVariants({
            variant: "outline",
            className: "absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          }),
        ),
        nav: "flex items-start",
        month_grid: "mt-4",
        week: "flex w-full mt-2",
        day: "p-0 size-8 text-sm flex-1 flex items-center justify-center has-[button]:hover:!bg-accent rounded-md has-[button]:hover:aria-selected:!bg-primary has-[button]:hover:text-accent-foreground has-[button]:hover:aria-selected:text-primary-foreground",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal transition-none hover:bg-transparent hover:text-inherit aria-selected:opacity-100",
        ),
        range_start: "day-range-start rounded-s-md",
        range_end: "day-range-end rounded-e-md",
        selected:
          "bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent hover:aria-selected:!bg-accent rounded-none aria-selected:text-accent-foreground hover:aria-selected:text-accent-foreground",
        hidden: "invisible",
        dropdowns: "flex justify-between items-center w-full",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, options, ...props }: DropdownProps) => {
          if (!options) return <div></div>;
          const selected = options.find((child) => `${child.value}` === `${value}`);
          const handleChange = (newValue: string) => {
            const changeEvent = {
              target: { value: newValue },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };

          return (
            <Select value={value != null ? value.toString() : ""} onValueChange={handleChange}>
              <SelectTrigger className="pr-1.5 ring-0 focus:ring-0 w-fit focus:ring-offset-0 ">
                <SelectValue>{selected?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="z-[1200]">
                <ScrollArea className="h-80">
                  {options.map((option, id) => (
                    <SelectItem
                      key={`${option.value}-${id}`}
                      value={option.value != null ? option.value.toString() : `default-value-${id}`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className, children, ...props }) => {
          const { nextMonth, previousMonth, goToMonth } = useDayPicker();

          const isPreviousDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth && differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), startMonth) < 0) ||
                (endMonth && differenceInCalendarDays(new Date(displayYears.from - 1, 0, 1), endMonth) > 0)
              );
            }
            return !previousMonth;
          })();

          const isNextDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth && differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), startMonth) < 0) ||
                (endMonth && differenceInCalendarDays(new Date(displayYears.to + 1, 0, 1), endMonth) > 0)
              );
            }
            return !nextMonth;
          })();

          const handlePreviousClick = React.useCallback(() => {
            if (!previousMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from - (prev.to - prev.from + 1),
                to: prev.to - (prev.to - prev.from + 1),
              }));
              onPrevClick?.(new Date(displayYears.from - (displayYears.to - displayYears.from), 0, 1));
              return;
            }
            goToMonth(previousMonth);
            onPrevClick?.(previousMonth);
          }, [previousMonth, goToMonth]);

          const handleNextClick = React.useCallback(() => {
            if (!nextMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from + (prev.to - prev.from + 1),
                to: prev.to + (prev.to - prev.from + 1),
              }));
              onNextClick?.(new Date(displayYears.from + (displayYears.to - displayYears.from), 0, 1));
              return;
            }
            goToMonth(nextMonth);
            onNextClick?.(nextMonth);
          }, [goToMonth, nextMonth]);
          return (
            <nav className={cn("flex items-center", className)} {...props}>
              <Button
                variant="outline"
                className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isPreviousDisabled ? undefined : -1}
                disabled={isPreviousDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the previous ${displayYears.to - displayYears.from + 1} years`
                    : labelPrevious(previousMonth)
                }
                onClick={handlePreviousClick}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isNextDisabled ? undefined : -1}
                disabled={isNextDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the next ${displayYears.to - displayYears.from + 1} years`
                    : labelNext(nextMonth)
                }
                onClick={handleNextClick}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          );
        },
        CaptionLabel: ({ children }) => (
          <Button
            className="h-7 w-full truncate text-sm font-medium"
            variant="ghost"
            size="sm"
            onClick={() => setNavView((prev) => (prev === "days" ? "years" : "days"))}
          >
            {navView === "days" ? children : displayYears.from + " - " + displayYears.to}
          </Button>
        ),
        MonthGrid: ({ className, children, ...props }) => {
          const { goToMonth } = useDayPicker();
          if (navView === "years") {
            return (
              <div className={cn("grid grid-cols-4 gap-y-2", className)} {...props}>
                {Array.from({ length: displayYears.to - displayYears.from + 1 }, (_, i) => {
                  const isBefore =
                    differenceInCalendarDays(new Date(displayYears.from + i, 12, 31), startMonth as Date) < 0;

                  const isAfter = differenceInCalendarDays(new Date(displayYears.from + i, 0, 0), endMonth as Date) > 0;

                  const isDisabled = isBefore || isAfter;
                  return (
                    <Button
                      key={i}
                      className={cn(
                        "h-7 w-full text-sm font-normal text-foreground",
                        displayYears.from + i === new Date().getFullYear() &&
                          "bg-accent font-medium text-accent-foreground",
                      )}
                      variant="ghost"
                      onClick={() => {
                        setNavView("days");
                        goToMonth(new Date(displayYears.from + i, new Date().getMonth()));
                      }}
                      disabled={navView === "years" ? isDisabled : undefined}
                    >
                      {displayYears.from + i}
                    </Button>
                  );
                })}
              </div>
            );
          }
          return (
            <table className={className} {...props}>
              {children}
            </table>
          );
        },
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
