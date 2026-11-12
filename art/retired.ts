// ============================================================
// RETIRED — finance-only scenes, props and vignettes copied from
// the source engine. They stay in the art library ONLY because the
// engine's own tests use them as fixtures; the LW agent's catalog
// never offers them, so no LW video can pick one. Plan 2 replaces
// them with LW's own motivation library and deletes them.
// ============================================================

export const RETIRED: ReadonlySet<string> = new Set([
  // # scenes
  'shop-street', 'atm-street', 'supermarket', 'kitchen-bills', 'bank-interior', 'vault-room', 'boardroom', 'trading-desk',
  'stock-exchange', 'chart-wall', 'server-room', 'ai-lab', 'ai-brain', 'courtroom', 'savings-jars', 'factory-floor',
  'warehouse', 'port', 'mining-room', 'parliament', 'car-dealership', 'casino', 'gas-station', 'factory-town',
  'wall-street', 'bull-bear', 'portfolio-dashboard', 'ipo-bell', 'gold-vault', 'dividend-mailbox', 'bond-desk',
  'coffee-shop', 'checkout', 'tax-office', 'apartment-rent', 'payday-office', 'pawn-shop', 'datacenter-aisle',
  'chip-cleanroom', 'robot-warehouse', 'startup-office', 'assembly-line', 'shopping-mall', 'restaurant-kitchen',
  'pitch-meeting', 'delivery-street', 'crypto-exchange', 'bitcoin-atm', 'central-bank', 'oil-rig',
  // # props
  'cash-stack', 'banknote', 'coin', 'coin-stack', 'gold-bar', 'credit-card', 'wallet', 'piggy-bank', 'vault-door',
  'contract', 'receipt', 'price-tag', 'calculator', 'bank', 'dollar-sign', 'euro-sign', 'pound-sign', 'tax-form',
  'briefcase', 'money-bag', 'atm', 'shop-mini', 'factory', 'container', 'crane', 'chart-board', 'gavel',
  'warehouse-boxes', 'money-tree', 'leaky-bucket', 'shopping-bag', 'grocery-basket', 'bills-stack', 'gas-pump',
  'oil-barrel', 'cargo-ship', 'wheat', 'stock-certificate', 'interest-percent', 'inflation-balloon', 'bitcoin',
  'crypto-coin', 'blockchain', 'server-rack',
  // # vignettes
  'money-flow', 'pie', 'baskets', 'money-mountain', 'lottery',
])

// # true when the LW agent may use this id
export const usable = (id: string) => !RETIRED.has(id)
