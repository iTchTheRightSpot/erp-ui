export interface Schedule {
  shift_id: number;
  start: Date;
  end: Date;
}

export interface ScheduleTable {
  id: number;
  startDate: string;
  startTime: string;
  endTime: string;
}
