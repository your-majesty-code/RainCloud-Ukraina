-- ============================================================
-- RainCloud Ukraina — seed data for the Feed dashboard.
-- Idempotent: clears the directory tables, then repopulates them
-- with the launch content (mirrors the original prototype).
-- Run AFTER 0001_init.sql.  Safe to re-run.
-- ============================================================

truncate table
  public.products,
  public.members,
  public.opportunities,
  public.news,
  public.events,
  public.insights,
  public.companies
restart identity cascade;

-- ---- Platform stats (header pill) ----
insert into public.platform_stats (id, members_count, companies_count, products_count)
values (1, 4280, 1140, 2123)
on conflict (id) do update
  set members_count   = excluded.members_count,
      companies_count = excluded.companies_count,
      products_count  = excluded.products_count,
      updated_at      = now();

-- ---- Companies ----
insert into public.companies (slug, name, logo_text, type, sector, country, products_count, members_count, verified) values
  ('safeground-ukraine', 'SafeGround Ukraine', 'SG', 'Technology Provider', 'Defense & Demining',        'Ukraine', 6,  14, true),
  ('steelframe-ltd',     'SteelFrame Ltd',     'SF', 'Supplier',             'Infrastructure',            'Denmark', 5,  17, true),
  ('energreen-home',     'EnerGreen Home',     'EG', 'Energy Provider',      'Renewable Energy',          'Poland',  8,  24, true),
  ('ukrbuild-solutions', 'UkrBuild Solutions', 'UB', 'Manufacturer',         'Construction & Housing',    'Ukraine', 12, 38, true);

