import React, { useState } from 'react';
import { Terminal, Play, RefreshCw, CheckCircle2, AlertTriangle, Database, Zap, Cpu } from 'lucide-react';

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
    <div id="terminal-bench" className="w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-xs font-mono">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="ml-2 text-slate-400 font-medium text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            claudio@production-server: ~/laravel-mysql-core
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            PHP 8.3.8 + MySQL 8.0.36
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 bg-slate-900/40 border-b border-slate-800/80 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('explain'); setExecutionTime(isIndexed ? 3.8 : 1420.5); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'explain'
              ? 'bg-slate-950 text-rose-400 border-t-2 border-rose-500 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Database className="w-3 h-3" />
          <span>MySQL EXPLAIN & Indexes</span>
        </button>
        <button
          onClick={() => { setActiveTab('locks'); setExecutionTime(5.1); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'locks'
              ? 'bg-slate-950 text-amber-400 border-t-2 border-amber-500 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>ACID Row-Locking (FOR UPDATE)</span>
        </button>
        <button
          onClick={() => { setActiveTab('eloquent'); setExecutionTime(12.4); }}
          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'eloquent'
              ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-500 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Cpu className="w-3 h-3" />
          <span>LazyCollection & Memory Chunking</span>
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {activeTab === 'explain' && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Estado de Índice:</span>
                <button
                  id="toggle-index-btn"
                  onClick={handleToggleIndex}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isIndexed
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/50'
                      : 'bg-rose-950/60 text-rose-300 border border-rose-500/40 hover:bg-rose-900/50'
                  }`}
                >
                  {isIndexed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Índice Compuesto B-Tree ACTIVO</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>SIN ÍNDICE (Full Table Scan)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="run-bench-btn"
                  onClick={handleRunBench}
                  disabled={isRunning}
                  className="px-3.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-md font-medium text-xs flex items-center gap-1.5 shadow-sm shadow-rose-600/30 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Ejecutando...' : 'Re-ejecutar Consulta'}</span>
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="space-y-2">
              <div className="text-slate-400 flex items-center gap-2">
                <span className="text-rose-400 font-bold">$</span> php artisan db:benchmark --table=orders --rows=10000000
              </div>

              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-slate-300 overflow-x-auto">
                <div className="text-slate-400 text-[10px] mb-1">// Consulta SQL analizada con EXPLAIN FORMAT=TREE:</div>
                <div className="text-emerald-400 font-medium">
                  SELECT <span className="text-slate-300">id, customer_id, total, status, created_at</span>
                </div>
                <div className="text-emerald-400">
                  FROM <span className="text-amber-300">orders</span>
                </div>
                <div className="text-emerald-400">
                  WHERE <span className="text-slate-300">tenant_id = 42 AND status = 'paid' AND created_at {'>='} '2024-01-01'</span>
                </div>
                <div className="text-emerald-400">
                  ORDER BY <span className="text-slate-300">created_at DESC LIMIT 50;</span>
                </div>
              </div>

              {/* Execution Metrics Box */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                isIndexed
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tiempo Ejecución</span>
                    <span className={`text-base sm:text-lg font-bold font-mono ${isIndexed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {executionTime} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Filas Examinadas</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-slate-200">
                      {isIndexed ? '50 filas' : '10,000,000 filas'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tipo de Acceso</span>
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded inline-block mt-0.5 ${
                      isIndexed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isIndexed ? 'ref / range (idx_orders_composite)' : 'ALL (Full Table Scan)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Impacto en I/O</span>
                    <span className={`text-xs font-bold font-mono ${isIndexed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isIndexed ? '0.04% CPU / Cache Hit' : '98.5% CPU / Disk Throttling'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'locks' && (
          <div className="space-y-3">
            <div className="text-slate-400 flex items-center gap-2">
              <span className="text-amber-400 font-bold">$</span> php artisan test --filter=StockConcurrencyTest
            </div>
            <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-slate-300">
              <div className="text-slate-400 text-[10px] mb-1">// Laravel Eloquent Pessimistic Locking:</div>
              <p className="text-slate-300">
                <span className="text-rose-400">DB::transaction</span>(function () &#123;
                <br />
                &nbsp;&nbsp;$product = Product::<span className="text-amber-300">where</span>('sku', 'PROD-9812')-&gt;<span className="text-emerald-400 font-bold">lockForUpdate()</span>-&gt;first();
                <br />
                &nbsp;&nbsp;$product-&gt;<span className="text-cyan-300">decrement</span>('stock', 1);
                <br />
                &#125;, 5); <span className="text-slate-500">// 5 reintentos automáticos ante deadlocks</span>
              </p>
            </div>
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-slate-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-amber-300">Concurrencia Garantizada:</span> Cero sobreventa garantizada en ráfagas de 5,000 compras concurrentes por segundo sin bloqueos de tabla entera.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eloquent' && (
          <div className="space-y-3">
            <div className="text-slate-400 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">$</span> php artisan records:export-stream --batch=500000
            </div>
            <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-slate-300">
              <div className="text-slate-400 text-[10px] mb-1">// Laravel LazyCollection con PHP Generators (yield):</div>
              <p className="text-slate-300">
                Invoice::<span className="text-amber-300">whereYear</span>('created_at', 2024)
                <br />
                &nbsp;&nbsp;-&gt;<span className="text-cyan-400 font-bold">lazy()</span> <span className="text-slate-500">// Streaming de 500k filas sin cargar todo en RAM</span>
                <br />
                &nbsp;&nbsp;-&gt;<span className="text-emerald-300">each</span>(fn ($inv) =&gt; $exporter-&gt;writeRow($inv));
              </p>
            </div>
            <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-slate-300 text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold text-cyan-300">Consumo de Memoria PHP:</span> 18.4 MB constantes (vs 2.1 GB sin lazy streaming).
              </div>
              <span className="text-cyan-400 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                -99.1% RAM
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-slate-500 text-[10px] flex items-center justify-between">
        <span>MySQL InnoDB Engine • Isolation: REPEATABLE-READ</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Simulador en vivo activo
        </span>
      </div>
    </div>
  );
};
