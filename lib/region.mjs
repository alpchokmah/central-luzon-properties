import {icon,forward} from './icons.mjs';

const arrow=forward;

function whyCard({icon:name,num,label,title,body,context,links=''}){
  return `<article class="why-card">
    <div class="why-card-mark">${icon(name)}<span class="why-card-num">${num}</span></div>
    <p class="why-card-label">${label}</p>
    <h3>${title}</h3>
    <p>${body}</p>
    ${context?`<p class="region-context">${context}</p>`:''}
    ${links}
  </article>`;
}

/** Compact home teaser that points to the full Why Central Luzon page. */
export function regionSection() {
  return `<section class="region section" id="why-central-luzon" aria-labelledby="region-title">
    <div class="section-heading">
      <div><p class="eyebrow">WHY CENTRAL LUZON</p><h2 id="region-title">Build a future.<br><em>Make room for life.</em></h2></div>
      <p>Connected business centers, established communities and places to enjoy the outdoors. Central Luzon gives you more than one reason to put down roots.</p>
    </div>
    <div class="region-stats" aria-label="Central Luzon at a glance">
      <div><strong>4.46<span>%</span></strong><p>Regional economic growth in 2025</p><a href="https://psa.gov.ph/statistics/regional-accounts" target="_blank" rel="noopener">PSA · 2025 regional accounts ${forward}</a></div>
      <div><strong>16.3<span>%</span></strong><p>Share of Philippine industry in 2025</p><a href="https://psa.gov.ph/statistics/regional-accounts" target="_blank" rel="noopener">PSA · At constant 2018 prices ${forward}</a></div>
      <div><strong>94<span> km</span></strong><p>SCTEX links Subic, Clark and Tarlac</p><a href="https://scad.gov.ph/sctex/" target="_blank" rel="noopener">Subic Clark Alliance for Development ${forward}</a></div>
    </div>
    <div class="region-next">
      <div><p class="eyebrow">INVEST · LIVE · BELONG</p><h3>See why families and enterprises<br><em>are looking north.</em></h3><p>Connectivity, a working economy, community living and outdoor space—then choose the estate that fits your plans.</p></div>
      <a class="button dark" href="/why-central-luzon">Why Central Luzon ${arrow}</a>
    </div>
  </section>`;
}

