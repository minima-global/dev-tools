export type CoinsParams = {
  relevant?: 'true' | 'false';
  sendable?: 'true' | 'false';
  coinid?: string;
  amount?: number;
  address?: string;
  tokenid?: string;
  checkmempool?: 'true' | 'false';
  coinage?: number;
  order?: 'asc' | 'desc';
};

export type TokenParams = {
  tokenid?: string;
  action?: 'import' | 'export';
  data?: string;
};
