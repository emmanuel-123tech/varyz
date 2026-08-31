import { PrototypeScreen } from '@/types';

export const PROTOTYPE_SCREENS: PrototypeScreen[] = [
  // --- DRONE OPERATOR WORKSPACE ---
  {
    id: 'drone-overview',
    title: 'Drone Operator Dashboard Overview',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Central operational control dashboard showing live telemetry, active drone VA-01 battery status, recent flight logs, and rapid pre-flight check triggers.',
    keyFeatures: [
      'Active Drone Status & Live Telemetry',
      'Flight Duration & RTK GPS Lock Monitor',
      'Quick Action Shortcuts (Plan, Checklist, Upload)',
      'Recent Mission Logs & Progress Tracker'
    ],
    imagePath: '/assets/drone/overview.png',
    isPublicPreview: true,
  },
  {
    id: 'drone-plan-mission',
    title: 'Drone Mission Planning & Waypoints',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Precision flight path planning interface with satellite imagery overlays, front/side overlap configuration, altitude settings, and automated safety checks.',
    keyFeatures: [
      'Interactive Satellite Waypoint Path Generator',
      'Altitude (AGL) & Ground Speed Configuration',
      'Front & Side Overlap Ratio Adjustments',
      'Automated No-Fly Zone & Weather Safety Verification'
    ],
    imagePath: '/assets/drone/plan-mission.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-active-mission',
    title: 'Active Mission Monitoring & Live Telemetry',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Real-time active flight monitoring workspace with live camera feed, flight path progress (63%), altitude/battery/wind telemetry, and emergency return controls.',
    keyFeatures: [
      'Live HD Camera Video Feed',
      'Real-Time Flight Progress & Grid Coverage',
      'Telemetry Suite (Altitude 72m, Speed 11.8m/s, Wind 6.4m/s)',
      'Instant Mission Controls (Pause, Return to Home, Emergency Stop)'
    ],
    imagePath: '/assets/drone/active-mission.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-drones',
    title: 'Drone Fleet & Hardware Inventory',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Comprehensive hardware fleet management listing registered drones, battery health metrics, RTK compatibility, model specifications, and maintenance reminders.',
    keyFeatures: [
      'Fleet Availability & Maintenance Indicators',
      'Individual Drone Specs (VTOL-X6, 42 min flight time, 12 km range)',
      'Payload Compatibility Matrix (RGB, Multispectral, LiDAR)',
      'Routine Check & Battery Replacement Timers'
    ],
    imagePath: '/assets/drone/drones.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-maintenance',
    title: 'Drone Hardware Maintenance & Calibration',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Maintenance scheduling control center tracking upcoming motor inspections, propeller replacements, firmware updates, and component health breakdowns.',
    keyFeatures: [
      'Upcoming & Overdue Task Alerts',
      'Component Health Scoring (Motors 94%, Propellers 89%, RTK 95%)',
      'Maintenance History Log & Service Sign-Off',
      'Assigned Technician Scheduling'
    ],
    imagePath: '/assets/drone/maintenance.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-payloads',
    title: 'Payload & Sensor Calibration Management',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Management interface for optical, multispectral, and thermal drone payloads, detailing resolution specs, calibration status, and mission deployment assignments.',
    keyFeatures: [
      'RGB 61MP Mapping Camera & Multispectral Sensor Specs',
      'Calibration Due Date Tracking & Logs',
      'Drone Compatibility & Quick Release Mounting Info',
      'Payload Deployment Assignment Shortcuts'
    ],
    imagePath: '/assets/drone/payloads.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-upload-data',
    title: 'Aerial Data & Flight Log Upload Center',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'Ingestion dashboard for uploading raw flight logs, GeoTIFF orthomosaics, thermal imagery, KML boundary files, and processing queue status.',
    keyFeatures: [
      'Multi-Format Ingestion (log, geotiff, kml, mp4, csv, shp)',
      'Real-Time Processing & Upload Progress Indicators',
      'Metadata Tagging (Mission Name, Drone ID, Capture Date, GPS Coordinates)',
      'Batch Upload & Cloud Processing Pipeline'
    ],
    imagePath: '/assets/drone/upload-data.png',
    isPublicPreview: false,
  },
  {
    id: 'drone-settings',
    title: 'Operator Workspace & Device Preferences',
    category: 'drone-operator',
    categoryLabel: 'Drone Operator',
    description: 'System-wide preferences for default mission altitude, overlap ratios, coordinate reference systems (WGS84 / UTM), export resolution, and security options.',
    keyFeatures: [
      'Default Flight Parameter Presets',
      'Export Format & Quality Selection (GeoTIFF, High DPI)',
      'Two-Factor Authentication & Active Sessions Control',
      'Notification & Maintenance Alert Toggles'
    ],
    imagePath: '/assets/drone/settings.png',
    isPublicPreview: false,
  },

  // --- AGRICULTURE ANALYST WORKSPACE ---
  {
    id: 'agri-overview',
    title: 'Agriculture Intelligence Dashboard',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Executive agricultural monitoring dashboard presenting total monitored area (2,010 ha), healthy vs stressed crop zones, key findings, and recommended interventions.',
    keyFeatures: [
      'Total Monitored Area (1,245 ha healthy, 612 ha stressed)',
      'Interactive NDVI Farm Map Overlay (Oyo North Farm)',
      'Agronomist Recommended Actions (Irrigation, Nutrient Boost)',
      'Sentinel-2 & Satellite Multi-Source Integration'
    ],
    imagePath: '/assets/agriculture/overview.png',
    isPublicPreview: true,
  },
  {
    id: 'agri-farm-overview',
    title: 'Multi-Farm Portfolio Overview',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Portfolio overview grid tracking active, planning, and monitoring status across 28 farms covering 12,450 hectares with crop-type filtering.',
    keyFeatures: [
      'Multi-Farm Card Grid (Oyo North, Kaduna Central, Kano Irrigation)',
      'Filter by Crop Type (Maize, Rice, Sorghum, Soybean, Cassava)',
      'Farm Health Breakdown (Healthy Area vs Stressed Area %)',
      'Quick Farm Analytics Drawer & Direct Map Access'
    ],
    imagePath: '/assets/agriculture/farm-overview.png',
    isPublicPreview: false,
  },
  {
    id: 'agri-ndvi',
    title: 'NDVI & Vegetation Index Map Analysis',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'High-resolution Normalized Difference Vegetation Index (NDVI) mapping showing color-coded crop vigor, vegetation histograms, and multi-temporal comparisons.',
    keyFeatures: [
      'Color-Coded Layer Selector (Orthomosaic, NDVI, Soil Moisture, Elevation)',
      'Vegetation Index Breakdown (0.8 - 1.0 Healthy: 1,326 ha)',
      'NDVI Value Histogram Distribution Chart',
      'Exportable Map Analytics (GeoTIFF, PDF)'
    ],
    imagePath: '/assets/agriculture/ndvi-vegetation.png',
    isPublicPreview: true,
  },
  {
    id: 'agri-crop-health',
    title: 'Crop Health Risk & Trend Analysis',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Detailed crop health monitoring panel evaluating 30-day health trends, disease risk areas, water stress alerts, and plot-by-plot risk scores.',
    keyFeatures: [
      'Crop Health Trend Graphs (78% Healthy Overall)',
      'Plot Risk Matrix (North Block, Central Zone, South Field A)',
      'Actionable Agronomic Recommendations per Plot',
      'Syncing with Sentinel-2 & Satellite Telemetry'
    ],
    imagePath: '/assets/agriculture/crop-health.png',
    isPublicPreview: false,
  },
  {
    id: 'agri-planting-suitability',
    title: 'Planting Suitability & Soil Zonation',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Predictive zonation tool for crop planting suitability based on soil moisture (0.24), terrain slope (2.3%), vegetation history, and historical rainfall assumptions.',
    keyFeatures: [
      'Suitability Zone Mapping (Highly Suitable: 56%, Moderately Suitable: 26%)',
      'Land Characteristics Breakdown (Soil Drainage, Accessibility)',
      'Agronomic Recommendations for Marginal Zones',
      'Downloadable Suitability Report PDFs'
    ],
    imagePath: '/assets/agriculture/planting-suitability.png',
    isPublicPreview: false,
  },
  {
    id: 'agri-crop-disease',
    title: 'AI Crop Disease Data & Sample Curation',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'AI model training repository for curating field crop disease samples, verifying computer vision predictions (Northern Leaf Blight, Cassava Mosaic), and sample metadata.',
    keyFeatures: [
      'Labeled Sample Inventory (8,452 Total Samples)',
      'AI Disease Classification Verification (Review & Approve Labels)',
      'Detailed Sample Inspector (GPS, Device, Capturing Field Scout)',
      'Batch Export for Model Retraining'
    ],
    imagePath: '/assets/agriculture/crop-disease.png',
    isPublicPreview: false,
  },
  {
    id: 'agri-field-notes',
    title: 'Field Observation Notes & Inspector Portal',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Field inspection management tool tracking agronomist observations, leaf spot photos, GPS coordinates, severity levels, and follow-up assignments.',
    keyFeatures: [
      'Observation Record List (248 Total Field Inspections)',
      'Photo Attachment Gallery & Zoom Inspector',
      'Severity Classification (Leaf Spot, Nitrogen Deficiency, Irrigation Issues)',
      'Assign Follow-up & Mark Resolved Workflows'
    ],
    imagePath: '/assets/agriculture/field-notes.png',
    isPublicPreview: false,
  },
  {
    id: 'agri-reports',
    title: 'Agriculture Intelligence Reports Repository',
    category: 'agriculture-analyst',
    categoryLabel: 'Agriculture Analyst',
    description: 'Central archive of compiled agricultural analytics reports including vegetation health, soil analysis, pest alerts, and climate impact reviews.',
    keyFeatures: [
      'Report Filtering by Farm, Report Type, and Date Range',
      'Featured Report Quick Preview Sidebar',
      'Download Options (PDF, ZIP, Raw Data CSV)',
      'Flagged Report Notification Center'
    ],
    imagePath: '/assets/agriculture/reports.png',
    isPublicPreview: false,
  },

  // --- SECURITY ANALYST WORKSPACE ---
  {
    id: 'sec-overview',
    title: 'Security Analyst Intelligence Dashboard',
    category: 'security-analyst',
    categoryLabel: 'Security Analyst',
    description: 'Dark-themed surveillance control room monitoring active patrol missions, threat zones, thermal hotspots, movement alerts, and incident reports.',
    keyFeatures: [
      'Live Aerial Surveillance Map & Map Layers (Patrol Routes, Threat Zones)',
      'Live Movement & Thermal Hotspot Alert Feed',
      'Threat Level Distribution (High: 7, Medium: 5, Low: 6)',
      'Patrol Mission Control & Patrol Route Logs'
    ],
    imagePath: '/assets/security/overview.png',
    isPublicPreview: true,
  },

  // --- CLIENT & VIEWER WORKSPACE ---
  {
    id: 'client-overview',
    title: 'Client Project Summary Dashboard',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'Clean project summary view tailored for project stakeholders and clients, highlighting mapped area (1,245 ha), key findings, and recent report downloads.',
    keyFeatures: [
      'Project Statistics Summary (1,245 ha Mapped, 6 Missions)',
      'Recent Map Export Thumbnails (RGB, NDVI, Boundary View)',
      'Key Findings & Security Assessment Bulletins',
      'One-Click Executive Summary PDF Download'
    ],
    imagePath: '/assets/client/overview.png',
    isPublicPreview: true,
  },
  {
    id: 'client-map-view',
    title: 'Interactive Client Map Viewer',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'Full-featured map viewing portal allowing clients to toggle orthomosaic RGB, NDVI, and boundary layers, measure areas/distances, and export GIS data.',
    keyFeatures: [
      'Layer Selector (Orthomosaic, NDVI Overlay, Boundary View)',
      'GCP Points & Waypoint Legend Display',
      'Map Export Thumbnails & Shareable Links',
      'Summary Report Quick Action'
    ],
    imagePath: '/assets/client/map-view.png',
    isPublicPreview: false,
  },
  {
    id: 'client-mission-reports',
    title: 'Client Mission Reports Center',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'Searchable library of generated project reports with stats on total reports (28), new reports (5), and pending reviews.',
    keyFeatures: [
      'Search & Filter by Report Type (Farm Health, NDVI, Mission Summary)',
      'Featured Report Side Panel Preview',
      'Instant Format Downloads (PDF, ZIP)',
      'Status Identifiers (Completed, Pending Review)'
    ],
    imagePath: '/assets/client/mission-reports.png',
    isPublicPreview: false,
  },
  {
    id: 'client-projects',
    title: 'Client Multi-Project Portfolio',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'High-level project tracking dashboard displaying active agricultural mapping, forest surveys, river basin monitoring, and security reviews.',
    keyFeatures: [
      'Project Status Counters (12 Total, 7 Active, 5 Completed)',
      'Filter Tabs (Agriculture, Security, Environment, Ongoing, Completed)',
      'Project Details Cards (Location, Date Range, Missions Completed, Hectares Mapped)',
      'Direct Summary Download & Project View Actions'
    ],
    imagePath: '/assets/client/projects.png',
    isPublicPreview: false,
  },
  {
    id: 'client-downloads',
    title: 'GIS Assets & Map Downloads Hub',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'Central asset repository for downloading GeoTIFF maps, NDVI layers, KML boundary vectors, and ZIP report bundles.',
    keyFeatures: [
      'Downloadable Assets Table with File Sizes & Upload Dates',
      'Format Badges (TIFF, KML, PDF, ZIP)',
      'Storage Utilization Counter (3.2 GB of 10 GB Used)',
      'Favorite Assets List for Quick Re-download'
    ],
    imagePath: '/assets/client/downloads.png',
    isPublicPreview: false,
  },
  {
    id: 'client-notifications',
    title: 'Project Activity & Notification Feed',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'Notification hub categorizing unread alerts, report readiness, project updates, and system announcements with side inspector.',
    keyFeatures: [
      'Categorized Filter Tabs (Unread, Reports, Projects, System)',
      'Detailed Notification Drawer with Linked Actions',
      'Quick Action Buttons (Open Report, Download, Go to Project)',
      'Mark All as Read Controls'
    ],
    imagePath: '/assets/client/notifications.png',
    isPublicPreview: false,
  },
  {
    id: 'client-profile',
    title: 'Client Profile & Preference Settings',
    category: 'client-viewer',
    categoryLabel: 'Client & Viewer',
    description: 'User profile management screen displaying linked projects counter, notification settings, security defaults, and download file format preferences.',
    keyFeatures: [
      'Personal & Organization Info Management',
      'Activity Summary Counters (12 Linked Projects, 42 Downloads)',
      'Notification & Security Preferences (Email Alerts, 2FA)',
      'Default File Export Format Presets (PDF, GeoTIFF, CSV)'
    ],
    imagePath: '/assets/client/profile.png',
    isPublicPreview: false,
  },
];
