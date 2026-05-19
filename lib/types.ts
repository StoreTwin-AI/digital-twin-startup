export interface District {
  id: string;
  name: string;
  address: string;
  description: string;
  footTraffic: number;
  avgRent: string;
  competitorCount: number;
  lat: number;
  lng: number;
}

export interface StartupInput {
  businessType: string;
  menuName: string;
  avgPrice: number;
  concept: string;
  operatingHours: string;
}

export type CompetitionLevel = "low" | "medium" | "high";

export interface AnalysisResult {
  successProbability: number;
  monthlyRevenue: number;
  competitionLevel: CompetitionLevel;
  competitionScore: number;
  targetAudience: { age: string; percentage: number }[];
  strategies: string[];
  insights: string[];
  footTrafficByHour: { hour: string; count: number }[];
  revenueProjection: { month: string; revenue: number }[];
  audienceDistribution: { name: string; value: number }[];
}

export interface TrialSession {
  district: District;
  input: StartupInput;
  analysis: AnalysisResult;
  analyzedAt: string;
}
