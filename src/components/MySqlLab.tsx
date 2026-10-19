import React, { useState } from 'react';
import { Database, Zap, Cpu, CheckCircle2, Play, AlertTriangle, Code } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  category: string;
  badge: string;
  problemSummary: string;
  badPattern: {
    title: string;
    code: string;
    language: string;
    explain: string;
    metrics: { time: string; queries: string; ram: string; status: 'bad' };
  };
  goodPattern: {
    title: string;
    code: string;
    language: string;
    explain: string;
    metrics: { time: string; queries: string; ram: string; status: 'good' };
  };
  sqlIndexSnippet: string;
  keyTakeaway: string;
}

export const MySqlLab: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'optimized' | 'unoptimized'>('optimized');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(100);

  const scenarios: Scenario[] = [
    {
      id: 'n-plus-1-eager-loading',
      title: 'Resolución de N+1 Queries & Índices Compuestos',
      category: 'Eloquent & B-Tree Indexing',
      badge: 'Reducción de Latencia 99.8%',
      problemSummary: 'Un endpoint que lista 500 pedidos genera 501 consultas SQL individuales al acceder a las relaciones en un bucle, saturando el pool de conexiones MySQL.',
      badPattern: {
        title: 'Antipatrón: Lazy Loading en Bucle (501 Consultas)',
        code: `// Controlador Laravel no optimizado
public function index() {
    $orders = Order::where('status', 'completed')->get(); // 1 Query
    
    // N+1 Query Problem: 500 consultas adicionales para cargar relaciones
    return $orders->map(fn($order) => [
        'id' => $order->id,
        'customer' => $order->customer->name, // 1 query por cada fila
        'items_count' => $order->items->count(), // 1 query por cada fila
    ]);
}`,
        language: 'php',
        explain: 'MySQL recibe 501 sentencias SELECT consecutivas, generando una penalización masiva de roundtrips de red y saturación de hilos.',
        metrics: { time: '3,480 ms', queries: '501 queries', ram: '84.2 MB', status: 'bad' },
      },
      goodPattern: {
        title: 'Solución de Claudio: Eager Loading con with() + Índice Compuesto',
        code: `// Arquitectura Optimizada con Eager Loading & Select de columnas específicas
public function index() {
    return Order::query()
        ->select(['id', 'customer_id', 'status', 'created_at'])
        ->where('status', 'completed')
        ->with([
            'customer:id,name',
            'items' => fn($q) => $q->select(['id', 'order_id', 'quantity', 'price'])
        ])
        ->withCount('items')
        ->paginate(50); // Exactamente 3 consultas SQL agrupadas
}`,
        language: 'php',
        explain: 'MySQL resuelve los datos con 3 consultas preparadas utilizando cláusulas WHERE IN (...) e indexación foránea, reduciendo el I/O en un 99%.',
        metrics: { time: '4.6 ms', queries: '3 queries', ram: '2.1 MB', status: 'good' },
      },
      sqlIndexSnippet: `ALTER TABLE orders ADD INDEX idx_orders_status_created (status, created_at);
ALTER TABLE order_items ADD INDEX idx_order_items_order_id (order_id);`,
      keyTakeaway: 'Combinación de Eager Loading en Laravel (with) con índices compuestos en MySQL para eliminar la sobrecarga y asegurar respuestas sub-10ms.',
    },
    {
      id: 'pessimistic-locking-acid',
      title: 'Control de Concurrencia & Bloqueo Pesimista (FOR UPDATE)',
      category: 'ACID Transactions & FinTech',
      badge: 'Cero Race Conditions',
      problemSummary: 'En eventos de alto tráfico (como cobros masivos o stock limitado), peticiones paralelas leen el mismo saldo y aprueban ambas operaciones, generando sobreventa.',
      badPattern: {
        title: 'Antipatrón: Lectura Simple sin Bloqueo de Fila',
        code: `// Riesgo Crítico de Race Condition
public function deductBalance(int $userId, float $amount) {
    $user = User::find($userId); // Lectura no bloqueante
    
    if ($user->balance >= $amount) {
        // Si otra petición llega aquí en el mismo milisegundo,
        // ambas leerán el balance original y duplicarán el débito
        $user->balance -= $amount;
        $user->save();
    }
}`,
        language: 'php',
        explain: 'Nivel de aislamiento estándar permite lecturas concurrentes antes de escribir, violando la atomicidad en operaciones de dinero o inventario.',
        metrics: { time: '65 ms', queries: '2 queries', ram: '1.8 MB', status: 'bad' },
      },
      goodPattern: {
        title: 'Solución de Claudio: DB::transaction + lockForUpdate() con Reintentos',
        code: `public function deductBalance(int $userId, float $amount): bool {
    return DB::transaction(function () use ($userId, $amount) {
        // Bloqueo exclusivo a nivel de fila InnoDB (SELECT ... FOR UPDATE)
        $user = User::where('id', $userId)->lockForUpdate()->firstOrFail();
        
        if ($user->balance < $amount) {
            throw new InsufficientFundsException("Saldo insuficiente.");
        }
        
        $user->decrement('balance', $amount);
        
        LedgerEntry::create([
            'user_id' => $user->id,
            'amount' => -$amount,
            'balance_after' => $user->balance,
        ]);
        return true;
    }, 5); // 5 intentos automáticos en caso de deadlock transitorio
}`,
        language: 'php',
        explain: 'InnoDB aplica un Exclusive Lock (X-Lock) sobre el registro del usuario. Cualquier otra transacción espera milisegundos hasta el commit.',
        metrics: { time: '8.2 ms', queries: '3 queries', ram: '2.4 MB', status: 'good' },
      },
      sqlIndexSnippet: `-- Verificación de estado de bloqueos en InnoDB:
SELECT * FROM performance_schema.data_locks WHERE OBJECT_NAME = 'users';`,
      keyTakeaway: 'Integridad transaccional ACID garantizada en pasarelas de pago y operaciones críticas mediante lockForUpdate() y reintentos.',
    },
    {
      id: 'table-partitioning-audit',
      title: 'Particionamiento de Tablas MySQL por Rango (50M+ Registros)',
      category: 'High Volume & Partitioning',
      badge: 'Escaneo de 50GB a 1.2MB',
      problemSummary: 'Una tabla de auditoría con 50 millones de registros satura las consultas mensuales debido a árboles de índices masivos en disco.',
      badPattern: {
        title: 'Antipatrón: Tabla Monolítica Gigante sin Partición',
        code: `-- Consulta de auditoría mensual sobre tabla monolítica de 50M de filas
SELECT user_id, action, COUNT(*) 
FROM audit_logs 
WHERE created_at >= '2024-08-01' AND created_at < '2024-09-01'
GROUP BY user_id, action;`,
        language: 'sql',
        explain: 'MySQL debe navegar un árbol de índices B-Tree de 18GB en memoria, provocando lecturas de disco masivas y retrasos de varios segundos.',
        metrics: { time: '8,420 ms', queries: '1 scan', ram: '1.2 GB (Buffer Pool)', status: 'bad' },
      },
      goodPattern: {
        title: 'Solución de Claudio: RANGE Partitioning por Año/Mes',
        code: `-- Definición de Particionamiento por Rangos en MySQL 8.0
ALTER TABLE audit_logs PARTITION BY RANGE (TO_DAYS(created_at)) (
    PARTITION p2024_06 VALUES LESS THAN (TO_DAYS('2024-07-01')),
    PARTITION p2024_07 VALUES LESS THAN (TO_DAYS('2024-08-01')),
    PARTITION p2024_08 VALUES LESS THAN (TO_DAYS('2024-09-01')),
    PARTITION p2024_09 VALUES LESS THAN (TO_DAYS('2024-10-01')),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);`,
        language: 'sql',
        explain: 'El optimizador de MySQL ejecuta Partition Pruning: descarta instantáneamente 48 millones de filas y solo lee la partición física p2024_08.',
        metrics: { time: '21.5 ms', queries: '1 prune', ram: '14.8 MB', status: 'good' },
      },
      sqlIndexSnippet: `-- Comprobación de poda de particiones con EXPLAIN:
EXPLAIN PARTITIONS SELECT * FROM audit_logs WHERE created_at = '2024-08-15';
-- Resultado: partitions: p2024_08 (Filas examinadas: solo 1.2M vs 50M)`,
      keyTakeaway: 'Uso de particionamiento físico para permitir purga instantánea (DROP PARTITION) y consultas ultra rápidas sin fragmentar la base de datos.',
    },
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  return (
    <section id="mysql-lab" className="py-20 bg-white dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Database className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Laboratorio Interactivo de Rendimiento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            MySQL & Laravel Architecture Lab
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Casos prácticos de resolución de cuellos de botella de alto volumen, prevención de condiciones de carrera y transformación de consultas lentas en respuestas sub-10ms.
          </p>
        </div>

        {/* Scenario Selector Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setActiveView('optimized');
              }}
              className={`p-4 rounded-xl text-left transition-colors border cursor-pointer ${
                selectedScenarioIndex === idx
                  ? 'bg-slate-50 dark:bg-slate-900 border-sky-600 dark:border-sky-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">
                  {sc.category}
                </span>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-medium">
                  {sc.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {sc.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {sc.problemSummary}
              </p>
            </button>
          ))}
        </div>

        {/* Main Interactive Sandbox Board */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
          {/* Header of Sandbox */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
                <Database className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {currentScenario.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentScenario.problemSummary}
                </p>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveView('unoptimized')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeView === 'unoptimized'
                    ? 'bg-white dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Antipatrón (Lento)
              </button>
              <button
                onClick={() => setActiveView('optimized')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeView === 'optimized'
                    ? 'bg-white dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Optimizado por Claudio
              </button>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Viewer */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>
                    {activeView === 'optimized' ? currentScenario.goodPattern.title : currentScenario.badPattern.title}
                  </span>
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeView === 'optimized'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                }`}>
                  {activeView === 'optimized' ? 'ARQUITECTURA RECOMENDADA' : 'CUELLO DE BOTELLA'}
                </span>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed">
                <pre className="text-slate-300 whitespace-pre">
                  <code>
                    {activeView === 'optimized' ? currentScenario.goodPattern.code : currentScenario.badPattern.code}
                  </code>
                </pre>
              </div>

              {/* Technical Explanation */}
              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                activeView === 'optimized'
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-200'
              }`}>
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  {activeView === 'optimized' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  <span>Diagnóstico del Motor MySQL:</span>
                </div>
                <p>
                  {activeView === 'optimized' ? currentScenario.goodPattern.explain : currentScenario.badPattern.explain}
                </p>
              </div>
            </div>

            {/* Right: Metrics & Simulator */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                  Telemetría Comparativa
                </span>

                {/* Metrics Comparison Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Tiempo de Respuesta</span>
                    <span className={`text-lg font-bold font-mono mt-0.5 block tabular-nums ${
                      activeView === 'optimized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {activeView === 'optimized' ? currentScenario.goodPattern.metrics.time : currentScenario.badPattern.metrics.time}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {activeView === 'optimized' ? 'Baja latencia garantizada' : 'Timeout bajo concurrencia'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Consultas SQL</span>
                    <span className={`text-lg font-bold font-mono mt-0.5 block tabular-nums ${
                      activeView === 'optimized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {activeView === 'optimized' ? currentScenario.goodPattern.metrics.queries : currentScenario.badPattern.metrics.queries}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {activeView === 'optimized' ? 'Carga mínima en InnoDB' : 'Satura conexiones'}
                    </span>
                  </div>
                </div>

                {/* SQL Index Snippet */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-sky-700 dark:text-sky-300 flex items-center gap-1.5 font-semibold">
                    <Database className="w-3.5 h-3.5" />
                    <span>Sentencia DDL / Índice Recomendado:</span>
                  </span>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto">
                    <code>{currentScenario.sqlIndexSnippet}</code>
                  </div>
                </div>
              </div>

              {/* Stress Test Simulator Trigger */}
              <div className="pt-2">
                <button
                  id="simulate-load-test-btn"
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Simulando 10,000 peticiones concurrentes...' : 'Simular Prueba de Carga en Vivo'}</span>
                </button>

                {isSimulating && (
                  <div className="mt-2.5 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>Midiendo throughput &amp; IOPS...</span>
                      <span>{simulationProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 transition-all duration-150"
                        style={{ width: `${simulationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center font-sans">
                  {currentScenario.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
