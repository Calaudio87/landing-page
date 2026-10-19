import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertTriangle, Database, Zap, Cpu } from 'lucide-react';

export const TerminalBench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explain' | 'locks' | 'eloquent'>('explain');
  const [isIndexed, setIsIndexed] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number>(3.8);

  const handleRunBench = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionTime(isIndexed ? Number((Math.random() * 2 + 2.5).toFixed(1)) : Number((Math.random() * 250 + 1200).toFixed(1)));
    }, 450);
  };

  const handleToggleIndex = () => {
    setIsIndexed(!isIndexed);
    setExecutionTime(!isIndexed ? 3.4 : 1420.5);
  };

  return (
    <div id="terminal-bench" className="w-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-xs font-mono transition-colors">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block"></span>
          </div>
          <span className="ml-2 text-slate-600 dark:text-slate-400 font-medium text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-rose-500" />
            <span>claudio@production: ~/mysql-profiler</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            PHP 8.3 · MySQL 8.0
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 bg-slate-100/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('explain'); setExecutionTime(isIndexed ? 3.8 : 1420.5); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'explain'
              ? 'bg-white dark:bg-slate-950 text-rose-600 dark:text-rose-400 border-t-2 border-rose-600 dark:border-rose-500 border-x border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Database className="w-3 h-3" />
          <span>MySQL EXPLAIN & Índices</span>
        </button>
        <button
          onClick={() => { setActiveTab('locks'); setExecutionTime(5.1); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'locks'
              ? 'bg-white dark:bg-slate-950 text-amber-600 dark:text-amber-400 border-t-2 border-amber-600 dark:border-amber-500 border-x border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>ACID Row-Locking</span>
        </button>
        <button
          onClick={() => { setActiveTab('eloquent'); setExecutionTime(12.4); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'eloquent'
              ? 'bg-white dark:bg-slate-950 text-sky-600 dark:text-sky-400 border-t-2 border-sky-600 dark:border-sky-500 border-x border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3 h-3" />
          <span>LazyCollection & Chunking</span>
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {activeTab === 'explain' && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400 text-xs">Índice:</span>
                <button
                  id="toggle-index-btn"
                  onClick={handleToggleIndex}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isIndexed
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40'
                  }`}
                >
                  {isIndexed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Índice B-Tree ACTIVO</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>SIN ÍNDICE (Table Scan)</span>
                    </>
                  )}
                </button>
              </div>

              <button
                id="run-bench-btn"
                onClick={handleRunBench}
                disabled={isRunning}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Midiendo...' : 'Re-ejecutar'}</span>
              </button>
            </div>

            {/* Code Block */}
            <div className="space-y-2">
              <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-xs">
                <span className="text-rose-600 dark:text-rose-400 font-bold">$</span> php artisan db:benchmark --table=orders --rows=10000000
              </div>

              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                <div className="text-slate-500 text-[10px] mb-1">-- EXPLAIN ANALYZE SELECT</div>
                <div className="text-emerald-400 font-medium">
                  SELECT <span className="text-slate-200">id, customer_id, total, status, created_at</span>
                </div>
                <div className="text-emerald-400">
                  FROM <span className="text-amber-300">orders</span>
                </div>
                <div className="text-emerald-400">
                  WHERE <span className="text-slate-200">tenant_id = 42 AND status = 'paid' AND created_at &gt;= '2024-01-01'</span>
                </div>
                <div className="text-emerald-400">
                  ORDER BY <span className="text-slate-200">created_at DESC LIMIT 50;</span>
                </div>
              </div>

              {/* Execution Metrics Box */}
              <div className={`p-3.5 rounded-lg border transition-colors ${
                isIndexed
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-500/30'
              }`}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-sans">Tiempo</span>
                    <span className={`text-base font-bold font-mono tabular-nums ${isIndexed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {executionTime} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-sans">Filas Examinadas</span>
                    <span className="text-base font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                      {isIndexed ? '50 filas' : '10,000,000 filas'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-sans">Acceso Motor</span>
                    <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                      {isIndexed ? 'ref / index' : 'ALL (Full Scan)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-sans">Uso de Buffer</span>
                    <span className="text-base font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                      {isIndexed ? '0.12 MB' : '1,420 MB'}
                    </span>
                  </div>
                </div>
              </div>

              {/* EXPLAIN Execution Tree */}
              <div className="text-[11px] p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 overflow-x-auto">
                <span className="text-slate-400 font-semibold block mb-1">Plan de Ejecución InnoDB:</span>
                {isIndexed ? (
                  <pre className="text-emerald-700 dark:text-emerald-400 font-mono text-[10px] leading-tight">
{`-> Limit: 50 row(s) (cost=4.20 rows=50)
    -> Index lookup on orders using idx_orders_composite (tenant_id=42, status='paid')
       (cost=4.20 rows=50) (actual time=0.082..3.811 rows=50 loops=1)`}
                  </pre>
                ) : (
                  <pre className="text-rose-700 dark:text-rose-400 font-mono text-[10px] leading-tight">
{`-> Limit: 50 row(s) (cost=1025492.30 rows=50)
    -> Filter: ((orders.tenant_id = 42) and (orders.status = 'paid'))
        -> Table scan on orders (cost=1025492.30 rows=9984120)
           (actual time=42.100..1420.500 rows=50 loops=1)`}
                  </pre>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'locks' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-amber-600 dark:text-amber-400 text-xs block mb-1">InnoDB Row-Level Locking (ACID):</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Previene sobreventa o doble gasto en inventario/billeteras bloqueando exclusivamente el registro durante la transacción.
              </p>
              <div className="bg-slate-900 text-slate-200 p-2.5 rounded font-mono text-[11px] overflow-x-auto">
                <div className="text-amber-400">DB::transaction(function () use ($productId, $qty) &#123;</div>
                <div className="pl-4 text-slate-300">// SELECT ... FOR UPDATE bloquea la fila en InnoDB</div>
                <div className="pl-4 text-emerald-400">$stock = Stock::where('product_id', $productId)-&gt;lockForUpdate()-&gt;firstOrFail();</div>
                <div className="pl-4 text-slate-300">$stock-&gt;decrement('quantity', $qty);</div>
                <div className="text-amber-400">&#125;);</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 rounded-lg">
                <span className="text-emerald-700 dark:text-emerald-300 font-bold block">Consistencia Total</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">0% riesgo de duplicación transaccional</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Latencia Lock</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Promedio &lt; 5.1ms en InnoDB</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eloquent' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-sky-600 dark:text-sky-400 text-xs block mb-1">Procesamiento por Streams con LazyCollection:</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Lectura de 1,000,000 de registros en batches usando cursores PDO de MySQL con consumo de RAM constante.
              </p>
              <div className="bg-slate-900 text-slate-200 p-2.5 rounded font-mono text-[11px] overflow-x-auto">
                <div className="text-sky-400">Order::where('status', 'paid')-&gt;cursor()</div>
                <div className="pl-4 text-emerald-400">-&gt;remember()</div>
                <div className="pl-4 text-emerald-400">-&gt;each(fn($order) =&gt; DispatchJob::dispatch($order));</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-500/30 rounded-lg">
                <span className="text-sky-700 dark:text-sky-300 font-bold block">Memoria RAM</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Fija en ~12 MB (vs 512 MB sin cursor)</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Cero Timeouts</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Streaming continuo vía PDO cursor</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
