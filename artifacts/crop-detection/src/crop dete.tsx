import { type ReactNode, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
    AlertTriangle,
    ArrowUpRight,
    Bell,
    CalendarDays,
    Camera,
    Check,
    ChevronDown,
    CloudSun,
    Compass,
    FileImage,
    FolderOpen,
    Grid2X2,
    Leaf,
    Menu,
    MoreHorizontal,
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    ScanLine,
    Search,
    Settings2,
    Sprout,
    Upload,
    X,
} from 'lucide-react';

const queryClient = new QueryClient();

type Severity = 'moderate' | 'watch' | 'healthy';
type Detection = { id: number; label: string; detail: string; severity: Severity; x: number; y: number };

const initialDetections: Detection[] = [
    { id: 1, label: 'Water stress', detail: 'North-west corner · 4.8 ha', severity: 'moderate', x: 25, y: 30 },
    { id: 2, label: 'Uneven emergence', detail: 'East boundary · 2.1 ha', severity: 'watch', x: 72, y: 54 },
    { id: 3, label: 'Strong canopy', detail: 'Central block · 18.6 ha', severity: 'healthy', x: 50, y: 70 },
];

const scans = [
    { id: 'scan-041', field: 'North 40', date: 'Today, 09:42', status: '2 signals', tone: 'warn', icon: AlertTriangle },
    { id: 'scan-040', field: 'Creek Bottom', date: 'Yesterday, 16:18', status: 'Healthy', tone: 'good', icon: Check },
    { id: 'scan-039', field: 'South Orchard', date: 'Aug 19, 11:06', status: '1 signal', tone: 'watch', icon: ScanLine },
];

function BrandMark() {
    return (
        <div className="flex items-center gap-2.5" data-testid="brand-cropsight">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-sm">
                <Sprout size={20} strokeWidth={2.2} />
            </div>
            <div className="leading-none">
                <div className="font-display text-[18px] font-semibold tracking-[-.02em] text-[hsl(var(--sidebar-foreground))]">CropSight</div>
                <div className="mt-1 font-data text-[8px] uppercase tracking-[.18em] text-[hsl(var(--sidebar-foreground)/.52)]">Field intelligence</div>
            </div>
        </div>
    );
}

function Sidebar({ collapsed, onToggle, onAction }: { collapsed: boolean; onToggle: () => void; onAction: (message: string) => void }) {
    const items = [
        { label: 'Overview', icon: Grid2X2, active: true },
        { label: 'Field scans', icon: ScanLine, badge: '3' },
        { label: 'My fields', icon: FolderOpen },
    ];
    return (
        <aside className={`${collapsed ? 'w-[78px]' : 'w-[248px]'} hidden shrink-0 flex-col bg-[hsl(var(--sidebar))] px-4 py-5 text-[hsl(var(--sidebar-foreground))] transition-[width] duration-300 lg:flex`}>
            <div className={`mb-11 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
                {!collapsed && <BrandMark />}
                {collapsed && <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Sprout size={20} /></div>}
                {!collapsed && <button onClick={onToggle} className="rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/.5)] transition hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]" aria-label="Collapse navigation" data-testid="button-collapse-sidebar"><PanelLeftClose size={16} /></button>}
            </div>
            {collapsed && <button onClick={onToggle} className="mb-8 flex w-full justify-center rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/.5)] transition hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]" aria-label="Expand navigation" data-testid="button-expand-sidebar"><PanelLeftOpen size={17} /></button>}
            <div className="mb-2 px-3 font-data text-[9px] uppercase tracking-[.18em] text-[hsl(var(--sidebar-foreground)/.38)]">{!collapsed && 'Workspace'}</div>
            <nav className="space-y-1" aria-label="Primary navigation">
                {items.map((item) => {
                    const Icon = item.icon;
                    return <button key={item.label} onClick={() => onAction(`${item.label} view selected`)} title={collapsed ? item.label : undefined} className={`group flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-xl px-3 py-2.5 text-left text-[13px] transition ${item.active ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]' : 'text-[hsl(var(--sidebar-foreground)/.62)] hover:bg-[hsl(var(--sidebar-accent)/.7)] hover:text-[hsl(var(--sidebar-foreground))]'}`} data-testid={`button-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                        <Icon size={17} strokeWidth={item.active ? 2.3 : 1.8} />
                        {!collapsed && <><span className="flex-1">{item.label}</span>{item.badge && <span className="rounded-md bg-[hsl(var(--accent)/.2)] px-1.5 py-0.5 font-data text-[10px] text-[hsl(var(--accent))]">{item.badge}</span>}</>}
                    </button>;
                })}
            </nav>
            {!collapsed && <div className="mt-auto">
                <div className="mb-5 rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/.54)] p-4">
                    <div className="mb-3 flex items-start justify-between"><div className="rounded-lg bg-[hsl(var(--accent)/.14)] p-2 text-[hsl(var(--accent))]"><Compass size={16} /></div><span className="font-data text-[9px] text-[hsl(var(--sidebar-foreground)/.42)]">PRO</span></div>
                    <p className="text-[12px] font-medium leading-5 text-[hsl(var(--sidebar-foreground)/.88)]">Make the next walk count.</p>
                    <p className="mt-1 text-[11px] leading-4 text-[hsl(var(--sidebar-foreground)/.46)]">Your next scan is ready to review.</p>
                    <button onClick={() => onAction('Latest scan opened in review')} className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[hsl(var(--accent))] transition hover:gap-2" data-testid="button-view-scan">View scan <ArrowUpRight size={13} /></button>
                </div>
                <button onClick={() => onAction('Settings are ready to configure')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-[hsl(var(--sidebar-foreground)/.58)] transition hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]" data-testid="button-settings"><Settings2 size={17} />Settings</button>
                <div className="mt-4 flex items-center gap-3 border-t border-[hsl(var(--sidebar-border))] px-3 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#bfca85] font-data text-[11px] font-medium text-[hsl(var(--foreground))]">JM</div>
                    <div><p className="text-[12px] font-medium">Kartik Miller</p><p className="font-data text-[9px] text-[hsl(var(--sidebar-foreground)/.4)]">Redwood Acres</p></div>
                    <ChevronDown size={14} className="ml-auto text-[hsl(var(--sidebar-foreground)/.4)]" />
                </div>
            </div>}
        </aside>
    );
}