-- ---- Members (Network directory) ----
insert into public.members
  (name, role_badge, title, profile_type, company_name, headline, location, city, country, avatar_url, industries, tags, availability) values
  ('Olena Kovalenko',  'Industry Expert',        'Energy Policy Manager',         'Industry experts',               'Energy Recovery Council',          'Energy Policy Manager · Kyiv, Ukraine',                  'Kyiv, Ukraine',    'Kyiv',       'Ukraine', '/assets/ins-avatar-olena.jpg',
    array['Energy, Utilities & Natural Resources','Government, International Affairs & NGOs'], array['Energy','Public Policy'], array['Open to contact']),
  ('Ivan Petrov',      'Product Owner',          'Business Development Lead',      'Product owners',                 'Slava Modular',                    'Business Development Lead at Slava Modular · Kyiv',       'Kyiv, Ukraine',    'Kyiv',       'Ukraine', '/assets/feed-avatar-3.jpg',
    array['Infrastructure, Construction & Real Estate'], array['Housing','Modular'], array['Partnership requests']),
  ('Dmytro Melnyk',    'Industry Expert',        'Defense Technology Specialist', 'Industry experts',               'SafeGround Ukraine',               'Defense Technology Specialist · Lviv, Ukraine',          'Lviv, Ukraine',    'Lviv',       'Ukraine', '/assets/ins-avatar-dmytro.jpg',
    array['Technology, Defense & Space'], array['Defense','Demining'], array['Open to contact']),
  ('Anna Müller',      'Company Representative',  'Project Director',              'Company representatives',        'WeBuild',                          'Project Director at WeBuild · Berlin, Germany',          'Berlin, Germany',  'Berlin',     'Germany', '/assets/feed-avatar-1.jpg',
    array['Infrastructure, Construction & Real Estate'], array['Construction','Project Mgmt'], array['Available for introductions']),
  ('Tomasz Jabłoński', 'Investor',               'Investment Advisor',            'Investors',                      'Reconstruction Capital Partners',  'Investment Advisor · Warsaw, Poland',                    'Warsaw, Poland',   'Warsaw',     'Poland',  '/assets/feed-avatar-4.jpg',
    array['Financial Services & Investment'], array['Investment','Recovery'], array['Investor meetings']),
  ('Iryna Shevchenko', 'Industry Expert',        'Microgrid Procurement Lead',    'Consultants / Advisors',         'EcoGrid Power',                    'Microgrid Procurement Lead · Dnipro, Ukraine',           'Dnipro, Ukraine',  'Dnipro',     'Ukraine', '/assets/ins-avatar-iryna.jpg',
    array['Energy, Utilities & Natural Resources','Professional & Commercial Services'], array['Energy','Procurement'], array['Open to contact','Speaking opportunities']),
  ('Andriy Bondarenko','Company Representative',  'Municipal Recovery Officer',    'Government / Municipal contacts','Kharkiv City Council',             'Municipal Recovery Officer · Kharkiv, Ukraine',          'Kharkiv, Ukraine', 'Kharkiv',    'Ukraine', '/assets/ins-avatar-andriy.jpg',
    array['Government, International Affairs & NGOs','Infrastructure, Construction & Real Estate'], array['Public Sector','Recovery'], array['Available for introductions']),
  ('Kateryna Tkachenko','Industry Expert',        'Aid Programme Coordinator',     'NGO / Aid fund representatives', 'Rebuild Ukraine Fund',             'Aid Programme Coordinator · Odesa, Ukraine',             'Odesa, Ukraine',   'Odesa',      'Ukraine', '/assets/ins-avatar-kateryna.jpg',
    array['Government, International Affairs & NGOs','Healthcare, MedTech & Pharmaceuticals'], array['Aid','Healthcare'], array['Open to contact']),
  ('Maksym Ivanov',    'Company Representative',  'Logistics Director',            'Company representatives',        'AquaTech UA',                      'Logistics Director at AquaTech UA · Kyiv',               'Kyiv, Ukraine',    'Kyiv',       'Ukraine', '/assets/ins-avatar-maksym.jpg',
    array['Transportation & Logistics','Manufacturing & Industrial'], array['Logistics','Water'], array['Partnership requests']),
  ('Sofia Larsen',     'Industry Expert',        'Modular Housing Author',        'Authors / Thought leaders',      'Nordic Recovery Institute',        'Author & Researcher · Copenhagen, Denmark',              'Copenhagen, Denmark','Copenhagen','Denmark', '/assets/net-avatar-anna.jpg',
    array['Infrastructure, Construction & Real Estate','Professional & Commercial Services'], array['Housing','Research'], array['Speaking opportunities','Recently active']),
  ('Olena Marchenko',  'Industry Expert',        'Recovery Strategy Speaker',     'Event speakers',                 'Ukraine Recovery Forum',           'Recovery Strategy Speaker · Warsaw, Poland',             'Warsaw, Poland',   'Warsaw',     'Poland',  '/assets/net-avatar-olena.jpg',
    array['Professional & Commercial Services','Government, International Affairs & NGOs'], array['Strategy','Events'], array['Speaking opportunities']),
  ('Mark Weber',       'Company Representative',  'Business Development Lead',      'Company representatives',        'UkrBuild Solutions',               'Business Development Lead at UkrBuild Solutions · Berlin','Berlin, Germany', 'Berlin',     'Germany', '/assets/feed-avatar-2.jpg',
    array['Infrastructure, Construction & Real Estate','Manufacturing & Industrial'], array['Construction','Modular'], array['Open to contact','Partnership requests']);

