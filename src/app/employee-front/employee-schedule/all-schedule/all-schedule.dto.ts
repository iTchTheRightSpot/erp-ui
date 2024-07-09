export interface Schedule {
  shift_id: string;
  is_visible: boolean;
  start: Date;
  end: Date;
}

export interface ScheduleTable {
  id: string;
  isVisible: boolean;
  startDate: string;
  startTime: string;
  endTime: string;
}