function Topbar({ onMenu, onUpload, onAction }: { onMenu: () => void; onUpload: () => void; onAction: (message: string) => void }) {
    return <header className="flex h-[72px] items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.84)] px-5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
            <button onClick={onMenu} className="rounded-lg p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] lg:hidden" aria-label="Open navigation" data-testid="button-open-mobile-nav"><Menu size={20} /></button>
            <div className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]"><span className="hidden sm:inline">Workspace</span><span className="hidden text-[hsl(var(--border))] sm:inline">/</span><span className="font-medium text-[hsl(var(--foreground))]">Overview</span></div>
        </div>
        <div className="flex items-center gap-2.5">
            <div className="relative hidden md:block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" /><input className="h-9 w-[190px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] pl-9 pr-3 text-[12px] outline-none transition placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/.18)]" placeholder="Search fields..." data-testid="input-search-fields" /></div>
            <button onClick={() => onAction('You are all caught up')} className="relative rounded-lg p-2 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]" aria-label="Notifications" data-testid="button-notifications"><Bell size={18} /><span className="pulse-dot absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--destructive))]" /></button>
            <button onClick={onUpload} className="hidden h-9 items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-3.5 text-[12px] font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex" data-testid="button-top-upload"><Upload size={14} />Upload scan</button>
        </div>
    </header>;
}

function HealthSignal({ label, value, note, percent, color, testId }: { label: string; value: string; note: string; percent: number; color: string; testId: string }) {
    return <div className="group border-b border-[hsl(var(--border))] py-3.5 last:border-0" data-testid={testId}>
        <div className="mb-2 flex items-end justify-between"><div><p className="text-[11px] text-[hsl(var(--muted-foreground))]">{label}</p><p className="mt-0.5 font-data text-[21px] tracking-[-.04em] text-[hsl(var(--foreground))]">{value}</p></div><span className="mb-1 text-[10px] text-[hsl(var(--muted-foreground))]">{note}</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="h-full rounded-full transition-all duration-700 group-hover:brightness-110" style={{ width: `${percent}%`, backgroundColor: color }} /></div>
    </div>;
}

