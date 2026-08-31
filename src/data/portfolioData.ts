import { Project, SkillCategory, ServiceItem, CareerMilestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Claudio Leiva',
  title: 'Desarrollador Senior PHP / Laravel & Experto en Bases de Datos MySQL',
  roleShort: 'Senior Laravel & MySQL Database Engineer',
  email: 'Claudio.Leiva.T@gmail.com',
  whatsapp: '+56912345678', // standard international format
  location: 'Santiago, Chile / Remoto Global',
  availability: 'Disponible para proyectos de consultoría, desarrollo full-cycle y optimización de bases de datos',
  experienceYears: '8+ años',
  summary: 'Ingeniero de Software especializado en el ecosistema PHP moderno (Laravel 10/11) y arquitectura avanzada de bases de datos relacionales MySQL. Apasionado por diseñar APIs REST robustas, resolver cuellos de botella de rendimiento, optimizar consultas SQL de alto volumen y construir sistemas backend escalables, seguros y mantenibles.',
  stats: [
    { label: 'Años de Experiencia', value: '8+', suffix: 'Años' },
    { label: 'Proyectos Backend & Laravel', value: '45+', suffix: 'Entregados' },
    { label: 'Registros MySQL Optimizados', value: '50M+', suffix: 'Filas/Tablas' },
    { label: 'Tiempo de Consulta Reducido', value: '75%', suffix: 'Promedio' },
  ],
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'apex-logistics-erp',
    title: 'ApexLogistics - Core de ERP & Gestión de Almacenes Masivos',
    category: 'enterprise',
    tagline: 'Sistema ERP con Laravel 11 y MySQL 8 optimizado para +25 millones de movimientos de stock con transacciones ACID seguras.',
    description: 'Plataforma empresarial de gestión logística y despachos en tiempo real. Maneja inventarios multialmacén con control de concurrencia optimista y pesimista para prevenir sobreventa y cuellos de botella.',
    fullOverview: 'ApexLogistics fue desarrollado para reemplazar un sistema monolítico legacy que colapsaba en picos de demanda. Se rediseñó la arquitectura de base de datos MySQL aplicando normalización 3NF para operaciones transaccionales y vistas desnormalizadas con triggers para reportes analíticos rápidos. Se implementaron workers asíncronos en Laravel Horizon para el procesamiento masivo de guías de despacho y sincronización con APIs de transportistas.',
    impactMetrics: [
      { label: 'Latencia de Transacciones', value: '-82%', description: 'Reducción de 1,200ms a 210ms en operaciones de reserva de stock' },
      { label: 'Volumen Transaccional', value: '25M+', description: 'Filas administradas en MySQL con índices B-Tree compuestos' },
      { label: 'Uptime del Backend', value: '99.98%', description: 'Sin bloqueos por locks de tablas gracias a InnoDB Row-Level Locking' },
    ],
    techStack: ['Laravel 11', 'PHP 8.3', 'MySQL 8.0 (InnoDB)', 'Redis', 'Laravel Horizon', 'Docker', 'PHPUnit', 'Tailwind CSS'],
    databaseFeatures: [
      'Bloqueo a nivel de fila (`SELECT ... FOR UPDATE`) en transferencias de inventario',
      'Índices compuestos optimizados (`warehouse_id`, `sku`, `status`, `created_at`)',
      'Particionamiento de tabla de auditoría por rangos de año/mes (RANGE Partitioning)',
      'Configuración afinada de `innodb_buffer_pool_size` y `max_connections`',
    ],
    architectureHighlights: [
      'Patrón Repository y Service Layer para desacoplamiento estricto',
      'Colas de eventos asíncronas con Redis y Redis Dead Letter Queue',
      'Endpoints RESTful con Laravel Sanctum y rate limiting dinámico por tenant',
      'Suite de pruebas automatizadas con PHPUnit y Pest PHP con 92% de cobertura',
    ],
    sampleCode: {
      filename: 'InventoryStockService.php',
      language: 'php',
      code: `public function transferStock(int $sourceWarehouseId, int $targetWarehouseId, string $sku, int $quantity): StockTransferResult
{
    return DB::transaction(function () use ($sourceWarehouseId, $targetWarehouseId, $sku, $quantity) {
        // Bloqueo pesimista para evitar race conditions en alta concurrencia
        $sourceStock = StockItem::where('warehouse_id', $sourceWarehouseId)
            ->where('sku', $sku)
            ->lockForUpdate()
            ->firstOrFail();

        if ($sourceStock->available_quantity < $quantity) {
            throw new InsufficientStockException("Stock insuficiente para SKU: {$sku}");
        }

        $sourceStock->decrement('available_quantity', $quantity);

        $targetStock = StockItem::firstOrCreate(
            ['warehouse_id' => $targetWarehouseId, 'sku' => $sku],
            ['available_quantity' => 0, 'reserved_quantity' => 0]
        );
        $targetStock->increment('available_quantity', $quantity);

        // Registro de auditoría sin bloquear la tabla principal
        AuditMovementJob::dispatch($sourceWarehouseId, $targetWarehouseId, $sku, $quantity, auth()->id());

        return new StockTransferResult(success: true, transferredQty: $quantity);
    }, attempts: 5);
}`,
      explanation: 'Uso de DB::transaction con bloqueo pesimista `lockForUpdate()` para garantizar integridad ACID estricta en inventario crítico con reintentos automáticos ante deadlocks transitorios.',
    },
    githubUrl: 'https://github.com/claudioleiva',
    featured: true,
  },
  {
    id: 'paystream-fintech-engine',
    title: 'PayStream - Motor de Facturación Recurrente & Pagos',
    category: 'saas',
    tagline: 'Microservicio en Laravel para procesamiento de cobros, conciliación bancaria y suscripciones con tolerancia a fallos.',
    description: 'Motor backend de facturación recurrente con procesamiento distribuido de pagos (Stripe, Webhooks bancarios, facturación electrónica), diseñado para evitar dobles cobros mediante claves de idempotencia en MySQL.',
    fullOverview: 'PayStream gestiona el ciclo completo de facturación para plataformas SaaS y comercio electrónico B2B. Implementa una arquitectura resiliente con webhooks idempotentes, colas de cobro con backoff exponencial, generación automatizada de comprobantes tributarios PDF y reportería de métricas MRR/ARR calculadas directamente en consultas SQL optimizadas con funciones de ventana (Window Functions).',
    impactMetrics: [
      { label: 'Cobros Procesados/Mes', value: '$2.4M USD', description: 'Volumen mensual sin discrepancias contables' },
      { label: 'Tasa de Éxito de Webhooks', value: '99.99%', description: 'Idempotency Keys con índices únicos en MySQL' },
      { label: 'Tiempo de Conciliación', value: '15 Seg', description: 'De 2 horas manuales a ejecución automatizada en minutos' },
    ],
    techStack: ['Laravel 10', 'PHP 8.2', 'MySQL 8.0', 'Redis Pub/Sub', 'Stripe SDK', 'Laravel Cashier Custom', 'Docker'],
    databaseFeatures: [
      'Constraint `UNIQUE (idempotency_key)` con clave foránea indexada',
      'Consultas analíticas avanzadas utilizando MySQL 8 Window Functions (`ROW_NUMBER()`, `SUM() OVER`)',
      'Tablas de libro mayor inmutables (Append-Only Ledger) con checksum SHA-256',
      'Pool de conexiones optimizado con réplicas de lectura para reportería pesada',
    ],
    architectureHighlights: [
      'Webhook Dispatcher con verificación de firma criptográfica HMAC',
      'Estrategia de reintentos exponenciales gestionada con Redis',
      'API RESTful documentada con OpenAPI / Swagger y autenticación JWT',
      'Monitoreo proactivo de errores mediante Sentry y logs estructurados JSON',
    ],
    sampleCode: {
      filename: 'ProcessWebhookAction.php',
      language: 'php',
      code: `public function execute(string $eventPayload, string $signature, string $idempotencyKey): Response
{
    // Verificación de idempotencia a nivel de base de datos MySQL
    try {
        $webhookRecord = WebhookEvent::create([
            'idempotency_key' => $idempotencyKey,
            'payload' => $eventPayload,
            'status' => 'pending',
            'received_at' => now(),
        ]);
    } catch (UniqueConstraintViolationException $e) {
        Log::info("Webhook idempotente ya recibido: {$idempotencyKey}");
        return response()->json(['message' => 'Event already processed'], 200);
    }

    // Despacho a cola dedicada para procesamiento asíncrono
    ProcessBillingEventJob::dispatch($webhookRecord->id)->onQueue('billing-high-priority');

    return response()->json(['status' => 'acknowledged'], 202);
}`,
      explanation: 'Técnica de inserción atómica con restricción Unique en MySQL para asegurar idempotencia perfecta de webhooks sin bloqueos de aplicación.',
    },
    featured: true,
  },
  {
    id: 'queryaudit-pro-mysql',
    title: 'QueryAudit Pro - Analizador y Optimizador de MySQL & Slow Queries',
    category: 'mysql',
    tagline: 'Herramienta CLI & Dashboard para diagnosticar cuellos de botella en bases de datos MySQL y sugerir índices óptimos.',
    description: 'Suite de diagnóstico desarrollada en PHP CLI y Laravel para escanear `slow_query_log`, tablas sin índices primarios/secundarios, fragmentación de tablas InnoDB y métricas del Buffer Pool.',
    fullOverview: 'QueryAudit Pro nació como una herramienta interna para automatizar la auditoría de bases de datos de clientes. Analiza sentencias SQL lentas, ejecuta `EXPLAIN FORMAT=TREE` automáticamente, detecta escaneos completos de tabla (`type: ALL`) y genera recomendaciones accionables de índices compuestos siguiendo el principio de Selectividad y Regla de la Izquierda.',
    impactMetrics: [
      { label: 'Detección de Tablas sin Index', value: '100%', description: 'Escaneo completo de Information Schema & Performance Schema' },
      { label: 'Aceleración de Consultas', value: '10x - 100x', description: 'Mejora promedio en consultas optimizadas con índices cubrientes' },
      { label: 'Ahorro de I/O en Disco', value: '-65%', description: 'Optimización de consumo de RAM y lectura de páginas InnoDB' },
    ],
    techStack: ['PHP 8.3 CLI', 'Laravel Console', 'MySQL 8.0 Performance Schema', 'Tailwind CSS', 'Alpine.js / Livewire'],
    databaseFeatures: [
      'Parsing de `information_schema.innodb_metrics` y `sys.statement_analysis`',
      'Detección de índices redundantes e índices duplicados en tablas con millones de registros',
      'Cálculo de factor de fragmentación `data_free` vs `data_length` para sentencias `OPTIMIZE TABLE`',
      'Generador automático de sentencias `ALTER TABLE ... ADD INDEX` no bloqueantes (Online DDL)',
    ],
    architectureHighlights: [
      'Herramienta CLI interactiva con Symfony Console y ProgressBar',
      'Motor de reglas heurísticas para detección de consultas antipatrón (ej. `%LIKE%`, funciones sobre columnas indexadas)',
      'Exportación de informes ejecutivos en formato Markdown, JSON y PDF',
    ],
    sampleCode: {
      filename: 'IndexAdvisorEngine.php',
      language: 'php',
      code: `public function analyzeSlowQuery(string $rawSql): IndexRecommendation
{
    $explainResult = DB::select("EXPLAIN FORMAT=JSON " . $rawSql);
    $plan = json_decode($explainResult[0]->{'EXPLAIN'}, true)['query_block'];

    $tableScan = $this->detectFullTableScan($plan);
    if ($tableScan) {
        $tableName = $tableScan['table_name'];
        $whereColumns = $this->extractWherePredicates($rawSql);
        
        // Sugerencia de índice compuesto ordenado por mayor cardinalidad
        $recommendedColumns = $this->rankColumnsBySelectivity($tableName, $whereColumns);
        $indexName = "idx_" . $tableName . "_" . implode('_', $recommendedColumns);

        return new IndexRecommendation(
            table: $tableName,
            severity: 'CRITICAL',
            suggestion: "ALTER TABLE \`{$tableName}\` ADD INDEX \`{$indexName}\` (" . implode(', ', $recommendedColumns) . "), ALGORITHM=INPLACE, LOCK=NONE;",
            estimatedCostDrop: $tableScan['cost_info']['query_cost']
        );
    }
    return new IndexRecommendation(table: 'N/A', severity: 'OK');
}`,
      explanation: 'Extracción de planes de ejecución MySQL con EXPLAIN JSON y generación de sentencias Online DDL seguras para producción sin bloqueo de tablas.',
    },
    featured: true,
  },
  {
    id: 'omnimarket-multitenant',
    title: 'OmniMarket - SaaS E-Commerce Multi-Tenant con Aislamiento DB',
    category: 'saas',
    tagline: 'Plataforma multi-empresa con conexión dinámica a esquemas MySQL independientes y búsqueda ultrarrápida.',
    description: 'Arquitectura SaaS multitenant donde cada cliente posee su propio esquema de base de datos MySQL para máxima seguridad y cumplimiento regulatorio, coordinado por un tenant manager central en Laravel.',
    fullOverview: 'Diseñado para empresas que exigen estricto aislamiento de datos. El sistema conmuta dinámicamente las conexiones de Eloquent en tiempo de ejecución (`tenancy/tenancy`) mediante middlewares basados en subdominio y cabecera de autenticación. Incluye sincronización de catálogos con Meilisearch y panel administrativo en tiempo real con Laravel Livewire.',
    impactMetrics: [
      { label: 'Tenants Activos', value: '120+', description: 'Empresas operando en paralelo con aislamiento total de esquemas' },
      { label: 'Tiempo de Búsqueda', value: '<12ms', description: 'Indexación de productos combinando MySQL Full-Text y Meilisearch' },
      { label: 'Aislamiento de Datos', value: '100%', description: 'Cumplimiento normativo y cero riesgo de fuga de datos cross-tenant' },
    ],
    techStack: ['Laravel 10', 'PHP 8.2', 'MySQL 8.0 Multi-Schema', 'Livewire 3', 'Redis Cache', 'Meilisearch', 'Tailwind CSS'],
    databaseFeatures: [
      'Conexión dinámica y cambio de `database.connections.tenant` en ciclo de vida HTTP',
      'Migraciones automatizadas en lote a través de todos los esquemas de clientes',
      'Triggers para sincronización de stock y control de auditoría histórica',
    ],
    architectureHighlights: [
      'Multi-Tenancy por Base de Datos (Database-per-tenant pattern)',
      'Mecanismo de Caché por Tenant con prefijos Redis dedicados',
      'Componentes reactivos sin JS pesado gracias a Livewire 3',
    ],
    featured: false,
  },
  {
    id: 'medihealth-api-gateway',
    title: 'MediHealth - API RESTful de Citas Médicas & Fichas Clínicas',
    category: 'laravel',
    tagline: 'API REST de alta seguridad con Laravel Sanctum, encriptación a nivel de columna en MySQL y generación de recetas digitales.',
    description: 'Backend para clínicas privadas con gestión de agendas médicas concurrentes, fichas clínicas electrónicas cifradas y notificaciones automatizadas vía SMS y WhatsApp.',
    fullOverview: 'Plataforma con alta sensibilidad de datos médicos. Se implementó encriptación AES-256 a nivel de atributo en Eloquent y MySQL para resguardar diagnósticos y datos sensibles. Las agendas médicas implementan algoritmos de detección de solapamiento de horarios optimizados en consultas SQL directas con subqueries indexadas.',
    impactMetrics: [
      { label: 'Peticiones Diarias', value: '450k+', description: 'Atendidas con un tiempo de respuesta medio de 45ms' },
      { label: 'Encriptación', value: 'AES-256', description: 'Cifrado de datos sensibles en reposo y en tránsito' },
      { label: 'Solapamiento de Citas', value: '0%', description: 'Validación atómica a nivel de constraint y transacción SQL' },
    ],
    techStack: ['Laravel 11', 'PHP 8.3', 'MySQL 8.0 (Encrypted Tables)', 'Redis', 'Docker', 'Swagger/OpenAPI', 'Twilio API'],
    databaseFeatures: [
      'Cifrado transparente de datos médicos con Laravel Eloquent Casts y MySQL Vault keys',
      'Restricciones de exclusión y validaciones temporales con funciones nativas MySQL (`BETWEEN`, `TIME_TO_SEC`)',
      'Particionamiento de logs clínicos por fecha para optimizar consultas de auditoría',
    ],
    architectureHighlights: [
      'Arquitectura de Controladores Delgados y Form Requests estrictamente tipados',
      'Rate Limiting por IP y Token para mitigar ataques de fuerza bruta y scraping',
      'Integración con webhooks de pasarelas de pago para copagos médicos en línea',
    ],
    featured: false,
  },
  {
    id: 'datastream-etl-engine',
    title: 'DataStream ETL - Pipeline de Procesamiento Masivo & Reportería',
    category: 'mysql',
    tagline: 'Pipeline en PHP 8 & Laravel para ingesta y transformación de 500,000 eventos diarios hacia data marts MySQL.',
    description: 'Sistema ETL de alto rendimiento que consume streams de datos, normaliza información de múltiples fuentes y alimenta tableros de Business Intelligence mediante tablas intermedias pre-agregadas.',
    fullOverview: 'DataStream fue creado para resolver los problemas de saturación del servidor analítico principal. Implementa procesamiento por lotes (`chunking`), inserciones masivas con `INSERT ... ON DUPLICATE KEY UPDATE` y tablas temporales en memoria para transformaciones complejas antes de escribir en disco.',
    impactMetrics: [
      { label: 'Eventos Procesados', value: '500k/día', description: 'Ingesta continua sin degradar el rendimiento transaccional' },
      { label: 'Consumo de Memoria PHP', value: '<64MB', description: 'Uso de generadores PHP (`yield`) y cursores Eloquent LazyCollection' },
      { label: 'Generación de Reportes BI', value: 'Instantánea', description: 'Tablas pre-agregadas mediante vistas materializadas simuladas' },
    ],
    techStack: ['PHP 8.3', 'Laravel Console', 'MySQL 8.0', 'Redis Streams', 'RabbitMQ', 'Docker Compose'],
    databaseFeatures: [
      'Carga masiva ultra veloz mediante `LOAD DATA INFILE` y transacciones en batch de 5,000 registros',
      'Tablas de resumen diario con actualización continua usando triggers optimizados',
      'Uso intensivo de índices agrupados y ajustes de `bulk_insert_buffer_size`',
    ],
    architectureHighlights: [
      'Consumidores de colas desacoplados corriendo en contenedores Docker independientes',
      'Manejo eficiente de memoria en PHP mediante Generators y Streams',
      'Supervisión continua con métricas de Prometheus y dashboards de Grafana',
    ],
    featured: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Backend & Ecosistema PHP',
    iconName: 'Server',
    description: 'Especialista en desarrollo backend moderno con PHP 8.x y el framework Laravel, aplicando Clean Architecture, principios SOLID y patrones de diseño empresariales.',
    skills: [
      { name: 'Laravel 10 / 11', level: 98, experienceYears: '7+ años', highlight: 'Eloquent ORM, Horizon, Sanctum, Queues, Livewire, Service Providers' },
      { name: 'PHP 8.x Moderno', level: 96, experienceYears: '8+ años', highlight: 'Strict Types, Attributes, Enums, Fibers, JIT, Match Expressions, Generadores' },
      { name: 'Arquitectura de APIs RESTful', level: 95, experienceYears: '7+ años', highlight: 'Diseño REST, Idempotencia, Rate Limiting, Versionado, JSON:API, OpenAPI' },
      { name: 'Testing & Calidad (PHPUnit / Pest)', level: 90, experienceYears: '5+ años', highlight: 'Tests Unitarios, Tests de Integración, Mocking, TDD, PHPStan Level 8' },
      { name: 'Patrones de Diseño & SOLID', level: 94, experienceYears: '7+ años', highlight: 'Repository Pattern, Service Layer, Factory, Observer, Event-Driven' },
    ],
  },
  {
    name: 'Bases de Datos MySQL & Tuning',
    iconName: 'Database',
    description: 'Profundo dominio en el motor relacional MySQL (5.7 y 8.0), optimización de índices, diseño relacional avanzado, análisis de planes de ejecución y alta disponibilidad.',
    skills: [
      { name: 'Diseño Relacional & Normalización (3NF)', level: 98, experienceYears: '8+ años', highlight: 'Modelado ER complejo, Integridad Referencial, Constraints, Claves Compuestas' },
      { name: 'Optimización de Índices (B-Tree, Fulltext)', level: 96, experienceYears: '7+ años', highlight: 'Covering Indexes, Cardinalidad, Left-most Prefix Rule, Índices Invisibles' },
      { name: 'Análisis de Consultas con EXPLAIN', level: 95, experienceYears: '7+ años', highlight: 'EXPLAIN FORMAT=TREE/JSON, Detección de Table Scans y Temporary Tables' },
      { name: 'Transacciones ACID & Row Locking', level: 94, experienceYears: '7+ años', highlight: 'Niveles de Aislamiento InnoDB, SELECT FOR UPDATE, Prevención de Deadlocks' },
      { name: 'Particionamiento & Sharding', level: 88, experienceYears: '4+ años', highlight: 'RANGE / HASH Partitioning, Tablas de Auditoría Masivas, Purga Rápida' },
      { name: 'Tuning de Servidor InnoDB & Buffer Pool', level: 90, experienceYears: '6+ años', highlight: 'innodb_buffer_pool_size, log_file_size, max_connections, query_cache' },
    ],
  },
  {
    name: 'Caché, Mensajería & Rendimiento',
    iconName: 'Zap',
    description: 'Estrategias de almacenamiento en caché y procesamiento asíncrono para desacoplar cargas de trabajo pesadas y garantizar baja latencia.',
    skills: [
      { name: 'Redis (Caché & Pub/Sub)', level: 92, experienceYears: '6+ años', highlight: 'Atomic Locks, Key Invalidation, Redis Tags, Rate Limiting, Colas Rápidas' },
      { name: 'Colas & Procesamiento en Background', level: 95, experienceYears: '7+ años', highlight: 'Laravel Horizon, RabbitMQ, Backoff Strategies, Dead Letter Queues' },
      { name: 'Optimización de Memoria en PHP', level: 91, experienceYears: '6+ años', highlight: 'LazyCollection, Generators (`yield`), Chunking masivo de datos' },
    ],
  },
  {
    name: 'Infraestructura, DevOps & Herramientas',
    iconName: 'Cpu',
    description: 'Entornos de desarrollo reproducibles, contenedores Docker, automatización CI/CD y despliegues estables en entornos Linux/Nginx.',
    skills: [
      { name: 'Docker & Docker Compose', level: 90, experienceYears: '5+ años', highlight: 'Ambientes LAMP/LEMP multicontenedor, Multi-stage builds, PHP-FPM' },
      { name: 'Linux / Nginx Configuration', level: 88, experienceYears: '6+ años', highlight: 'FastCGI Caching, SSL/TLS, Reverse Proxy, Hardening de Servidores' },
      { name: 'Git & CI/CD GitHub Actions', level: 90, experienceYears: '7+ años', highlight: 'Pipelines automatizados de testing, linting con PHP-CS-Fixer y despliegue' },
      { name: 'Frontend Integrations (Livewire, Vue, Tailwind)', level: 85, experienceYears: '5+ años', highlight: 'Laravel Livewire 3, Alpine.js, Vue 3 básico, Tailwind CSS v3/v4' },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'laravel-dev',
    title: 'Desarrollo Backend en Laravel a Medida',
    shortDesc: 'Construcción de sistemas web robustos, paneles administrativos, CRMs y microservicios con código limpio y escalable.',
    iconName: 'Code',
    deliverables: [
      'Arquitectura modular con patrón Service/Repository',
      'APIs RESTful con autenticación Sanctum/Passport y Swagger',
      'Integración fluida con pasarelas de pago (Stripe, Webpay, PayPal)',
      'Pruebas unitarias e integración con PHPUnit para cero regresiones',
    ],
    idealFor: 'Startups y empresas que necesitan lanzar o escalar productos digitales con una base técnica sólida y mantenible a largo plazo.',
  },
  {
    id: 'mysql-audit',
    title: 'Auditoría y Optimización de Bases de Datos MySQL',
    shortDesc: 'Diagnóstico exhaustivo de cuellos de botella, optimización de consultas lentas e indexación estratégica para acelerar tu sistema.',
    iconName: 'Database',
    deliverables: [
      'Análisis profundo de Slow Query Logs y Performance Schema',
      'Estrategia de índices compuestos y eliminación de escaneos de tabla (`ALL`)',
      'Afinamiento de variables de servidor InnoDB (`innodb_buffer_pool`, locks)',
      'Informe técnico detallado con métricas antes/después y plan de acción',
    ],
    idealFor: 'Sistemas que experimentan lentitud, timeouts en consultas, picos de uso de CPU o bloqueos en tablas con millones de filas.',
  },
  {
    id: 'migration-upgrade',
    title: 'Migración y Modernización de Sistemas PHP Legacy',
    shortDesc: 'Actualización segura de proyectos PHP antiguos o versiones obsoletas de Laravel hacia versiones modernas (PHP 8.3 / Laravel 11).',
    iconName: 'RefreshCw',
    deliverables: [
      'Estrategia de refactorización progresiva sin interrupción de servicio',
      'Tipado estricto, eliminación de código deprecado y mejoras de seguridad',
      'Migración de esquemas MySQL antiguos a motores InnoDB modernos',
      'Configuración de suite de pruebas para validar paridad de funcionalidades',
    ],
    idealFor: 'Empresas con código legacy que no pueden actualizar librerías, sufren vulnerabilidades de seguridad o enfrentan costos de hosting excesivos.',
  },
  {
    id: 'api-architecture',
    title: 'Arquitectura de APIs & Integraciones Complejas',
    shortDesc: 'Diseño de endpoints de alta velocidad, webhooks tolerantes a fallos y sincronización con plataformas de terceros.',
    iconName: 'Share2',
    deliverables: [
      'Endpoints con tiempos de respuesta sub-100ms mediante caché inteligente',
      'Mecanismos de idempotencia para transacciones críticas y pagos',
      'Colas de eventos asíncronas con Redis y monitoreo en Laravel Horizon',
      'Documentación interactiva y contratos de API consistentes',
    ],
    idealFor: 'Aplicaciones móviles, frontends en React/Vue o integraciones B2B que demandan APIs ultrarrápidas y confiables.',
  },
];

