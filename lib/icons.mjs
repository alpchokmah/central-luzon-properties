/** Central Luzon Properties mark set — geometric, north-bound, not stock UI icons. */
const ns='xmlns="http://www.w3.org/2000/svg"';
const plate=(inner)=>`<svg ${ns} viewBox="0 0 64 64" fill="none" aria-hidden="true" class="cl-icon"><rect class="cl-icon-plate" x="2" y="2" width="60" height="60" rx="5"/><path class="cl-icon-north" d="M48 12h10m0 0l-3.5-3.5M58 12l-3.5 3.5" stroke-linecap="square" stroke-linejoin="miter"/><g class="cl-icon-draw">${inner}</g></svg>`;

/** Inline forward (right) arrow used in links, buttons, and the brand mark. */
export const forward=`<svg ${ns} class="icon-forward" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg>`;

const glyphs={
 enterprise:plate(`
  <path d="M16 46V22h10v24M26 46V18h10v28M36 46V26h12v20" stroke-width="1.75"/>
  <path d="M14 46h36" stroke-width="1.75"/>
  <circle cx="21" cy="28" r="1.4" fill="currentColor"/>
  <circle cx="31" cy="24" r="1.4" fill="currentColor"/>
  <circle cx="42" cy="32" r="1.4" fill="currentColor"/>
  <path class="cl-icon-accent" d="M18 18l4-6 4 6z" fill="currentColor" opacity=".35"/>
 `),
 education:plate(`
  <path d="M14 30l18-8 18 8-18 8-18-8z" stroke-width="1.75"/>
  <path d="M22 34v8c4 3 12 3 16 0v-8" stroke-width="1.75"/>
  <path d="M50 30v10" stroke-width="1.75"/>
  <circle cx="50" cy="42" r="2" fill="currentColor"/>
  <path class="cl-icon-accent" d="M32 22v16" stroke-width="1.5" opacity=".45"/>
 `),
 environment:plate(`
  <path d="M32 46V28" stroke-width="1.75"/>
  <path d="M32 30c-8-2-12-10-10-16 8 1 14 7 14 14z" stroke-width="1.75"/>
  <path d="M32 32c8-2 12-10 10-16-8 1-14 7-14 14z" stroke-width="1.75"/>
  <path d="M18 46h28" stroke-width="1.75"/>
  <circle class="cl-icon-accent" cx="32" cy="18" r="2.5" fill="currentColor" opacity=".4"/>
 `),
 enrichment:plate(`
  <circle cx="32" cy="30" r="12" stroke-width="1.75"/>
  <path d="M32 18v24M20 30h24" stroke-width="1.5"/>
  <path d="M24 22l16 16M40 22L24 38" stroke-width="1.25" opacity=".55"/>
  <path class="cl-icon-accent" d="M32 12l2.2 5.5H40l-4.6 3.4 1.8 5.6L32 23.8l-5.2 2.7 1.8-5.6L24 17.5h5.8z" fill="currentColor" opacity=".35"/>
 `),
 residential:plate(`
  <path d="M14 30l18-12 18 12v16H14V30z" stroke-width="1.75"/>
  <path d="M28 46V34h8v12" stroke-width="1.75"/>
  <path class="cl-icon-accent" d="M20 28l12-8 12 8" stroke-width="1.75" opacity=".5"/>
  <rect x="36" y="34" width="6" height="5" stroke-width="1.4"/>
 `),
 nature:plate(`
  <path d="M18 44c0-12 8-20 14-22 6 2 14 10 14 22" stroke-width="1.75"/>
  <path d="M32 22v24" stroke-width="1.75"/>
  <path d="M14 44h36" stroke-width="1.75"/>
  <path class="cl-icon-accent" d="M22 34c4-6 8-8 10-8 2 0 6 2 10 8" stroke-width="1.5" opacity=".5"/>
  <circle cx="40" cy="20" r="3" stroke-width="1.4"/>
 `),
 lasting:plate(`
  <path d="M16 42l8-18 8 12 8-20 8 26" stroke-width="1.75" stroke-linejoin="round"/>
  <path d="M14 46h36" stroke-width="1.75"/>
  <circle class="cl-icon-accent" cx="48" cy="20" r="3.5" fill="currentColor" opacity=".35"/>
  <path d="M40 46V34" stroke-width="1.5" opacity=".5"/>
 `),
 industrial:plate(`
  <path d="M14 46V28l10-6v24M24 46V22l14 8v16M38 46V30h12v16" stroke-width="1.75"/>
  <path d="M42 22v8M48 18v12" stroke-width="1.5"/>
  <path d="M12 46h42" stroke-width="1.75"/>
  <rect class="cl-icon-accent" x="40" y="34" width="6" height="5" fill="currentColor" opacity=".35"/>
 `),
 commercial:plate(`
  <rect x="16" y="20" width="32" height="26" rx="1" stroke-width="1.75"/>
  <path d="M16 30h32M28 20v26M36 30v16" stroke-width="1.5"/>
  <path class="cl-icon-accent" d="M22 14h20l-2 6H24l-2-6z" fill="currentColor" opacity=".35"/>
 `),
 ease:plate(`
  <rect x="18" y="18" width="28" height="28" rx="2" stroke-width="1.75"/>
  <path d="M26 32l5 5 9-11" stroke-width="1.9" stroke-linecap="square"/>
  <path class="cl-icon-accent" d="M18 18h8v8" stroke-width="1.5" opacity=".45"/>
  <path d="M38 18h8v8M18 38h8v8M38 38h8v8" stroke-width="1.25" opacity=".4"/>
 `),
 operations:plate(`
  <circle cx="32" cy="32" r="14" stroke-width="1.75"/>
  <circle cx="32" cy="32" r="4" fill="currentColor"/>
  <path d="M32 18v5M32 41v5M18 32h5M41 32h5" stroke-width="1.75"/>
  <path class="cl-icon-accent" d="M32 32l10-8" stroke-width="1.5" opacity=".45"/>
 `),
 land:plate(`
  <path d="M12 40h40" stroke-width="1.75"/>
  <path d="M18 40c4-10 10-16 14-16s10 6 14 16" stroke-width="1.75"/>
  <path d="M22 40l4-8h12l4 8" stroke-width="1.5"/>
  <path class="cl-icon-accent" d="M14 28h8M42 28h8" stroke-width="2" opacity=".4"/>
  <circle cx="32" cy="22" r="2" fill="currentColor"/>
 `),
 air:plate(`
  <path d="M14 34h16l8-12h6l-4 12h8l-3 5H28l-6 9h-5l4-9H14z" stroke-width="1.6" stroke-linejoin="round"/>
  <path class="cl-icon-accent" d="M20 22l6 3" stroke-width="1.75" opacity=".45"/>
  <circle cx="46" cy="20" r="2.5" stroke-width="1.4"/>
 `),
 sea:plate(`
  <path d="M18 28h20l4 8H22l-4-8z" stroke-width="1.75"/>
  <path d="M28 28V22h6v6" stroke-width="1.5"/>
  <path d="M14 42c4-3 8-3 12 0s8 3 12 0 8-3 12 0" stroke-width="1.75"/>
  <path class="cl-icon-accent" d="M14 48c4-3 8-3 12 0s8 3 12 0 8-3 12 0" stroke-width="1.5" opacity=".4"/>
 `),
 transit:plate(`
  <rect x="18" y="16" width="28" height="22" rx="3" stroke-width="1.75"/>
  <path d="M18 28h28M24 16v12M40 16v12" stroke-width="1.5"/>
  <circle cx="24" cy="44" r="4" stroke-width="1.6"/>
  <circle cx="40" cy="44" r="4" stroke-width="1.6"/>
  <path class="cl-icon-accent" d="M22 38h20" stroke-width="1.75" opacity=".4"/>
 `),
 ecosystem:plate(`
  <circle cx="32" cy="32" r="14" stroke-width="1.75"/>
  <circle cx="32" cy="32" r="5" stroke-width="1.5"/>
  <circle cx="22" cy="22" r="3.5" stroke-width="1.4"/>
  <circle cx="44" cy="24" r="3.5" stroke-width="1.4"/>
  <circle cx="40" cy="42" r="3.5" stroke-width="1.4"/>
  <path class="cl-icon-accent" d="M32 27V18M27 35l-7 5M37 35l7 5" stroke-width="1.4" opacity=".45"/>
 `),
 road:plate(`
  <path d="M24 14l-6 32h28l-6-32H24z" stroke-width="1.75"/>
  <path d="M32 16v6M32 28v6M32 40v4" stroke-width="2" stroke-linecap="square"/>
  <path class="cl-icon-accent" d="M20 46h24" stroke-width="1.75" opacity=".4"/>
 `),
 connectivity:plate(`
  <path d="M14 36h36" stroke-width="1.75"/>
  <path d="M18 36c3-8 7-14 14-14s11 6 14 14" stroke-width="1.75"/>
  <circle cx="20" cy="36" r="3.5" stroke-width="1.5"/>
  <circle cx="44" cy="36" r="3.5" stroke-width="1.5"/>
  <path d="M32 22V16M28 18l4-4 4 4" stroke-width="1.5"/>
  <path class="cl-icon-accent" d="M26 44h12" stroke-width="2" opacity=".4"/>
 `),
 economy:plate(`
  <path d="M16 44V28h8v16M28 44V20h8v24M40 44V24h8v20" stroke-width="1.75"/>
  <path d="M14 44h36" stroke-width="1.75"/>
  <path class="cl-icon-accent" d="M18 22l10-8 8 6 12-10" stroke-width="1.75" opacity=".55"/>
  <circle cx="48" cy="10" r="2.5" fill="currentColor" opacity=".4"/>
 `),
 demand:plate(`
  <circle cx="24" cy="22" r="6" stroke-width="1.75"/>
  <circle cx="42" cy="24" r="5" stroke-width="1.6"/>
  <path d="M12 44c2-10 8-14 12-14s10 4 12 14" stroke-width="1.75"/>
  <path d="M34 44c1-8 5-12 8-12s7 4 8 12" stroke-width="1.6"/>
  <path class="cl-icon-accent" d="M28 18c2-4 6-4 8-1" stroke-width="1.5" opacity=".45"/>
 `),
 living:plate(`
  <path d="M16 32l16-12 16 12v14H16V32z" stroke-width="1.75"/>
  <path d="M28 46V36h8v10" stroke-width="1.75"/>
  <circle cx="22" cy="20" r="3" stroke-width="1.4"/>
  <circle cx="42" cy="18" r="2.5" stroke-width="1.3"/>
  <path class="cl-icon-accent" d="M18 46h28" stroke-width="1.75" opacity=".4"/>
 `),
 outdoors:plate(`
  <path d="M14 44l10-18 8 10 8-16 10 24" stroke-width="1.75" stroke-linejoin="round"/>
  <path d="M12 46h40" stroke-width="1.75"/>
  <circle class="cl-icon-accent" cx="46" cy="18" r="4" stroke-width="1.5" opacity=".5"/>
  <path d="M20 46c2-6 6-10 10-10" stroke-width="1.4" opacity=".45"/>
 `),
 heart:plate(`
  <circle cx="32" cy="32" r="16" stroke-width="1.75"/>
  <circle cx="32" cy="32" r="3" fill="currentColor"/>
  <path d="M32 16v6M32 42v6M16 32h6M42 32h6" stroke-width="1.6"/>
  <path d="M21 21l4 4M43 21l-4 4M21 43l4-4M43 43l-4-4" stroke-width="1.4" opacity=".55"/>
  <path class="cl-icon-accent" d="M32 32l9-5" stroke-width="1.5" opacity=".4"/>
 `),
 grow:plate(`
  <path d="M18 46V30h10v16M32 46V22h10v24M46 46V14" stroke-width="1.75"/>
  <path d="M14 46h36" stroke-width="1.75"/>
  <path d="M46 14l-4 4M46 14l4 4" stroke-width="1.5"/>
  <path class="cl-icon-accent" d="M20 26c6-10 14-14 22-14" stroke-width="1.6" opacity=".45"/>
 `)
};

export function icon(name){
 return glyphs[name]||glyphs.enterprise;
}
