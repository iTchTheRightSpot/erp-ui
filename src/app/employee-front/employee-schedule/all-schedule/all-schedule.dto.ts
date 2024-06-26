export interface Schedule {
  shift_id: string;
  start: Date;
  end: Date;
}

export interface ScheduleTable {
  id: string;
  startDate: string;
  startTime: string;
  endTime: string;
}