-- ---- Products (Digital Trade Show) ----
insert into public.products (slug, name, description, category, company_id, company_name, location, media_url, owner_name, owner_role, owner_initials) values
  ('rapid-modular-housing',   'Rapid Modular Housing Units',     'Insulated prefabricated homes for displaced families, deployable in days.',                              'housing',        (select id from public.companies where slug='ukrbuild-solutions'), 'UkrBuild Solutions', 'Kyiv',    '/assets/feed-product-1.gif', 'Mark Weber', 'Business Development Lead', 'MW'),
  ('steel-bridge-components', 'Steel Bridge Repair Components',  'Modular beams, decking plates and connectors for fast replacement of damaged spans.',                    'infrastructure', (select id from public.companies where slug='steelframe-ltd'),     'DniproSteel Works',  'Dnipro',  '/assets/feed-product-2.png', 'Mark Weber', 'Business Development Lead', 'MW'),
  ('solar-microgrid-kits',    'Solar Microgrid Kits',            'Containerised solar, battery and inverter systems for schools, clinics and community shelters.',          'energy',         (select id from public.companies where slug='energreen-home'),     'EcoGrid Power',      'Lviv',    '/assets/feed-product-3.jpg', 'Mark Weber', 'Business Development Lead', 'MW'),
  ('mobile-water-purification','Mobile Water Purification Units','Trailer-mounted treatment for emergency drinking water and temporary settlements.',                       'water',          null,                                                              'AquaTech UA',        'Kharkiv', '/assets/feed-product-4.jpg', 'Mark Weber', 'Business Development Lead', 'MW'),
  ('prefab-clinic-modules',   'Prefabricated Clinic Modules',    'Ready-to-install medical rooms with HVAC, sanitary cores and medical-grade utilities.',                  'healthcare',     null,                                                              'MedUnit Systems',    'Warsaw',  '/assets/feed-product-5.jpg', 'Mark Weber', 'Business Development Lead', 'MW'),
  ('cold-mix-road-repair',    'Cold-Mix Road Repair Material',   'All-season asphalt repair for rapid resurfacing of damaged roads and logistics corridors.',              'transport',      null,                                                              'Autobahn Systems',   'Berlin',  '/assets/feed-product-6.jpg', 'Mark Weber', 'Business Development Lead', 'MW');

-- ---- Thought Leadership ----
insert into public.insights (title, description, kind, author_name, published_at) values
  ('How modular housing can shorten recovery timelines',     'Lessons from three pilot deployments on cutting time-to-shelter without cutting quality.', 'Article', 'Olena Marchenko',  '2025-03-12'),
  ('Microgrid procurement checklist for public facilities',  'A practical checklist covering sizing, resilience and maintenance for municipal buyers.',   'PDF',     'Iryna Shevchenko', '2025-03-08'),
  ('Choosing cold-mix materials for damaged corridors',      'When cold-mix beats hot-mix for rapid, all-weather repair of critical logistics routes.',   'Article', 'Dmytro Melnyk',    '2025-03-08');

-- ---- Events ----
insert into public.events (title, description, kind, event_date, location) values
  ('Ukraine Recovery Infrastructure Forum', 'Two days of matchmaking between municipalities, suppliers and financing partners.', 'Forum',      '2026-05-25', 'Kyiv, Ukraine'),
  ('Modular Housing Roundtable',            'Standards, logistics and financing for scaling modular housing across regions.',    'Roundtable', '2026-06-04', 'Warsaw, Poland'),
  ('Energy Resilience Summit',              'Grid hardening, microgrids and distributed storage for critical facilities.',       'Conference', '2026-06-18', 'Berlin, Germany');

-- ---- News ----
insert into public.news (title, description, category, source, image_url, published_at) values
  ('New EU facility unlocks €2bn for grid repair',      'Funding targets distribution networks in front-line regions over the next 18 months.', 'energy',         'Reuters',          '/assets/feed-news-1.png', '2025-03-14'),
  ('First 500 modular homes handed over in Bucha',      'A consortium of manufacturers completes the largest modular delivery to date.',        'housing',        'Kyiv Independent', '/assets/feed-news-2.png', '2025-03-11'),
  ('Bridge rebuilding programme adds 40 new sites',     'Standardised steel components cut average reconstruction time by a third.',             'infrastructure', 'UkrInform',        '/assets/feed-news-3.png', '2025-03-09');

-- ---- Opportunities ----
insert into public.opportunities (title, description, kind, value_label, location, deadline) values
  ('Prefab housing supplier',          'Supply and install 300 modular housing units for a returning-residents programme.', 'RFP',         '£1.8M', 'Bucha, Ukraine', '2026-08-12'),
  ('Solar panels, 2MW minimum',        'Procurement of PV modules and inverters for municipal microgrid resilience.',       'Tender',      '£3.2M', 'Odesa, Ukraine', '2026-08-20'),
  ('Water treatment system — Kyiv',    'Design-build of a containerised water treatment plant for a district of 40,000.',   'Procurement', '£940K', 'Kyiv, Ukraine',  '2026-09-05');
