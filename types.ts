export interface DefenseAnalysis {
  tags: string[];
  threat_analysis: string;
  defense_strategy: string;
  verbal_counter: string;
  survival_probability_text: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}