export interface Schedule {
  shift_id: string;
  is_visible: boolean;
  start: Date;
  end: Date;
}

export interface ScheduleTable {
  shiftId: string;
  isVisible: boolean;
  startDate: Date;
  startTime: string;
  endTime: string;
}