/** Full dedicated page body (inserted inside shell main). */
export function whyBody() {
  const invest=[
    {icon:'connectivity',num:'01',label:'Connectivity',title:'Stay linked to work and travel.',body:'SCTEX connects the Subic and Clark freeport areas with Tarlac. Clark International Airport provides a regional air gateway. For business owners and frequent travelers, these links are a practical reason to consider the north.',context:'Choose your address around the journeys you actually make: last-mile access from the estate matters as much as the expressway.',links:`<a class="text-link" href="https://clarkinternationalairport.com/lipadcorp/" target="_blank" rel="noopener">Explore Clark’s airport gateway ${forward}</a>`},
    {icon:'economy',num:'02',label:'Economic base',title:'A region with a working economy.',body:'Central Luzon’s economy grew 4.46% in 2025 and contributed 16.3% of the country’s industry output. That base gives buyers a reason to explore locations serving businesses, employees and local communities.',context:'Rental demand and resale prospects still depend on the specific site, purchase price and holding period.',links:`<a class="text-link" href="https://psa.gov.ph/statistics/regional-accounts" target="_blank" rel="noopener">Read the regional economic data ${forward}</a>`},
    {icon:'enterprise',num:'03',label:'Master-planned estates',title:'Scale that shapes neighborhoods.',body:'Large estates by established developers—Ayala Land’s Cresendo and Alviera, and Aboitiz Economic Estates’ TARI—bring roads, open space, enterprise and (where applicable) residential communities under long-horizon master plans.',context:'Estate scale is not a guarantee of appreciation. Visit, compare total costs and confirm what is already delivered versus still planned.',links:`<div class="region-links"><a class="text-link" href="/estates/cresendo">Cresendo ${forward}</a><a class="text-link" href="/estates/alviera">Alviera ${forward}</a><a class="text-link" href="/estates/tari">TARI Estate ${forward}</a></div>`},
    {icon:'demand',num:'04',label:'Who is looking',title:'Demand that matches real lives.',body:'Interest in Central Luzon often comes from local and regional upper-middle buyers, OFW land bankers, balikbayan and second-home seekers from Metro Manila, and households upgrading their everyday living environment.',context:'Your motives matter more than a segment label. Tell the agent your timeline, budget and whether you need a home, a lot to build on, or a business address.'}
  ];
  const live=[
    {icon:'living',num:'01',label:'Everyday living',title:'Find a community around your routines.',body:'Cresendo combines a town-center vision with residential opportunities in Tarlac. Alviera brings homes, leisure and enterprise together in Porac. Different settings let you choose around family life, work and long-term plans.',context:'Visit the neighborhood and check schools, healthcare, internet and the daily commute that matter to you.',links:`<div class="region-links"><a class="text-link" href="/estates/cresendo">Explore Cresendo ${forward}</a><a class="text-link" href="/estates/alviera">Explore Alviera ${forward}</a></div>`},
    {icon:'outdoors',num:'02',label:'Life outside work',title:'Leave space for the outdoors.',body:'New Clark City’s National River Park Corridor includes jogging paths, bikeways and public green spaces. Together with the landscape around Porac—and Tarlac destinations such as Capas National Shrine, Monasterio de Tarlac and nearby trails—weekends can look different from Metro Manila.',context:'Regional destinations are separate from estate amenities. Check travel times and current access when planning a visit.',links:`<a class="text-link" href="https://beta.newclarkcity.ph/facilities/" target="_blank" rel="noopener">Explore New Clark City’s facilities ${forward}</a>`},
    {icon:'heart',num:'03',label:'Heart of the region',title:'Tarlac at the center of Central Luzon.',body:'Tarlac sits at the heart of Central Luzon, bordered by Pampanga, Pangasinan, Zambales and Nueva Ecija. Cresendo and TARI Estate put Tarlac City on the map for mixed-use and industrial-led growth; Alviera opens Porac’s foothills in neighboring Pampanga.',context:'Culture and community history—from festivals to local landmarks—add texture to daily life beyond the estate gate.'},
    {icon:'grow',num:'04',label:'Room to grow',title:'Space for the next chapter.',body:'Whether you are banking land, building a first home, relocating a business or planning a quieter base near Clark and SCTEX, Central Luzon offers larger parcels and master-planned settings that Metro Manila density rarely allows.',context:'Compare flood exposure, title status and delivery timelines before you commit. We help you start that conversation with an agent.'}
  ];

  return `<section class="hero why-page-hero">
    <img class="hero-photo cinematic" src="/media/drone-clark-airport.jpg" alt="Aerial view of Clark International Airport" fetchpriority="high" width="1920" height="1080">
    <video class="hero-film" muted loop playsinline preload="metadata" poster="/media/drone-clark-airport.jpg" aria-label="Drone footage of Clark International Airport"><source src="/media/drone-clark-airport.mp4" type="video/mp4"></video>
    <div class="hero-shade"></div>
    <div class="hero-copy">
      <p class="eyebrow">CENTRAL LUZON</p>
      <h1>Why people invest<br><em>and build a life here.</em></h1>
      <p>North of Metro Manila—expressways, an airport gateway, growing estates and room for the life you want next.</p>
      <a href="#why-glance" class="button light">Explore the region <span>↓</span></a>
    </div>
    <div class="hero-note"><span>CLARK INTERNATIONAL AIRPORT</span><span>Central Luzon’s air gateway</span></div>
    <button class="motion-toggle" aria-pressed="false">Pause motion Ⅱ</button>
    <div class="hero-bottom"><span>INVEST · LIVE · BELONG</span><span>WHY CENTRAL LUZON ↓</span></div>
  </section>

  <section class="why-intro section" aria-label="What this page covers">
    <div class="why-hero-marks">
      <div>${icon('connectivity')}<span>Invest</span><small>Links, economy, estates</small></div>
      <div>${icon('living')}<span>Live</span><small>Community & everyday pace</small></div>
      <div>${icon('outdoors')}<span>Belong</span><small>Outdoors & room to grow</small></div>
    </div>
  </section>

  <section class="region section why-stats-block" id="why-glance" aria-labelledby="why-glance-title">
    <div class="section-heading">
      <div><p class="eyebrow">AT A GLANCE</p><h2 id="why-glance-title">A rising regional<br><em>growth center.</em></h2></div>
      <p>Figures describe the region’s economy and infrastructure—not a promised return on any property.</p>
    </div>
    <div class="region-stats" aria-label="Central Luzon at a glance">
      <div><strong>4.46<span>%</span></strong><p>Regional economic growth in 2025</p><a href="https://psa.gov.ph/statistics/regional-accounts" target="_blank" rel="noopener">PSA · 2025 regional accounts ${forward}</a></div>
      <div><strong>16.3<span>%</span></strong><p>Share of Philippine industry in 2025</p><a href="https://psa.gov.ph/statistics/regional-accounts" target="_blank" rel="noopener">PSA · At constant 2018 prices ${forward}</a></div>
      <div><strong>94<span> km</span></strong><p>SCTEX links Subic, Clark and Tarlac</p><a href="https://scad.gov.ph/sctex/" target="_blank" rel="noopener">Subic Clark Alliance for Development ${forward}</a></div>
    </div>
  </section>

  <section class="section why-invest" aria-labelledby="why-invest-title">
    <div class="section-heading">
      <div><p class="eyebrow">REASONS TO INVEST</p><h2 id="why-invest-title">Put capital where<br><em>the region is moving.</em></h2></div>
      <p>Evaluate location, total cost, title and development status carefully. Regional growth is context—not a property forecast.</p>
    </div>
    <div class="why-grid">${invest.map(whyCard).join('')}</div>
  </section>

  <section class="section why-live" aria-labelledby="why-live-title">
    <div class="section-heading">
      <div><p class="eyebrow">REASONS TO BUILD A LIFE</p><h2 id="why-live-title">More than a pin<br><em>on the map.</em></h2></div>
      <p>Homes, schools, weekends outdoors and familiar streets—choose the pace that fits your household.</p>
    </div>
    <div class="why-grid">${live.map(whyCard).join('')}</div>
  </section>

  <section class="section why-next">
    <div class="region-next">
      <div><p class="eyebrow">MAKE IT PERSONAL</p><h3>The right region is a start.<br><em>The right property is your next step.</em></h3><p>Compare the location, total cost, title, flood exposure and development status. Then explore the estates—or send an inquiry and we will connect you with our partner agent.</p></div>
      <div class="why-cta-row">
        <a class="button dark" href="/#collection">Explore locations ${arrow}</a>
        <a class="button light why-cta-light" href="/#inquire">Talk through your plans ${arrow}</a>
      </div>
    </div>
    <p class="region-updated">Sources reviewed September 24, 2026. Economic figures describe the region and do not guarantee investment returns. Estate details are summarized from developer materials; confirm current conditions with the agent.</p>
  </section>`;
}