function FieldMap({ detections, selectedId, onSelect, scanning, onAction }: { detections: Detection[]; selectedId: number | null; onSelect: (id: number) => void; scanning: boolean; onAction: (message: string) => void }) {
    const [mapMode, setMapMode] = useState<'health' | 'rgb'>('health');
    return <div className="field-surface relative min-h-[305px] overflow-hidden rounded-[14px] border border-[#b7c28e] sm:min-h-[358px]" data-testid="field-map">
        <svg viewBox="0 0 700 380" className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-20 90 C120 60 190 115 320 84 S560 35 730 65" fill="none" stroke="#72864d" strokeWidth="2" opacity=".5" />
            <path d="M-20 180 C100 210 210 165 342 194 S560 225 730 170" fill="none" stroke="#72864d" strokeWidth="2" opacity=".42" />
            <path d="M-20 296 C120 255 205 310 340 280 S560 265 730 305" fill="none" stroke="#72864d" strokeWidth="2" opacity=".42" />
            <path d="M112 0 C130 94 90 170 142 250 S126 340 165 400 M510 0 C480 88 538 162 488 250 S515 332 478 400" fill="none" stroke="#95a66b" strokeWidth="18" opacity=".22" />
            <path d="M355 -10 C300 76 390 110 344 198 S390 305 335 390" fill="none" stroke="#f0ebc7" strokeWidth="8" opacity=".65" />
        </svg>
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/50 bg-[#eff0d5]/85 px-2.5 py-1.5 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-[#739643]" /><span className="font-data text-[10px] uppercase tracking-[.12em] text-[#455936]">NDVI · Aug 21</span></div>
        <div className="absolute right-4 top-4 flex rounded-lg border border-white/50 bg-[#eff0d5]/85 p-0.5 backdrop-blur-sm"><button onClick={() => setMapMode('health')} className={`rounded-md px-2.5 py-1 font-data text-[9px] ${mapMode === 'health' ? 'bg-white/75 text-[#455936]' : 'text-[#728060]'}`} data-testid="button-map-health">Health</button><button onClick={() => setMapMode('rgb')} className={`rounded-md px-2.5 py-1 font-data text-[9px] ${mapMode === 'rgb' ? 'bg-white/75 text-[#455936]' : 'text-[#728060]'}`} data-testid="button-map-rgb">RGB</button></div>
        {detections.map((detection) => <button key={detection.id} onClick={() => onSelect(detection.id)} className={`absolute -translate-x-1/2 -translate-y-1/2 transition duration-200 hover:scale-110 ${selectedId === detection.id ? 'z-20 scale-110' : 'z-10'}`} style={{ left: `${detection.x}%`, top: `${detection.y}%` }} aria-label={`Review ${detection.label}`} data-testid={`button-detection-${detection.id}`}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f7f5df] shadow-lg ${detection.severity === 'moderate' ? 'bg-[#d77a52]' : detection.severity === 'watch' ? 'bg-[#d2a34d]' : 'bg-[#71934e]'}`}><span className="h-2 w-2 rounded-full bg-white" /></span>
            {selectedId === detection.id && <span className="absolute left-1/2 top-[41px] -translate-x-1/2 whitespace-nowrap rounded-md bg-[#244834] px-2 py-1 font-data text-[9px] text-[#f3f1d9] shadow-lg">{detection.label}</span>}
        </button>)}
        {scanning && <div className="scan-line absolute left-4 right-4 top-0 h-px bg-[#f8f4c5] shadow-[0_0_18px_4px_rgba(248,244,197,.7)]" />}
        <div className="absolute bottom-3 left-3 flex gap-1 rounded-md border border-white/40 bg-[#eff0d5]/80 p-1 backdrop-blur-sm"><button onClick={() => onAction('Map zoomed in')} className="rounded bg-white/75 px-2 py-1 text-[10px] text-[#455936]" data-testid="button-map-zoom-in">+</button><button onClick={() => onAction('Map zoom reset')} className="px-2 py-1 text-[10px] text-[#455936]" data-testid="button-map-zoom-out">−</button></div>
        <div className="absolute bottom-3 right-3 rounded-md border border-white/40 bg-[#eff0d5]/80 px-2 py-1 font-data text-[9px] text-[#617052] backdrop-blur-sm">40.12° N · 98.31° W</div>
    </div>;
}

function ScanList({ onOpen }: { onOpen: (id: string) => void }) {
    return <div className="space-y-1.5">{scans.map((scan) => {
        const Icon = scan.icon; return <button key={scan.id} onClick={() => onOpen(scan.id)} className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition hover:border-[hsl(var(--border))] hover:bg-[hsl(var(--muted)/.56)]" data-testid={`button-recent-scan-${scan.id}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${scan.tone === 'good' ? 'bg-[#e0e9c4] text-[#5f7b39]' : scan.tone === 'warn' ? 'bg-[#f3ded2] text-[#b45b3c]' : 'bg-[#f4e7bf] text-[#a1742d]'}`}><Icon size={15} /></div>
            <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold text-[hsl(var(--foreground))]">{scan.field}</p><p className="mt-0.5 font-data text-[9px] text-[hsl(var(--muted-foreground))]">{scan.date}</p></div>
            <span className={`font-data text-[9px] ${scan.tone === 'good' ? 'text-[#62803d]' : scan.tone === 'warn' ? 'text-[#b45b3c]' : 'text-[#a1742d]'}`}>{scan.status}</span><ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground)/.45)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>;
    })}</div>;
}

function UploadSheet({ open, onClose, onScan }: { open: boolean; onClose: () => void; onScan: (name: string) => void }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');
    if (!open) return null;
    return <div className="fixed inset-0 z-40 flex items-end justify-center bg-[hsl(var(--foreground)/.28)] p-3 backdrop-blur-[2px] sm:items-center" onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()} className="reveal w-full max-w-[450px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-float sm:p-6" role="dialog" aria-modal="true" aria-label="Upload field scan">
            <div className="mb-5 flex items-start justify-between"><div><p className="font-data text-[9px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">New field scan</p><h2 className="mt-1 font-display text-[24px] font-semibold text-[hsl(var(--foreground))]">Bring in fresh eyes.</h2></div><button onClick={onClose} className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]" aria-label="Close upload dialog" data-testid="button-close-upload"><X size={18} /></button></div>
            <button onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[hsl(var(--accent)/.7)] bg-[hsl(var(--secondary)/.45)] px-5 py-8 text-center transition hover:bg-[hsl(var(--secondary))]" data-testid="button-choose-file">
                <div className="mb-3 rounded-xl bg-[hsl(var(--accent)/.25)] p-3 text-[hsl(var(--primary))]"><FileImage size={22} /></div><p className="text-[13px] font-semibold">{fileName || 'Choose an image to scan'}</p><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">JPG, PNG or TIFF · up to 50 MB</p>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} data-testid="input-upload-file" />
            <div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded-lg px-3.5 py-2 text-[12px] font-semibold text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))]" data-testid="button-cancel-upload">Cancel</button><button onClick={() => onScan(fileName || 'North 40 · new scan')} className="rounded-lg bg-[hsl(var(--primary))] px-3.5 py-2 text-[12px] font-semibold text-[hsl(var(--primary-foreground))] transition hover:-translate-y-0.5 hover:shadow-md" data-testid="button-start-scan">Start detection</button></div>
        </div>
    </div>;
}

function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(1);
    const [filter, setFilter] = useState<'all' | Severity>('all');
    const [notice, setNotice] = useState('');
    const detections = useMemo(() => filter === 'all' ? initialDetections : initialDetections.filter((detection) => detection.severity === filter), [filter]);

    const formattedDate = useMemo(() => {
        return new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date());
    }, []);
    const startScan = (name: string) => {
        setUploadOpen(false); setScanning(true); setNotice(`Analyzing ${name}...`);
        window.setTimeout(() => { setScanning(false); setNotice('Scan complete · 2 new signals found'); }, 2600);
        window.setTimeout(() => setNotice(''), 5600);
    };

    return <div className="noise app-shell min-h-[100dvh]">
        {mobileNav && <div className="fixed inset-0 z-30 bg-[hsl(var(--foreground)/.3)] lg:hidden" onClick={() => setMobileNav(false)}><div className="h-full w-[248px] bg-[hsl(var(--sidebar))] p-4" onClick={(event) => event.stopPropagation()}><div className="mb-8 flex items-center justify-between"><BrandMark /><button onClick={() => setMobileNav(false)} className="rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/.55)]" aria-label="Close navigation" data-testid="button-close-mobile-nav"><X size={18} /></button></div><SidebarMobile onNavigate={(message) => { setMobileNav(false); setNotice(message); }} /></div></div>}
        <div className="flex min-h-[100dvh]"><Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} onAction={setNotice} /><main className="min-w-0 flex-1"><Topbar onMenu={() => setMobileNav(true)} onUpload={() => setUploadOpen(true)} onAction={setNotice} /><div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9">
            <section className="reveal mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div><div className="mb-3 flex items-center gap-2 font-data text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><CalendarDays size={13} /> {formattedDate}</div><h1 className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-.035em] text-[hsl(var(--foreground))] sm:text-[42px]">Good morning, Kartik<span className="text-[hsl(var(--accent))]">.</span></h1><p className="mt-2 max-w-[540px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">Your fields are mostly on track. Two conditions could use a closer look before the afternoon heat.</p></div>
                <div className="flex items-center gap-2"><button onClick={() => setUploadOpen(true)} className="flex h-10 items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3.5 text-[12px] font-semibold text-[hsl(var(--foreground))] shadow-card transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]" data-testid="button-upload-scan"><Plus size={15} /> New scan</button><button onClick={() => setNotice('Report prepared for download')} className="flex h-10 items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-3.5 text-[12px] font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" data-testid="button-export-report"><ArrowUpRight size={15} /> Export report</button></div>
            </section>
            <section className="mb-7 grid gap-4 sm:grid-cols-3">
                <div className="reveal reveal-delay-1 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-card"><div className="mb-5 flex items-center justify-between"><span className="font-data text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Field health</span><span className="flex items-center gap-1 rounded-full bg-[#e2ebca] px-2 py-1 font-data text-[9px] text-[#5d783b]"><span className="h-1.5 w-1.5 rounded-full bg-[#739b4c]" />Good</span></div><div className="flex items-end gap-2"><span className="font-data text-[35px] leading-none tracking-[-.06em]">84.6</span><span className="mb-1 text-[11px] text-[#668744]">+3.2% <span className="text-[hsl(var(--muted-foreground))]">vs. last scan</span></span></div><div className="mt-4 flex h-8 items-end gap-1.5">{[35, 49, 42, 58, 54, 68, 61, 78, 72, 86, 81, 92].map((height, index) => <span key={index} className="flex-1 rounded-sm bg-[hsl(var(--accent)/.55)] transition hover:bg-[hsl(var(--primary))]" style={{ height: `${height}%` }} />)}</div></div>
                <div className="reveal reveal-delay-2 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-card"><div className="mb-5 flex items-center justify-between"><span className="font-data text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Active signals</span><AlertTriangle size={16} className="text-[#c26a48]" /></div><div className="flex items-end gap-2"><span className="font-data text-[35px] leading-none tracking-[-.06em]">03</span><span className="mb-1 text-[11px] text-[hsl(var(--muted-foreground))]">across 3 fields</span></div><div className="mt-5 flex gap-1.5"><span className="h-1.5 flex-[2] rounded-full bg-[#d37752]" /><span className="h-1.5 flex-1 rounded-full bg-[#d8aa4c]" /><span className="h-1.5 flex-[3] rounded-full bg-[hsl(var(--muted))]" /></div><p className="mt-2 font-data text-[9px] text-[hsl(var(--muted-foreground))]">1 needs attention · 2 watch</p></div>
                <div className="reveal reveal-delay-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))] shadow-card"><div className="mb-5 flex items-center justify-between"><span className="font-data text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground)/.58)]">Next best action</span><Camera size={16} className="text-[hsl(var(--accent))]" /></div><p className="max-w-[230px] font-display text-[20px] leading-[1.15]">Walk the north-west corner of North 40.</p><button onClick={() => setSelectedId(1)} className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[hsl(var(--accent))] transition hover:gap-2.5" data-testid="button-review-recommendation">Review signal <ArrowUpRight size={14} /></button></div>
            </section>
            <div className="grid gap-7 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.7fr)]">
                <section className="reveal reveal-delay-2 min-w-0 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-card sm:p-5">
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><h2 className="font-display text-[22px] font-semibold tracking-[-.025em]">North 40</h2><span className="rounded-full bg-[#e3ebca] px-2 py-1 font-data text-[9px] text-[#5f793e]">82.1 ha</span></div><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">Latest scan · 21 Aug 2025, 09:42 · Drone RGB + multispectral</p></div><div className="flex items-center gap-1 rounded-lg bg-[hsl(var(--muted)/.7)] p-1"><button onClick={() => setFilter('all')} className={`rounded-md px-2.5 py-1.5 font-data text-[9px] ${filter === 'all' ? 'bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-sm' : 'text-[hsl(var(--muted-foreground))]'}`} data-testid="button-filter-all">All</button><button onClick={() => setFilter('moderate')} className={`rounded-md px-2.5 py-1.5 font-data text-[9px] ${filter === 'moderate' ? 'bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-sm' : 'text-[hsl(var(--muted-foreground))]'}`} data-testid="button-filter-attention">Needs attention</button></div></div>
                    <FieldMap detections={detections} selectedId={selectedId} onSelect={setSelectedId} scanning={scanning} onAction={setNotice} />
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--border))] pt-4"><div className="flex items-center gap-4"><span className="flex items-center gap-1.5 font-data text-[9px] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[#71934e]" />Healthy</span><span className="flex items-center gap-1.5 font-data text-[9px] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[#d2a34d]" />Watch</span><span className="flex items-center gap-1.5 font-data text-[9px] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[#d77a52]" />Attention</span></div><button onClick={() => setNotice('Full map view is opening')} className="flex items-center gap-1 text-[10px] font-semibold text-[hsl(var(--primary))] transition hover:gap-2" data-testid="button-open-full-map">Open full map <ArrowUpRight size={13} /></button></div>
                </section>
                <aside className="space-y-7">
                    <section className="reveal reveal-delay-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-card"><div className="mb-1 flex items-center justify-between"><h2 className="font-display text-[20px] font-semibold">Crop signals</h2><button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))]" aria-label="More crop signal options" data-testid="button-more-signals"><MoreHorizontal size={17} /></button></div><p className="mb-2 text-[11px] text-[hsl(var(--muted-foreground))]">North 40 · current cycle</p><HealthSignal label="Canopy vigor" value="87%" note="Above baseline" percent={87} color="#72994d" testId="signal-canopy-vigor" /><HealthSignal label="Moisture consistency" value="71%" note="Room to improve" percent={71} color="#d3a64d" testId="signal-moisture" /><HealthSignal label="Disease likelihood" value="12%" note="Low risk" percent={12} color="#719b8a" testId="signal-disease" /><button onClick={() => setNotice('Signal report queued for export')} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[hsl(var(--border))] py-2.5 text-[11px] font-semibold text-[hsl(var(--foreground))] transition hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--secondary)/.45)]" data-testid="button-view-signal-report">View signal report <ArrowUpRight size={13} /></button></section>
                    <section className="reveal reveal-delay-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-card"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-[20px] font-semibold">Recent scans</h2><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">Your latest field activity</p></div><button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))]" aria-label="More scan options" data-testid="button-more-scans"><MoreHorizontal size={17} /></button></div><ScanList onOpen={(id) => setNotice(`${id} opened in scan review`)} /><button className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-[hsl(var(--primary))] transition hover:gap-2" data-testid="button-view-all-scans">View all scans <ArrowUpRight size={13} /></button></section>
                </aside>
            </div>
            <footer className="mt-9 flex flex-col justify-between gap-2 border-t border-[hsl(var(--border))] pt-5 text-[10px] text-[hsl(var(--muted-foreground))] sm:flex-row"><span className="flex items-center gap-1.5"><CloudSun size={13} /> Conditions last synced 12 min ago</span><span className="font-data">CropSight · v0.8.4</span></footer>
        </div></main></div>
        {notice && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-[11px] font-medium text-[hsl(var(--primary-foreground))] shadow-float" role="status" data-testid="status-notice"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />{notice}</div>}
        <UploadSheet open={uploadOpen} onClose={() => setUploadOpen(false)} onScan={startScan} />
    </div>;
}

function SidebarMobile({ onNavigate }: { onNavigate: (message: string) => void }) {
    return <nav className="space-y-1" aria-label="Mobile navigation"><button onClick={() => onNavigate('Overview view selected')} className="flex w-full items-center gap-3 rounded-xl bg-[hsl(var(--sidebar-accent))] px-3 py-2.5 text-left text-[13px] text-[hsl(var(--sidebar-accent-foreground))]" data-testid="button-mobile-nav-overview"><Grid2X2 size={17} />Overview</button><button onClick={() => onNavigate('Field scans view selected')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-[hsl(var(--sidebar-foreground)/.62)]" data-testid="button-mobile-nav-scans"><ScanLine size={17} />Field scans<span className="ml-auto rounded-md bg-[hsl(var(--accent)/.2)] px-1.5 py-0.5 font-data text-[10px] text-[hsl(var(--accent))]">3</span></button><button onClick={() => onNavigate('My fields view selected')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-[hsl(var(--sidebar-foreground)/.62)]" data-testid="button-mobile-nav-fields"><FolderOpen size={17} />My fields</button></nav>;
}

function Router() {
    return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
    const [location] = useLocation();
    return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
    return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;