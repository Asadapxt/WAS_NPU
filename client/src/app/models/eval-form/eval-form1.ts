export interface EvalForm1 {

}

export interface Teaching {
  type: string;
  lecture_hour: number;
  practical_hour: number;
}

export interface Research {
  type: string;
  workload_hour: number;
}

export interface Academic_service {
  type: string;
  workload_hour: number;
}

export interface Research_ext {
  type: string;
  grant: number;
  workload_hour: number;
}