export const CAREER_JOURNEY: CareerMilestone[] = [
  {
    period: '2021 - Presente',
    role: 'Senior Backend & Database Engineer / Consultor Especialista',
    company: 'Consultoría Independiente & Proyectos Enterprise',
    location: 'Santiago, Chile (Remoto)',
    description: 'Liderazgo técnico en el diseño de arquitecturas backend para plataformas SaaS, e-commerce de alto tráfico y sistemas ERP. Diagnóstico y optimización de bases de datos MySQL en producción con decenas de millones de registros.',
    achievements: [
      'Optimicé más de 120 consultas críticas en bases de datos MySQL empresariales, reduciendo tiempos de respuesta en un 75% promedio.',
      'Diseñé e implementé la arquitectura de 8 sistemas Laravel 10/11 con microservicios y colas distribuidas.',
      'Implementé pipelines de CI/CD y estándares de código estricto (PHPStan nivel 8, PHPUnit) en equipos multidisciplinarios.',
    ],
    techUsed: ['Laravel 11', 'PHP 8.3', 'MySQL 8.0', 'Redis', 'Docker', 'AWS', 'PHPUnit', 'Horizon'],
  },
  {
    period: '2018 - 2021',
    role: 'Lead Backend Developer',
    company: 'Tech Solutions Global',
    location: 'Santiago, Chile',
    description: 'Responsable del equipo backend para el desarrollo de un core de pagos y plataforma logística. Modelado relacional de bases de datos transaccionales y coordinación técnica.',
    achievements: [
      'Lideré la migración de un monolito PHP 5.6 hacia Laravel 8 con MySQL InnoDB, eliminando bloqueos de tabla concurrentes.',
      'Diseñé API REST de pagos con manejo de idempotencia y webhook receivers con 99.99% de disponibilidad.',
      'Capacité al equipo en buenas prácticas de SQL, índices B-Tree y profiling de consultas con EXPLAIN.',
    ],
    techUsed: ['Laravel', 'PHP 7.4/8.0', 'MySQL 5.7/8.0', 'Redis', 'Stripe API', 'Linux/Nginx', 'Git'],
  },
  {
    period: '2016 - 2018',
    role: 'Desarrollador PHP / Full Stack',
    company: 'Digital Systems SpA',
    location: 'Santiago, Chile',
    description: 'Desarrollo de módulos funcionales, reportería financiera en MySQL, integración de pasarelas de pago locales y soporte continuo a aplicaciones comerciales.',
    achievements: [
      'Construcción de módulos de facturación y reportería masiva con consultas SQL optimizadas.',
      'Creación de paneles de administración interactivos con Laravel y MySQL.',
    ],
    techUsed: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'Git'],
  },
];
